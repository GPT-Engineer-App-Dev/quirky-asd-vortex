import React from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface MessageListProps {
  messages: Message[];
  theme: string | undefined;
}

const MessageList: React.FC<MessageListProps> = ({ messages, theme }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] p-3 text-lg ${
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
  );
};

export default MessageList;