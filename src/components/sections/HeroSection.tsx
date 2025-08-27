"use client";

import React from 'react';
import Image from 'next/image';
import heroImage from '@/assets/images/hero.jpg';
import { useClientCarousel } from '@/hooks/useGSAP';
import BlurText from '@/components/shared/BlurText';

const HeroSection = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  // Use reusable hooks
  useClientCarousel('.clients-grid', { duration: 30 });

  return (
    <section className="flex flex-col-reverse lg:grid lg:grid-cols-[1.8fr_2fr] bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Image sticky container */}
      <div className="relative order-2 lg:order-1">
        <Image
          src={heroImage}
          alt="Hero Image"
          className='w-full h-[80vh] lg:h-screen object-cover sticky top-0'
          width={2000}
          height={2000}
        />
      </div>

      {/* Scrollable content area */}
      <div className="overflow-y-auto order-1 lg:order-2">
        <div className="h-auto lg:h-screen w-full pt-8 md:pt-16 lg:pt-[8rem] px-4 md:px-8 lg:px-[6rem] pb-8 lg:pb-[4rem] flex flex-col justify-center lg:justify-between">
          <BlurText
            text="ADZI BILAL"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="!text-[8rem] md:!text-[8rem] lg:!text-[14rem] font-bold text-zinc-900 dark:text-zinc-100 leading-none font-heading transition-colors duration-300"
          />

          <div className="flex flex-col gap-4 mt-8 lg:mt-0">
            <BlurText
              text="(Frontend Developer)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="italic capitalize text-zinc-500 dark:text-zinc-400 font-meta !text-[16px] md:!text-[20px] lg:!text-[22px] transition-colors duration-300"
            />
            <BlurText
              text="Crafting impactful brands and websites that drive growth and success."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="!text-[1.5rem] md:!text-[2.5rem] lg:!text-[3rem] font-semibold leading-none text-zinc-800 dark:text-zinc-200 transition-colors duration-300"
            />
          </div>
        </div>
        <div className="h-max w-full p-4 md:p-8 lg:p-[6rem] pb-8 md:pb-16 lg:pb-[8rem] flex flex-col justify-between gap-12 md:gap-16 lg:gap-20">
          <div className="flex flex-col gap-4">
            <BlurText
              text="(About me)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="italic capitalize text-zinc-500 dark:text-zinc-400 font-meta text-[16px] md:text-[20px] lg:text-[22px] transition-colors duration-300"
            />
            <BlurText
              text="Creative Brands & Powerful Websites."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-bold text-zinc-900 dark:text-zinc-100 leading-none font-heading transition-colors duration-300"
            />
            <BlurText
              text="An experienced Frontend Developer passionate about creating exceptional digital experiences. I specialize in building fast, reliable websites with a strong focus on user-centric design and effective team collaboration."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-500 dark:text-gray-400 transition-colors duration-300"
            />
          </div>
          <div className="flex flex-col gap-4">
            <BlurText
              text="(My Clients)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="italic capitalize text-zinc-500 dark:text-zinc-400 font-meta text-[16px] md:text-[20px] lg:text-[22px] transition-colors duration-300"
            />
                         {/* loop some place holder image 5:3 ratio image size 200x120 */}
            <div className="relative overflow-hidden w-full h-[80px] md:h-[100px] lg:h-[120px]">
              <div className="clients-grid absolute flex gap-2 md:gap-3 lg:gap-4">
                {/* Original items */}
                {Array.from({ length: 5 }, (_, index) => index).map((id) => (
                  <div key={`client-original-${id}`} className="client-item w-[120px] md:w-[160px] lg:w-[200px] h-[80px] md:h-[100px] lg:h-[120px] bg-gray-200 dark:bg-gray-700 text-zinc-900 dark:text-zinc-100 text-[14px] md:text-[16px] lg:text-[20px] font-bold text-center flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    IMG {id + 1}
                  </div>
                ))}
                {/* Duplicate items for seamless loop */}
                {Array.from({ length: 5 }, (_, index) => index).map((id) => (
                  <div key={`client-duplicate-${id}`} className="client-item w-[120px] md:w-[160px] lg:w-[200px] h-[80px] md:h-[100px] lg:h-[120px] bg-gray-200 dark:bg-gray-700 text-zinc-900 dark:text-zinc-100 text-[14px] md:text-[16px] lg:text-[20px] font-bold text-center flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    IMG {id + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
