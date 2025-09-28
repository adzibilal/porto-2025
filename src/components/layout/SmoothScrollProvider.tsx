"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { ScrollSmoother } from '@/lib/gsap';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current || typeof window === 'undefined') {
      return undefined;
    }

    isInitializedRef.current = true;

    const existingInstance = ScrollSmoother.get();

    const smoother = existingInstance ?? ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true,
    });

    smoother.refresh();

    return () => {
      smoother.kill();
      isInitializedRef.current = false;
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="smooth-wrapper">
      <div id="smooth-content" className="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollProvider;


