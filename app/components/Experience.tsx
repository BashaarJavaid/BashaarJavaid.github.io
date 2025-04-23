'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedHeading from './AnimatedHeading';
import { useTheme } from '../context/ThemeContext';

interface ExperienceProps {
  title: string;
  company: string;
  location: string;
  dateRange: string;
  responsibilities: string[];
}

const experiences: ExperienceProps[] = [
  {
    title: "Machine Learning Intern",
    company: "ISSM.AI",
    location: "Islamabad, Pakistan",
    dateRange: "May 2024 - August 2024",
    responsibilities: [
      "Engineered production-grade agentic framework for 3E that automates SDS classification per firecode compliance, reducing document processing time by 75%",
      "Implemented end-to-end containerized architecture using Docker with AWS (EC2, S3, Lambda, ECS) and Azure deployment",
      "Built comprehensive observability using Langfuse, Redis Insight, CloudWatch, and OpenTelemetry for monitoring agent conversations",
      "Delivered solution processing 300,000+ backlogged documents, generating cost savings and improving compliance"
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "United Bank Limited",
    location: "Islamabad, Pakistan",
    dateRange: "May 2023 - August 2023",
    responsibilities: [
      "Developed Django backend for enterprise customer service chatbot, experimenting with Langfuse, Langflow and open-source LLM integration",
      "Implemented knowledge graphs in Neo4j and fine-tuned open-source LLMs (Llama) on proprietary banking data",
      "Developed custom RAG pipelines with pgvector and Pinecone, reducing irrelevant responses by 52%",
      "Created domain-specific knowledge bases with automated content extraction and chunking, improving response time by 30%"
    ]
  },
  {
    title: "Machine Learning Research Intern",
    company: "Ministry of Information Technology",
    location: "Pakistan",
    dateRange: "July 2022 - August 2022",
    responsibilities: [
      "Led AI ethics and workforce transition research, developing recommendations for national AI adoption initiatives",
      "Designed LSTM time-series neural network for predicting economic indicators with 87% accuracy",
      "Presented cross-ministerial research findings via comprehensive reports and interactive dashboards, influencing AI governance framework"
    ]
  }
];

function ExperienceItem({ experience, index }: { experience: ExperienceProps; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div 
      className="mb-10 relative pl-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Timeline elements */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/20" />
      <motion.div 
        className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 -translate-x-1/2"
        style={{
          borderColor: isDark ? 'rgb(110, 110, 110)' : 'rgb(80, 80, 80)',
          background: isDark ? 'rgb(26, 26, 26)' : 'rgb(240, 240, 240)'
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
        viewport={{ once: true }}
      />
      
      <div className="p-5 rounded-lg" 
        style={{
          background: isDark ? 'rgba(30, 30, 30, 0.3)' : 'rgba(245, 245, 245, 0.5)',
          boxShadow: isDark ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between mb-2">
          <h3 className="text-xl font-bold">{experience.title}</h3>
          <span className="text-accent font-semibold">{experience.dateRange}</span>
        </div>
        <p className="text-secondary mb-4">{experience.company} | {experience.location}</p>
        <ul className="list-none space-y-2">
          {experience.responsibilities.map((responsibility, index) => (
            <motion.li 
              key={index}
              className="pl-4 border-l-2 border-accent/30 flex items-start"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ x: 3 }}
            >
              <span className="text-secondary">{responsibility}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <AnimatedSection className="mb-20" delay={0.3} id="experience">
      <AnimatedHeading text="Experience" />
      
      {experiences.map((experience, index) => (
        <div key={index}>
          <ExperienceItem experience={experience} index={index} />
          {index < experiences.length - 1 && (
            <motion.div 
              className="h-px w-full bg-accent/10 my-10"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            />
          )}
        </div>
      ))}
    </AnimatedSection>
  );
} 