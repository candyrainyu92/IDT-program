import React, { useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'motion/react';
import portraitImg from '../assets/images/Yu Liu 2.png';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onAboutClick?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAboutClick }) => {
  const scrollProgress = useMotionValue(0);

  // Smooth spring physics providing organic drag inertia and fast velocity tracking
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 260,
    damping: 26,
    mass: 0.3,
  });

  // Track mouse scroll / wheel speed and position
  useEffect(() => {
    let current = 0;

    const handleWheel = (e: WheelEvent) => {
      // Modulate movement speed according to downward wheel delta
      const sensitivity = 0.0045;
      current = Math.min(1, Math.max(0, current + e.deltaY * sensitivity));
      scrollProgress.set(current);
    };

    const handleScroll = () => {
      const maxScroll = 100;
      const val = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      if (val > current) {
        current = val;
        scrollProgress.set(current);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Gentle hint animation to introduce the interactiveness
    const timer = setTimeout(() => {
      if (current === 0) {
        current = 0.25;
        scrollProgress.set(0.25);
      }
    }, 300);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [scrollProgress]);

  // Yu transforms continuously from left (-170px) to 0px (snug next to portrait)
  const yuX = useTransform(smoothProgress, [0, 1], [-170, 0]);
  const yuOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0.15, 0.45, 1]);

  // Liu transforms continuously from right (+170px) to 0px (snug next to portrait)
  const liuX = useTransform(smoothProgress, [0, 1], [170, 0]);
  const liuOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0.15, 0.45, 1]);

  const handleAboutClick = () => {
    scrollProgress.set(1);
    if (onAboutClick) {
      onAboutClick();
    }
  };

  const scrollToExperience = () => {
    const el = document.getElementById('experience-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full flex flex-col justify-start overflow-x-hidden bg-[#EFE8DC] pt-20 sm:pt-24 md:pt-28"
    >
      {/* Top Headline & Category */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-2 pb-6 z-20">
        <p 
          id="hero-eyebrow"
          className="text-[#DC9BB5] text-base sm:text-lg md:text-xl font-bold font-inter tracking-tight mb-2 sm:mb-3"
        >
          Instructional Design &amp; Technology
        </p>
        <h1 
          id="hero-title"
          className="text-[#4C4747] font-extrabold font-inter tracking-tight leading-[1.15] text-[clamp(1.35rem,3.6vw,3.6rem)]"
        >
          <span className="block sm:whitespace-nowrap">Behind every effective learning experience</span>
          <span className="block sm:whitespace-nowrap mt-1 sm:mt-2">
            is{' '}
            <span className="text-[#DC9BB5] border-b-2 sm:border-b-4 border-[#DC9BB5] pb-0.5 inline-block">
              intentional design.
            </span>
          </span>
        </h1>
      </div>

      {/* Center Visual Composition */}
      <div className="relative w-full max-w-6xl mx-auto flex items-end justify-center px-4 pt-0 pb-0 z-10">
        <div className="relative w-full max-w-4xl flex items-end justify-center">
          
          {/* Giant IMPACT Typography: "Yu" on the left - positioned snug against the character & layer under portrait */}
          <motion.div 
            id="hero-text-yu"
            style={{ 
              x: yuX, 
              opacity: yuOpacity,
              fontFamily: "Impact, 'Arial Black', Haettenschweiler, sans-serif" 
            }}
            className="absolute right-[50%] mr-14 sm:mr-24 md:mr-36 lg:mr-[175px] bottom-4 sm:bottom-8 md:bottom-10 text-[#DC9BB5] font-impact text-[76px] sm:text-[130px] md:text-[170px] lg:text-[210px] leading-none select-none z-0 tracking-tight pointer-events-none"
          >
            Yu
          </motion.div>

          {/* Giant IMPACT Typography: "Liu" on the right - mirrored start and fade in from right to snug against character */}
          <motion.div 
            id="hero-text-liu"
            style={{ 
              x: liuX, 
              opacity: liuOpacity,
              fontFamily: "Impact, 'Arial Black', Haettenschweiler, sans-serif" 
            }}
            className="absolute left-[50%] ml-14 sm:ml-24 md:ml-36 lg:ml-[175px] bottom-4 sm:bottom-8 md:bottom-10 text-[#DC9BB5] font-impact text-[76px] sm:text-[130px] md:text-[170px] lg:text-[210px] leading-none select-none z-0 tracking-tight pointer-events-none"
          >
            Liu
          </motion.div>

          {/* Central Portrait of Yu Liu with White Sticker Contour */}
          <div 
            id="hero-avatar-container"
            className="relative z-10 w-56 sm:w-72 md:w-88 lg:w-[390px] flex justify-center items-end"
          >
            <img 
              id="hero-portrait"
              src={portraitImg} 
              alt="Yu Liu - Instructional Designer" 
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain select-none block pointer-events-none"
            />
          </div>

        </div>
      </div>

      {/* Bottom Unified Group: Horizontal Divider Line, "About me" Pill, and Chevron Down Arrow */}
      {/* Shifted vertically upward as a single entity so the line overlaps the portrait bottom edge */}
      <div className="relative w-full z-20 -mt-[21px] sm:-mt-[24px] md:-mt-[26px] pb-6 pointer-events-none">
        <div className="relative max-w-6xl mx-auto px-4 flex items-center justify-center">
          {/* The clean horizontal dividing line overlapping portrait's bottom edge */}
          <div 
            id="hero-divider-line"
            className="absolute inset-0 flex items-center" 
            aria-hidden="true"
          >
            <div className="w-full border-t border-[#4C4747]/35" />
          </div>

          {/* "About me" Visual Pill (Clickable trigger that smoothly scrolls down to Experience Section) */}
          <div className="relative z-10 pointer-events-auto">
            <button
              type="button"
              id="about-me-badge"
              data-cursor="magnetic"
              onClick={scrollToExperience}
              className="px-7 sm:px-9 py-2 sm:py-2.5 bg-[#F7F3EB] hover:bg-white text-[#4C4747] border border-[#4C4747]/15 font-inter font-semibold text-sm sm:text-base rounded-full shadow-[0_6px_20px_rgba(76,71,71,0.12)] flex items-center justify-center select-none cursor-pointer transition-all hover:scale-105 active:scale-95 outline-none"
            >
              About me
            </button>
          </div>
        </div>

        {/* Down Chevron Indicator */}
        <div className="flex justify-center mt-2 pointer-events-auto">
          <button
            type="button"
            id="chevron-scroll-indicator"
            aria-label="Scroll down to professional experience"
            onClick={scrollToExperience}
            className="text-[#9D988F] hover:text-[#4C4747] p-1 select-none cursor-pointer transition-colors bg-transparent border-none outline-none"
          >
            <ChevronDown className="w-6 h-6 stroke-current animate-bounce filter drop-shadow-[0_2px_6px_rgba(76,71,71,0.15)]" />
          </button>
        </div>
      </div>
    </section>
  );
};

