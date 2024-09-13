"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: messages.concat(newMessage).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from API');
        }

        const data = await response.json();
        const botResponse: Message = {
          id: Date.now(),
          text: data.response,
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = {
          id: Date.now(),
          text: 'Sorry, there was an error processing your request.',
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg whitespace-pre-wrap ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Chef Veganista about vegan recipes..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;