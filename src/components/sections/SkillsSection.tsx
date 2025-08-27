"use client";

import React from 'react';
import { useScrollAnimation, useStaggerChildren, animations } from '@/hooks/useGSAP';

const SkillsSection = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(animations.fadeIn);
  const descRef = useScrollAnimation<HTMLParagraphElement>(animations.slideInUp, undefined, "top 75%");
  const skillsGridRef = useStaggerChildren<HTMLDivElement>(0.3);

  return (
    <section className="skills-section py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container">
        <h2 ref={titleRef} className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
          Keahlian & Layanan
        </h2>
        <p ref={descRef} className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          Daftar keahlian teknis dan layanan yang ditawarkan
        </p>
        <div ref={skillsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">Frontend Development</h3>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">Backend Development</h3>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">UI/UX Design</h3>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">Mobile Development</h3>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">Database Management</h3>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">DevOps & Deployment</h3>
          </div>
        </div>
        {/* Tambahkan grid skills/services sesuai kebutuhan */}
      </div>
    </section>
  );
};

export default SkillsSection;
