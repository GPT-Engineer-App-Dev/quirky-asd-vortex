import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit2 } from 'lucide-react';

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

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onRenameConversation(id, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 space-y-2">
      <Button onClick={onNewConversation} className="w-full mb-4">
        <PlusCircle className="mr-2 h-4 w-4" />
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
              className="flex-grow"
            />
          ) : (
            <Button
              onClick={() => onSelectConversation(conv.id)}
              variant={activeConversation === conv.id ? "secondary" : "ghost"}
              className="w-full justify-start"
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
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;