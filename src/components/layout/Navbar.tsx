"use client";

import React from 'react';
import Link from 'next/link';
import { useFadeIn, useStaggerChildren } from '@/hooks/useGSAP';

const Navbar = () => {
  const brandRef = useFadeIn<HTMLDivElement>(0.1);
  const menuRef = useStaggerChildren<HTMLDivElement>(0.3);

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-40 bg-background/90 dark:bg-background/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="navbar-brand" ref={brandRef}>
            <Link href="/" className="text-2xl font-heading font-bold text-foreground dark:text-foreground hover:text-chambray dark:hover:text-chambray-light transition-colors">
              Portfolio
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="navbar-menu hidden md:flex space-x-8" ref={menuRef}>
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Home</Link>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">About</a>
            <a href="/skills" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Skills</a>
            <a href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Projects</a>
            <a href="/experience" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Experience</a>
            <a href="/services" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Services</a>
            <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Blog</a>
            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle md:hidden">
            <button className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors">
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
