'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';

// Animated divider component
const AnimatedDivider = ({ delay = 0 }) => (
  <motion.div 
    className="section-divider"
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true, amount: 0.8 }}
  />
);

export default function Home() {
  return (
    <>
      <Header />
      
      <AnimatedDivider delay={0.2} />
      
      <Projects />
      
      <AnimatedDivider delay={0.3} />
      
      <Experience />
      
      <AnimatedDivider delay={0.4} />
      
      <Education />
      
      <AnimatedDivider delay={0.5} />
      
      <Skills />
    </>
  );
} 