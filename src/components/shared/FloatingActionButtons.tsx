"use client";

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useFadeIn, useStaggerChildren } from '@/hooks/useGSAP';
import ChatBot from './ChatBot';

const FloatingActionButtons = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const containerRef = useFadeIn<HTMLDivElement>(0.8);
  const buttonsRef = useStaggerChildren<HTMLDivElement>(0.2);

  useEffect(() => {
    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update document class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  const handleChatClick = () => {
    setIsChatOpen(true);
    setIsExpanded(false); // Close the expanded menu when opening chat
  };

  const handleCloseChatBot = () => {
    setIsChatOpen(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3"
      >
      {/* Expanded Buttons */}
      <div 
        ref={buttonsRef}
        className={`flex flex-col space-y-3 transition-all duration-300 transform ${
          isExpanded 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="group relative p-4 bg-background dark:bg-background text-foreground dark:text-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <div className="relative w-6 h-6">
            <MoonIcon 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                theme === 'light' 
                  ? 'opacity-100 rotate-0' 
                  : 'opacity-0 rotate-180'
              }`} 
            />
            <SunIcon 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'opacity-100 rotate-0' 
                  : 'opacity-0 -rotate-180'
              }`} 
            />
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </div>
        </button>

        {/* Chat Button */}
        <button
          onClick={handleChatClick}
          className="group relative p-4 bg-chambray hover:bg-chambray-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Chat support (Coming soon)"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat support
          </div>
        </button>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleExpand}
        className={`relative p-4 bg-chambray-darkest hover:bg-chambray-dark cursor-pointer text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        title="More actions"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <div className={`w-4 h-0.5 bg-white absolute transition-all duration-300 ${
            isExpanded ? 'rotate-90' : 'rotate-0'
          }`} />
          <div className="w-4 h-0.5 bg-white absolute" />
        </div>
      </button>
    </div>

    {/* Chat Bot Component */}
    <ChatBot isOpen={isChatOpen} onClose={handleCloseChatBot} />
  </>
  );
};

export default FloatingActionButtons;
