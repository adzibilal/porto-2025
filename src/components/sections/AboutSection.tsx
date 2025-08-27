"use client";

import React from 'react';
import BlurText from '@/components/shared/BlurText';

const AboutSection = () => {
  const handleAnimationComplete = () => {
    console.log('About animation completed!');
  };

  return (
    <section className="about-section">
      <div className="container">
        <BlurText
          text="Tentang Saya"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-4xl font-bold"
        />
        <div>
          <BlurText
            text="Bagian untuk memperkenalkan diri dan background"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-lg mb-4"
          />
          <BlurText
            text="Saya adalah developer yang passionate dalam menciptakan pengalaman digital yang menarik"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-lg"
          />
          {/* Tambahkan konten about sesuai kebutuhan */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
