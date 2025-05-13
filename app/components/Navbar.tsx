'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id], div[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' }
  ];

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? isDark 
        ? 'bg-background/60 backdrop-blur-lg py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
        : 'bg-background/70 backdrop-blur-lg py-3 shadow-[0_4px_10px_rgba(0,0,0,0.05)]' 
      : 'bg-transparent py-5'
  }`;

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#home" className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
              Malik Bashaar
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section, i) => {
              const isActive = section.href.substring(1) === activeSection;
              return (
                <motion.div
                  key={section.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                >
                  <Link 
                    href={section.href}
                    className={`text-secondary hover:text-primary transition-colors relative group ${isActive ? 'text-primary font-medium' : ''}`}
                  >
                    {section.name}
                    <span 
                      className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Section */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
            >
              <ThemeToggle />
            </motion.div>
            
            <motion.button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-secondary focus:outline-none p-2 rounded-full hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 backdrop-blur-md rounded-lg overflow-hidden border border-accent/10"
              style={{
                background: isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(240, 240, 240, 0.8)'
              }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="py-3 px-4 space-y-3">
                {sections.map((section, i) => {
                  const isActive = section.href.substring(1) === activeSection;
                  return (
                    <motion.div 
                      key={section.name}
                      variants={mobileItemVariants}
                    >
                      <Link 
                        href={section.href} 
                        className={`block py-2 px-3 rounded-md transition-colors ${
                          isActive 
                            ? isDark 
                              ? 'bg-accent/20 text-primary' 
                              : 'bg-accent/10 text-primary'
                            : 'text-secondary hover:text-primary hover:bg-accent/10'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {section.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 