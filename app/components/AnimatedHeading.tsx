'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  delay?: number;
}

export default function AnimatedHeading({
  text,
  className = "section-title",
  tag = 'h2',
  typingSpeed = 100,
  cursorBlinkSpeed = 500,
  delay = 0
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Typing effect
  useEffect(() => {
    if (isInView) {
      // Add delay before starting animation
      const timeout = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, typingSpeed);
        
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, typingSpeed, delay]);
  
  // Cursor blinking effect
  useEffect(() => {
    if (isInView) {
      const blinkInterval = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, cursorBlinkSpeed);
      
      return () => clearInterval(blinkInterval);
    }
  }, [isInView, cursorBlinkSpeed]);
  
  const HeadingTag = tag;
  
  return (
    <HeadingTag 
      ref={ref}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
        {isInView && displayedText.length < text.length && (
          <span 
            className={`inline-block w-[3px] h-[0.9em] bg-accent ml-1 align-middle ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.2s' }}
          ></span>
        )}
      </motion.span>
    </HeadingTag>
  );
} 