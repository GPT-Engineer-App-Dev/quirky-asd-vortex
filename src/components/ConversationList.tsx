import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit2 } from 'lucide-react';
import { useTheme } from 'next-themes';

interface Conversation {
  id: string;
  name: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onRenameConversation: (id: string, newName: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewConversation,
  onRenameConversation
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const { theme } = useTheme();

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onRenameConversation(id, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  return (
    <div className={`w-64 p-4 space-y-4 ${
      theme === 'hacker'
        ? 'bg-background-hacker text-foreground-hacker'
        : theme === '90s'
        ? 'bg-purple-500 text-yellow-300 font-90s'
        : 'bg-gray-100 text-gray-900'
    }`}>
      <Button 
        onClick={onNewConversation} 
        className={`w-full ${
          theme === 'hacker'
            ? 'bg-accent-hacker text-accent-hacker-foreground border-2 border-border-hacker'
            : theme === '90s'
            ? 'bg-yellow-400 text-purple-700 font-bold border-4 border-pink-500 shadow-90s'
            : 'bg-blue-500 text-white'
        }`}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Chat
      </Button>
      {conversations.map((conv) => (
        <div key={conv.id} className="space-y-2">
          {editingId === conv.id ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleRename(conv.id)}
              onKeyPress={(e) => e.key === 'Enter' && handleRename(conv.id)}
              className={`w-full ${
                theme === 'hacker'
                  ? 'bg-input-hacker text-foreground-hacker border-border-hacker'
                  : theme === '90s'
                  ? 'bg-cyan-300 text-purple-700 border-2 border-pink-500'
                  : 'bg-white text-gray-900'
              }`}
            />
          ) : (
            <Button
              onClick={() => onSelectConversation(conv.id)}
              variant={activeConversation === conv.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                theme === 'hacker'
                  ? 'hover:bg-muted-hacker'
                  : theme === '90s'
                  ? 'bg-cyan-300 text-purple-700 hover:bg-yellow-300 border-2 border-pink-500'
                  : 'hover:bg-gray-200'
              } ${
                activeConversation === conv.id
                  ? theme === 'hacker'
                    ? 'bg-secondary-hacker text-secondary-hacker-foreground'
                    : theme === '90s'
                    ? 'bg-yellow-300 text-purple-700'
                    : 'bg-blue-100 text-blue-800'
                  : ''
              }`}
            >
              {conv.name}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingId(conv.id);
              setEditName(conv.name);
            }}
            className={`ml-2 ${
              theme === 'hacker'
                ? 'hover:bg-muted-hacker'
                : theme === '90s'
                ? 'bg-pink-400 text-yellow-300 hover:bg-pink-500 border-2 border-yellow-300'
                : 'hover:bg-gray-200'
            }`}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;