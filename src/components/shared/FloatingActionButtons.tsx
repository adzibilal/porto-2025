"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoonIcon, SunIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useFadeIn, useStaggerChildren } from '@/hooks/useGSAP';
import ChatBot from './ChatBot';

const FloatingActionButtons = () => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const containerRef = useFadeIn<HTMLDivElement>(0.8);
  const buttonsRef = useStaggerChildren<HTMLDivElement>(0.2);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const element = document.createElement('div');
    element.id = 'floating-action-buttons-portal';
    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      document.body.removeChild(element);
      setPortalElement(null);
    };
  }, []);

  useEffect(() => {
    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Default to light theme if no saved preference
    const initialTheme = savedTheme || 'light';
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

  if (portalElement === null) {
    return null;
  }

  return createPortal(
    <>
      <div 
        ref={containerRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2"
      >
      {/* Expanded Buttons */}
      <div 
        ref={buttonsRef}
        className={`flex flex-col space-y-2 transition-all duration-200 transform ${
          isExpanded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
          <div className="w-4 h-4">
            {theme === 'light' ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Chat Button */}
        <button
          onClick={handleChatClick}
          className="p-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Chat"
        >
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleExpand}
        className={`p-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        title="Menu"
      >
        <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-3 h-0.5 bg-white absolute" />
          <div className="w-3 h-0.5 bg-white absolute rotate-90" />
        </div>
      </button>
    </div>

    {/* Chat Bot Component */}
    <ChatBot isOpen={isChatOpen} onClose={handleCloseChatBot} />
  </>
  , portalElement);
};

export default FloatingActionButtons;
