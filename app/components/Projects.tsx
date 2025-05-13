'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedHeading from './AnimatedHeading';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

interface ProjectProps {
  title: string;
  client: string;
  description: string;
  image: string;
  technologies: string[];
}

const projects: ProjectProps[] = [
  {
    title: 'LegalSphere',
    client: 'Personal Project',
    description: 'AI framework for automating international trade law research using a hierarchical multi-agent system',
    image: '/images/project1.jpg',
    technologies: ['Python', 'FastAPI', 'Letta', 'LangFuse']
  },
  {
    title: 'Agentic Framework for SDS Classification',
    client: 'ISSM.AI',
    description: 'Production-grade framework that automates SDS classification per firecode compliance',
    image: '/images/project2.jpg',
    technologies: ['Python', 'Docker', 'AWS', 'Azure', 'LangFuse']
  },
  {
    title: 'Customer Service Chatbot',
    client: 'United Bank Limited',
    description: 'Django backend with knowledge graphs and fine-tuned LLMs for enterprise banking',
    image: '/images/project3.jpg',
    technologies: ['Django', 'Neo4j', 'Langflow', 'LLaMA']
  },
  {
    title: 'Economic Indicator Prediction',
    client: 'Ministry of Information Technology',
    description: 'LSTM time-series neural network for predicting economic indicators with high accuracy',
    image: '/images/project4.jpg',
    technologies: ['Python', 'TensorFlow', 'LSTM', 'R/RStudio']
  }
];

function ProjectCard({ project, index }: { project: ProjectProps; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [key, setKey] = useState(Date.now());
  const [isHovered, setIsHovered] = useState(false);
  
  // Reset component key when theme changes to force re-render
  useEffect(() => {
    setKey(Date.now());
  }, [theme]);

  return (
    <motion.div 
      className={`p-6 rounded-lg transition-all duration-300 transform ${
        isDark ? 'bg-[rgb(26,26,26)]' : 'bg-[rgb(240,240,240)]'
      } shadow-lg hover:shadow-xl ${isHovered ? 'translate-y-[-8px]' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
      key={key}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="mb-4 h-48 rounded overflow-hidden relative"
        style={{ 
          transition: 'all 0.5s ease-in-out',
          transform: isHovered ? 'scale(1.03)' : 'scale(1)'
        }}
      >
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${isDark ? 'rgba(26, 26, 26, 1)' : 'rgba(240, 240, 240, 1)'}, transparent)`,
            opacity: isHovered ? 0.7 : 1
          }}
        />
        <Image 
          src={project.image} 
          alt={project.title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
      <p className="text-accent text-sm mb-3">{project.client}</p>
      <p className="text-secondary mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, skillIndex) => (
          <motion.div 
            key={`${key}-${skillIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.2 + index * 0.05 + skillIndex * 0.03,
              type: "spring",
              stiffness: 200
            }}
            className="inline-block"
          >
            <div
              className={`text-xs px-2 py-1 rounded-full text-accent border transition-all duration-200 transform hover:scale-105 ${
                isDark 
                  ? 'bg-[rgb(15,15,15)] border-[rgba(110,110,110,0.1)] hover:bg-[rgb(30,30,30)]' 
                  : 'bg-[rgb(250,250,250)] border-[rgba(80,80,80,0.1)] hover:bg-[rgb(240,240,240)]'
              }`}
            >
              {tech}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const [key, setKey] = useState(Date.now());
  
  // Reset component key when theme changes to force re-render
  useEffect(() => {
    setKey(Date.now());
  }, [theme]);
  
  return (
    <AnimatedSection className="mb-20" delay={0.2} id="projects">
      <AnimatedHeading text="Projects" />
      <motion.p 
        className="text-secondary mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Building solutions that leverage the power of AI to solve complex problems efficiently.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={`${key}-${index}`} project={project} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
} 