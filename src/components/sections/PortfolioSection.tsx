"use client";

import React from 'react';
import { useCardStackScroll } from '@/hooks/useGSAP';
import BlurText from '@/components/shared/BlurText';

const PortfolioSection = () => {
  const handleAnimationComplete = () => {
    console.log('Portfolio animation completed!');
  };

  // Implementasi scroll trigger untuk kartu bertumpuk
  useCardStackScroll('.portfolio-cards', {
    cardSelector: '.portfolio-card',
    stagger: 0.15,
    moveDistance: 600,
    rotateAngle: 8,
    scaleStart: 0.7,
    scaleEnd: 1,
    startTrigger: 'top 70%',
    endTrigger: 'bottom 30%'
  });

  const dummyProjects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description 1',
      year: '2024',
      backroundUrl: '/images/projects/project-1.jpg',
      logoUrl: '/images/projects/project-1.jpg',
      link: 'https://www.google.com',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description 2',
      year: '2024',
      backroundUrl: '/images/projects/project-2.jpg',
      logoUrl: '/images/projects/project-2.jpg',
      link: 'https://www.google.com',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Description 3',
      year: '2024',
      backroundUrl: '/images/projects/project-3.jpg',
      logoUrl: '/images/projects/project-3.jpg',
      link: 'https://www.google.com',
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'Description 4',
      year: '2024',
      backroundUrl: '/images/projects/project-4.jpg',
      logoUrl: '/images/projects/project-4.jpg',
      link: 'https://www.google.com',
    },
  ];

  return (
    <section className="portfolio-section ">
      <div className="bg-white px-[6rem] pt-[8rem] pb-[5rem]">
        <div className="flex items-center justify-between mb-[10rem]">
          <BlurText
            text="(Selected Work)"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[22px] italic font-meta text-zinc-500"
          />
          <BlurText
            text="(01)"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[22px] italic font-meta text-zinc-500"
          />
        </div>
        <BlurText
          text="Projects"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[19rem] text-chambray-darkest font-bold leading-none font-heading"
        />
        <BlurText
          text="Explore my recent projects showcasing creativity, innovation, and impactful design solutions."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[5rem] text-chambray-dark font-semibold leading-none"
        />
      </div>
      {/* Container untuk kartu bertumpuk */}
      <div className="portfolio-cards bg-white relative h-[100vh] overflow-hidden">
        {dummyProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="portfolio-card absolute w-[45%] bg-white shadow-xl rounded-lg border border-zinc-200"
            style={{
              top: `${20 + index * 8}%`,
              left: '10%',
            }}
          >
            {/* Card Content */}
            <div className="w-full aspect-[5/4] bg-zinc-200 flex items-center justify-center rounded-t-lg">
              {/* logo placeholder */}
              <div className="w-40 h-auto aspect-video bg-chambray-dark cursor-pointer rounded-md transition-all duration-300 hover:bg-chambray-darkest"></div>
            </div>

            {/* Project Info */}
            <div className="flex items-center justify-between px-[2rem] py-[1.5rem] bg-white rounded-b-lg">
              <div className="text-[2rem] text-chambray-darkest font-semibold">{project.title}</div>
              <div className="font-meta text-zinc-500 italic text-[22px]">({project.year})</div>
            </div>

            {/* Project Description */}
            <div className="absolute -right-[50%] top-1/2 transform -translate-y-1/2 w-[40%] bg-chambray-dark text-white p-[2rem] rounded-lg shadow-lg opacity-0 transition-all duration-500 hover:opacity-100">
              <h3 className="text-[1.5rem] font-semibold mb-2">{project.title}</h3>
              <p className="text-[1rem] text-chambray-light">{project.description}</p>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-white text-chambray-dark rounded-md text-sm font-medium hover:bg-chambray-light hover:text-white transition-colors duration-300"
              >
                Lihat Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
