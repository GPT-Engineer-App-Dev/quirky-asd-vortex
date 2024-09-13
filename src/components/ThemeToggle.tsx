import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('hacker');
    } else if (theme === 'hacker') {
      setTheme('90s');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 border-2 ${
        theme === 'hacker'
          ? 'border-green-500 shadow-hacker'
          : theme === '90s'
          ? 'border-pink-500 shadow-90s font-90s'
          : 'border-black shadow-neubrutalism'
      }`}
    >
      {theme === 'hacker' ? '90s' : theme === '90s' ? 'Light' : 'Hacker'}
    </Button>
  );
};

export default ThemeToggle;