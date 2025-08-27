import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr]">

      <div className="bg-zinc-900 px-[6rem] py-[4rem]">
        <h1 className="footer-title text-[10rem] text-white font-bold">ADZI BILAL ©</h1>


        {/* make a list of links */}
        <div className="flex flex-col gap-4">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
      </div>

      {/* video section */}
      <div className="relative overflow-hidden aspect-[4/5]">
      <div className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-zinc-900 via-zinc-900 to-transparent"></div>
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/video/video-bg.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
      </div>
    </div>
  );
};

export default Footer;
