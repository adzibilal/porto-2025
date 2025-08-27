import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Default GSAP configurations
gsap.defaults({
  duration: 1,
  ease: "power2.out",
});

// Common animation presets
export const animations = {
  // Fade animations
  fadeIn: {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  },
  
  fadeOut: {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
  },

  // Slide animations
  slideInUp: {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  },

  slideInLeft: {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  },

  slideInRight: {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  },

  // Scale animations
  scaleIn: {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
  },

  // Stagger animations
  staggerChildren: {
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  },
};

// Initial states for animations
export const initialStates = {
  hidden: {
    opacity: 0,
  },
  
  slideUp: {
    y: 50,
    opacity: 0,
  },

  slideLeft: {
    x: -50,
    opacity: 0,
  },

  slideRight: {
    x: 50,
    opacity: 0,
  },

  scale: {
    scale: 0.8,
    opacity: 0,
  },
};

export { gsap };
export default gsap;
