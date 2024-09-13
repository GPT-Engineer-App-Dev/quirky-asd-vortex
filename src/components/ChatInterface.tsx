"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react';
import ConversationList from './ConversationList';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface Conversation {
  id: string;
  name: string;
  messages: Message[];
}

const ChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const storedConversations = localStorage.getItem('conversations');
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '' && activeConversation) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
      };
      
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      );
      setInputMessage('');
      
      try {
        const conversation = conversations.find(conv => conv.id === activeConversation);
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversationId: activeConversation,
            messages: conversation?.messages.concat(newMessage).map(msg => ({
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
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === activeConversation 
              ? { ...conv, messages: [...conv.messages, botResponse] }
              : conv
          )
        );
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = {
          id: Date.now(),
          text: 'Sorry, there was an error processing your request.',
          sender: 'bot',
        };
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === activeConversation 
              ? { ...conv, messages: [...conv.messages, errorMessage] }
              : conv
          )
        );
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      name: `Conversation ${conversations.length + 1}`,
      messages: [],
    };
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversation.id);
  };

  const handleRenameConversation = (id: string, newName: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === id ? { ...conv, name: newName } : conv
      )
    );
  };

  const activeMessages = conversations.find(conv => conv.id === activeConversation)?.messages || [];

  return (
    <div className={`flex h-screen ${theme === 'hacker' ? 'bg-background-hacker text-foreground-hacker' : 'bg-background text-foreground'}`}>
      <ThemeToggle />
      <ConversationList
        conversations={conversations}
        activeConversation={activeConversation || ''}
        onSelectConversation={setActiveConversation}
        onNewConversation={handleNewConversation}
        onRenameConversation={handleRenameConversation}
      />
      <div className={`flex flex-col flex-grow max-w-3xl mx-auto ${theme === 'hacker' ? 'bg-card-hacker border-4 border-border-hacker shadow-hacker' : 'bg-card border-4 border-black shadow-neubrutalism'}`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-3 ${
                  theme === 'hacker'
                    ? 'border-2 border-border-hacker shadow-hacker'
                    : 'border-2 border-black shadow-neubrutalism'
                } ${
                  message.sender === 'user'
                    ? theme === 'hacker'
                      ? 'bg-primary-hacker text-primary-hacker-foreground'
                      : 'bg-primary text-primary-foreground'
                    : theme === 'hacker'
                    ? 'bg-secondary-hacker text-secondary-hacker-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className={`p-4 ${theme === 'hacker' ? 'bg-muted-hacker border-t-4 border-border-hacker' : 'bg-muted border-t-4 border-black'}`}>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Chef Veganista about vegan recipes..."
              className={`flex-1 ${
                theme === 'hacker'
                  ? 'border-2 border-border-hacker focus:ring-2 focus:ring-accent-hacker'
                  : 'border-2 border-black focus:ring-2 focus:ring-accent'
              }`}
            />
            <Button
              onClick={handleSendMessage}
              className={`${
                theme === 'hacker'
                  ? 'bg-accent-hacker text-accent-hacker-foreground border-2 border-border-hacker shadow-hacker'
                  : 'bg-accent text-accent-foreground border-2 border-black shadow-neubrutalism'
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;