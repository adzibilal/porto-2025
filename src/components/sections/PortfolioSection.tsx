"use client";

import React from 'react';
import BlurText from '@/components/shared/BlurText';
import Image from 'next/image';

// Import background images dari public/img/porto
const baraBg = '/img/porto/bara.png';
const idcpnsBg = '/img/porto/idcpns.png';
const mizanBg = '/img/porto/mizanamanah.png';
const digiLearnBg = '/img/porto/mydigilearn.png';

// Import client logos (sebagai string path karena dari folder public)
const idcpnsLogo = '/img/clients/idcpns.png';
const digiLearnLogo = '/img/clients/my-digilearn.png';
const mizanLogo = '/img/clients/mizan.png';
const baraLogo = '/img/clients/bara.png';

const PortfolioSection = () => {
  const handleAnimationComplete = () => {
    console.log('Portfolio animation completed!');
  };

  const projects = [
    {
      id: 1,
      title: 'ID CPNS',
      description: 'Platform persiapan CPNS online',
      year: '2022',
      backroundUrl: idcpnsBg,
      logoUrl: idcpnsLogo,
      link: 'https://idcpns.com/',
    },
    {
      id: 3,
      title: 'My DigiLearn',
      description: 'Platform pembelajaran digital',
      year: '2023',
      backroundUrl: digiLearnBg,
      logoUrl: digiLearnLogo,
      link: 'https://mydigilearn.id',
    },
    {
      id: 5,
      title: 'Mizan',
      description: 'Sistem Amil Zakat & Yatim Dhuafa',
      year: '2019',
      backroundUrl: mizanBg,
      logoUrl: mizanLogo,
      link: 'https://mydigilearn.id/',
    },
    {
      id: 8,
      title: 'Bara',
      description: 'Solusi bisnis terintegrasi',
      year: '2019',
      backroundUrl: baraBg,
      logoUrl: baraLogo,
      link: 'https://bara.co.id/',
    },
  ];

  return (
    <section className="portfolio-section relative z-20">
      <div className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pt-8 md:pt-16 lg:pt-[8rem] pb-8 md:pb-12 lg:pb-[5rem] transition-colors duration-300">
        <div className="flex items-center justify-between mb-8 md:mb-16 lg:mb-[10rem]">
          <BlurText
            text="(Selected Work)"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
          />
          <BlurText
            text="(01)"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
          />
        </div>
        <BlurText
          text="Projects"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[4rem] md:text-[8rem] lg:text-[19rem] text-zinc-900 dark:text-zinc-100 font-bold leading-none font-heading transition-colors duration-300"
        />
        <BlurText
          text="Explore my recent projects showcasing creativity, innovation, and impactful design solutions."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[1.5rem] md:text-[3rem] lg:text-[5rem] text-zinc-800 dark:text-zinc-200 font-semibold leading-none transition-colors duration-300"
        />
      </div>
      {/* ScrollStack container untuk portfolio cards */}
      <div className="bg-white dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 transition-colors duration-300">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="aspect-video relative bg-black">
              <Image src={project.backroundUrl} alt={project.title} width={1000} height={1000} className="object-cover aspect-video absolute top-0 left-0 -z-0 grayscale-100" />
              {/* overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
              <Image src={project.logoUrl} alt={project.title} width={1000} height={1000} className="object-cover absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-0 grayscale-100 w-[150px] h-auto hover:scale-110 transition-all duration-300" />
            </div>
            <div className="bg-zinc-100 dark:bg-gray-800 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-2 transition-colors duration-300">
              <div className="text-2xl md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-100 font-semibold transition-colors duration-300">{project.title}</div>
              <div className="flex flex-col items-end">
                <div className="text-sm md:text-md text-zinc-500 dark:text-zinc-400 font-meta italic transition-colors duration-300">{project.description}</div>
                {/* link to project */}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm md:text-md text-zinc-500 dark:text-zinc-400 font-meta italic transition-colors duration-300 hover:text-red-500">View Project</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
