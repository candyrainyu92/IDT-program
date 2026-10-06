import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface TornPaperStickyRevealProps {
  tornImg: string;
}

export const TornPaperStickyReveal: React.FC<TornPaperStickyRevealProps> = ({ tornImg }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this 220vh scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth physical spring for fluid organic peeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 26,
    mass: 0.6,
    restDelta: 0.001,
  });

  // Base revealed image parallax (subtle vertical shift & scale giving physical depth)
  const baseParallaxY = useTransform(smoothProgress, [0, 1], [-18, 12]);
  const baseScale = useTransform(smoothProgress, [0, 1], [0.97, 1]);

  // Peeling line: moves from tear origin (31%) down to complete peel (105%)
  const peelPercent = useTransform(smoothProgress, [0.08, 0.88], [31.5, 104]);

  // Transform peelPercent to CSS string values
  const peelTopStyle = useTransform(peelPercent, (v) => `${v}%`);

  // Curled paper roll dynamic tilt and tension wobble
  const rollRotate = useTransform(
    smoothProgress,
    [0.08, 0.35, 0.65, 0.88],
    [-0.8, 1.4, -0.6, 0.2]
  );
  const rollScaleX = useTransform(
    smoothProgress,
    [0.08, 0.45, 0.88],
    [0.985, 1.015, 1.0]
  );

  // Cast shadow intensity as paper curls and lifts
  const shadowOpacity = useTransform(smoothProgress, [0.08, 0.2, 0.85, 0.95], [0, 0.85, 0.85, 0]);

  // Scroll hint indicator opacity (fades out as soon as peeling begins)
  const hintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const hintTranslateY = useTransform(smoothProgress, [0, 0.12], [0, 15]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[220vh] -mt-16 sm:-mt-24 pointer-events-auto"
      id="torn-paper-sticky-container"
    >
      {/* Sticky Viewport Track (固定视口层) */}
      <div className="sticky top-[10vh] sm:top-[12vh] w-full flex flex-col items-center justify-center overflow-hidden py-4">
        
        {/* Main Paper Composition Stage */}
        <div className="relative w-full max-w-6xl mx-auto px-4 select-none">

          {/* Floating Sticky Hint (随滑动淡出的交互提示) */}
          <motion.div
            style={{ opacity: hintOpacity, y: hintTranslateY }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-slate-200 pointer-events-none shadow-lg"
          >
            <span>向下滑动撕开纸张 · Scroll to peel & reveal</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF9BB4] animate-bounce" />
          </motion.div>

          {/* Paper Frame with Parallax Layering */}
          <div className="relative w-full overflow-hidden rounded-sm">

            {/* Layer 1 (Bottom / Revealed): The actual torn paper image with dark #2B2B2B texture */}
            <motion.div 
              style={{ y: baseParallaxY, scale: baseScale }}
              className="w-full relative origin-center"
            >
              <img
                src={tornImg}
                alt="Torn Paper Background"
                referrerPolicy="no-referrer"
                className="w-full h-auto block select-none pointer-events-none"
              />
            </motion.div>

            {/* Layer 2 (Top / Cover): Solid #1D2440 Blue paper that covers the #2B2B2B black area */}
            <motion.div
              style={{ top: peelTopStyle }}
              className="absolute left-0 right-0 bottom-0 bg-[#1D2440] z-20 pointer-events-none"
            >
              {/* Subtle top ambient shadow under the curl */}
              <div className="w-full h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
            </motion.div>

            {/* Layer 3 (The Curl & Tear Seam): 3D Rolled Paper Edge (卷边撕纸效果) */}
            <motion.div
              style={{ 
                top: peelTopStyle,
                rotate: rollRotate,
                scaleX: rollScaleX,
              }}
              className="absolute left-0 right-0 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center"
            >
              {/* Jagged fibrous torn fringe (撕裂纤维白边) */}
              <svg 
                viewBox="0 0 1200 20" 
                preserveAspectRatio="none" 
                className="w-full h-3 sm:h-5 text-[#FAF7EE] fill-current drop-shadow-[0_-2px_4px_rgba(0,0,0,0.3)] opacity-95"
              >
                <path d="M0,15 Q30,5 60,14 T120,7 T180,16 T240,6 T300,15 T360,8 T420,17 T480,5 T540,14 T600,6 T660,16 T720,8 T780,18 T840,7 T900,15 T960,6 T1020,16 T1080,7 T1140,15 L1200,9 L1200,20 L0,20 Z" />
              </svg>

              {/* Curled Paper Cylinder Roll (卷起的纸卷实体) */}
              <div className="relative w-full h-7 sm:h-11 rounded-[3px] overflow-hidden shadow-[0_18px_32px_rgba(0,0,0,0.8),0_6px_14px_rgba(0,0,0,0.6)] border-t border-white/20">
                
                {/* 3D Rolled Cylinder Gradient: Blue outer fold + Cream raw fiber underside */}
                <div 
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(180deg, #131A33 0%, #1D2440 25%, #E3DCCF 52%, #FAF6EE 72%, #CDC4B1 100%)',
                  }}
                />

                {/* Cylindrical lighting sheen (纸卷高光立体反光) */}
                <div 
                  className="absolute inset-x-0 top-[45%] h-[20%] pointer-events-none opacity-60"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                  }}
                />

                {/* Subtle paper grain texture simulation */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Deep realistic drop shadow cast downwards onto revealed black paper */}
              <motion.div 
                style={{ opacity: shadowOpacity }}
                className="w-full h-10 -mt-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent blur-sm pointer-events-none"
              />
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
};
