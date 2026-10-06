import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export type CursorMode = 'none' | 'badge' | 'drag';

export const CustomCursor: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('none');
  const [badgeText, setBadgeText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Mouse physical coordinates
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring smoothed coordinates with responsive damping
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Only enable on desktop mouse devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode('none');
        setIsVisible(false);
        return;
      }

      // 1. Check for Badge triggers on the 4 floating icons
      const badgeElem = target.closest('[data-cursor-text], [data-cursor="foundation"], [data-cursor="badge"]') as HTMLElement | null;
      if (badgeElem) {
        const text = badgeElem.getAttribute('data-cursor-text') || 
          (badgeElem.getAttribute('data-cursor') === 'foundation' ? 'Foundation' : 'View');
        setBadgeText(text);
        setMode('badge');
        setIsVisible(true);
        rawX.set(e.clientX);
        rawY.set(e.clientY);
        return;
      }

      // 2. Check for Horizontal Drag triggers
      const dragElem = target.closest('[data-cursor="drag"], [data-drag-area]') as HTMLElement | null;
      if (dragElem) {
        setMode('drag');
        setIsVisible(true);
        rawX.set(e.clientX);
        rawY.set(e.clientY);
        return;
      }

      // Otherwise, remain standard system cursor
      setMode('none');
      setIsVisible(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setMode('none');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rawX, rawY]);

  if (!isVisible || mode === 'none') return null;

  return (
    <motion.div
      id="custom-contextual-cursor"
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* 1. BADGE MODE: Morphs into Pill (Foundation / Research / Design / Technology) */}
      {mode === 'badge' && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 450, damping: 26 }}
          className="px-5 py-2 bg-white text-[#1D2440] font-inter font-medium text-sm rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.45)] border border-white/80 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-none"
        >
          <span>{badgeText || 'Foundation'}</span>
        </motion.div>
      )}

      {/* 2. DRAG MODE: Elongated pill with arrows & "DRAG" */}
      {mode === 'drag' && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 25 }}
          className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#1D2440] font-inter font-bold text-xs tracking-wider rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center gap-2 uppercase cursor-none"
        >
          <span className="text-sm leading-none font-sans">‹</span>
          <span>DRAG</span>
          <span className="text-sm leading-none font-sans">›</span>
        </motion.div>
      )}
    </motion.div>
  );
};
