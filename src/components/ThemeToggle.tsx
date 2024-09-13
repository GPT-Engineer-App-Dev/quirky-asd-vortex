import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'hacker' ? 'light' : 'hacker');
  };

  return (
    <Button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 border-2 border-black dark:border-green-500 shadow-neubrutalism dark:shadow-hacker"
    >
      {theme === 'hacker' ? 'Neubrutalism' : 'Hacker'}
    </Button>
  );
};

export default ThemeToggle;