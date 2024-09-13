import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewConversation
}) => {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 space-y-2">
      <Button onClick={onNewConversation} className="w-full mb-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Conversation
      </Button>
      {conversations.map((conv) => (
        <Button
          key={conv.id}
          onClick={() => onSelectConversation(conv.id)}
          variant={activeConversation === conv.id ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          {conv.name}
        </Button>
      ))}
    </div>
  );
};

export default ConversationList;