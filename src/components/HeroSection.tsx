import React, { useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'motion/react';
import portraitImg from '../assets/images/Untitled_Artwork_5.png';
import folderImg from '../assets/images/Untitled_Artwork_6.png';
import chartsImg from '../assets/images/Untitled_Artwork_2.png';
import bookImg from '../assets/images/Untitled_Artwork_4.png';
import laptopImg from '../assets/images/Untitled_Artwork_3.png';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onAboutClick?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAboutClick, onNavigate }) => {
  const scrollProgress = useMotionValue(0);

  // Smooth spring physics providing organic drag inertia and real-time velocity tracking
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  // Track mouse scroll / wheel speed and position
  useEffect(() => {
    let current = 0;

    const handleWheel = (e: WheelEvent) => {
      // Modulate movement speed according to downward wheel delta
      const sensitivity = 0.0016;
      current = Math.min(1, Math.max(0, current + e.deltaY * sensitivity));
      scrollProgress.set(current);
    };

    const handleScroll = () => {
      const maxScroll = 240;
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
      className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1D2440] pt-20 sm:pt-24"
    >
      {/* Top Headline & Category */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-2 pb-6 z-20">
        <p 
          id="hero-eyebrow"
          className="text-[#FF9BB4] text-base sm:text-lg md:text-xl font-bold font-inter tracking-tight mb-2 sm:mb-3"
        >
          Instructional Design &amp; Technology
        </p>
        <h1 
          id="hero-title"
          className="text-white font-extrabold font-inter tracking-tight leading-[1.15] text-[clamp(1.35rem,3.6vw,3.6rem)]"
        >
          <span className="block sm:whitespace-nowrap">Behind every effective learning experience</span>
          <span className="block sm:whitespace-nowrap mt-1 sm:mt-2">
            is{' '}
            <span className="text-[#FF9BB4] border-b-2 sm:border-b-4 border-[#FF9BB4] pb-0.5 inline-block">
              intentional design.
            </span>
          </span>
        </h1>
      </div>

      {/* Center Visual Composition */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-end justify-center px-4 pt-16 sm:pt-24 md:pt-28 pb-0 z-10">
        <div className="relative w-full max-w-4xl flex items-end justify-center">
          
          {/* Giant IMPACT Typography: "Yu" on the left - positioned snug against the character & layer under portrait */}
          <motion.div 
            id="hero-text-yu"
            style={{ 
              x: yuX, 
              opacity: yuOpacity,
              fontFamily: "Impact, 'Arial Black', Haettenschweiler, sans-serif" 
            }}
            className="absolute right-[50%] mr-20 sm:mr-28 md:mr-36 lg:mr-[175px] bottom-4 sm:bottom-8 md:bottom-10 text-[#FF9BB4] font-impact text-[85px] sm:text-[130px] md:text-[170px] lg:text-[210px] leading-none select-none z-0 tracking-tight pointer-events-none"
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
            className="absolute left-[50%] ml-20 sm:ml-28 md:ml-36 lg:ml-[175px] bottom-4 sm:bottom-8 md:bottom-10 text-[#FF9BB4] font-impact text-[85px] sm:text-[130px] md:text-[170px] lg:text-[210px] leading-none select-none z-0 tracking-tight pointer-events-none"
          >
            Liu
          </motion.div>

          {/* 3D Floating Icon 1: Green Folder (Left, above "Yu") with Contextual Magnetic & Badge Cursor */}
          <motion.div 
            id="icon-folder-container"
            data-cursor="foundation"
            data-cursor-text="Foundation"
            onClick={() => onNavigate?.('foundation')}
            whileHover={{ scale: 1.08, rotate: -2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="absolute top-2 sm:top-0 left-2 sm:left-10 md:left-16 w-16 h-16 sm:w-[90px] sm:h-[90px] md:w-[115px] md:h-[115px] z-20 cursor-pointer pointer-events-auto"
            aria-label="Navigate to Foundation page"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate?.('foundation');
              }
            }}
          >
            <img 
              src={folderImg} 
              alt="Instructional Materials Folder" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] select-none"
            />
          </motion.div>

          {/* 3D Floating Icon 2: Analytics & Media Window (Top-Center-Left) - Shifted 2% upwards */}
          <motion.div 
            id="icon-charts-container"
            data-cursor="badge"
            data-cursor-text="Research"
            onClick={() => onNavigate?.('research')}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="absolute -top-12 sm:-top-[72px] md:-top-[92px] left-[30%] sm:left-[33%] -translate-x-1/2 w-16 h-16 sm:w-[90px] sm:h-[90px] md:w-[115px] md:h-[115px] z-20 cursor-pointer pointer-events-auto"
            aria-label="Navigate to Research page"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate?.('research');
              }
            }}
          >
            <img 
              src={chartsImg} 
              alt="Learning Analytics & Video Dashboard" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] select-none"
            />
          </motion.div>

          {/* 3D Floating Icon 3: Open Book & Pencil (Top-Center-Right) - Shifted 2% upwards */}
          <motion.div 
            id="icon-book-container"
            data-cursor="badge"
            data-cursor-text="Design"
            onClick={() => onNavigate?.('design')}
            whileHover={{ scale: 1.08, rotate: 2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="absolute -top-12 sm:-top-[72px] md:-top-[92px] right-[35%] sm:right-[38%] translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 z-20 cursor-pointer pointer-events-auto"
            aria-label="Navigate to Design page"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate?.('design');
              }
            }}
          >
            <img 
              src={bookImg} 
              alt="Learning Foundations Notebook" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] select-none"
            />
          </motion.div>

          {/* 3D Floating Icon 4: Laptop with Stickers (Right, above "Liu") */}
          <motion.div 
            id="icon-laptop-container"
            data-cursor="badge"
            data-cursor-text="Technology"
            onClick={() => onNavigate?.('technology')}
            whileHover={{ scale: 1.08, rotate: -2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="absolute top-2 sm:top-0 right-2 sm:right-10 md:right-16 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 z-20 cursor-pointer pointer-events-auto"
            aria-label="Navigate to Technology page"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate?.('technology');
              }
            }}
          >
            <img 
              src={laptopImg} 
              alt="EdTech & Simulation Laptop" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] select-none"
            />
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
      {/* Shifted vertically upward as a single entity so the white line overlaps the portrait bottom edge */}
      <div className="relative w-full z-20 -mt-[21px] sm:-mt-[24px] md:-mt-[26px] pb-6 pointer-events-none">
        <div className="relative max-w-6xl mx-auto px-4 flex items-center justify-center">
          {/* The clean white horizontal dividing line overlapping portrait's bottom edge */}
          <div 
            id="hero-divider-line"
            className="absolute inset-0 flex items-center" 
            aria-hidden="true"
          >
            <div className="w-full border-t border-white/80" />
          </div>

          {/* "About me" Visual Pill (Clickable trigger that smoothly scrolls down to Experience Section) */}
          <div className="relative z-10 pointer-events-auto">
            <button
              type="button"
              id="about-me-badge"
              data-cursor="magnetic"
              onClick={scrollToExperience}
              className="px-7 sm:px-9 py-2 sm:py-2.5 bg-white hover:bg-slate-100 text-[#1D2440] font-inter font-semibold text-sm sm:text-base rounded-full shadow-lg flex items-center justify-center select-none cursor-pointer transition-all hover:scale-105 active:scale-95 border-none outline-none"
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
            className="text-slate-400 hover:text-white p-1 select-none cursor-pointer transition-colors bg-transparent border-none outline-none"
          >
            <ChevronDown className="w-6 h-6 stroke-current animate-bounce filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
          </button>
        </div>
      </div>
    </section>
  );
};

