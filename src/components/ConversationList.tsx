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
    <div className={`p-4 space-y-2 ${theme === 'hacker' ? 'bg-background-hacker text-foreground-hacker' : 'bg-gray-100'}`}>
      <Button onClick={onNewConversation} className="w-full mb-4 text-lg">
        <PlusCircle className="mr-2 h-5 w-5" />
        New Conversation
      </Button>
      {conversations.map((conv) => (
        <div key={conv.id} className="flex items-center space-x-2">
          {editingId === conv.id ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleRename(conv.id)}
              onKeyPress={(e) => e.key === 'Enter' && handleRename(conv.id)}
              className="flex-grow text-lg"
            />
          ) : (
            <Button
              onClick={() => onSelectConversation(conv.id)}
              variant={activeConversation === conv.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-lg ${
                theme === 'hacker'
                  ? 'hover:bg-muted-hacker hover:text-muted-hacker-foreground'
                  : 'hover:bg-gray-200'
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
            className={theme === 'hacker' ? 'hover:bg-muted-hacker hover:text-muted-hacker-foreground' : 'hover:bg-gray-200'}
          >
            <Edit2 className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;