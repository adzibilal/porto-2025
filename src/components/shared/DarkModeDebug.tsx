"use client";

import React, { useState, useEffect } from 'react';

const DarkModeDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    htmlClasses: '',
    backgroundColor: '',
    foregroundColor: '',
    isDarkModeActive: false
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      const htmlElement = document.documentElement;
      const computedStyle = getComputedStyle(document.body);
      
      setDebugInfo({
        htmlClasses: htmlElement.className || 'no classes',
        backgroundColor: computedStyle.backgroundColor,
        foregroundColor: computedStyle.color,
        isDarkModeActive: htmlElement.classList.contains('dark')
      });
    };

    // Update immediately
    updateDebugInfo();

    // Update when classes change (using MutationObserver)
    const observer = new MutationObserver(() => {
      updateDebugInfo();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border z-50 text-sm">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dark Mode Debug</h3>
      <div className="space-y-1 text-gray-700 dark:text-gray-300">
        <div>HTML Classes: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{debugInfo.htmlClasses}</code></div>
        <div>Dark Mode: <span className={debugInfo.isDarkModeActive ? 'text-green-600' : 'text-red-600'}>{debugInfo.isDarkModeActive ? 'Active' : 'Inactive'}</span></div>
        <div>BG Color: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{debugInfo.backgroundColor}</code></div>
        <div>Text Color: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{debugInfo.foregroundColor}</code></div>
      </div>
    </div>
  );
};

export default DarkModeDebug;






