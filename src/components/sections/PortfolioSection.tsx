"use client";

import React from 'react';
import BlurText from '@/components/shared/BlurText';
import Image from 'next/image';

// IMPORT IMAGES
import mdlBg from '@/assets/images/porto/mdl-bg.webp';
import mdlLogo from '@/assets/images/porto/mdl.png';
import TiltedCard from '../shared/TitledCard';

const PortfolioSection = () => {
  const handleAnimationComplete = () => {
    console.log('Portfolio animation completed!');
  };

  const dummyProjects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description 1',
      year: '2024',
      backroundUrl: mdlBg,
      logoUrl: mdlLogo,
      link: 'https://www.google.com',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description 2',
      year: '2024',
      backroundUrl: mdlBg,
      logoUrl: mdlLogo,
      link: 'https://www.google.com',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Description 3',
      year: '2024',
      backroundUrl: mdlBg,
      logoUrl: mdlLogo,
      link: 'https://www.google.com',
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'Description 4',
      year: '2024',
      backroundUrl: mdlBg,
      logoUrl: mdlLogo,
      link: 'https://www.google.com',
    },
  ];

  return (
    <section className="portfolio-section ">
      <div className="bg-white px-4 md:px-8 lg:px-[6rem] pt-8 md:pt-16 lg:pt-[8rem] pb-8 md:pb-12 lg:pb-[5rem]">
        <div className="flex items-center justify-between mb-8 md:mb-16 lg:mb-[10rem]">
          <BlurText
            text="(Selected Work)"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500"
          />
          <BlurText
            text="(01)"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500"
          />
        </div>
        <BlurText
          text="Projects"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[4rem] md:text-[8rem] lg:text-[19rem] text-zinc-900 font-bold leading-none font-heading"
        />
        <BlurText
          text="Explore my recent projects showcasing creativity, innovation, and impactful design solutions."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[1.5rem] md:text-[3rem] lg:text-[5rem] text-zinc-800 font-semibold leading-none"
        />
      </div>
      {/* ScrollStack container untuk portfolio cards */}
      <div className="bg-white grid grid-cols-1 md:grid-cols-2">
        {dummyProjects.map((project) => (
          <div key={project.id} className="bg-white">
            <div className="aspect-square relative bg-black">
              <Image src={project.backroundUrl} alt={project.title} width={1000} height={1000} className="object-cover aspect-square absolute top-0 left-0 -z-0 grayscale-100" />
              {/* overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
              <TiltedCard
                imageSrc={project.logoUrl.src}
                altText={project.title}
                captionText={project.title}
                containerHeight="150px"
                containerWidth="150px"
                imageHeight="auto"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                imageClassName="filter brightness-0 invert"
              />
            </div>
            <div className="bg-zinc-100 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="text-2xl md:text-3xl lg:text-4xl text-zinc-900 font-semibold">{project.title}</div>
              <div className="text-sm md:text-md text-zinc-500 font-meta italic">{project.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
