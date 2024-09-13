"use client";

import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';
import MessageList from './MessageList';
import InputArea from './InputArea';

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
    <div className={`flex h-screen text-lg ${
      theme === 'hacker'
        ? 'bg-background-hacker text-foreground-hacker'
        : theme === '90s'
        ? 'bg-background-90s text-foreground-90s font-90s'
        : 'bg-background text-foreground'
    }`}>
      <ThemeToggle />
      <ConversationList
        conversations={conversations}
        activeConversation={activeConversation || ''}
        onSelectConversation={setActiveConversation}
        onNewConversation={handleNewConversation}
        onRenameConversation={handleRenameConversation}
      />
      <div className={`flex flex-col flex-grow max-w-3xl mx-auto ${
        theme === 'hacker'
          ? 'bg-card-hacker border-4 border-border-hacker shadow-hacker'
          : theme === '90s'
          ? 'bg-card-90s border-4 border-border-90s shadow-90s'
          : 'bg-card border-4 border-black shadow-neubrutalism'
      }`}>
        <MessageList messages={activeMessages} theme={theme} />
        <InputArea
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ChatInterface;