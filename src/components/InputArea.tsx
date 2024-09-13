import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react';

interface InputAreaProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  theme: string | undefined;
}

const InputArea: React.FC<InputAreaProps> = ({ inputMessage, setInputMessage, handleSendMessage, theme }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`p-4 ${
      theme === 'hacker'
        ? 'bg-muted-hacker border-t-4 border-border-hacker'
        : theme === '90s'
        ? 'bg-muted-90s border-t-4 border-border-90s'
        : 'bg-muted border-t-4 border-black'
    }`}>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Chef Veganista about vegan recipes..."
          className={`flex-1 text-lg ${
            theme === 'hacker'
              ? 'border-2 border-border-hacker focus:ring-2 focus:ring-accent-hacker'
              : theme === '90s'
              ? 'border-2 border-border-90s focus:ring-2 focus:ring-accent-90s'
              : 'border-2 border-black focus:ring-2 focus:ring-accent'
          }`}
        />
        <Button
          onClick={handleSendMessage}
          className={`text-lg ${
            theme === 'hacker'
              ? 'bg-accent-hacker text-accent-hacker-foreground border-2 border-border-hacker shadow-hacker'
              : theme === '90s'
              ? 'bg-accent-90s text-accent-90s-foreground border-2 border-border-90s shadow-90s'
              : 'bg-accent text-accent-foreground border-2 border-black shadow-neubrutalism'
          }`}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default InputArea;