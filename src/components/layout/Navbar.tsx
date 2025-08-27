"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useFadeIn, useStaggerChildren } from '@/hooks/useGSAP';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandRef = useFadeIn<HTMLDivElement>(0.1);
  const menuRef = useStaggerChildren<HTMLDivElement>(0.3);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-40 bg-background/90 dark:bg-background/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="navbar-brand" ref={brandRef}>
            <Link href="/" className="text-xl md:text-2xl font-heading font-bold text-foreground dark:text-foreground hover:text-chambray dark:hover:text-chambray-light transition-colors">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-menu hidden md:flex space-x-6 lg:space-x-8" ref={menuRef}>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors text-sm lg:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light transition-colors p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-800 mt-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-chambray dark:hover:text-chambray-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
