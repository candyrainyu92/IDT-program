import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, type MotionValue } from 'motion/react';
import folderImg from '../assets/images/Untitled_Artwork_6.png';
import artworkFolderImg from '../assets/images/Untitled_Artwork_transparent.png';
import gagneImg from '../assets/images/pioneer_gagne_1790044588787.jpg';
import skinnerImg from '../assets/images/pioneer_skinner_real.jpg';
import finnImg from '../assets/images/pioneer_finn_1790044635485.jpg';
import dickImg from '../assets/images/pioneer_dick_1790044618653.jpg';
import jonassenImg from '../assets/images/pioneer_jonassen_1790044644792.jpg';
import siemensImg from '../assets/images/pioneer_siemens_real.jpg';
import tornImg from '../assets/images/torn.png';
import tornJpg from '../assets/images/torn.jpg';
import { PaperTear } from './PaperTear';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FoundationPageProps {
  onBackToHome: () => void;
  onNavigateToWork?: () => void;
  onNavigate?: (sectionId: string) => void;
}

interface BlindTextLineProps {
  cursor: MotionValue<number>;
  idx: number;
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
  exitRetractUp?: boolean;
  children: React.ReactNode;
  className?: string;
}

const BlindTextLine: React.FC<BlindTextLineProps> = ({
  cursor,
  idx,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
  exitRetractUp = false,
  children,
  className = '',
}) => {
  const scaleY = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (idx === 0 && diff <= 0) return 1;
    if (diff < enterStart) return 0;
    if (diff < enterEnd) {
      return (diff - enterStart) / (enterEnd - enterStart);
    }
    if (diff < exitStart) return 1;
    if (diff < exitEnd) {
      return 1 - (diff - exitStart) / (exitEnd - exitStart);
    }
    return 0;
  });

  const opacity = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (idx === 0 && diff <= 0) return 1;
    if (diff < enterStart) return 0;
    if (diff < enterEnd) {
      return (diff - enterStart) / (enterEnd - enterStart);
    }
    if (diff < exitStart) return 1;
    if (diff < exitEnd) {
      return 1 - (diff - exitStart) / (exitEnd - exitStart);
    }
    return 0;
  });

  const rotateX = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (idx === 0 && diff <= 0) return 0;
    if (diff < enterStart) return -32;
    if (diff < enterEnd) {
      const p = (diff - enterStart) / (enterEnd - enterStart);
      return -32 * (1 - p);
    }
    if (diff < exitStart) return 0;
    if (diff < exitEnd) {
      const ep = (diff - exitStart) / (exitEnd - exitStart);
      return exitRetractUp ? 32 * ep : -32 * ep;
    }
    return 0;
  });

  const clipPath = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (idx === 0 && diff <= 0) return 'inset(0% 0% 0% 0%)';
    if (diff < enterStart) return 'inset(0% 0% 100% 0%)';
    if (diff < enterEnd) {
      const p = (diff - enterStart) / (enterEnd - enterStart);
      const bottom = (1 - p) * 100;
      return `inset(0% 0% ${bottom.toFixed(1)}% 0%)`;
    }
    if (diff < exitStart) return 'inset(0% 0% 0% 0%)';
    if (diff < exitEnd) {
      const ep = (diff - exitStart) / (exitEnd - exitStart);
      if (exitRetractUp) {
        // Retracting from bottom up (从下向上消失，像百叶窗一样向上收回)
        const bottom = ep * 100;
        return `inset(0% 0% ${bottom.toFixed(1)}% 0%)`;
      } else {
        // Progressive collapse from top down
        const top = ep * 100;
        return `inset(${top.toFixed(1)}% 0% 0% 0%)`;
      }
    }
    return exitRetractUp ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)';
  });

  return (
    <motion.div
      style={{
        scaleY,
        opacity,
        rotateX,
        clipPath,
        transformOrigin: 'top',
      }}
      className={`overflow-hidden will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface TimelineParallaxRowProps {
  milestone: {
    era: string;
    title: string;
    pioneer: string;
    image: string;
    description: string;
  };
  idx: number;
  cursor: MotionValue<number>;
  step: number;
}

const TimelineParallaxRow: React.FC<TimelineParallaxRowProps> = ({
  milestone,
  idx,
  cursor,
  step,
}) => {
  // Parallax translation velocities:
  // Center photo: 1.0x baseline velocity
  const yCenter = useTransform(cursor, (c) => (idx - c) * step);

  // Left column: stays anchored at the middle photo's horizontal centerline,
  // lingering for a prolonged duration, then handing off like a relay race right before the next row appears
  const yLeft = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (idx === 0 && diff <= 0) return 0;
    if (diff < -0.30) {
      return (diff + 0.30) * -80;
    }
    if (diff <= 0.52) {
      return 0;
    }
    // Subtle upward lift accompanying the Venetian blind retraction
    return (diff - 0.52) * -25;
  });

  // Right column: adopts the exact same stationary lingering and relay-race motion as the left column
  const yRight = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (idx === 0 && diff <= 0) return 0;
    if (diff < -0.30) {
      return (diff + 0.30) * -80;
    }
    if (diff <= 0.52) {
      return 0;
    }
    // Subtle upward lift accompanying the Venetian blind retraction
    return (diff - 0.52) * -25;
  });

  // Center photo brightness:
  // In preview state: black/dark photographic tone (grayscale 100%, brightness ~0.42, contrast 1.25)
  // Photo features, facial details, eyes, hair are clearly visible
  // Ming-An (明暗交替) subtle light-and-dark pulse as user scrolls
  const imgBrightness = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (diff < -1.15) return 0.42;
    if (diff <= -0.32) {
      const wave = Math.sin(diff * Math.PI * 4) * 0.07;
      return 0.42 + wave;
    }
    if (diff < 0) {
      const t = (diff + 0.32) / 0.32;
      return 0.42 + 0.58 * t;
    }
    return 1.0;
  });

  // Center photo opacity:
  // Next row preview: ~0.72 - 0.84 with chiaroscuro depth
  const imgOpacity = useTransform(cursor, (c) => {
    const diff = c - idx;
    if (diff < -1.15) return 0;
    if (diff <= -0.32) {
      const pulse = Math.sin(diff * Math.PI * 4) * 0.07;
      return 0.78 + pulse;
    }
    if (diff < 0) {
      const t = (diff + 0.32) / 0.32;
      return 0.78 + 0.22 * t;
    }
    if (diff <= 0.35) return 1;
    if (diff < 0.85) return 1 - (diff - 0.35) / 0.5;
    return 0;
  });

  const imgFilter = useTransform(imgBrightness, (b) => {
    const t = Math.max(0, Math.min(1, (b - 0.35) / 0.65));
    const gray = 100 - t * 85;
    const contrast = 1.25 - t * 0.20;
    return `brightness(${b}) grayscale(${gray}%) contrast(${contrast})`;
  });

  const rowPointerEvents = useTransform(cursor, (c) => {
    return Math.abs(c - idx) < 0.35 ? 'auto' : 'none';
  });

  return (
    <motion.div 
      className="absolute inset-x-0 top-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-12 items-start"
      style={{
        pointerEvents: rowPointerEvents,
      }}
    >
      {/* Left Column: Subtitles (Centered to the middle image's centerline; Venetian blinds entrance/exit) */}
      <motion.div 
        style={{
          y: yLeft,
        }}
        className="md:col-span-4 h-auto md:h-[168px] lg:h-[192px] flex flex-col justify-center space-y-1 sm:space-y-2 text-left"
      >
        {/* Line 0: Era */}
        <BlindTextLine
          cursor={cursor}
          idx={idx}
          enterStart={-0.28}
          enterEnd={-0.18}
          exitStart={idx === 5 ? 0.88 : 0.60}
          exitEnd={idx === 5 ? 1.08 : 0.70}
          exitRetractUp={true}
        >
          <p 
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            className="text-[#4C4747] text-sm sm:text-base md:text-lg uppercase tracking-wider leading-none"
          >
            {milestone.era}
          </p>
        </BlindTextLine>

        {/* Line 1: Title */}
        <BlindTextLine
          cursor={cursor}
          idx={idx}
          enterStart={-0.22}
          enterEnd={-0.12}
          exitStart={idx === 5 ? 0.84 : 0.56}
          exitEnd={idx === 5 ? 1.04 : 0.66}
          exitRetractUp={true}
        >
          <h3 
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            className="text-[#4C4747] text-lg sm:text-2xl md:text-[1.75rem] leading-tight pt-0.5 sm:pt-1 tracking-wide font-normal"
          >
            {milestone.title}
          </h3>
        </BlindTextLine>

        {/* Line 2: Pioneer */}
        <BlindTextLine
          cursor={cursor}
          idx={idx}
          enterStart={-0.16}
          enterEnd={-0.06}
          exitStart={idx === 5 ? 0.80 : 0.52}
          exitEnd={idx === 5 ? 1.00 : 0.62}
          exitRetractUp={true}
        >
          <p 
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            className="text-[#DC9BB5] text-sm sm:text-lg md:text-xl pt-0.5 tracking-wide font-normal"
          >
            {milestone.pioneer}
          </p>
        </BlindTextLine>
      </motion.div>

      {/* Center Column: Portrait Photo (Black photographic tone on preview, chiaroscuro depth, 1.0x speed) */}
      <motion.div 
        style={{
          y: yCenter,
          opacity: imgOpacity,
        }}
        className="md:col-span-3 flex justify-start md:justify-center my-1 md:my-0"
      >
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-lg border border-[#4C4747]/15 bg-[#E6DEC8] flex-shrink-0 origin-center md:origin-top-right md:scale-[1.2] lg:scale-[1.5] md:-translate-x-[15%] lg:-translate-x-[20%]">
          <motion.img 
            src={milestone.image} 
            alt={milestone.pioneer} 
            referrerPolicy="no-referrer"
            style={{
              filter: imgFilter,
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Right Column: Historical Narrative (Continuous text block with no line breaks; adopts identical lingering & relay-race motion as left column) */}
      <motion.div 
        style={{
          y: yRight,
        }}
        className="md:col-span-5 h-auto md:h-[168px] lg:h-[192px] flex flex-col justify-center text-left"
      >
        <BlindTextLine
          cursor={cursor}
          idx={idx}
          enterStart={-0.22}
          enterEnd={-0.12}
          exitStart={idx === 5 ? 0.84 : 0.56}
          exitEnd={idx === 5 ? 1.04 : 0.66}
          exitRetractUp={true}
        >
          <p className="text-[#4C4747]/90 text-xs sm:text-[13.5px] md:text-sm lg:text-[14.5px] leading-relaxed font-normal">
            {milestone.description}
          </p>
        </BlindTextLine>
      </motion.div>

      {/* Downward bouncing chevron: only on the final milestone, horizontally centered on X-axis, y-axis position unchanged */}
      {idx === 5 && (
        <motion.div
          id="foundation-history-final-chevron"
          style={{
            y: yCenter,
            opacity: imgOpacity,
          }}
          className="col-span-1 md:col-span-12 flex justify-center pointer-events-none mt-2 sm:mt-0"
        >
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-[#9D988F] animate-bounce filter drop-shadow-[0_2px_8px_rgba(76,71,71,0.15)]" />
        </motion.div>
      )}
    </motion.div>
  );
};

interface LearningTheoryItem {
  name: string;
  coreIdea: string;
  designImplication: string;
  keyQuestion: string;
}

const LearningTheoryRow: React.FC<{
  theory: LearningTheoryItem;
  idx: number;
}> = ({ theory, idx }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 88%", "start 46%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1], { clamp: true });
  const opacity = useTransform(smoothProgress, [0, 0.05, 1], [0, 1, 1], { clamp: true });

  return (
    <div 
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start md:items-center"
    >
      {/* Left Theory Name (Vertically centered with right text box) */}
      <div className="md:col-span-4 min-w-0">
        <h3 
          className="text-[#DC9BB5] text-2xl sm:text-3xl md:text-3xl lg:text-[clamp(1.75rem,2.3vw,2.75rem)] xl:text-[2.75rem] font-extrabold tracking-tight whitespace-nowrap"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {theory.name}
        </h3>
      </div>

      {/* Right Structured Breakdown: 0.5px divider at left 10%, text box shrunk 25% from left with fixed right edge */}
      <div className="md:col-span-8 relative">
        {/* Desktop: 0.5px vertical divider at 10% with scroll-driven draw-down animation */}
        <motion.div 
          style={{
            scaleY,
            opacity,
            transformOrigin: 'top',
          }}
          className="hidden md:block absolute left-[10%] top-0 bottom-0 w-[0.5px] bg-[#4C4747]/40 pointer-events-none origin-top" 
          aria-hidden="true"
        />

        {/* Mobile: 0.5px vertical divider at left edge with scroll-driven draw-down animation */}
        <motion.div 
          style={{
            scaleY,
            opacity,
            transformOrigin: 'top',
          }}
          className="md:hidden absolute left-0 top-0 bottom-0 w-[0.5px] bg-[#4C4747]/40 pointer-events-none origin-top" 
          aria-hidden="true"
        />

        {/* Structured text box: right edge fixed, left side shrunk 25% to the right */}
        <div className="pl-4 md:pl-[25%] space-y-4">
          {/* Core Idea */}
          <div>
            <h4 className="text-[#4C4747] font-extrabold text-xs tracking-wider uppercase mb-1">
              CORE IDEA
            </h4>
            <p className="text-[#9D988F] text-sm sm:text-base leading-relaxed">
              {theory.coreIdea}
            </p>
          </div>

          {/* Design Implication */}
          <div>
            <h4 className="text-[#4C4747] font-extrabold text-xs tracking-wider uppercase mb-1">
              DESIGN IMPLICATION
            </h4>
            <p className="text-[#9D988F] text-sm sm:text-base leading-relaxed">
              {theory.designImplication}
            </p>
          </div>

          {/* Key Question */}
          <div>
            <h4 className="text-[#4C4747] font-extrabold text-xs tracking-wider uppercase mb-1">
              KEY QUESTION
            </h4>
            <p className="text-[#9D988F] text-sm sm:text-base italic leading-relaxed">
              {theory.keyQuestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TypingBoldProps {
  children: string;
}

const TypingBold: React.FC<TypingBoldProps> = ({ children }) => {
  const ref = useRef<HTMLElement>(null);
  // Trigger exactly when the element scrolls to the viewport's y-axis midline (50% from bottom)
  const isInView = useInView(ref, { margin: "1000px 0px -50% 0px", once: false });
  const [boldCount, setBoldCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      setBoldCount(0);
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setBoldCount(current);
        if (current >= children.length) {
          clearInterval(interval);
        }
      }, 62);
      return () => clearInterval(interval);
    } else {
      setBoldCount(0);
    }
  }, [isInView, children]);

  return (
    <strong ref={ref} className="inline font-normal">
      {children.split('').map((char, index) => {
        const isBold = index < boldCount;
        return (
          <span
            key={index}
            className={
              isBold
                ? 'font-bold text-[#4C4747] transition-colors duration-200'
                : 'font-normal text-[#9D988F] transition-colors duration-200'
            }
          >
            {char}
          </span>
        );
      })}
    </strong>
  );
};

export const FoundationPage: React.FC<FoundationPageProps> = ({ 
  onBackToHome,
  onNavigateToWork = () => {
    window.location.hash = 'design';
  },
  onNavigate,
}) => {
  // Mouse Parallax Physics for Green Folder Icon
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const parallaxRotateZ = useTransform(smoothX, [-1, 1], [-8, 8]);
  const parallaxRotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const parallaxRotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  const handleFolderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseX.set(Math.max(-1.5, Math.min(1.5, x)));
    mouseY.set(Math.max(-1.5, Math.min(1.5, y)));
  };

  const handleFolderMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll Pinned Animation for Section 2 (What is IDT?)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const definitionTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: defScrollProgress } = useScroll({
    target: definitionTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothDefProgress = useSpring(defScrollProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  });

  // Phase 1: Folder glides across to the right text box along a subtle natural arc (ends at ~0.58)
  const folderArcX = useTransform(smoothDefProgress, [0.05, 0.58], isMobile ? ["0%", "0%"] : ["0%", "117%"]);
  const folderArcY = useTransform(smoothDefProgress, [0.05, 0.32, 0.58], isMobile ? ["0px", "45%", "95%"] : ["0px", "14px", "0px"]);
  const folderArcRotate = useTransform(smoothDefProgress, [0.05, 0.58], ["0deg", "-5deg"]);

  // Phase 2: After folder arrives on the right, right text and green tag fade in as user continues scrolling
  const rightCardOpacity = useTransform(smoothDefProgress, [0.58, 0.82], [0, 1]);
  const rightCardY = useTransform(smoothDefProgress, [0.58, 0.82], ["10px", "0px"]);

  // Dynamic horizontal alignment: Align left column subtitles of Section 3 with Section 2's left blockquote
  const leftQuoteRef = useRef<HTMLQuoteElement>(null);
  const [quoteLeftX, setQuoteLeftX] = useState<number | null>(null);

  useEffect(() => {
    const updateAlignment = () => {
      if (leftQuoteRef.current) {
        if (window.innerWidth >= 768) {
          const rect = leftQuoteRef.current.getBoundingClientRect();
          if (rect.left > 0) {
            setQuoteLeftX(rect.left);
          }
        } else {
          setQuoteLeftX(null);
        }
      }
    };

    updateAlignment();
    window.addEventListener("resize", updateAlignment);
    const t1 = setTimeout(updateAlignment, 150);
    const t2 = setTimeout(updateAlignment, 500);
    const t3 = setTimeout(updateAlignment, 1200);

    return () => {
      window.removeEventListener("resize", updateAlignment);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Scroll Pinned Animation for Section 3 (How did IDT develop?)
  const historyTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: historyScrollProgress } = useScroll({
    target: historyTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothHistoryProgress = useSpring(historyScrollProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // Maps smoothHistoryProgress across the 6 milestones (idx 0 to 5)
  // Progress 0 to 0.04: Gagné at rest
  // Progress 0.04 to 0.88: transitions smoothly through Gagné -> Skinner -> Finn -> Dick & Carey -> Jonassen -> Siemens
  // Progress 0.88 to 1.0: Siemens at rest, then naturally unpins to Section 4
  const historyCursor = useTransform(smoothHistoryProgress, [0.04, 0.88], [0, 5], {
    clamp: true,
  });

  const historyRowStep = isMobile ? 320 : 260;

  const historyMilestones = [
    {
      era: 'WORLD WAR II',
      title: 'Systematic Military Training',
      pioneer: 'Robert M. Gagné',
      image: gagneImg,
      description:
        'World War II created an urgent need to train large numbers of military personnel efficiently and consistently. Psychologists and educators developed systematic training programs using learning research, task analysis, assessment, and instructional materials. Robert Gagné’s military research helped connect learning psychology with instructional design. This period reinforced the idea that instruction could be systematically analyzed, designed, and evaluated.',
    },
    {
      era: '1950s–1960s',
      title: 'Programmed Instruction',
      pioneer: 'B. F. Skinner',
      image: skinnerImg,
      description:
        'The field began exploring programmed instruction and teaching machines as ways to make learning more individualized and systematic. In 1954, B. F. Skinner presented a teaching machine based on principles of operant conditioning, and programmed instruction received growing attention during the late 1950s and early 1960s. The emphasis gradually moved beyond audiovisual equipment toward the design of interactive instructional systems.',
    },
    {
      era: '1963–1970',
      title: 'Audiovisual Communication',
      pioneer: 'James D. Finn',
      image: finnImg,
      description:
        'During the 1960s, the field shifted from audiovisual devices toward a broader view of technology as a process. The 1963 definition emphasized audiovisual communication and the design and use of messages to support learning. James D. Finn further described instructional technology as a way of thinking about instruction, not simply a collection of devices. In 1970, the association adopted the name Association for Educational Communications and Technology (AECT).',
    },
    {
      era: '1970s',
      title: 'Instructional Design Models',
      pioneer: 'Walter Dick & Lou Carey',
      image: dickImg,
      description:
        'During the 1970s, the field increasingly adopted a systems perspective. Instead of viewing instruction as a collection of separate components, designers began examining the relationships among learners, goals, content, instruction, assessment, and context. Walter Dick and Lou Carey formalized a systems approach in The Systematic Design of Instruction, first published in 1978. Their model became an important representation of systematic instructional design.',
    },
    {
      era: '1980s–1990s',
      title: 'Cognitive & Constructivist',
      pioneer: 'David H. Jonassen',
      image: jonassenImg,
      description:
        'During the 1980s and 1990s, cognitive and constructivist perspectives increasingly shaped instructional design, focusing on how learners think and construct knowledge. Technology also began to be viewed as a tool for supporting active learning and thinking. David Jonassen’s work connected constructivism with instructional technology and promoted new approaches to technology-supported learning environments.',
    },
    {
      era: '2000s–Present',
      title: 'Digital & Networked Learning',
      pioneer: 'George Siemens',
      image: siemensImg,
      description:
        'The Internet transformed how learners access information and participate in learning networks. In 2004, George Siemens introduced connectivism, describing learning as connections across people, information, and digital resources. Since then, IDT has continued to evolve with online learning, adaptive technologies, and AI-supported learning environments.',
    },
  ];

  const learningTheories: LearningTheoryItem[] = [
    {
      name: 'Behaviorism',
      coreIdea:
        'Learning is shaped through observable behavior, reinforcement, and environmental conditions.',
      designImplication:
        'Practice, feedback, reinforcement, and clearly defined performance objectives.',
      keyQuestion: '“What should learners be able to do?”',
    },
    {
      name: 'Cognitivism',
      coreIdea:
        'Learning involves internal mental processes through which learners attend to, organize, encode, store, and retrieve information.',
      designImplication:
        'Chunking, scaffolding, organization, retrieval practice, and managing cognitive load.',
      keyQuestion: '“How will learners process and remember this information?”',
    },
    {
      name: 'Constructivism',
      coreIdea:
        'Learners actively construct knowledge and meaning through experience, interaction, problem solving, and reflection.',
      designImplication:
        'Authentic tasks, problem solving, collaboration, inquiry, and learner-centered activities.',
      keyQuestion: '“What can learners do to construct meaning through experience?”',
    },
    {
      name: 'Connectivism',
      coreIdea:
        'Learning can occur through connections among people, information, communities, and digital resources.',
      designImplication:
        'Networked learning, resource curation, social learning, digital environments, and maintaining connections.',
      keyQuestion: '“What connections and resources can support learning beyond the course?”',
    },
  ];

  const reshapingTrends = [
    {
      title: 'AI-Augmented Learning & Design',
      titleLine1: 'AI-Augmented',
      titleLine2: 'Learning & Design',
      body: (
        <>
          Instructional designers increasingly need to consider both how AI can support learning and how AI can be integrated responsibly into the{' '}
          <TypingBold>design process</TypingBold>. This raises questions about accuracy, learner agency, human oversight, accessibility, and ethical use.
        </>
      ),
    },
    {
      title: 'Adaptive & Personalized Learning',
      titleLine1: 'Adaptive & Personalized',
      titleLine2: 'Learning',
      body: (
        <>
          Personalization shifts instructional design from designing one pathway for all learners toward designing{' '}
          <TypingBold>flexible pathways</TypingBold> that respond to learner differences and performance.
        </>
      ),
    },
    {
      title: 'Inclusive & Accessible Learning',
      titleLine1: 'Inclusive & Accessible',
      titleLine2: 'Learning',
      body: (
        <>
          Designers need to consider accessibility, language, prior knowledge, cognitive differences, and{' '}
          <TypingBold>multiple ways</TypingBold> of engaging with and demonstrating learning from the beginning of the design process.
        </>
      ),
    },
    {
      title: 'Competency-Based & Performance-Oriented Learning',
      titleLine1: 'Competency-Based &',
      titleLine2: 'Performance-Oriented Learning',
      body: (
        <>
          This shift places greater emphasis on authentic performance, meaningful assessment, feedback, and alignment between learning goals and{' '}
          <TypingBold>real-world application</TypingBold>.
        </>
      ),
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      bigTitle: 'COLLECT',
      subTitle: 'Gather Resource',
      body: 'I collect IDT resources from coursework, books, research, professional communities, videos, and other sources, and organize them in Notion for future learning.',
    },
    {
      step: '02',
      bigTitle: 'CLASSIFY',
      subTitle: 'Filter & Organize',
      body: 'I evaluate raw materials, retain useful resources, and classify them by areas such as foundations, design, research, trends, and tools.',
    },
    {
      step: '03',
      bigTitle: 'EXPLORE',
      subTitle: 'See the Big Picture',
      body: 'I use NotebookLM to explore unfamiliar areas, identify major concepts and relationships, and develop an initial understanding of the topic.',
    },
    {
      step: '04',
      bigTitle: 'INVESTIGATE',
      subTitle: 'Deep Dive',
      body: 'I closely read key materials in MarginNote, annotate important ideas, create concept cards, and build my IDT terminology base in Notion.',
    },
    {
      step: '05',
      bigTitle: 'SYNTHESIZE',
      subTitle: 'Connect & Reflect',
      body: 'I reconstruct ideas in my own words, compare concepts, make connections across topics, and reflect on my developing understanding.',
    },
    {
      step: '06',
      bigTitle: 'APPLY',
      subTitle: 'Put Knowledge into Practice',
      body: 'I apply what I have learned to instructional design and research projects, using theory and evidence to inform design decisions.',
    },
  ];

  return (
    <motion.div
      id="foundation-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen bg-[#EFE8DC] text-[#4C4747] flex flex-col items-center pt-24 sm:pt-28 pb-0 selection:bg-[#DC9BB5] selection:text-[#4C4747]"
    >
      {/* 1. Page Main Title: "What I learned" split into "What I" (bottom layer), folder icon (middle layer), and "learned" (top layer), proportional across preview and fullscreen */}
      <div 
        id="foundation-title-hero-section"
        className="relative w-full max-w-5xl mx-auto px-6 h-[72vh] min-h-[460px] max-h-[640px] flex flex-col items-center justify-center text-center -translate-y-[6vh]"
      >
        <h1 
          id="foundation-hero-title"
          className="relative inline-flex items-center justify-center select-none flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-0"
        >
          {/* Layer 1: What I (Bottom Layer, z-10) */}
          <span 
            id="foundation-title-what-i"
            className="relative z-10 text-[#DC9BB5] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans mr-2 sm:mr-0"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            What I
          </span>

          {/* Layer 2: Green Folder Icon (Middle Layer, z-20, fly-in landing + floating parallax + interactive mouse parallax) */}
          <motion.div 
            id="foundation-title-folder"
            initial={{ 
              opacity: 0, 
              y: -120, 
              x: -40, 
              scale: 0.5, 
              rotate: -15 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              x: 0, 
              scale: 1, 
              rotate: 24 
            }}
            transition={{ 
              duration: 1.15, 
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] 
            }}
            onMouseMove={handleFolderMouseMove}
            onMouseLeave={handleFolderMouseLeave}
            className="relative z-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-12 translate-x-[13%] translate-y-[12%] w-16 h-16 sm:w-24 sm:h-24 md:w-30 md:h-30 lg:w-34 lg:h-34 pointer-events-auto cursor-pointer filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)] flex-shrink-0 origin-center select-none"
            style={{ perspective: 1000 }}
          >
            {/* Interactive Mouse Parallax Layer (随鼠标晃动而小幅度晃动与倾斜) */}
            <motion.div
              style={{
                x: parallaxX,
                y: parallaxY,
                rotateX: parallaxRotateX,
                rotateY: parallaxRotateY,
                rotateZ: parallaxRotateZ,
                transformStyle: 'preserve-3d',
              }}
              className="w-full h-full"
            >
              {/* Floating Parallax Swaying Loop (左右飘动与悬浮微动) */}
              <motion.div
                animate={{
                  x: [-7, 8, -7],
                  y: [-5, 6, -5],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <img 
                  src={folderImg} 
                  alt="Foundation Stationery Folder" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Layer 3: learned (Top Layer, z-30) */}
          <span 
            id="foundation-title-learned"
            className="relative z-30 text-[#DC9BB5] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            learned
          </span>
        </h1>
      </div>

      {/* 2. Section: "What is Instructional Design & Technology?" (Pinned Scroll Animation Track) */}
      <div 
        ref={definitionTrackRef} 
        id="foundation-definition-scroll-track"
        className="relative w-full h-[220vh] -mt-[14vh]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-14 sm:pt-20 lg:pt-24 overflow-hidden">
          <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 
              id="idt-definition-title"
              className="text-2xl sm:text-4xl md:text-[44px] font-extrabold text-center mb-8 md:mb-12 tracking-tight leading-tight"
            >
              <span className="block text-[#4C4747] mb-2 font-black">What is</span>
              <span className="block text-[#DC9BB5] font-black">Instructional Design &amp; Technology?</span>
            </h2>

            {/* Two Manila Kraft Folder Quote Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch justify-center w-full mx-auto relative">
              
              {/* Left Definition Column */}
              <div className="relative flex items-center justify-start md:-translate-y-[7%]">
                
                {/* Layer 1: Moving Manila Folder Graphic (Moves along arc on scroll) */}
                <motion.div 
                  style={{
                    x: folderArcX,
                    y: folderArcY,
                    rotate: folderArcRotate,
                  }}
                  className="absolute inset-0 z-10 flex items-center justify-start origin-top-left pointer-events-none"
                >
                  <div 
                    className="relative w-full aspect-[3508/2480] origin-center md:origin-top-left scale-100 md:scale-[1.35] md:-translate-x-[25%] filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
                  >
                    <img 
                      src={artworkFolderImg} 
                      alt="Instructional Design & Technology Definition Artwork Folder" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                  </div>
                </motion.div>

                {/* Layer 2: Static Quote Text and Green Badge (Stay in place, do not move) */}
                <div 
                  id="foundation-quote-card-left"
                  className="relative z-20 w-full aspect-[3508/2480] origin-center md:origin-top-left scale-100 md:scale-[1.35] md:-translate-x-[25%]"
                >
                  {/* Text Overlay locked to original coordinates */}
                  <div className="absolute top-[26%] left-[16%] right-[16%] bottom-[22%] flex flex-col justify-start">
                    <blockquote 
                      ref={leftQuoteRef}
                      id="foundation-quote-left-blockquote"
                      className="text-[clamp(11px,1.35vw,18px)] font-bold leading-[1.5] sm:leading-[1.6] tracking-normal font-sans text-[#4C4747] drop-shadow-sm select-text"
                    >
                      “IDT encompasses the analysis of learning and performance problems and the design, development, implementation, evaluation, and management of instructional and non-instructional processes and resources.”
                    </blockquote>
                  </div>

                  {/* Green Tape / Citation Badge locked at bottom right */}
                  <div className="absolute bottom-[10%] right-[12%] translate-x-[10%] rotate-[-10deg] bg-[#6A9F68] text-white font-bold text-[clamp(8.5px,0.9vw,12px)] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm shadow-md border border-[#568754]/80 select-none">
                    Reiser, Carr-Chellman, &amp; Dempsey, 2025
                  </div>
                </div>

              </div>

              {/* Right Definition Card (Yu Liu Definition - Fades in after folder arrives on the right) */}
              <motion.div 
                style={{
                  opacity: rightCardOpacity,
                  y: rightCardY,
                }}
                className="relative z-20 flex flex-col justify-center translate-x-0 md:translate-x-[10%] mt-4 md:mt-0"
              >
                {/* Green "Yu Liu" Tape Tag (Scaled up 10%, 100% opaque solid white text) */}
                <div className="self-start mb-3 sm:mb-4 rotate-[3deg] scale-[1.0] sm:scale-[1.1] origin-left bg-[#6A9F68] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-sm shadow-md border border-[#568754]/80 select-none">
                  <span 
                    className="text-white font-black text-xs sm:text-sm tracking-wide block"
                    style={{ color: '#FFFFFF', opacity: 1 }}
                  >
                    Yu Liu
                  </span>
                </div>

                <div className="relative w-full">
                  <blockquote 
                    id="foundation-quote-card-right-text"
                    className="text-[clamp(14px,1.6vw,23px)] md:text-[23px] font-bold leading-[1.5] sm:leading-[1.6] tracking-normal font-sans text-[#4C4747] translate-y-[2%] md:translate-y-[5%] select-text antialiased"
                  >
                    “I see IDT as a field that integrates research, learning theory, systematic design processes, and appropriate technology to develop evidence-informed solutions for instructional and non-instructional problems, improving learning experiences and performance.”
                  </blockquote>
                </div>
              </motion.div>

            </div>

            {/* Subtle Downward Indicator Chevron */}
            <div className="relative z-30 flex justify-center mt-6 sm:mt-8 translate-y-[190%] pointer-events-none">
              <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-[#9D988F] animate-bounce filter drop-shadow-[0_2px_8px_rgba(76,71,71,0.15)]" />
            </div>
          </section>
        </div>
      </div>

      {/* 3. Section: "How did IDT develop?" - Sticky Pinned Viewport with Multi-layer Parallax Depth */}
      <div 
        ref={historyTrackRef}
        id="foundation-history-scroll-track"
        className="relative w-full h-[450vh] -mt-10"
      >
        <section 
          id="foundation-history-section"
          className="sticky top-0 h-screen w-full flex flex-col justify-start pt-14 sm:pt-20 overflow-hidden translate-y-[5%]"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-10 sm:mb-14 tracking-tight flex-shrink-0 text-[#4C4747]">
            How did <span className="text-[#DC9BB5]">IDT develop?</span>
          </h2>

          {/* Chronological Timeline Grid - 3 Columns with left column flush aligned to previous section blockquote; shifted down 5% from title */}
          <div 
            id="foundation-history-timeline-container"
            style={
              quoteLeftX !== null
                ? { paddingLeft: `${quoteLeftX}px`, paddingRight: `${Math.max(24, quoteLeftX)}px` }
                : undefined
            }
            className="relative w-full flex-1 px-6 sm:px-8 translate-y-[5%]"
          >
            <div className="relative w-full h-full">
              {historyMilestones.map((milestone, idx) => (
                <TimelineParallaxRow 
                  key={idx} 
                  milestone={milestone}
                  idx={idx}
                  cursor={historyCursor}
                  step={historyRowStep}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 4. Section: "How do people learn?" (Shifted upward 15% together with chevron above; left column flush aligned with Section 3 leftmost subtitles) */}
      <section 
        id="foundation-learning-theories-section"
        className="relative w-full mb-28 -translate-y-[15%]"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-20 tracking-tight text-[#4C4747]">
          How do <span className="text-[#DC9BB5]">people learn?</span>
        </h2>

        <div 
          id="foundation-learning-theories-container"
          style={
            quoteLeftX !== null
              ? { paddingLeft: `${quoteLeftX}px`, paddingRight: `${Math.max(24, quoteLeftX)}px` }
              : undefined
          }
          className="w-full px-6 sm:px-8 space-y-20 sm:space-y-24"
        >
          {learningTheories.map((theory, idx) => (
            <LearningTheoryRow 
              key={idx} 
              theory={theory} 
              idx={idx} 
            />
          ))}
        </div>
      </section>

      {/* 5. Section: "What do I believe about learning?" Manila Folder Card */}
      <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 -translate-y-[15%] md:-translate-y-[50%]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: isMobile ? 1.0 : 1.3 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="relative group max-w-2xl mx-auto origin-top"
        >
          
          {/* Green Angled Sticky Label */}
          <div 
            style={{ top: 'calc(-1.25rem + 15%)' }}
            className="absolute right-4 sm:right-8 z-30 rotate-[4deg] bg-[#6A9F68] text-white font-extrabold text-sm sm:text-base px-5 py-2 rounded-sm shadow-xl border border-[#558253]/60 select-none"
          >
            What do I believe about learning?
          </div>

          {/* Manila Folder Container with Untitled_Artwork_transparent.png */}
          <div className="relative w-full flex items-center justify-center select-none">
            {/* Folder Image Artwork */}
            <img 
              src={artworkFolderImg} 
              alt="Manila Folder" 
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain filter drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)] pointer-events-none"
            />

            {/* Folder Text Content positioned on the folder body */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
              <p 
                style={{ transform: 'translate(2%, 3%)' }}
                className="w-[80%] mx-auto text-xs sm:text-sm md:text-base font-bold leading-relaxed tracking-normal font-sans text-justify sm:text-left text-[#4C4747]"
              >
                I believe learning is an active and constructive process. Learners develop deeper understanding by connecting ideas, investigating information, applying knowledge, and reflecting on their experiences. I see learning theories as lenses rather than fixed formulas; different theories can inform different learning needs when applied intentionally. For me, effective learning design begins with understanding the learner, the goals, and the context, and then selecting or combining appropriate approaches to support meaningful learning and performance.
              </p>
            </div>
          </div>

          {/* "View My Work" Button Overlapping Bottom Edge of Folder with Hover Scale, Tilt (-3deg), and Pink Background */}
          <div className="-mt-8 sm:-mt-12 md:-mt-14 ml-4 sm:ml-8 relative z-20">
            <motion.button
              onClick={onNavigateToWork}
              id="foundation-view-work-btn"
              whileHover={{ scale: 1.08, rotate: -3, backgroundColor: "#DC9BB5" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="px-7 py-2.5 bg-[#F7F3EB] text-[#4C4747] border border-[#4C4747]/15 font-inter font-bold text-sm rounded-full shadow-[0_10px_24px_rgba(76,71,71,0.18)] cursor-pointer select-none origin-center"
            >
              View My Work
            </motion.button>
          </div>

        </motion.div>
      </section>

      {/* 6. Dynamic WebGL Paper Tear Transition & 7. Section in #E6DEC8 */}
      <div className="w-full relative">
        {/* Native WebGL Paper Tear Component with diagonal curl, white backside, and fiber edge */}
        <div className="relative z-10 pointer-events-none">
          <PaperTear 
            image={tornJpg}
            color="#EFE8DC"
            background="#E6DEC8"
            edgeOpacity={0.9}
            start={1}
            end={0.12}
            height="90vh"
            fallback={
              <img 
                src={tornImg} 
                alt="Ripped Paper Divider" 
                referrerPolicy="no-referrer"
                className="w-full h-auto block select-none pointer-events-none"
              />
            }
          />
        </div>

        {/* Full-width #E6DEC8 background zone extending to the end of the page */}
        <div className="w-full bg-[#E6DEC8] text-[#4C4747] pt-8 sm:pt-12 pb-8 sm:pb-10 relative z-0">
          <section className="w-full max-w-4xl mx-auto px-6 overflow-visible">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight text-[#4C4747]">
              What is <span className="text-[#DC9BB5]">reshaping IDT now?</span>
            </h2>

            {/* 4 Trends with animated center-expanding divider lines */}
            <div className="space-y-0">
              {reshapingTrends.map((trend, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div className="relative w-full overflow-visible">
                      <motion.div 
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'center' }}
                        className="relative w-full lg:w-[120%] lg:-left-[8.333%] h-px bg-[#4C4747]/20 origin-center"
                      />
                    </div>
                  )}
                  <div 
                    className="min-h-[180px] sm:min-h-[160px] md:min-h-[170px] py-4 md:py-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left Column: Trend Title in Pink */}
                    <div className="md:col-span-5 md:translate-x-0 lg:-translate-x-[10%] xl:-translate-x-[20%] min-w-0">
                      <h3 className="text-[#DC9BB5] font-bold text-[16px] sm:text-[18px] md:text-[17px] lg:text-[19px] xl:text-[20px] leading-snug tracking-tight">
                        {trend.titleLine1 && trend.titleLine2 ? (
                          <>
                            <span className="block whitespace-nowrap">{trend.titleLine1}</span>
                            <span className="block whitespace-nowrap">{trend.titleLine2}</span>
                          </>
                        ) : (
                          trend.title
                        )}
                      </h3>
                    </div>

                    {/* Right Column: Trend Narrative */}
                    <div className="md:col-span-7 md:translate-x-0 lg:translate-x-[10%] xl:translate-x-[20%]">
                      <p className="text-[#4C4747] text-sm sm:text-base leading-relaxed">
                        {trend.body}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* 8. Section: "From Learning Theory to Design Practice" Reflection */}
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-32 sm:mt-40 mb-14 sm:mb-20">
            {/* Section Main Title & Subtitle */}
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-5xl md:text-[46px] font-extrabold tracking-tight text-[#4C4747] mb-3 sm:mb-4">
                From Learning Theory <span className="text-[#DC9BB5]">to Design Practice</span>
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-inter text-[#DC9BB5]">
                Reflection on IDT Foundation
              </h3>
            </div>

            {/* Reflection Text */}
            <div className="max-w-4xl mx-auto text-left">
              <div className="text-base sm:text-lg md:text-xl text-[#4C4747] font-normal leading-relaxed space-y-5 text-left">
                <p>
                  Studying the foundations of IDT taught me to see theories as tools for understanding learning rather than formulas to follow. As I move into professional practice, I want to carry this same habit into my design work—examining evidence, context, and learner needs before making intentional design decisions.
                </p>
                <p>
                  For me, becoming an instructional designer also means becoming an intentional learner. Working with SMEs may require me to enter unfamiliar domains, make sense of large amounts of information, identify what matters, and connect new knowledge before I can design meaningful learning experiences for others.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Actions: Back to Home + Explore Research */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12 sm:mt-14 mb-2">
            <button
              id="foundation-back-home-bottom-btn"
              onClick={onBackToHome}
              className="px-8 py-2.5 bg-[#F7F3EB] text-[#4C4747] border border-[#4C4747]/15 hover:bg-[#EFE8DC] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(76,71,71,0.15)] transition-all cursor-pointer select-none active:scale-95"
            >
              Back To Home
            </button>

            <button
              id="foundation-to-design-btn"
              onClick={() => onNavigate?.('design')}
              className="px-8 py-2.5 bg-[#DC9BB5] hover:bg-[#d188a6] text-[#4C4747] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(76,71,71,0.18)] transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-2"
            >
              <span>Explore Design</span>
              <ArrowRight className="w-4 h-4 text-[#4C4747]" />
            </button>
          </div>
        </div>
      </div>

    </motion.div>
  );
};
