'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedHeading from './AnimatedHeading';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Python (Expert)", "Java", "C++", "R/RStudio"]
  },
  {
    name: "AI & Machine Learning",
    skills: ["PyTorch/TensorFlow", "LLM Orchestration & RAG", "Agentic Systems Development"]
  },
  {
    name: "Web Development",
    skills: ["FastAPI/Django/Flask", "ETL/Web Scraping"]
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS/Azure Cloud Services", "Docker", "Observability & Metrics"]
  },
  {
    name: "Data Engineering",
    skills: ["Database Management", "Message Queue Architecture", "Vector Databases/Knowledge Graphs"]
  }
];

function SkillCategory({ category, index }: { category: SkillCategory; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [key, setKey] = useState(Date.now());
  
  // Reset component key when theme changes to force re-render
  useEffect(() => {
    setKey(Date.now());
  }, [theme]);
  
  return (
    <motion.div 
      className="mb-8 p-4 rounded-lg"
      style={{
        background: isDark ? 'rgba(30, 30, 30, 0.5)' : 'rgba(245, 245, 245, 0.5)',
        backdropFilter: 'blur(5px)',
        boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      viewport={{ once: true }}
      key={key}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <motion.span 
          className="inline-block w-2 h-2 rounded-full mr-2"
          style={{ background: `rgba(var(--foreground-rgb), 0.8)` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
        />
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.div 
            key={`${key}-${skillIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.2 + index * 0.1 + skillIndex * 0.05,
              type: "spring",
              stiffness: 200
            }}
            className="inline-block"
            whileHover={{ 
              scale: 1.05,
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.3 }
            }}
          >
            <div
              className={`text-sm px-3 py-1 rounded-full text-secondary border transition-all duration-200 ${
                isDark 
                  ? 'bg-[rgb(26,26,26)] border-[rgba(110,110,110,0.1)] hover:bg-[rgb(40,40,40)]' 
                  : 'bg-[rgb(240,240,240)] border-[rgba(80,80,80,0.1)] hover:bg-[rgb(230,230,230)]'
              }`}
            >
              {skill}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const [key, setKey] = useState(Date.now());
  
  // Reset component key when theme changes to force re-render
  useEffect(() => {
    setKey(Date.now());
  }, [theme]);
  
  return (
    <AnimatedSection className="mb-20" delay={0.5} id="skills">
      <AnimatedHeading text="Skills" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCategory key={`${key}-${index}`} category={category} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
} 