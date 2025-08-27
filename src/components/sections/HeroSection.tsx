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
    <section className="grid grid-cols-[1.8fr_2fr] bg-white min-h-screen">
      {/* Image sticky container */}
      <div className="relative">
        <Image
          src={heroImage}
          alt="Hero Image"
          className='w-full h-screen object-cover sticky top-0'
          width={2000}
          height={2000}
        />
      </div>

      {/* Scrollable content area */}
      <div className="overflow-y-auto">
        <div className="h-screen w-full pt-[8rem] px-[6rem] pb-[4rem] flex flex-col justify-between">
          <BlurText
            text="ADZI BILAL"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="!text-[14rem] font-bold text-zinc-900 leading-none font-heading"
          />

          <div className="flex flex-col gap-4">
            <BlurText
              text="(Frontend Developer)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="italic capitalize text-zinc-500 font-meta !text-[22px]"
            />
            <BlurText
              text="Crafting impactful brands and websites that drive growth and success."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="!text-[3rem] font-semibold leading-none text-zinc-800"
            />
          </div>
        </div>
        <div className="h-max w-full p-[6rem] pb-[8rem] flex flex-col justify-between gap-20">
          <div className="flex flex-col gap-4">
            <BlurText
              text="(About me)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="italic capitalize text-zinc-500 font-meta text-[22px]"
            />
            <BlurText
              text="Creative Brands & Powerful Websites."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[6rem] font-bold text-zinc-900 leading-none font-heading"
            />
            <BlurText
              text="An experienced Frontend Developer passionate about creating exceptional digital experiences. I specialize in building fast, reliable websites with a strong focus on user-centric design and effective team collaboration."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[20px] text-gray-500"
            />
          </div>
          <div className="flex flex-col gap-4">
            <BlurText
              text="(My Clients)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="italic capitalize text-zinc-500 font-meta text-[22px]"
            />
                         {/* loop some place holder image 5:3 ratio image size 200x120 */}
            <div className="relative overflow-hidden w-full h-[120px]">
              <div className="clients-grid absolute flex gap-4">
                {/* Original items */}
                {Array.from({ length: 5 }, (_, index) => index).map((id) => (
                  <div key={`client-original-${id}`} className="client-item w-[200px] h-[120px] bg-gray-200 text-zinc-900 text-[20px] font-bold text-center flex items-center justify-center flex-shrink-0">
                    IMG {id + 1}
                  </div>
                ))}
                {/* Duplicate items for seamless loop */}
                {Array.from({ length: 5 }, (_, index) => index).map((id) => (
                  <div key={`client-duplicate-${id}`} className="client-item w-[200px] h-[120px] bg-gray-200 text-zinc-900 text-[20px] font-bold text-center flex items-center justify-center flex-shrink-0">
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
