'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedHeading from './AnimatedHeading';
import { FaGraduationCap, FaTrophy, FaUniversity } from 'react-icons/fa';

interface EducationProps {
  degree: string;
  university: string;
  location: string;
  dateRange: string;
  awards?: string[];
}

const educations: EducationProps[] = [
  {
    degree: "Bachelor of Arts in Computer Science, Minor in Data Science",
    university: "DePauw University",
    location: "Greencastle, Indiana",
    dateRange: "2021 - 2026",
    awards: [
      "Academic Scholarship",
      "Member of the University Golf Team"
    ]
  }
];

function EducationItem({ education }: { education: EducationProps }) {
  const awardVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div 
      className="mb-10 p-6 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/20 transition-all shadow-sm hover:shadow-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <FaGraduationCap className="text-accent text-2xl" />
        <h3 className="text-2xl font-bold">{education.degree}</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <div className="flex items-center gap-2 text-secondary">
          <FaUniversity className="text-accent/80" />
          <span>{education.university} | {education.location}</span>
        </div>
        <span className="bg-accent/10 px-3 py-1 rounded-full text-accent font-medium mt-2 sm:mt-0 inline-block">{education.dateRange}</span>
      </div>

      {education.awards && education.awards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-4 pt-4 border-t border-accent/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <FaTrophy className="text-accent" />
            <h4 className="text-lg font-medium">Awards & Activities</h4>
          </div>
          <ul className="space-y-2">
            {education.awards.map((award, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={awardVariants}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-secondary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 inline-block"></span>
                {award}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Education() {
  return (
    <AnimatedSection className="mb-20" delay={0.4} id="education">
      <AnimatedHeading text="Education" />
      
      <div className="mt-8">
        {educations.map((education, index) => (
          <div key={index}>
            <EducationItem education={education} />
            {index < educations.length - 1 && (
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
      </div>
    </AnimatedSection>
  );
} 