import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import laptopImg from '../assets/images/Untitled_Artwork_3.png';
import tornImg from '../assets/images/torn.png';
import tornJpg from '../assets/images/torn.jpg';
import { PaperTear } from './PaperTear';
import { ArrowLeft, ArrowRight, Home, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface TechnologyPageProps {
  onBackToHome: () => void;
  onNavigate?: (sectionId: string) => void;
}

interface ToolIcon {
  name: string;
  src: string;
  side: 'left' | 'right';
}

interface ToolkitCategory {
  id: string;
  title: string;
  subtitle: string;
  icons: ToolIcon[];
}

interface WorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string;
  aiAssisted?: string;
  output: string;
  offsetY: number;
  rotateDeg: number;
}

const workflowSteps: WorkflowStep[] = [
  {
    step: 'STEP 1',
    title: 'INVESTIGATE',
    subtitle: 'Understand Before Designing',
    description: 'Gather and organize relevant research, client, learner information, raw materials, and evidence to better understand the problem and context.',
    tools: 'Zotero · Excel · PSPP',
    aiAssisted: 'Notebook LM',
    output: 'Research Evidence · Learner Insights · Data Findings',
    offsetY: -16,
    rotateDeg: -2.4,
  },
  {
    step: 'STEP 2',
    title: 'PLAN',
    subtitle: 'Define content & learning flow',
    description: 'Translate raw materials, learner needs, objectives, and project requirements into a clear learning and production plan. Organize content, define the learning flow, and map project tasks and resources.',
    tools: 'Notion · FigJam',
    aiAssisted: 'Gemini · ChatGPT · Claude',
    output: 'Content Structure · Learning Flow · Project Plan',
    offsetY: 18,
    rotateDeg: 2.1,
  },
  {
    step: 'STEP 3',
    title: 'PROTOTYPE',
    subtitle: 'Make Ideas Visible',
    description: 'Turn the learning plan into wireframes and prototypes to explore structure, interface, and interaction before development.',
    tools: 'Figma · Canva · Illustrator',
    aiAssisted: 'Figma maker · Google Stitch',
    output: 'Storyboard · Wireframe · UI Layout · Interactive Prototype',
    offsetY: -12,
    rotateDeg: -1.8,
  },
  {
    step: 'STEP 4',
    title: 'CREATE',
    subtitle: 'Produce learning assets',
    description: 'Create visual and multimedia assets that support the content and learning experience.',
    tools: 'Illustrator · Procreate · Vyond · CapCut · Canva',
    aiAssisted: 'Gemini · ChatGPT · Lovart',
    output: 'Graphics · Illustration · Animation · Video',
    offsetY: 22,
    rotateDeg: 2.6,
  },
  {
    step: 'STEP 5',
    title: 'BUILD',
    subtitle: 'Develop the learning experience',
    description: 'Combine content, media, interactions, and feedback into a functional learning product.',
    tools: 'Storyline · Rise · HTML/CSS/JavaScript · LMS',
    aiAssisted: 'Codex · Google AI Studio',
    output: 'Interactive Module · Responsive Course · Personalized / Adaptive Course',
    offsetY: -18,
    rotateDeg: -2.3,
  },
  {
    step: 'STEP 6',
    title: 'TEST',
    subtitle: 'Check usability and functionality',
    description: 'Preview the product and collect evidence about functionality, usability, clarity, and the learner experience.',
    tools: 'LMS · Forms · Excel · PSPP',
    aiAssisted: 'ChatGPT · Claude',
    output: 'Preview · User testing · QA / Issues / Feedback',
    offsetY: 16,
    rotateDeg: 1.9,
  },
  {
    step: 'STEP 7',
    title: 'REFINE',
    subtitle: 'Improve Through Evidence',
    description: 'Use findings from testing, assessment, and evaluation to revise the content, media, interactions, and overall learning experience.',
    tools: 'Figma · Storyline/Rise · Media Tools · Code Tools',
    aiAssisted: 'Codex · Google AI Studio · Figma · Storyline/Rise · Media Tools',
    output: 'Revised Design · Improved Product',
    offsetY: -14,
    rotateDeg: -2.1,
  },
  {
    step: 'STEP 8',
    title: 'FINAL PRODUCT',
    subtitle: 'Deliver the Experience',
    description: 'Publish and deliver the completed learning experience through an appropriate platform.',
    tools: 'LMS · Web · GitHub · Authoring Platform',
    output: 'Final Learning Experience',
    offsetY: 20,
    rotateDeg: 2.2,
  },
];

const toolDescriptions: Record<string, string> = {
  'Figma': 'UI design / wireframing / prototyping / interaction design',
  'Canva': 'storyboard / presentations / learning materials / Brochure / Flyer / Graphics',
  'Illustrator': 'vector graphics / custom visual elements / diagrams / icons',
  'Articulate Rise': 'Responsive web-based learning',
  'Storyline': 'Interactive e-learning development',
  'Vibe Coding': 'Custom web learning experiences and interactions',
  'Procreate': 'layout / illustration',
  'Vyond': 'Animation',
  'CapCut': 'Video edting',
  'Capcut': 'Video edting',
  'PSPP': 'Statistical analysis',
  'Excel': 'Data organization & analysis',
  'Zotero': 'Reference management / literature organization / citation management',
  'Notion': 'Knowledge & Project Management',
  'Canvas LMS': 'Learning & Content Management',
  'Canvas': 'Learning & Content Management',
  'GitHub': 'Development & Version Management',
  'Google AI Studio': 'Rapid prototyping & multimodal AI exploration',
  'Claude': 'Complex reasoning & prompt engineering',
  'Codex': 'AI-assisted coding & automation',
  'NotebookLM': 'Source-grounded AI synthesis & note-taking',
};

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ 
  onBackToHome, 
  onNavigate 
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activePopupTool, setActivePopupTool] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.tool-popup-container') && !target.closest('.group\\/tool')) {
        setActivePopupTool(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopupTool(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Mouse Parallax Physics for Technology Laptop Icon (exact same as Foundation's folder & Research's charts)
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

  const handleIconMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseX.set(Math.max(-1.5, Math.min(1.5, x)));
    mouseY.set(Math.max(-1.5, Math.min(1.5, y)));
  };

  const handleIconMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toolkitCategories: ToolkitCategory[] = [
    {
      id: 'design',
      title: 'Design',
      subtitle: 'Plan & Prototype',
      icons: [
        { name: 'Figma', src: '/Icons/Figma.png', side: 'left' },
        { name: 'Canva', src: '/Icons/canva.webp', side: 'right' },
        { name: 'Illustrator', src: '/Icons/adobe-illustrator_ve5c.1200.webp', side: 'right' },
      ],
    },
    {
      id: 'build',
      title: 'Build',
      subtitle: 'Develop Learning experience',
      icons: [
        { name: 'Articulate Rise', src: '/Icons/articulate360.png', side: 'left' },
        { name: 'Storyline', src: '/Icons/storyline.png', side: 'left' },
        { name: 'Vibe Coding', src: '/Icons/html.png', side: 'right' },
      ],
    },
    {
      id: 'create',
      title: 'Create',
      subtitle: 'Produce Media',
      icons: [
        { name: 'Procreate', src: '/Icons/Procreate_icon.png', side: 'left' },
        { name: 'Vyond', src: '/Icons/vyond.png', side: 'right' },
        { name: 'CapCut', src: '/Icons/capcut.jpeg', side: 'right' },
      ],
    },
    {
      id: 'research',
      title: 'Research & Analyze',
      subtitle: 'Turn Data Into Insight',
      icons: [
        { name: 'Zotero', src: '/Icons/Zotero.png', side: 'left' },
        { name: 'PSPP', src: '/Icons/PSPP.png', side: 'right' },
        { name: 'Excel', src: '/Icons/excel.png', side: 'right' },
      ],
    },
    {
      id: 'manage',
      title: 'Manage',
      subtitle: 'Organize & Coordinate',
      icons: [
        { name: 'Canvas LMS', src: '/Icons/canvas.png', side: 'left' },
        { name: 'Notion', src: '/Icons/notion.png', side: 'left' },
        { name: 'GitHub', src: '/Icons/Github.webp', side: 'right' },
      ],
    },
    {
      id: 'ai',
      title: 'AI-Assisted',
      subtitle: 'RAPID DEVELOPMENT',
      icons: [
        { name: 'Google AI Studio', src: '/Icons/Google-AI-Studio.webp', side: 'left' },
        { name: 'Claude', src: '/Icons/claude.png', side: 'left' },
        { name: 'Codex', src: '/Icons/codex.webp', side: 'right' },
        { name: 'NotebookLM', src: '/Icons/notebookLM.png', side: 'right' },
      ],
    },
  ];

  return (
    <motion.div
      id="technology-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen bg-[#1D2440] text-white flex flex-col items-center pt-24 sm:pt-28 pb-0 selection:bg-[#FF9BB4] selection:text-[#1D2440]"
    >
      {/* 1. Page Main Title: "How I build" split into "How I" (bottom layer), laptop icon (middle layer), and "build" (top layer) */}
      <div 
        id="technology-title-hero-section"
        className="relative w-full max-w-5xl mx-auto px-6 h-[72vh] min-h-[460px] max-h-[640px] flex flex-col items-center justify-center text-center -translate-y-[6vh]"
      >
        <h1 
          id="technology-hero-title"
          className="relative inline-flex items-center justify-center select-none flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-0"
        >
          {/* Layer 1: How I (Bottom Layer, z-10) */}
          <span 
            id="technology-title-how-i"
            className="relative z-10 text-[#FF9BB4] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans mr-2 sm:mr-0"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            How I
          </span>

          {/* Layer 2: Laptop Icon (Middle Layer, z-20, fly-in landing + floating parallax + interactive mouse parallax) */}
          <motion.div 
            id="technology-title-laptop"
            initial={{ 
              opacity: 0, 
              y: -120, 
              x: -40, 
              scale: 0.5, 
              rotate: -10 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              x: 0, 
              scale: 1, 
              rotate: 6 
            }}
            transition={{ 
              duration: 1.15, 
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] 
            }}
            onMouseMove={handleIconMouseMove}
            onMouseLeave={handleIconMouseLeave}
            className="relative z-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-12 translate-x-[13%] translate-y-[12%] w-16 h-16 sm:w-24 sm:h-24 md:w-30 md:h-30 lg:w-34 lg:h-34 pointer-events-auto cursor-pointer filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)] flex-shrink-0 origin-center select-none"
            style={{ perspective: 1000 }}
          >
            {/* Interactive Mouse Parallax Layer (Tilted slightly with mouse physics) */}
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
              {/* Floating Parallax Swaying Loop (Gentle organic floating) */}
              <motion.div
                animate={{
                  x: [-6, 6, -6],
                  y: [-4, 5, -4],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <img 
                  src={laptopImg} 
                  alt="EdTech & Simulation Laptop" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Layer 3: build (Top Layer, z-30) */}
          <span 
            id="technology-title-build"
            className="relative z-30 text-[#FF9BB4] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            build
          </span>
        </h1>
      </div>

      {/* 2. Subtitle Section: "My Technology Toolkit" & intro text centered, shifted down 10% */}
      <section 
        id="technology-toolkit-intro-section" 
        className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 mt-0 sm:mt-0 mb-12 sm:mb-16 z-10 translate-y-[10%]"
      >
        <div className="flex flex-col items-center justify-center text-center mx-auto w-full translate-y-[10%]">
          {/* Subtitle: "My Technology Toolkit" centered */}
          <h2 
            id="technology-toolkit-title"
            className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-3 sm:mb-4 text-center"
          >
            <span className="text-white font-black">My Technology </span>
            <span className="text-[#FF9BB4] font-black">Toolkit</span>
          </h2>

          {/* Text paragraph: Centered, Inter font, 20px, single line */}
          <p 
            id="technology-toolkit-description"
            className="text-white text-[20px] font-normal leading-relaxed text-center whitespace-nowrap max-w-none mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px' }}
          >
            Turning design decisions into learning experiences through purposeful technology.
          </p>
        </div>
      </section>

      {/* 3. Interactive Category Showcase:
          Centered on screen, default Impact font, hover switches font to Inter,
          pulls neighboring titles apart to focus the primary title, and renders
          the corresponding icons flanking the center title on both sides.
      */}
      <section 
        id="technology-interactive-categories-section"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6 flex flex-col items-center justify-center relative z-20"
      >
        <div className="w-full flex flex-col items-center relative py-1 sm:py-1.5 -translate-y-[3%]">
          {toolkitCategories.map((cat) => {
            const isHovered = hoveredCategory === cat.id || (activePopupTool !== null && cat.icons.some(i => i.name === activePopupTool));
            const leftIcons = cat.icons.filter((icon) => icon.side === 'left');
            const rightIcons = cat.icons.filter((icon) => icon.side === 'right');

            return (
              <motion.div
                key={cat.id}
                layout
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => {
                  setHoveredCategory(null);
                  setActivePopupTool(null);
                }}
                onClick={() => setHoveredCategory(isHovered ? null : cat.id)}
                className={`w-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none ${
                  isHovered
                    ? 'py-4 sm:py-6 my-1.5 sm:my-2 z-30'
                    : hoveredCategory
                    ? 'py-0.5 sm:py-1 opacity-30 blur-[0.3px]'
                    : 'py-1 sm:py-1.5 opacity-90 hover:opacity-100'
                }`}
              >
                {/* 3-Part Flanking Layout: Symmetrically Balanced 1fr Auto 1fr to Lock Middle Title dead-center */}
                <div className="w-full max-w-6xl xl:max-w-7xl grid grid-cols-[1fr_auto_1fr] items-center">
                  
                  {/* Left Flanking Icons (grows outwards to the left without shifting center) */}
                  <div className={`flex items-center justify-end pr-2.5 sm:pr-5 md:pr-7 lg:pr-9 transition-all duration-300 ${
                    isHovered ? 'min-h-[65px] sm:min-h-[82px] md:min-h-[110px] lg:min-h-[135px]' : 'min-h-0 h-auto'
                  }`}>
                    <AnimatePresence mode="popLayout">
                      {isHovered && (
                        <motion.div 
                          key={`left-icons-${cat.id}`}
                          initial={{ opacity: 0, x: -30, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -20, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 380, damping: 26 }}
                          className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                        >
                          {leftIcons.map((icon, i) => {
                            const isPopupOpen = activePopupTool === icon.name;
                            return (
                              <motion.div
                                key={icon.name}
                                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1, 
                                  rotate: (i % 2 === 0 ? -2 : 3) 
                                }}
                                transition={{ delay: i * 0.05, duration: 0.25 }}
                                onMouseEnter={() => setActivePopupTool(icon.name)}
                                onMouseLeave={() => setActivePopupTool(null)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePopupTool(isPopupOpen ? null : icon.name);
                                }}
                                data-cursor="click"
                                className="relative flex flex-col items-center group/tool cursor-pointer"
                              >
                                {/* Green Tag Popup matching Research "Same problem. Different purpose..." */}
                                <AnimatePresence>
                                  {isPopupOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.85, y: 12, rotate: -2 }}
                                      animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
                                      exit={{ opacity: 0, scale: 0.85, y: 8, transition: { duration: 0.15 } }}
                                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute bottom-full mb-3 z-50 pointer-events-auto tool-popup-container left-0 sm:left-1/2 sm:-translate-x-1/2 w-max max-w-[280px] sm:max-w-[340px] md:max-w-[380px] filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
                                    >
                                      <div className="relative bg-[#6A9F68] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg shadow-xl border border-[#568754] select-none text-left leading-snug">
                                        <div className="flex items-start justify-between gap-2.5 mb-1">
                                          <span className="font-black text-white text-xs sm:text-sm tracking-wide uppercase">
                                            {icon.name}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActivePopupTool(null);
                                            }}
                                            aria-label="Close"
                                            className="w-4 h-4 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center text-xs leading-none transition-colors"
                                          >
                                            ×
                                          </button>
                                        </div>
                                        <p className="font-medium text-white/95 text-xs sm:text-[13px] leading-relaxed break-words font-sans">
                                          {toolDescriptions[icon.name] || 'Custom learning technology tool'}
                                        </p>

                                        {/* Downward triangle indicator pointing to the icon */}
                                        <div className="absolute top-full left-8 sm:left-1/2 sm:-translate-x-1/2 border-[6px] border-transparent border-t-[#6A9F68]" />
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {/* Mobile App Icon Squircle Container - Enlarged by 50% */}
                                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] lg:w-[126px] lg:h-[126px] aspect-square rounded-[22%] bg-gradient-to-b from-[#2A355A] to-[#1C2340] border ${
                                  isPopupOpen ? 'border-[#6A9F68] ring-2 ring-[#6A9F68] -translate-y-2 shadow-[0_0_24px_rgba(106,159,104,0.6)]' : 'border-white/30'
                                } p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/20 overflow-hidden group-hover/tool:scale-110 group-hover/tool:-translate-y-2 group-hover/tool:shadow-[0_20px_42px_rgba(0,0,0,0.7),0_0_28px_rgba(255,155,180,0.4)] group-hover/tool:border-[#FF9BB4]/80 transition-all duration-300`}>
                                  <img 
                                    src={icon.src} 
                                    alt={icon.name} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none rounded-[16%]" 
                                  />
                                  {/* Mobile App Icon Glossy Specular Light Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/15 pointer-events-none rounded-[22%]" />
                                </div>
                                <span className={`text-xs sm:text-[13px] md:text-sm ${
                                  isPopupOpen ? 'text-[#A1DC9E] font-bold' : 'text-slate-200 font-medium opacity-85 group-hover/tool:opacity-100 group-hover/tool:text-white'
                                } mt-2 tracking-tight whitespace-nowrap transition-colors text-center`}>
                                  {icon.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dead-Center Category Title & Subtitle (Rock solid 50% midpoint anchoring, zero lateral shift) */}
                  <div className="flex flex-col items-center justify-center text-center px-3.5 sm:px-5 md:px-7 min-w-[260px] sm:min-w-[340px] md:min-w-[420px] lg:min-w-[480px]">
                    <span
                      className={`leading-none transition-all duration-200 ${
                        isHovered
                          ? 'text-white text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] tracking-tight font-extrabold'
                          : 'text-white/95 text-3xl sm:text-4xl md:text-[44px] lg:text-5xl uppercase tracking-wider font-normal'
                      }`}
                      style={{
                        fontFamily: isHovered
                          ? "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                          : "Impact, 'Arial Black', -apple-system, sans-serif",
                      }}
                    >
                      {cat.title}
                    </span>
                    
                    <span
                      className={`mt-1 sm:mt-1.5 transition-all duration-200 ${
                        isHovered
                          ? 'text-[#FF9BB4] text-sm sm:text-base md:text-lg font-semibold tracking-normal'
                          : 'text-white/60 text-xs sm:text-sm md:text-base uppercase tracking-widest font-normal'
                      }`}
                      style={{
                        fontFamily: isHovered
                          ? "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                          : "Impact, 'Arial Black', -apple-system, sans-serif",
                      }}
                    >
                      {cat.subtitle}
                    </span>
                  </div>

                  {/* Right Flanking Icons (grows outwards to the right without shifting center) */}
                  <div className={`flex items-center justify-start pl-2.5 sm:pl-5 md:pl-7 lg:pl-9 transition-all duration-300 ${
                    isHovered ? 'min-h-[65px] sm:min-h-[82px] md:min-h-[110px] lg:min-h-[135px]' : 'min-h-0 h-auto'
                  }`}>
                    <AnimatePresence mode="popLayout">
                      {isHovered && (
                        <motion.div 
                          key={`right-icons-${cat.id}`}
                          initial={{ opacity: 0, x: 30, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 20, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 380, damping: 26 }}
                          className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                        >
                          {rightIcons.map((icon, i) => {
                            const isPopupOpen = activePopupTool === icon.name;
                            return (
                              <motion.div
                                key={icon.name}
                                initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1, 
                                  rotate: (i % 2 === 0 ? 2 : -3) 
                                }}
                                transition={{ delay: i * 0.05, duration: 0.25 }}
                                onMouseEnter={() => setActivePopupTool(icon.name)}
                                onMouseLeave={() => setActivePopupTool(null)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePopupTool(isPopupOpen ? null : icon.name);
                                }}
                                data-cursor="click"
                                className="relative flex flex-col items-center group/tool cursor-pointer"
                              >
                                {/* Green Tag Popup matching Research "Same problem. Different purpose..." */}
                                <AnimatePresence>
                                  {isPopupOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.85, y: 12, rotate: 1 }}
                                      animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
                                      exit={{ opacity: 0, scale: 0.85, y: 8, transition: { duration: 0.15 } }}
                                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute bottom-full mb-3 z-50 pointer-events-auto tool-popup-container right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-max max-w-[280px] sm:max-w-[340px] md:max-w-[380px] filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
                                    >
                                      <div className="relative bg-[#6A9F68] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg shadow-xl border border-[#568754] select-none text-left leading-snug">
                                        <div className="flex items-start justify-between gap-2.5 mb-1">
                                          <span className="font-black text-white text-xs sm:text-sm tracking-wide uppercase">
                                            {icon.name}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActivePopupTool(null);
                                            }}
                                            aria-label="Close"
                                            className="w-4 h-4 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center text-xs leading-none transition-colors"
                                          >
                                            ×
                                          </button>
                                        </div>
                                        <p className="font-medium text-white/95 text-xs sm:text-[13px] leading-relaxed break-words font-sans">
                                          {toolDescriptions[icon.name] || 'Custom learning technology tool'}
                                        </p>

                                        {/* Downward triangle indicator pointing to the icon */}
                                        <div className="absolute top-full right-8 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 border-[6px] border-transparent border-t-[#6A9F68]" />
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {/* Mobile App Icon Squircle Container - Enlarged by 50% */}
                                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] lg:w-[126px] lg:h-[126px] aspect-square rounded-[22%] bg-gradient-to-b from-[#2A355A] to-[#1C2340] border ${
                                  isPopupOpen ? 'border-[#6A9F68] ring-2 ring-[#6A9F68] -translate-y-2 shadow-[0_0_24px_rgba(106,159,104,0.6)]' : 'border-white/30'
                                } p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/20 overflow-hidden group-hover/tool:scale-110 group-hover/tool:-translate-y-2 group-hover/tool:shadow-[0_20px_42px_rgba(0,0,0,0.7),0_0_28px_rgba(255,155,180,0.4)] group-hover/tool:border-[#FF9BB4]/80 transition-all duration-300`}>
                                  <img 
                                    src={icon.src} 
                                    alt={icon.name} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none rounded-[16%]" 
                                  />
                                  {/* Mobile App Icon Glossy Specular Light Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/15 pointer-events-none rounded-[22%]" />
                                </div>
                                <span className={`text-xs sm:text-[13px] md:text-sm ${
                                  isPopupOpen ? 'text-[#A1DC9E] font-bold' : 'text-slate-200 font-medium opacity-85 group-hover/tool:opacity-100 group-hover/tool:text-white'
                                } mt-2 tracking-tight whitespace-nowrap transition-colors text-center`}>
                                  {icon.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Workflow Section: From Tools to Product */}
      <section 
        id="technology-workflow-section"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 mb-16 relative z-20"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mx-auto mb-6 sm:mb-10">
          <h2 
            id="from-tools-to-product-title"
            className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-2 sm:mb-3 text-center"
          >
            <span className="text-white font-black">From Tools to </span>
            <span className="text-[#FF9BB4] font-black">Product</span>
          </h2>

          <p 
            id="from-tools-to-product-subtitle"
            className="text-white text-[20px] font-normal leading-relaxed text-center max-w-3xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px' }}
          >
            Tools are selected as needed by the project.
          </p>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3 mt-5 sm:mt-7">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest px-2">
              8-Step Workflow
            </span>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally Arranged Overlapping & Staggered Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto overflow-y-visible py-12 px-6 sm:px-12 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent select-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex flex-row flex-nowrap items-center min-w-max pb-8 pt-6 -translate-y-[10%]">
            {workflowSteps.map((step, idx) => {
              const isHovered = hoveredCardIdx === idx;
              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  style={{
                    transform: isHovered 
                      ? 'translateY(0px) rotate(0deg) scale(1.04)' 
                      : `translateY(${step.offsetY}px) rotate(${step.rotateDeg}deg) scale(1)`,
                    zIndex: isHovered ? 40 : 10 + idx,
                  }}
                  className={`relative w-[300px] sm:w-[335px] shrink-0 rounded-2xl p-6 sm:p-7 transition-all duration-300 ease-out cursor-pointer -mr-6 sm:-mr-8 md:-mr-10 last:mr-0 ${
                    isHovered
                      ? 'bg-gradient-to-b from-[#2F3B66] to-[#1E2545] border-2 border-[#FF9BB4] shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(255,155,180,0.35)]'
                      : 'bg-gradient-to-b from-[#242D4D]/95 to-[#192038]/95 border border-white/20 shadow-[0_16px_36px_rgba(0,0,0,0.5)] backdrop-blur-md hover:border-white/40'
                  }`}
                >
                  {/* Top Step Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9BB4]/15 border border-[#FF9BB4]/35 text-[#FF9BB4] text-xs font-black tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF9BB4]" />
                      {step.step}
                    </span>

                    <span className="text-[11px] font-semibold text-white/50 tracking-widest uppercase">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-[26px] font-black tracking-tight text-white leading-none mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] font-semibold text-[#FF9BB4] uppercase tracking-wide mb-3.5">
                    {step.subtitle}
                  </p>

                  {/* Divider line */}
                  <div className="w-full h-px bg-white/10 mb-3.5" />

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed mb-5 min-h-[66px]">
                    {step.description}
                  </p>

                  {/* Metadata Chips: Tools, AI-Assisted, Output */}
                  <div className="space-y-3 pt-1 border-t border-white/10">
                    {/* TOOLS */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
                        TOOLS
                      </span>
                      <div className="text-xs font-medium text-slate-100 bg-white/[0.07] border border-white/10 rounded-lg px-2.5 py-1.5 leading-relaxed">
                        {step.tools}
                      </div>
                    </div>

                    {/* AI-ASSISTED */}
                    {step.aiAssisted && (
                      <div>
                        <span className="text-[10px] font-bold text-[#A1DC9E] tracking-wider uppercase block mb-1">
                          AI-ASSISTED
                        </span>
                        <div className="text-xs font-medium text-emerald-100 bg-[#6A9F68]/20 border border-[#6A9F68]/40 rounded-lg px-2.5 py-1.5 leading-relaxed">
                          {step.aiAssisted}
                        </div>
                      </div>
                    )}

                    {/* OUTPUT */}
                    <div>
                      <span className="text-[10px] font-bold text-[#FF9BB4] tracking-wider uppercase block mb-1">
                        OUTPUT
                      </span>
                      <div className="text-xs font-semibold text-pink-100 bg-[#FF9BB4]/15 border border-[#FF9BB4]/35 rounded-lg px-2.5 py-1.5 leading-relaxed">
                        {step.output}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Dynamic WebGL Paper Tear Transition */}
      <div className="w-full relative bg-[#2B2B2B] mt-12 sm:mt-16 overflow-hidden">
        <div className="w-full">
          <PaperTear 
            image={tornJpg}
            color="#1D2440"
            background="#2B2B2B"
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

        {/* Full-width #2B2B2B background zone for Tools follow Purpose */}
        <div 
          className="w-full bg-[#2B2B2B] text-white pt-8 sm:pt-12 pb-8 sm:pb-10 relative -mt-16 sm:-mt-24"
        >
          <section 
            id="technology-tools-follow-purpose-section"
            className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12"
          >
            {/* Title: Tools follow Purpose */}
            <h2 
              id="tools-follow-purpose-title"
              className="text-3xl sm:text-5xl md:text-[52px] font-black text-center mb-10 sm:mb-14 tracking-tight leading-tight"
              style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
            >
              Tools follow <span className="text-[#FF9BB4]">Purpose</span>
            </h2>

            {/* Text Box, Inter font, 20px */}
            <div className="max-w-4xl mx-auto">
              <div 
                className="bg-white/[0.05] border border-white/15 rounded-2xl py-8 px-7 sm:px-12 shadow-xl space-y-6 text-slate-100 font-normal leading-relaxed text-left"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <p className="text-[17px] sm:text-[19px] md:text-[20px] leading-relaxed">
                  Learning new technologies has expanded what I can create, but it has also taught me that knowing how to use a tool is different from knowing when and why to use it. Effective technology use begins with the learner and the design need, not with the tool itself.
                </p>
                <p className="text-[17px] sm:text-[19px] md:text-[20px] leading-relaxed">
                  As an instructional designer, I want to continue exploring new technologies while evaluating how each one can support learning, improve the design process, and solve specific problems. My goal is not to use more technology, but to use the right technology with purpose.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Bottom Navigation Buttons */}
          <section 
            id="technology-bottom-nav-section"
            className="w-full max-w-4xl mx-auto px-6 mt-12 sm:mt-14 mb-2 flex flex-wrap items-center justify-center gap-4 z-10"
          >
            <button
              id="technology-to-design-btn"
              onClick={() => onNavigate?.('design')}
              className="px-8 py-2.5 bg-[#FF9BB4] hover:bg-[#ff85a3] text-[#1D2440] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-[#1D2440]" />
              <span>Explore Design</span>
            </button>

            <button
              id="technology-back-home-bottom-btn"
              onClick={onBackToHome}
              className="px-8 py-2.5 bg-white text-[#1D2440] hover:bg-slate-100 font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95"
            >
              Back To Home
            </button>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
