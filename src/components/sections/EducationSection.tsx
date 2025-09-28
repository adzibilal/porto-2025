"use client";

import React from 'react';
import { useScrollAnimation, useStaggerChildren, animations } from '@/hooks/useGSAP';

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  description?: string;
}

const EducationSection = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(animations.fadeIn);
  const descRef = useScrollAnimation<HTMLParagraphElement>(animations.slideInUp, undefined, "top 75%");
  const educationGridRef = useStaggerChildren<HTMLDivElement>(0.2);

  const education: EducationItem[] = [
    {
      period: "2022 – 2026",
      degree: "S1 in Computer Science",
      institution: "Bandung University of Technology (UTB)",
      description: "Currently pursuing Bachelor&apos;s degree in Computer Science with focus on software engineering and web development."
    },
    {
      period: "2024 Sep - Dec",
      degree: "Machine Learning Path",
      institution: "Bangkit Academy",
      description: "Intensive program focused on machine learning, data science, and AI development sponsored by Google, Tokopedia, Gojek, and Traveloka."
    },
    {
      period: "2017 – 2020",
      degree: "Vocational High School, Software Engineering",
      institution: "SMKN 2 Cimahi",
      description: "Specialized in software engineering with hands-on experience in programming and software development."
    }
  ];

  return (
    <section className="education-section py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Education
          </h2>
          <p ref={descRef} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My educational journey from vocational school to university, including specialized programs that shaped my technical expertise
          </p>
        </div>

        <div ref={educationGridRef} className="space-y-6 md:space-y-8">
          {education.map((edu) => (
            <div key={`${edu.institution}-${edu.period}`} className="education-card group">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-lg md:text-xl font-semibold text-green-600 dark:text-green-400">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                      {edu.period}
                    </span>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I believe in lifelong learning and constantly updating my skills to stay current with the latest technologies and industry trends.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Let&apos;s Connect
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;




