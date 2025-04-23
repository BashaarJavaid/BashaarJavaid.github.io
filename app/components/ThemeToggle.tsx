'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full focus:outline-none group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="w-10 h-5 bg-surface rounded-full overflow-hidden flex items-center">
        <motion.div 
          className="absolute w-4 h-4 rounded-full bg-primary"
          initial={false}
          animate={{ 
            x: isDark ? 4 : 22,
            backgroundColor: isDark ? 'rgb(255, 255, 255)' : 'rgb(255, 213, 79)'
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      
      {/* Sun and Moon Icons */}
      <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2 pointer-events-none">
        {/* Sun Icon */}
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-accent"
          initial={false}
          animate={{ 
            opacity: isDark ? 0.5 : 1,
            scale: isDark ? 0.8 : 1
          }}
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </motion.svg>
        
        {/* Moon Icon */}
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-accent"
          initial={false}
          animate={{ 
            opacity: isDark ? 1 : 0.5,
            scale: isDark ? 1 : 0.8
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </motion.svg>
      </div>
    </button>
  );
} 