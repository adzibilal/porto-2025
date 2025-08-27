"use client";

import { useEffect, useRef, RefObject } from 'react';
import { gsap, animations, initialStates } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Re-export animations and initialStates for convenience
export { animations, initialStates };

// Type untuk element refs yang bisa digunakan dengan GSAP
type GSAPRefReturn<T = HTMLElement> = RefObject<T | null>;

// Types untuk typing animation
interface TypingConfig {
  selector: string;
  delay: number;
  duration?: number;
  multiline?: string[];
}

interface TypingOptions {
  start?: string;
  once?: boolean;
}

// Hook untuk animasi fade in saat komponen mount
export const useFadeIn = <T extends HTMLElement = HTMLElement>(delay: number = 0): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, initialStates.hidden);
      gsap.to(ref.current, {
        ...animations.fadeIn,
        delay,
      });
    }
  }, [delay]);

  return ref;
};

// Hook untuk animasi slide in dari bawah
export const useSlideInUp = <T extends HTMLElement = HTMLElement>(delay: number = 0): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, initialStates.slideUp);
      gsap.to(ref.current, {
        ...animations.slideInUp,
        delay,
      });
    }
  }, [delay]);

  return ref;
};

// Hook untuk animasi slide in dari kiri
export const useSlideInLeft = <T extends HTMLElement = HTMLElement>(delay: number = 0): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, initialStates.slideLeft);
      gsap.to(ref.current, {
        ...animations.slideInLeft,
        delay,
      });
    }
  }, [delay]);

  return ref;
};

// Hook untuk animasi slide in dari kanan
export const useSlideInRight = <T extends HTMLElement = HTMLElement>(delay: number = 0): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, initialStates.slideRight);
      gsap.to(ref.current, {
        ...animations.slideInRight,
        delay,
      });
    }
  }, [delay]);

  return ref;
};

// Hook untuk animasi scale in
export const useScaleIn = <T extends HTMLElement = HTMLElement>(delay: number = 0): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, initialStates.scale);
      gsap.to(ref.current, {
        ...animations.scaleIn,
        delay,
      });
    }
  }, [delay]);

  return ref;
};

// Hook untuk animasi stagger children
export const useStaggerChildren = <T extends HTMLElement = HTMLElement>(delay: number = 0): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      const children = ref.current.children;
      gsap.set(children, initialStates.slideUp);
      gsap.to(children, {
        ...animations.staggerChildren,
        y: 0,
        opacity: 1,
        delay,
      });
    }
  }, [delay]);

  return ref;
};

// Hook untuk scroll trigger animations
export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  animation: object,
  trigger?: string,
  start: string = "top 80%"
): GSAPRefReturn<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        initialStates.slideUp,
        {
          ...animation,
          scrollTrigger: {
            trigger: trigger || ref.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [animation, trigger, start]);

  return ref;
};

// Hook untuk custom GSAP timeline
export const useGSAPTimeline = () => {
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timeline.current = gsap.timeline();
    
    return () => {
      timeline.current?.kill();
    };
  }, []);

  return timeline.current;
};

// Hook untuk typing animations
export const useTypingAnimations = (
  configs: TypingConfig[],
  options: TypingOptions = {}
) => {
  const { start = 'top 80%', once = true } = options;

  useEffect(() => {
    // Simple typing animation for text elements
    const createSimpleTyping = (element: HTMLElement, delay: number, customDuration?: number) => {
      const originalText = element.textContent || '';

      gsap.set(element, { text: '' });
      gsap.to(element, {
        text: originalText,
        duration: customDuration || Math.max(originalText.length * 0.05, 1.5),
        ease: 'none',
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
          once
        }
      });
    };

    // Handle elements with line breaks differently
    const createMultilineTyping = (element: HTMLElement, lines: string[], delay: number) => {
      // Clear the element
      element.innerHTML = '';
      
      // Ensure parent maintains line-height
      element.style.lineHeight = '1';
      
      // Create container for each line
      const lineElements = lines.map(() => {
        const lineSpan = document.createElement('span');
        lineSpan.style.display = 'block';
        lineSpan.style.lineHeight = '1'; // Equivalent to leading-none
        lineSpan.style.margin = '0';
        lineSpan.style.padding = '0';
        lineSpan.textContent = '';
        element.appendChild(lineSpan);
        return lineSpan;
      });

      // Animate each line sequentially
      const timeline = gsap.timeline({
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
          once
        }
      });

      lines.forEach((line, index) => {
        timeline.to(lineElements[index], {
          text: line,
          duration: Math.max(line.length * 0.05, 0.8),
          ease: 'none'
        }, index === 0 ? 0 : '+=0.2');
      });
    };

    // Process all configurations
    configs.forEach((config) => {
      const { selector, delay, duration, multiline } = config;
      const element = document.querySelector(selector) as HTMLElement;
      
      if (element) {
        if (Array.isArray(multiline)) {
          createMultilineTyping(element, multiline, delay);
        } else {
          createSimpleTyping(element, delay, duration);
        }
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [configs, start, once]);
};

// Hook untuk client carousel animation (reusable)
export const useClientCarousel = (
  containerSelector: string = '.clients-grid',
  options: {
    itemWidth?: number;
    gap?: number;
    originalItems?: number;
    duration?: number;
    delay?: number;
  } = {}
) => {
  const {
    itemWidth = 200,
    gap = 16,
    originalItems = 5,
    duration = 12,
    delay = 1000
  } = options;

  useEffect(() => {
    let carouselAnimation: gsap.core.Tween | null = null;

    const createCarousel = () => {
      const clientContainer = document.querySelector(containerSelector) as HTMLElement;
      const parentContainer = clientContainer?.parentElement as HTMLElement;
      
      if (clientContainer && parentContainer) {
        const singleSetWidth = (itemWidth + gap) * originalItems;

        // Set initial position
        gsap.set(clientContainer, { x: 0 });

        // Create seamless infinite animation
        carouselAnimation = gsap.to(clientContainer, {
          x: `-=${singleSetWidth}`,
          duration,
          ease: 'none',
          repeat: -1,
        });

        // Add hover pause functionality  
        parentContainer.addEventListener('mouseenter', () => {
          carouselAnimation?.pause();
        });

        parentContainer.addEventListener('mouseleave', () => {
          carouselAnimation?.resume();
        });

        return carouselAnimation;
      }
      return null;
    };

    const carouselTimeout = setTimeout(() => {
      carouselAnimation = createCarousel();
    }, delay);

    // Cleanup function
    return () => {
      if (carouselAnimation) carouselAnimation.kill();
      clearTimeout(carouselTimeout);
    };
  }, [containerSelector, itemWidth, gap, originalItems, duration, delay]);
};

// Hook untuk animasi kartu bertumpuk dengan scroll trigger
export const useCardStackScroll = (
  containerSelector: string = '.portfolio-cards',
  options: {
    cardSelector?: string;
    stagger?: number;
    moveDistance?: number;
    rotateAngle?: number;
    scaleStart?: number;
    scaleEnd?: number;
    startTrigger?: string;
    endTrigger?: string;
  } = {}
) => {
  const {
    cardSelector = '.portfolio-card',
    stagger = 0.2,
    moveDistance = 800,
    rotateAngle = 5,
    scaleStart = 0.8,
    scaleEnd = 1,
    startTrigger = 'top 80%',
    endTrigger = 'bottom 20%'
  } = options;

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (!container) return;

    const cards = container.querySelectorAll(cardSelector);
    if (cards.length === 0) return;

    // Set initial state untuk setiap kartu
    cards.forEach((card, index) => {
      gsap.set(card, {
        x: moveDistance + (index * 50), // Posisi awal di kanan dengan offset bertumpuk
        rotation: rotateAngle * (index % 2 === 0 ? 1 : -1), // Rotasi bergantian
        scale: scaleStart + (index * 0.05), // Scale bertingkat
        zIndex: cards.length - index, // Z-index terbalik agar kartu pertama di atas
        transformOrigin: 'center center'
      });
    });

    // Buat timeline untuk animasi scroll
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: startTrigger,
        end: endTrigger,
        scrub: 1, // Smooth scrubbing
        toggleActions: 'play reverse play reverse',
        onUpdate: (self) => {
          // Update progress untuk debugging
          console.log('Scroll progress:', self.progress);
        }
      }
    });

    // Animasi setiap kartu dengan stagger
    cards.forEach((card, index) => {
      timeline.to(card, {
        x: 0, // Bergerak ke posisi normal
        rotation: 0, // Kembalikan rotasi ke normal
        scale: scaleEnd, // Scale ke ukuran normal
        duration: 1,
        ease: 'power2.out'
      }, index * stagger); // Offset waktu untuk efek bertumpuk
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [containerSelector, cardSelector, stagger, moveDistance, rotateAngle, scaleStart, scaleEnd, startTrigger, endTrigger]);
};
