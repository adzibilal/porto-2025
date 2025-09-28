"use client";

import React from 'react';
import Image from 'next/image';
import { useClientCarousel, usePinElement } from '@/hooks/useGSAP';
import BlurText from '@/components/shared/BlurText';

const clientLogos = [
  { name: 'Forkey', src: '/img/clients/forkey.png' },
  { name: 'Bara', src: '/img/clients/bara.png' },
  { name: 'Eksam', src: '/img/clients/eksam.png' },
  { name: 'IDCPNS', src: '/img/clients/idcpns.png' },
  { name: 'LearnHub', src: '/img/clients/learnhub.png' },
  { name: 'Mizan', src: '/img/clients/mizan.png' },
  { name: 'My Digilearn', src: '/img/clients/my-digilearn.png' },
  { name: 'Seremoni', src: '/img/clients/seremoni.png' },
] as const;

const HeroSection = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  // Use reusable hooks
  useClientCarousel('.clients-grid', { duration: 30 });
  
  // Pin the image container - only on desktop
  const imageRef = usePinElement<HTMLDivElement>({
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom bottom',
    pinSpacing: true
  });

  return (
    <section className="hero-section relative bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Image container - First on mobile, second on desktop */}
        <div className="order-1 lg:order-2 lg:w-[45%] lg:flex-shrink-0">
          <div className="lg:h-screen">
            <div ref={imageRef} className="w-full h-full">
              <Image
                src="/img/hero-img.png"
                alt="Hero Image"
                className='w-full lg:h-full object-cover'
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </div>
        
        {/* Scrollable content area - Second on mobile, first on desktop */}
        <div className="order-2 lg:order-1 lg:w-[55%] lg:flex-shrink-0">
          <div className="h-auto lg:h-screen w-full pt-4 md:pt-8 lg:pt-[8rem] px-4 md:px-8 lg:px-[6rem] pb-4 md:pb-8 lg:pb-[4rem] flex flex-col justify-center lg:justify-between">
            <BlurText
              text="ADZI BILAL"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="!text-[4rem] md:!text-[6rem] lg:!text-[18rem] font-bold text-zinc-900 dark:text-zinc-100 leading-none font-heading transition-colors duration-300"
            />

            <div className="flex flex-col gap-2 md:gap-4 mt-4 md:mt-6 lg:mt-0">
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
                className="!text-[1.2rem] md:!text-[2rem] lg:!text-[3rem] font-semibold leading-none text-zinc-800 dark:text-zinc-200 transition-colors duration-300"
              />
            </div>
          </div>
          <div className="h-max w-full p-4 md:p-8 lg:p-[6rem] pb-6 md:pb-12 lg:pb-[8rem] flex flex-col justify-between gap-8 md:gap-12 lg:gap-20">
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
                className="text-[2rem] md:text-[3rem] lg:text-[6rem] font-bold text-zinc-900 dark:text-zinc-100 leading-none font-heading transition-colors duration-300"
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
                <div className="clients-grid absolute flex gap-2 md:gap-3 lg:gap-6">
                  {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div
                      key={`client-logo-${client.name.replace(/\s+/g, '-').toLowerCase()}-${index}`}
                      className="client-item w-[120px] md:w-[160px] lg:w-[200px] h-[80px] md:h-[100px] lg:h-[120px] flex items-center justify-center flex-shrink-0 opacity-50"
                    >
                      <Image
                        src={client.src}
                        alt={`${client.name} logo`}
                        width={200}
                        height={120}
                        className="h-full w-full object-contain invert dark:invert-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
