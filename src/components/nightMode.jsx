import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const NightMode = ({ className }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className={`p-0 bg-gray-800 rounded-md ${className}`}>
      {theme === 'light' ? <Moon className="text-white" /> : <Sun className="text-yellow-500" />}
    </button>
  );
};

export default NightMode;