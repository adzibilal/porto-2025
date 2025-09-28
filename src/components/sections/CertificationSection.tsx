"use client";

import React from 'react';
import { useScrollAnimation, useStaggerChildren, animations } from '@/hooks/useGSAP';

interface CertificationItem {
  name: string;
  issuer: string;
  year?: string;
}

const CertificationSection = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(animations.fadeIn);
  const descRef = useScrollAnimation<HTMLParagraphElement>(animations.slideInUp, undefined, "top 75%");
  const certificationGridRef = useStaggerChildren<HTMLDivElement>(0.1);

  const certifications: CertificationItem[] = [
    {
      name: "Next.js, v3",
      issuer: "Frontend Masters",
      year: "2024"
    },
    {
      name: "Remix Fundamentals",
      issuer: "Frontend Masters",
      year: "2024"
    },
    {
      name: "Machine Learning Specialization",
      issuer: "Coursera",
      year: "2024"
    },
    {
      name: "Advanced Learning Algorithms",
      issuer: "Coursera",
      year: "2024"
    },
    {
      name: "Crash Course on Python",
      issuer: "Google",
      year: "2023"
    },
    {
      name: "Data Analysis with Python",
      issuer: "Dicoding",
      year: "2023"
    }
  ];

  return (
    <section className="certification-section py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Certifications
          </h2>
          <p ref={descRef} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications and courses that demonstrate my commitment to continuous learning and staying updated with the latest technologies
          </p>
        </div>

        <div ref={certificationGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {certifications.map((cert) => (
            <div key={`${cert.name}-${cert.issuer}`} className="certification-card group">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white leading-tight flex-1">
                    {cert.name}
                  </h3>
                  {cert.year && (
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {cert.year}
                    </span>
                  )}
                </div>
                <p className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {certifications.length}+
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Professional Certifications
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  5+
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Certified Platforms
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  2023+
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Years of Learning
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Certified & Ready
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              With these certifications and ongoing learning, I&apos;m equipped with the latest knowledge and best practices to deliver exceptional results.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Hire Me
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

export default CertificationSection;




