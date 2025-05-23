'use client';

import Image from 'next/image';
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedHeading from './AnimatedHeading';
import { useEffect, useState } from 'react';

export default function Header() {
  return (
    <AnimatedSection className="mb-20" id="home">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative">
          <motion.div 
            className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/30 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/images/profile.jpg" 
              alt="Malik Bashaar Javaid" 
              width={192} 
              height={192}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              priority
            />
          </motion.div>
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-accent/5 top-2 left-2 -z-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        
        <div className="flex-grow">
          <AnimatedHeading 
            text="MALIK BASHAAR" 
            tag="h1" 
            className="text-4xl md:text-5xl font-bold mb-2"
            typingSpeed={80}
          />
          <motion.p 
            className="text-xl md:text-2xl font-light text-secondary italic mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Crafting AI Solutions
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Software Engineer specializing in Agentic AI Systems and Production ML Frameworks. 
            Experienced building multi-agent architectures that automate complex workflows and enterprise-scale document processing. 
            Passionate about developing intelligent agents that bridge AI capabilities with real-world business applications.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a href="mailto:mjavaid_2025@depauw.edu" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <div className="bg-accent/10 p-2 rounded-full group-hover:bg-accent/20 transition-colors">
                <FaEnvelope className="text-accent" />
              </div>
              <span>mjavaid_2025@depauw.edu</span>
            </a>
            <a href="https://linkedin.com/in/malik-bashaar-javaid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <div className="bg-accent/10 p-2 rounded-full group-hover:bg-accent/20 transition-colors">
                <FaLinkedin className="text-accent" />
              </div>
              <span>Malik Bashaar Javaid</span>
            </a>
            <a href="https://github.com/BashaarJavaid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <div className="bg-accent/10 p-2 rounded-full group-hover:bg-accent/20 transition-colors">
                <FaGithub className="text-accent" />
              </div>
              <span>GitHub</span>
            </a>
            <div className="flex items-center gap-2 group">
              <div className="bg-accent/10 p-2 rounded-full group-hover:bg-accent/20 transition-colors">
                <FaMapMarkerAlt className="text-accent" />
              </div>
              <span>Greencastle, IN</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
} 