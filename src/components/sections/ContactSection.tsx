"use client";

import React from 'react';
import { useScrollAnimation, animations } from '@/hooks/useGSAP';

const ContactSection = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(animations.fadeIn);
  const descRef = useScrollAnimation<HTMLParagraphElement>(animations.slideInUp, undefined, "top 70%");
  const formRef = useScrollAnimation<HTMLDivElement>(animations.slideInLeft, undefined, "top 60%");
  const infoRef = useScrollAnimation<HTMLDivElement>(animations.slideInRight, undefined, "top 60%");

  return (
    <section className="contact-section">
      <div className="container">
        <h2 ref={titleRef}>Kontak</h2>
        <p ref={descRef}>Hubungi saya untuk kolaborasi atau pertanyaan</p>
        <div className="contact-content">
          <div ref={formRef}>
            <h3>Contact Form</h3>
            <p>Form kontak akan diletakkan di sini</p>
          </div>
          <div ref={infoRef}>
            <h3>Contact Info</h3>
            <p>Email: contact@example.com</p>
            <p>Phone: +62 xxx xxx xxx</p>
          </div>
        </div>
        {/* Tambahkan form kontak atau informasi kontak sesuai kebutuhan */}
      </div>
    </section>
  );
};

export default ContactSection;
