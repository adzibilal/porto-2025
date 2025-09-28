"use client";

import React from 'react';
import { useScrollAnimation, useStaggerChildren, animations } from '@/hooks/useGSAP';

interface ExperienceItem {
  period: string;
  position: string;
  company: string;
  responsibilities: string[];
}



const WorkingExperience = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(animations.fadeIn);
  const descRef = useScrollAnimation<HTMLParagraphElement>(animations.slideInUp, undefined, "top 75%");
  const experienceGridRef = useStaggerChildren<HTMLDivElement>(0.2);


  const experiences: ExperienceItem[] = [
    {
      period: "Jan 2025 - Present",
      position: "Frontend Developer",
      company: "Acclime Indonesia",
      responsibilities: [
        "Developed Agility, an internal Customer Relationship Management (CRM) system to improve client management efficiency and streamline company business processes.",
        "Designed and implemented a responsive and user-friendly interface using Vue 3 and TypeScript, ensuring optimal user experience across devices.",
        "Closely collaborated with the backend team for API integration, ensuring real-time data synchronization between frontend and backend systems.",
        "Optimized application performance through techniques such as lazy loading, code splitting, and caching, resulting in faster load times and smoother interactions.",
        "Created and maintained comprehensive technical documentation and user guides for internal teams.",
        "Conducted automated testing (unit and integration tests) using appropriate testing frameworks in the Vue ecosystem to ensure the stability and reliability of new features."
      ]
    },
    {
      period: "Oct 2023 - Dec 2024",
      position: "Frontend Developer & Code Reviewer",
      company: "PT Motiolabs Digital Indonesia",
      responsibilities: [
        "Continue development of the Live Event Feature for the MyDigiLearn project",
        "Review merge requests from frontend developers as part of the core team",
        "Research and development on new technologies and features for the Learnhub project",
        "Collaborate with backend developers for smooth integration",
        "Troubleshoot and resolve complex frontend issues",
        "Participate in sprint planning and agile development processes"
      ]
    },
    {
      period: "2022 – 2023",
      position: "Frontend Developer",
      company: "PT Jumpa Daring Indonesia",
      responsibilities: [
        "Continued development of the Secure Video Conference project",
        "Built secure internal chat application with user monitoring and task assignment",
        "Implemented automation testing functions",
        "Collaborated with backend developers for chat and video conferencing systems",
        "Participated in full development lifecycle from concept to deployment",
        "Worked with QA team for thorough testing and bug-free releases"
      ]
    },
    {
      period: "2019 - 2022",
      position: "Frontend Developer",
      company: "PT Bara Prima Multi Teknovasi",
      responsibilities: [
        "Designed and developed Crowdfunding Website",
        "Led development of Point of Sale (POS) system",
        "Created Digital Wedding Invitation product",
        "Collaborated with backend developers for API integration",
        "Ensured cross-browser compatibility and mobile responsiveness",
        "Participated in UI/UX design and development"
      ]
    }
  ];



  return (
    <section className="working-experience-section py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
Work Experience
          </h2>
          <p ref={descRef} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
My professional journey as a Frontend Developer with diverse experience across leading technology companies
          </p>
        </div>

        <div ref={experienceGridRef} className="space-y-6 md:space-y-8">
          {experiences.map((experience) => (
            <div key={`${experience.company}-${experience.period}`} className="experience-card group">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1">
                      {experience.position}
                    </h3>
                    <p className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {experience.company}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {experience.period}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-2">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={`${experience.company}-responsibility-${idx}`} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {responsibility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Interested in Collaborating?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I&apos;m always open to new opportunities and challenging projects. Let&apos;s discuss how I can help achieve your goals.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Contact Me
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

export default WorkingExperience;
