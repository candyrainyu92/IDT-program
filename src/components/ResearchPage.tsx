import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'motion/react';
import chartsImg from '../assets/images/Untitled_Artwork_2.png';
import tornImg from '../assets/images/torn.png';
import tornJpg from '../assets/images/torn.jpg';
import letterImg from '../assets/images/let.png';
import { PaperTear } from './PaperTear';
import { BookScroll } from './BookScroll';
import { caseStudies } from '../data/portfolioData';
import { 
  ArrowLeft,
  ArrowDown, 
  RotateCw, 
  CheckCircle2, 
  Search, 
  Wrench, 
  BarChart3, 
  Users, 
  FileText, 
  Sparkles, 
  Layers,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Mic,
  Percent,
  Hash,
  Quote,
  X,
  ExternalLink,
  ArrowUpRight,
  Download,
  Eye
} from 'lucide-react';

interface ResearchPageProps {
  onBackToHome: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ 
  onBackToHome, 
  onNavigate 
}) => {
  const [evidenceView, setEvidenceView] = useState<'cards' | 'table'>('cards');
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [activeDocumentType, setActiveDocumentType] = useState<'proposal' | 'data-analysis' | 'report' | 'slides'>('proposal');
  const [activeWorksheetSection, setActiveWorksheetSection] = useState<string>('worksheet-sec-1');
  const [activeAnalysisSection, setActiveAnalysisSection] = useState<string>('da-sec-overview');
  const [activeReportSection, setActiveReportSection] = useState<string>('report-sec-abstract');
  const [activeSlideSection, setActiveSlideSection] = useState<string>('slide-1');
  const [activeGalleryProjectId, setActiveGalleryProjectId] = useState<string>('interactive-microlearning');
  const framingContainerRef = useRef<HTMLDivElement>(null);
  const [framingAlignOffset, setFramingAlignOffset] = useState<number | null>(null);

  const worksheetSections = [
    { id: 'worksheet-sec-1', label: '1. Title' },
    { id: 'worksheet-sec-2', label: '2. Introduction' },
    { id: 'worksheet-sec-3', label: '3. Research Questions' },
    { id: 'worksheet-sec-4', label: '4. Literature Review' },
    { id: 'worksheet-sec-5', label: '5. Methodology' },
    { id: 'worksheet-sec-6', label: '6. Ethical Considerations' },
    { id: 'worksheet-sec-7', label: '7. Timeline & Resources' },
    { id: 'worksheet-sec-8', label: '8. Expected Outcomes' },
    { id: 'worksheet-sec-9', label: '9. References' },
  ];

  const analysisSections = [
    { id: 'da-sec-overview', label: 'Overview' },
    { id: 'da-sec-methods', label: 'Statistical Methods' },
    { id: 'da-sec-diagnostics', label: 'Assumption Diagnostics' },
    { id: 'da-sec-tools', label: 'Software Tools' },
    { id: 'da-sec-references', label: 'References' },
  ];

  const reportSections = [
    { id: 'report-sec-abstract', label: 'Abstract & Overview' },
    { id: 'report-sec-intro', label: '1. Introduction' },
    { id: 'report-sec-questions', label: '2. Research Questions' },
    { id: 'report-sec-methods', label: '3. Methodology & RCT' },
    { id: 'report-sec-stats', label: '4. Statistical Analysis' },
    { id: 'report-sec-results', label: '5. Empirical Results' },
    { id: 'report-sec-discussion', label: '6. Discussion' },
    { id: 'report-sec-implications', label: '7. Implications' },
    { id: 'report-sec-references', label: '8. References' },
  ];

  const slideSections = [
    { id: 'slide-1', label: '1. Title & Overview' },
    { id: 'slide-2', label: '2. Feedback Bottleneck' },
    { id: 'slide-3', label: '3. Theoretical Framework' },
    { id: 'slide-4', label: '4. Research Question' },
    { id: 'slide-5', label: '5. RCT Study Design' },
    { id: 'slide-6', label: '6. Data Analysis' },
    { id: 'slide-7', label: '7. Primary Outcome' },
    { id: 'slide-8', label: '8. Grammar & Revision' },
    { id: 'slide-9', label: '9. Intermediate Learners' },
    { id: 'slide-10', label: '10. Cognitive Mechanism' },
    { id: 'slide-11', label: '11. Strategic Playbook' },
  ];

  const handleGalleryClick = (projectId?: string) => {
    if (projectId === 'methodology') {
      setActiveDocumentType('data-analysis');
      setActiveAnalysisSection('da-sec-overview');
    } else if (projectId === 'evidence' || projectId === 'final-report' || projectId === 'report') {
      setActiveDocumentType('report');
      setActiveReportSection('report-sec-abstract');
    } else if (projectId === 'letter-all' || projectId === 'slides') {
      setActiveDocumentType('slides');
      setActiveSlideSection('slide-1');
    } else {
      setActiveDocumentType('proposal');
      setActiveWorksheetSection('worksheet-sec-1');
    }
    setIsLetterModalOpen(true);
  };

  // Scroll-driven animation for the center divider line in Quantitative vs Qualitative
  const sideBySideRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: centerLineProgress } = useScroll({
    target: sideBySideRef,
    offset: ['start 85%', 'center 45%'],
  });
  const centerLineScaleY = useTransform(centerLineProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const updateFramingAlignment = () => {
      const cardEl = document.getElementById('traditional-research-card');
      const framingEl = framingContainerRef.current;
      if (cardEl && framingEl && framingEl.parentElement) {
        const cardRect = cardEl.getBoundingClientRect();
        const parentRect = framingEl.parentElement.getBoundingClientRect();
        setFramingAlignOffset(cardRect.left - parentRect.left);
      }
    };

    updateFramingAlignment();
    window.addEventListener('resize', updateFramingAlignment);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateFramingAlignment) : null;
    const cardEl = document.getElementById('traditional-research-card');
    if (cardEl && ro) {
      ro.observe(cardEl);
      ro.observe(document.body);
    }
    return () => {
      window.removeEventListener('resize', updateFramingAlignment);
      ro?.disconnect();
    };
  }, []);

  // Mouse Parallax Physics for Analytics Charts Icon (exact same as Foundation's folder)
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

  // Quantitative vs Qualitative dataset
  const evidenceDimensions = [
    {
      dimension: 'Focus',
      quant: 'Measure patterns, differences, relationships, outcomes',
      qual: 'Explore meanings, experiences, processes, context',
    },
    {
      dimension: 'Questions',
      quant: 'How many? How much? How often? What relationship/effect?',
      qual: 'How? Why? What is the experience/process?',
    },
    {
      dimension: 'Data',
      quant: 'Numerical data (frequencies, metrics, scores)',
      qual: 'Textual, observational, visual, descriptive',
    },
    {
      dimension: 'Methods',
      quant: 'Surveys, tests, experiments, analytics, telemetry',
      qual: 'Interviews, observations, focus groups, document review',
    },
    {
      dimension: 'Analysis',
      quant: 'Statistical and computational analysis',
      qual: 'Coding, thematic and interpretive synthesis',
    },
    {
      dimension: 'Outcome',
      quant: 'Estimates, empirical patterns, comparisons, relationships',
      qual: 'Themes, grounded explanations, contextual understanding',
    },
  ];

  return (
    <div
      id="research-page-container"
      className="w-full min-h-screen bg-[#1D2440] text-white flex flex-col items-center pt-24 sm:pt-28 pb-0 selection:bg-[#FF9BB4] selection:text-[#1D2440]"
    >
      {/* 1. Page Main Title: "What I Investigate" - Exactly matching Foundation's "What I learned" positioning relative to navigation & viewport */}
      <div 
        id="research-title-hero-section"
        className="relative w-full max-w-5xl mx-auto px-6 h-[72vh] min-h-[460px] max-h-[640px] flex flex-col items-center justify-center text-center -translate-y-[6vh]"
      >
        <h1 
          id="research-hero-title"
          className="relative inline-flex items-center justify-center select-none flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-0"
        >
          {/* Layer 1: What I (Bottom Layer, z-10) */}
          <span 
            id="research-title-what-i"
            className="relative z-10 text-[#FF9BB4] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans mr-2 sm:mr-0"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            What I
          </span>

          {/* Layer 2: Analytics Charts Icon (Middle Layer, z-20, fly-in landing + floating parallax + interactive mouse parallax) */}
          <motion.div 
            id="research-title-charts"
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
            onMouseMove={handleIconMouseMove}
            onMouseLeave={handleIconMouseLeave}
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
                  src={chartsImg} 
                  alt="Research & Inquiry Artifacts" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Layer 3: Investigate (Top Layer, z-30) */}
          <span 
            id="research-title-investigate"
            className="relative z-30 text-[#FF9BB4] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            Investigate
          </span>
        </h1>
      </div>

      {/* 2. Research Problem & Inquiry Framing Section (placed outside hero section to maintain exact title-to-nav position) */}
      <section 
        id="research-framing-section" 
        className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center mt-[10vh] sm:mt-[8vh] mb-16 sm:mb-20 z-10"
      >
        <div className="inline-flex flex-col items-start text-left max-w-5xl w-fit translate-x-[5%] translate-y-[20%] relative">
          {/* Subtitle: "Why do people tend to skip the instructions?" in Inter, one single line, pink highlight */}
          <h2 
            id="research-subtitle-question"
            className="text-2xl sm:text-3xl md:text-[44px] md:leading-[55px] font-extrabold tracking-tight text-white mb-6 sm:mb-8 sm:whitespace-nowrap relative z-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Why do people tend to <span className="text-[#FF9BB4]">skip the instructions?</span>
          </h2>

          {/* Floating assumption buttons popping in on scroll around the question */}
          {[
            {
              text: "They're impatient.",
              posClass: "top-[-60px] sm:top-[-75px] md:top-[-85px] left-[70px] sm:left-[110px] md:left-[140px]",
              floatY: [-5, 6, -5],
              floatRotate: [-11, -6, -11], // 向左倾斜 ~-8.5°
              duration: 3.8,
              delay: 0.15,
              x: 0,
            },
            {
              text: "They're not interested.",
              posClass: "top-[-55px] sm:top-[-70px] md:top-[-80px] right-[90px] sm:right-[130px] md:right-[175px]",
              floatY: [6, -5, 6],
              floatRotate: [6, 11, 6], // 向右倾斜 ~+8.5°
              duration: 4.4,
              delay: 0.35,
              x: 0,
            },
            {
              text: "The instructions are too long.",
              posClass: "top-[75px] sm:top-[90px] md:top-[105px] -left-8 sm:left-[-20px] md:left-[-5px]",
              floatY: [-6, 5, -6],
              floatRotate: [4, 8, 4], // 向右倾斜 +6°
              duration: 4.0,
              delay: 0.55,
              x: 0,
            },
            {
              text: "It's hard to find what they need.",
              posClass: "top-[165px] sm:top-[184px] md:top-[202px] left-[22%] sm:left-[25%] md:left-[28%]",
              floatY: [-5, 5, -5],
              floatRotate: [0.5, 3.5, 0.5], // 向右倾斜 +2°
              duration: 4.3,
              delay: 0.65,
              x: 0,
            },
            {
              text: "They think they already know what to do.",
              posClass: "top-[85px] sm:top-[100px] md:top-[115px] -right-4 sm:right-[10px] md:right-[30px]",
              floatY: [5, -7, 5],
              floatRotate: [-12, -8, -12], // 向左倾斜 -10°
              duration: 4.8,
              delay: 0.75,
              x: 0,
            },
          ].map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.3, y: 24, x: badge.x }}
              whileInView={{ opacity: 1, scale: 1, y: 0, x: badge.x }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
                delay: badge.delay,
              }}
              className={`absolute z-20 pointer-events-auto ${badge.posClass}`}
            >
              <motion.div
                animate={{
                  y: badge.floatY,
                  rotate: badge.floatRotate,
                }}
                transition={{
                  duration: badge.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                }}
                className="bg-white text-black font-bold text-xs sm:text-sm md:text-[15px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.32)] border border-slate-100/90 whitespace-nowrap select-none hover:scale-105 hover:shadow-[0_14px_30px_rgba(0,0,0,0.4)] transition-transform duration-200 cursor-default flex items-center justify-center"
              >
                {badge.text}
              </motion.div>
            </motion.div>
          ))}

          {/* Framing Text: Aligned with the left edge of the card below */}
          <div 
            ref={framingContainerRef}
            className="w-full text-slate-200 text-left text-[20px] leading-[32.5px] mt-[40vh]"
            style={
              framingAlignOffset !== null
                ? { transform: `translateX(${framingAlignOffset}px)` }
                : undefined
            }
          >
            <p 
              className={`font-normal text-slate-200 tracking-normal relative -top-[2vh] ${
                framingAlignOffset === null ? '-translate-x-[40px] sm:-translate-x-[75px] lg:-translate-x-[128px]' : ''
              }`}
            >
              <span className="block font-medium text-slate-100">
                Different purposes call for different approaches to inquiry.
              </span>
              <span className="block text-slate-300 font-normal">
                Their differences lie not only in purpose, but also in the researcher&apos;s role, scope, process, and relationship to action.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Section: Two-Column Inquiry Comparison (Traditional Research vs Action Research) */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[calc(1.5rem+7vh)] sm:mt-[calc(2.5rem+7vh)] mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Traditional Research */}
          <div 
            id="traditional-research-card"
            className="bg-[#242C4C]/90 border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Badge & Titles */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <div 
                  className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#4A5D94] text-white font-black text-2xl sm:text-3xl uppercase tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md"
                  style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                >
                  <Search className="w-6 h-6 sm:w-7 sm:h-7" />
                  Traditional Research
                </div>
                <div 
                  className="font-semibold text-slate-400 tracking-wide uppercase text-left text-[14px]"
                  style={{ textAlign: 'left', fontSize: '14px' }}
                >
                  Academic &amp; Empirical
                </div>
              </div>

              <h3 
                className="text-[25px] font-black text-white tracking-tight uppercase mb-1"
                style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif", fontSize: '25px' }}
              >
                UNDERSTAND THE PHENOMENON
              </h3>
              <p className="text-[#FF9BB4] text-xs sm:text-sm font-semibold mb-6">
                Aiming for generalized insight, theoretical depth, and transferable knowledge.
              </p>

              {/* Research Question Card */}
              <motion.div 
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="bg-[#1D2440]/90 border border-white/20 rounded-xl p-4 sm:p-5 mb-8 shadow-inner"
              >
                <span className="text-[11px] font-bold text-[#FF9BB4] uppercase tracking-widest block mb-1">
                  Research Question
                </span>
                <p className="text-base sm:text-lg font-bold text-white italic">
                  “What factors influence whether people read or skip instructions?”
                </p>
              </motion.div>

              {/* Step Sequence: 01 to 04 */}
              <div className="space-y-4">
                {/* 01 PURPOSE */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-white/15 text-[#FF9BB4]">01</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">PURPOSE</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    Understand patterns and factors associated with instruction-reading behavior.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 02 STARTING POINT */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-white/15 text-[#FF9BB4]">02</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">STARTING POINT</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    A research question or gap in existing knowledge.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 03 RESEARCHER ROLE */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-white/15 text-[#FF9BB4]">03</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">RESEARCHER ROLE</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    The researcher systematically studies participants and their behavior from an objective stance.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 04 SCOPE */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-white/15 text-[#FF9BB4]">04</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">SCOPE</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    The study may include participants across different contexts to develop a broader understanding.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 05 PROCESS (Linear Pipeline) */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="p-5 rounded-xl bg-white/[0.05] border border-white/15"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-white/15 text-[#FF9BB4]">05</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">PROCESS</span>
                    <span className="text-[11px] text-slate-400 italic ml-auto">Linear Pipeline</span>
                  </div>

                  {/* Vertical Flow Diagram */}
                  <div className="flex flex-col items-center space-y-1.5 w-full py-2">
                    {[
                      'Question',
                      'Research Design',
                      'Collect Evidence',
                      'Analyze',
                      'Interpret',
                      'Findings / Claims',
                    ].map((step, idx, arr) => (
                      <React.Fragment key={idx}>
                        <div className="w-full sm:w-4/5 py-1.5 px-3 rounded-lg bg-[#1D2440] border border-white/15 text-center text-xs sm:text-sm font-semibold text-slate-200 shadow-sm">
                          {step}
                        </div>
                        {idx < arr.length - 1 && (
                          <div className="text-slate-400/80">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>

                <div className="flex justify-center text-slate-400 py-0.5">
                  <ArrowDown className="w-4 h-4 opacity-60" />
                </div>

                {/* 06 OUTCOME */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="p-4 rounded-xl bg-[#6A9F68]/20 border border-[#6A9F68]/50 shadow-md"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#6A9F68] text-white">06</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9ED99C]">OUTCOME</span>
                  </div>
                  <p className="text-sm sm:text-base text-white font-bold pl-8">
                    New or strengthened understanding of why people read or skip instructions.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action Research */}
          <div className="bg-[#263152]/90 border-2 border-[#FF9BB4]/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge & Titles */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <div 
                  className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#FF9BB4] text-[#1D2440] font-black text-2xl sm:text-3xl uppercase tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md"
                  style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                >
                  <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />
                  Action Research
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FF9BB4] tracking-wide uppercase">
                  Practitioner &amp; Design Iteration
                </div>
              </div>

              <h3 
                className="text-[25px] font-black text-white tracking-tight uppercase mb-1"
                style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif", fontSize: '25px' }}
              >
                Improve the Practice
              </h3>
              <p 
                className="text-xs sm:text-sm font-semibold mb-6 text-[#c6ff9b]"
                style={{ color: '#c6ff9b' }}
              >
                Aiming for immediate intervention, practical problem-solving, and continuous refinement.
              </p>

              {/* Research Question Card */}
              <motion.div 
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                className="bg-[#1D2440]/90 border border-[#FF9BB4]/30 rounded-xl p-4 sm:p-5 mb-8 shadow-inner"
              >
                <span 
                  className="text-[11px] font-bold uppercase tracking-widest block mb-1 text-[#c6ff9b]"
                  style={{ color: '#c6ff9b' }}
                >
                  Research Question
                </span>
                <p className="text-base sm:text-lg font-bold text-white italic">
                  “How can I redesign these instructions to better support users in this context?”
                </p>
              </motion.div>

              {/* Step Sequence: 01 to 04 */}
              <div className="space-y-4">
                {/* 01 PURPOSE */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#FF9BB4] text-[#1D2440]">01</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">PURPOSE</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    Improve my design and instructional practice directly.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 02 STARTING POINT */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#FF9BB4] text-[#1D2440]">02</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">STARTING POINT</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    A practical problem occurring in my own design context.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 03 RESEARCHER ROLE */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#FF9BB4] text-[#1D2440]">03</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">RESEARCHER ROLE</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    I am both the designer/practitioner and the investigator.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 04 SCOPE */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#FF9BB4] text-[#1D2440]">04</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">SCOPE</span>
                  </div>
                  <p className="text-sm text-slate-100 font-medium pl-8">
                    This particular onboarding experience and its users.
                  </p>
                </motion.div>

                <div className="h-5" aria-hidden="true" />

                {/* 05 PROCESS (Circular Iterative Loop) */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="p-5 rounded-xl bg-white/[0.05] border border-[#FF9BB4]/30 shadow-md"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#FF9BB4] text-[#1D2440]">05</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">PROCESS</span>
                    <span className="text-[11px] text-[#FF9BB4] font-bold ml-auto flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" /> Circular Iterative Loop
                    </span>
                  </div>

                  {/* Circular Diagram Graphic with SVG Curved Flow Arrows */}
                  <div 
                    className="relative w-full max-w-[300px] h-[260px] mx-auto my-3 flex items-center justify-center"
                    style={{ color: '#c6ff9b' }}
                  >
                    {/* SVG Circular Arrows Track */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 260">
                      <defs>
                        <marker id="arrow-cw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 6 3, 0 6" fill="#FF9BB4" />
                        </marker>
                      </defs>

                      {/* Dashed background orbit circle */}
                      <circle cx="150" cy="130" r="75" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

                      {/* Top to Right Arc (PLAN -> ACT) */}
                      <path d="M 175 62 A 75 75 0 0 1 218 105" fill="none" stroke="#FF9BB4" strokeWidth="2" markerEnd="url(#arrow-cw)" />

                      {/* Right to Bottom Arc (ACT -> OBSERVE) */}
                      <path d="M 218 155 A 75 75 0 0 1 175 198" fill="none" stroke="#FF9BB4" strokeWidth="2" markerEnd="url(#arrow-cw)" />

                      {/* Bottom to Left Arc (OBSERVE -> REFLECT) */}
                      <path d="M 125 198 A 75 75 0 0 1 82 155" fill="none" stroke="#FF9BB4" strokeWidth="2" markerEnd="url(#arrow-cw)" />

                      {/* Left to Top Arc (REFLECT -> PLAN) */}
                      <path d="M 82 105 A 75 75 0 0 1 125 62" fill="none" stroke="#FF9BB4" strokeWidth="2" markerEnd="url(#arrow-cw)" />
                    </svg>

                    {/* Center Icon: Gentle Rotating Loop Indicator */}
                    <div className="w-11 h-11 rounded-full bg-[#FF9BB4]/15 border border-[#FF9BB4]/40 flex items-center justify-center text-[#FF9BB4] z-10 shadow-md">
                      <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '24s' }} />
                    </div>

                    {/* Top Node: PLAN */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                      <div 
                        className="px-4 py-1 rounded-md bg-[#FF9BB4] font-black text-xs shadow-md tracking-wider"
                        style={{ color: '#000000' }}
                      >
                        PLAN
                      </div>
                    </div>

                    {/* Right Node: ACT */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
                      <div className="px-4 py-1 rounded-md bg-[#FF9BB4] text-[#1D2440] font-black text-xs shadow-md tracking-wider">
                        ACT
                      </div>
                    </div>

                    {/* Bottom Node: OBSERVE */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
                      <div className="px-3.5 py-1 rounded-md bg-[#FF9BB4] text-[#1D2440] font-black text-xs shadow-md tracking-wider">
                        OBSERVE
                      </div>
                    </div>

                    {/* Left Node: REFLECT */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
                      <div className="px-3.5 py-1 rounded-md bg-[#FF9BB4] text-[#1D2440] font-black text-xs shadow-md tracking-wider">
                        REFLECT
                      </div>
                    </div>
                  </div>

                  {/* Real World Concrete Sequence Chip Pipeline */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2 text-center">
                      Action Micro-Cycle in Practice:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                      {[
                        'Shorten instructions',
                        'Test with users',
                        'Observe behavior',
                        'Analyze evidence',
                        'Reflect',
                        'Redesign',
                        'Test again ↺',
                      ].map((chip, i, a) => (
                        <React.Fragment key={i}>
                          <span className={`px-2.5 py-1 rounded-full font-medium ${
                            i === a.length - 1 
                              ? 'bg-[#FF9BB4] text-[#1D2440] font-bold' 
                              : 'bg-white/10 text-slate-200 border border-white/10'
                          }`}>
                            {chip}
                          </span>
                          {i < a.length - 1 && (
                            <span className="text-slate-400 text-[10px]">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center text-slate-400 py-0.5">
                  <ArrowDown className="w-4 h-4 opacity-60" />
                </div>

                {/* 06 OUTCOME */}
                <motion.div 
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="p-4 rounded-xl bg-[#6A9F68]/20 border border-[#6A9F68]/50 shadow-md"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#6A9F68] text-white">06</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9ED99C]">OUTCOME</span>
                  </div>
                  <p className="text-sm sm:text-base text-white font-bold pl-8">
                    An improved design + evidence-informed understanding of what works in this context.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

        </div>

        {/* Callout Statement Box between sections */}
        <div className="mt-12 pt-[10vh] max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#6A9F68] text-white font-black text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-lg shadow-xl border border-[#568754] select-none rotate-[-1deg] hover:rotate-0 transition-transform">
            Same problem. Different purpose. Different relationship to practice.
          </div>
        </div>
      </section>

      {/* 3. Section: "Either way, we still need evidence." (Quantitative vs Qualitative) */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-24 pb-[15vh]">
        {/* Section Header */}
        <div className="text-center mb-10 pt-[10vh]">
          <motion.h2 
            className="text-3xl sm:text-5xl md:text-[52px] font-black tracking-tight text-white mb-4 overflow-visible"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
          >
            {[
              { text: 'Either', highlight: false },
              { text: 'way,', highlight: false },
              { text: 'we', highlight: false },
              { text: 'still', highlight: true },
              { text: 'need', highlight: true },
              { text: 'evidence.', highlight: true },
            ].map((word, idx) => (
              <motion.span
                key={idx}
                custom={idx}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 48,
                    filter: 'blur(3px)',
                  },
                  visible: (i: number) => ({
                    opacity: 1,
                    y: [48, -6, 0],
                    filter: 'blur(0px)',
                    transition: {
                      delay: i * 0.09,
                      duration: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                      times: [0, 0.65, 1],
                    },
                  }),
                }}
                className={`inline-block mr-2.5 sm:mr-3.5 ${word.highlight ? 'text-[#FF9BB4]' : 'text-white'}`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-white w-fit mx-auto text-[20px] leading-[32px] text-left"
            style={{ fontSize: '20px', lineHeight: '32px', textAlign: 'left', color: '#ffffff' }}
          >
            Whether investigating broad psychological patterns or diagnosing an onboarding friction point,
            <br className="hidden md:inline" />
            {' '}rigorous evidence is what transforms assumptions into design intelligence.
          </motion.p>

          {/* Toggle between Card Comparison and Clean Matrix */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/10 border border-white/20 mt-6 shadow-inner translate-y-[15vh]">
            <button
              onClick={() => setEvidenceView('cards')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                evidenceView === 'cards'
                  ? 'bg-[#FF9BB4] text-[#1D2440] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              At A Glance
            </button>
            <button
              onClick={() => setEvidenceView('table')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                evidenceView === 'table'
                  ? 'bg-[#FF9BB4] text-[#1D2440] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Comparative Matrix
            </button>
          </div>
        </div>

        {/* Render switched views: 'cards' tab renders the comparison matrix table, 'table' tab (Comparative Matrix) renders the two cards */}
        {evidenceView === 'table' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Quantitative Card (Pink #FF9BB4 - Swapped to Left) */}
            <div className="bg-[#242D4F]/85 border border-[#FF9BB4]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden translate-y-[15vh]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/15">
                <div className="w-10 h-10 rounded-xl bg-[#FF9BB4]/20 text-[#FF9BB4] flex items-center justify-center shadow-inner">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF9BB4] block">
                    Structured &amp; Measurable
                  </span>
                  <h3 
                    className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                    style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                  >
                    Quantitative
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {evidenceDimensions.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF9BB4]/40 transition-colors">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF9BB4] mb-1">
                      {item.dimension}
                    </div>
                    <div className="text-sm font-semibold text-slate-100 leading-snug">
                      {item.quant}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Card (Green #6A9F68 - Swapped to Right) */}
            <div className="bg-[#242D4F]/85 border border-[#6A9F68]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden translate-y-[15vh]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/15">
                <div className="w-10 h-10 rounded-xl bg-[#6A9F68]/20 text-[#6A9F68] flex items-center justify-center shadow-inner">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#6A9F68] block">
                    Interpretive &amp; Experiential
                  </span>
                  <h3 
                    className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                    style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                  >
                    Qualitative
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {evidenceDimensions.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#6A9F68]/40 transition-colors">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#6A9F68] mb-1">
                      {item.dimension}
                    </div>
                    <div className="text-sm font-semibold text-slate-100 leading-snug">
                      {item.qual}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Side-by-Side: 50/50 Open Page Split with Fine Center Divider (No Cards, No Enclosing Boxes) */
          <div ref={sideBySideRef} className="w-full relative mt-6 sm:mt-10 translate-y-[12vh]">
            {/* Center Fine Divider Line on Desktop - draws down from top as user scrolls */}
            <motion.div 
              style={{ scaleY: centerLineScaleY, transformOrigin: 'top' }}
              className="hidden lg:block absolute left-1/2 top-2 bottom-6 w-px bg-white/40 -translate-x-1/2 pointer-events-none" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch relative">
              
              {/* LEFT HALF: QUANTITATIVE / MEASURE */}
              <div className="flex flex-col justify-between items-center text-center px-4 sm:px-8 relative translate-y-[3%]">
                <div className="w-full flex flex-col items-center">
                  
                  {/* Subtle Sub-header Indicator */}
                  <div className="inline-flex items-center gap-2 mb-8 text-[#FF9BB4] font-mono text-xs uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9BB4] animate-pulse" />
                    Quantitative Inquiry
                  </div>

                  {/* Visual Composition Canvas: MEASURE surrounded by data illustrations */}
                  <div className="w-full max-w-lg relative py-4 sm:py-6 flex flex-col items-center justify-center select-none">
                    
                    {/* TOP VISUALS: Bar Chart Illustration & Percentage Dial (No Card Boxes) */}
                    <div className="w-full flex items-center justify-between gap-4 mb-4">
                      
                      {/* 1. Bar Chart Graphic Illustration (Pure SVG Graphic) */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.3, y: 24 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.28 }}
                        className="flex-1 flex flex-col items-center -translate-x-[10%]"
                      >
                        <svg className="w-full max-w-[200px] h-28 overflow-visible" viewBox="0 0 180 100">
                          {/* Dotted horizontal baseline and guidelines */}
                          <line x1="10" y1="85" x2="170" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="10" y1="50" x2="170" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="10" y1="15" x2="170" y2="15" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                          {/* Bar 1 (42% - Medium-Light Pink) */}
                          <rect x="22" y="38" width="22" height="47" rx="3" fill="#FFB8C9" />
                          <text x="33" y="30" fill="#FFB8C9" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">42%</text>

                          {/* Bar 2 (68% - Deep Vibrant Pink) */}
                          <rect x="58" y="24" width="22" height="61" rx="3" fill="#FF7A99" />
                          <text x="69" y="16" fill="#FF7A99" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">68%</text>

                          {/* Bar 3 (31% - Soft Pastel Pink) */}
                          <rect x="94" y="48" width="22" height="37" rx="3" fill="#FFD6E0" />
                          <text x="105" y="40" fill="#FFD6E0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">31%</text>

                          {/* Bar 4 (89% - Signature Highlight Pink) */}
                          <rect x="130" y="12" width="24" height="73" rx="4" fill="#FF9BB4" filter="drop-shadow(0 0 8px rgba(255,155,180,0.5))" />
                          <text x="142" y="5" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">89%</text>

                          {/* Upward trend curve linking peaks */}
                          <path d="M 33 27 Q 69 12 105 36 T 142 3" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                          <circle cx="142" cy="3" r="3.5" fill="#ffffff" />
                        </svg>
                        <span className="text-[11px] font-mono text-[#FF9BB4]/90 mt-1 uppercase tracking-wider">
                          Distribution &amp; Variance
                        </span>
                      </motion.div>

                      {/* 2. Percentage Radial Gauge & Data Dial Graphic */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.3, y: 24 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.44 }}
                        className="flex flex-col items-center"
                      >
                        <svg className="w-24 h-24 overflow-visible -rotate-90" viewBox="0 0 100 100">
                          {/* Track */}
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
                          {/* Value Arc (84%) */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="none" 
                            stroke="#FF9BB4" 
                            strokeWidth="8" 
                            strokeDasharray="210 251.2" 
                            strokeLinecap="round" 
                            filter="drop-shadow(0 0 6px rgba(255,155,180,0.6))"
                          />
                        </svg>
                        <div className="absolute top-[48px] right-[24px] sm:right-[36px] flex flex-col items-center pointer-events-none">
                          <span className="text-xl sm:text-2xl font-black font-mono text-white leading-none">84.6%</span>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[#FF9BB4] mt-0.5">Reliability</span>
                        </div>
                      </motion.div>

                    </div>

                    {/* CENTER HEADLINE: MEASURE */}
                    <div className="my-6 relative">
                      <h3 
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] select-none"
                        style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                      >
                        MEASURE
                      </h3>
                    </div>

                    {/* BOTTOM VISUALS: Floating Numbers, Formula Metrics & Scatter Line */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.3, y: 24 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.16 }}
                      className="w-full flex items-center justify-center gap-3 sm:gap-5 flex-wrap pt-2 translate-y-8 sm:translate-y-9"
                    >
                      {/* Floating Metric 1 */}
                      <div className="flex items-center gap-1.5 text-[#FF9BB4] font-mono text-sm sm:text-base font-bold bg-[#FF9BB4]/15 px-3 py-1 rounded-full border border-[#FF9BB4]/40 shadow">
                        <TrendingUp className="w-4 h-4 text-[#FF9BB4]" />
                        <span>Δ = +34.2%</span>
                      </div>

                      {/* Floating Metric 2 */}
                      <div className="flex items-center gap-1.5 text-white font-mono text-sm sm:text-base font-bold bg-white/5 px-3 py-1 rounded-full border border-white/15 shadow">
                        <span className="text-[#FF9BB4] font-black">n</span>
                        <span className="text-slate-300">=</span>
                        <span>1,420</span>
                      </div>

                      {/* Floating Metric 3 */}
                      <div className="flex items-center gap-1 text-slate-300 font-mono text-xs sm:text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 shadow">
                        <span className="text-[#FF9BB4] font-bold">p</span>
                        <span>&lt; 0.001</span>
                        <span className="text-[10px] text-emerald-400 ml-1 font-sans font-bold">✓ Sig.</span>
                      </div>

                      {/* Floating Metric 4 */}
                      <div className="flex items-center gap-1 text-slate-300 font-mono text-xs bg-white/5 px-2.5 py-1 rounded-full border border-white/10 shadow">
                        <span className="text-slate-400">CI 95%</span>
                        <span className="text-[#FF9BB4]">[78.2, 91.0]</span>
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Bottom Required Statement for Quantitative */}
                <div className="mt-10 max-w-md w-full">
                  <p className="text-[20px] text-slate-200 font-medium leading-relaxed text-center sm:text-left">
                    Uses numerical data to measure patterns, differences, relationships, or outcomes.
                  </p>
                </div>
              </div>

              {/* RIGHT HALF: QUALITATIVE / EXPLORE */}
              <div className="flex flex-col justify-between items-center text-center px-4 sm:px-8 relative pt-12 lg:pt-0 translate-y-[3%]">
                <div className="w-full flex flex-col items-center">
                  
                  {/* Subtle Sub-header Indicator */}
                  <div className="inline-flex items-center gap-2 mb-8 text-white font-mono text-xs uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Qualitative Inquiry
                  </div>

                  {/* Visual Composition Canvas: EXPLORE surrounded by qualitative illustrations */}
                  <div className="w-full max-w-lg relative py-4 sm:py-6 flex flex-col items-center justify-center select-none">
                    
                    {/* TOP VISUALS: Two People Interviewing Vector Illustration + Speech Bubble "I noticed..." */}
                    <div className="w-full flex items-center justify-between gap-4 mb-4">
                      
                      {/* 1. Two People Interviewing (Pure Vector Illustration, No Card Frame) */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.3, y: 24 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.36 }}
                        className="flex-1 flex flex-col items-center"
                      >
                        <svg className="w-full max-w-[210px] h-28 overflow-visible" viewBox="0 0 200 100">
                          {/* Floor / Desk Horizon Line */}
                          <line x1="15" y1="88" x2="185" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                          
                          {/* Interview Table in Middle */}
                          <rect x="75" y="60" width="50" height="28" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                          {/* Audio recorder / Mic on table */}
                          <rect x="94" y="56" width="12" height="6" rx="2" fill="#FF9BB4" />
                          <circle cx="100" cy="53" r="2" fill="#FF9BB4" />

                          {/* LEFT PERSON: Interviewer with Notepad */}
                          <g transform="translate(25, 18)">
                            {/* Head */}
                            <circle cx="20" cy="14" r="11" fill="#FF9BB4" opacity="0.9" />
                            {/* Body / Torso */}
                            <path d="M 6 52 C 6 34 34 34 34 52 Z" fill="#4A5D94" />
                            {/* Arm holding clipboard */}
                            <path d="M 28 36 L 44 42" stroke="#FF9BB4" strokeWidth="3" strokeLinecap="round" />
                            {/* Clipboard & pen */}
                            <rect x="38" y="32" width="16" height="22" rx="2" fill="#F8FAFC" transform="rotate(12 38 32)" />
                            <line x1="42" y1="38" x2="50" y2="40" stroke="#334155" strokeWidth="1.5" />
                            <line x1="41" y1="43" x2="49" y2="45" stroke="#334155" strokeWidth="1.5" />
                          </g>

                          {/* Sound / Gesture dialogue waves between them */}
                          <path d="M 85 36 Q 100 30 115 36" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="2 2" />
                          <path d="M 88 42 Q 100 38 112 42" fill="none" stroke="#FF9BB4" strokeWidth="1.5" strokeDasharray="2 2" />

                          {/* RIGHT PERSON: Participant Gesturing */}
                          <g transform="translate(135, 18)">
                            {/* Head */}
                            <circle cx="20" cy="14" r="11" fill="#FDE68A" opacity="0.95" />
                            {/* Body / Torso */}
                            <path d="M 6 52 C 6 34 34 34 34 52 Z" fill="#6A9F68" />
                            {/* Expressive hand gesture towards interviewer */}
                            <path d="M 12 36 L -4 28" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="-5" cy="27" r="2.5" fill="#FDE68A" />
                          </g>
                        </svg>
                        <span className="text-[11px] font-mono text-[#FF9BB4] mt-1 uppercase tracking-wider font-semibold">
                          1-on-1 Contextual Inquiry
                        </span>
                      </motion.div>

                      {/* 2. Speech Bubble: "I noticed..." (White Button Bubble, Tilt & Floating Hover) */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.3, y: 24, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 17, delay: 0.52 }}
                        className="flex-1 max-w-[180px] relative"
                      >
                        <div className="relative cursor-pointer select-none -rotate-3 transition-all duration-300 ease-out hover:-translate-y-2 hover:rotate-0 hover:scale-105 hover:shadow-[0_14px_30px_rgba(255,255,255,0.35)] active:scale-95 active:translate-y-0 bg-white border-2 border-slate-100 px-5 py-3 rounded-2xl sm:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.35)] text-center group">
                          <p className="text-sm sm:text-base font-bold italic font-serif text-slate-900 tracking-tight leading-none">
                            “I noticed...”
                          </p>
                          {/* Speech bubble tail pointing left toward speaker */}
                          <div className="absolute -bottom-2 left-6 w-3 h-3 overflow-hidden pointer-events-none">
                            <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-slate-100 rotate-45 transform origin-top-left" />
                          </div>
                        </div>
                      </motion.div>

                    </div>

                    {/* CENTER HEADLINE: EXPLORE */}
                    <div className="my-6 relative">
                      <h3 
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] select-none"
                        style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                      >
                        EXPLORE
                      </h3>
                    </div>

                    {/* BOTTOM VISUALS: Speech Bubble "I felt..." & Tilted Transcript Notepad Illustration */}
                    <div className="w-full flex items-center justify-between gap-4 pt-2">
                      
                      {/* Speech Bubble: "I felt..." (White Button Bubble, Tilt & Floating Hover) */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.3, y: 24, rotate: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 3 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 17, delay: 0.22 }}
                        className="flex-1 max-w-[180px] relative"
                      >
                        <div className="relative cursor-pointer select-none rotate-3 transition-all duration-300 ease-out hover:-translate-y-2 hover:rotate-0 hover:scale-105 hover:shadow-[0_14px_30px_rgba(255,255,255,0.35)] active:scale-95 active:translate-y-0 bg-white border-2 border-slate-100 px-5 py-3 rounded-2xl sm:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.35)] text-center group">
                          <p className="text-sm sm:text-base font-bold italic font-serif text-slate-900 tracking-tight leading-none">
                            “I felt...”
                          </p>
                          {/* Speech bubble tail */}
                          <div className="absolute -top-2 right-6 w-3 h-3 overflow-hidden pointer-events-none">
                            <div className="w-3 h-3 bg-white border-l-2 border-t-2 border-slate-100 rotate-45 transform origin-bottom-right" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Tilted Transcript / Field Notes Sheet Illustration (Pure SVG / Graphic Illustration) */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.3, y: 24 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.40 }}
                        className="flex-1 flex flex-col items-center"
                      >
                        <svg className="w-full max-w-[190px] h-28 overflow-visible" viewBox="0 0 160 90">
                          {/* Shadow behind paper */}
                          <rect x="18" y="8" width="124" height="74" rx="4" fill="rgba(0,0,0,0.4)" transform="rotate(-3 80 45)" />
                          
                          {/* Notepad Sheet */}
                          <g transform="rotate(-2 80 45)">
                            <rect x="16" y="6" width="126" height="74" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                            {/* Binder holes at top */}
                            <circle cx="28" cy="12" r="2" fill="#94A3B8" />
                            <circle cx="80" cy="12" r="2" fill="#94A3B8" />
                            <circle cx="130" cy="12" r="2" fill="#94A3B8" />
                            
                            {/* Header: Transcript Tag */}
                            <rect x="26" y="18" width="56" height="7" rx="2" fill="#FDE68A" />
                            <text x="29" y="23.5" fill="#78350F" fontSize="5" fontFamily="monospace" fontWeight="bold">TRANSCRIPT [03:42]</text>
                            
                            {/* Yellow Highlighter Stroke */}
                            <rect x="25" y="28" width="98" height="6" rx="1" fill="#FEF08A" opacity="0.8" />
                            
                            {/* Lined notebook text simulation */}
                            <line x1="26" y1="32" x2="128" y2="32" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
                            <line x1="26" y1="42" x2="116" y2="42" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
                            <line x1="26" y1="51" x2="124" y2="51" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
                            <line x1="26" y1="60" x2="95" y2="60" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
                            <line x1="26" y1="69" x2="120" y2="69" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />

                            {/* Red margin line */}
                            <line x1="22" y1="6" x2="22" y2="80" stroke="#FCA5A5" strokeWidth="0.8" strokeOpacity="0.8" />
                          </g>
                        </svg>
                        <span className="text-[11px] font-mono text-[#FF9BB4] mt-1 uppercase tracking-wider font-semibold">
                          Field Notes &amp; Coded Themes
                        </span>
                      </motion.div>

                    </div>

                  </div>
                </div>

                {/* Bottom Required Statement for Qualitative */}
                <div className="mt-10 max-w-md w-full">
                  <p className="text-[20px] text-slate-200 font-medium leading-relaxed text-center sm:text-left">
                    Uses non-numerical data to explore meanings, experiences, processes, and context.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* 4. Realistic WebGL Torn Paper Section Transition */}
      <div className="w-full relative bg-[#2B2B2B]">
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

        {/* 5. Bottom Section in #2B2B2B (From Knowing to Doing) */}
        <div 
          className="w-full bg-[#2B2B2B] text-white pt-8 sm:pt-12 pb-8 sm:pb-10 relative -mt-8 sm:-mt-12"
        >
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtitle: "From Knowing to Doing" */}
            <h2 
              className="text-3xl sm:text-5xl md:text-[50px] font-black text-center mb-8 tracking-tight"
              style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
            >
              From Knowing <span className="text-[#FF9BB4]">to Doing</span>
            </h2>
          </section>

          {/* Group container for the statement box and all subsequent elements (adjusted up by 2% to 3%) */}
          <div 
            className="w-full relative translate-y-[3%]"
            style={{ transform: 'translateY(3%)' }}
          >
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Text Box Statement */}
              <div className="max-w-4xl mx-auto text-left mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed bg-white/[0.05] border border-white/15 rounded-2xl py-6 px-7 sm:px-10 shadow-lg text-left">
                  These artifacts show how I began applying research thinking to questions, evidence, analysis, and inquiry.
                </p>
              </div>
            </div>

            {/* Book & Reflection Text Container (Symmetrically aligned 2-column grid when closed, centers & fades out text when open) */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-[560px] lg:min-h-[740px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column: 3D Interactive Notebook (Glides smoothly to screen center when open) */}
                <div 
                  className={`w-full flex items-center justify-center relative transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.4,1)] ${
                    isBookOpen 
                      ? 'lg:translate-x-[calc(50%+1.5rem)] z-40' 
                      : 'lg:translate-x-0 z-10'
                  }`}
                >
                  <div className="w-full">
                    <BookScroll 
                      openWidth={75} 
                      background="#2B2B2B" 
                      scrollHeight={300}
                      coverSrc="/book.jpg"
                      showLabels={false}
                      title="Research Artifacts"
                      leafTitle="Attached Letter"
                      author="Yu Liu"
                      textColor="#691B1F"
                      mode="letter"
                      isOpen={isBookOpen}
                      onToggle={setIsBookOpen}
                      onGalleryClick={handleGalleryClick}
                    />
                  </div>
                </div>

                {/* Right Column: Two Reflection Paragraphs (In-place fade-in / fade-out without moving) */}
                <div 
                  className={`w-full relative z-10 transition-opacity duration-500 ease-in-out ${
                    isBookOpen 
                      ? 'opacity-0 pointer-events-none select-none' 
                      : 'opacity-100 pointer-events-auto'
                  }`}
                  aria-hidden={isBookOpen}
                >
                  <div className="bg-white/[0.04] border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-2.5 mb-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF9BB4] animate-pulse" />
                      <span className="text-[#FF9BB4] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                        Research Reflection
                      </span>
                    </div>

                    <div className="space-y-6 text-left">
                      <div className="relative pl-5 border-l-2 border-[#FF9BB4]">
                        <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-normal leading-relaxed">
                          Experience can help me recognize possible explanations, but even a reasonable explanation is still an assumption until it is examined through evidence.
                        </p>
                      </div>

                      <div className="relative pl-5 border-l-2 border-white/20">
                        <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed">
                          For me, research is not separate from design, and it strengthens the decisions behind the design. In my future practice as an instructional designer, I want to bring this research mindset into the design process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14 mb-2">
              <div 
                className="flex flex-wrap items-center justify-center gap-4 -translate-y-[7vh]"
                style={{ transform: 'translateY(-7vh)' }}
              >
                <button
                  id="research-to-foundation-btn"
                  onClick={() => onNavigate?.('foundation')}
                  className="px-8 py-2.5 bg-[#FF9BB4] hover:bg-[#ff85a3] text-[#1D2440] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 text-[#1D2440]" />
                  <span>Explore Foundation</span>
                </button>

                <button
                  id="research-back-home-bottom-btn"
                  onClick={onBackToHome}
                  className="px-8 py-2.5 bg-white text-[#1D2440] hover:bg-slate-100 font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95"
                >
                  Back To Home
                </button>

                <button
                  id="research-to-design-btn"
                  onClick={() => onNavigate?.('design')}
                  className="px-8 py-2.5 bg-[#FF9BB4] hover:bg-[#ff85a3] text-[#1D2440] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Explore Design</span>
                  <ArrowRight className="w-4 h-4 text-[#1D2440]" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Interactive Letter Modal Popup (Worksheet text overlaid on right-side loose-leaf paper) */}
      <AnimatePresence>
        {isLetterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-white/90 backdrop-blur-md"
            onClick={() => setIsLetterModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] w-auto aspect-[2420/1668] flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLetterModalOpen(false)}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1D2440]/90 hover:bg-[#1D2440] text-white flex items-center justify-center shadow-xl backdrop-blur-md border border-white/40 transition-all cursor-pointer select-none z-30 hover:scale-110 active:scale-95"
                aria-label="Close Worksheet Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Binder & Loose-leaf Background */}
              <img
                src={letterImg}
                alt="Research Proposal Binder"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* Left Blue Directory (Dynamic based on active document, positioned below paperclip) */}
              <nav 
                aria-label="Document Table of Contents"
                className="absolute left-[2.8%] w-[19%] top-[26%] bottom-[9.5%] z-20 flex flex-col justify-start py-1 pr-1 overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="space-y-1 sm:space-y-1.5 w-full">
                  {activeDocumentType === 'data-analysis' ? (
                    analysisSections.map((sec) => {
                      const isSelected = activeAnalysisSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setActiveAnalysisSection(sec.id);
                            const target = document.getElementById(sec.id);
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className={`text-left transition-all duration-200 cursor-pointer select-none text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-tight block w-full truncate ${
                            isSelected
                              ? 'bg-[#FF9BB4] text-[#1D2440] font-bold px-2 py-1 sm:py-1.5 rounded-lg shadow-md scale-102'
                              : 'text-white/90 hover:text-white font-medium px-2 py-1 sm:py-1.5 bg-transparent border-none'
                          }`}
                          title={sec.label}
                        >
                          {sec.label}
                        </button>
                      );
                    })
                  ) : activeDocumentType === 'report' ? (
                    reportSections.map((sec) => {
                      const isSelected = activeReportSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setActiveReportSection(sec.id);
                            const target = document.getElementById(sec.id);
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className={`text-left transition-all duration-200 cursor-pointer select-none text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-tight block w-full truncate ${
                            isSelected
                              ? 'bg-[#FF9BB4] text-[#1D2440] font-bold px-2 py-1 sm:py-1.5 rounded-lg shadow-md scale-102'
                              : 'text-white/90 hover:text-white font-medium px-2 py-1 sm:py-1.5 bg-transparent border-none'
                          }`}
                          title={sec.label}
                        >
                          {sec.label}
                        </button>
                      );
                    })
                  ) : activeDocumentType === 'slides' ? (
                    slideSections.map((sec) => {
                      const isSelected = activeSlideSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setActiveSlideSection(sec.id);
                            const target = document.getElementById(sec.id);
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className={`text-left transition-all duration-200 cursor-pointer select-none text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-tight block w-full truncate ${
                            isSelected
                              ? 'bg-[#FF9BB4] text-[#1D2440] font-bold px-2 py-1 sm:py-1.5 rounded-lg shadow-md scale-102'
                              : 'text-white/90 hover:text-white font-medium px-2 py-1 sm:py-1.5 bg-transparent border-none'
                          }`}
                          title={sec.label}
                        >
                          {sec.label}
                        </button>
                      );
                    })
                  ) : (
                    worksheetSections.map((sec) => {
                      const isSelected = activeWorksheetSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setActiveWorksheetSection(sec.id);
                            const target = document.getElementById(sec.id);
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className={`text-left transition-all duration-200 cursor-pointer select-none text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-tight block w-full truncate ${
                            isSelected
                              ? 'bg-[#FF9BB4] text-[#1D2440] font-bold px-2 py-1 sm:py-1.5 rounded-lg shadow-md scale-102'
                              : 'text-white/90 hover:text-white font-medium px-2 py-1 sm:py-1.5 bg-transparent border-none'
                          }`}
                          title={sec.label}
                        >
                          {sec.label}
                        </button>
                      );
                    })
                  )}
                </div>
              </nav>

              {/* Scrollable Document Content: Strictly positioned over the right-side loose-leaf paper */}
              <div 
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const containerTop = container.getBoundingClientRect().top;
                  if (activeDocumentType === 'data-analysis') {
                    for (let i = analysisSections.length - 1; i >= 0; i--) {
                      const sec = analysisSections[i];
                      const el = document.getElementById(sec.id);
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top - containerTop <= 80) {
                          setActiveAnalysisSection(sec.id);
                          break;
                        }
                      }
                    }
                  } else if (activeDocumentType === 'report') {
                    for (let i = reportSections.length - 1; i >= 0; i--) {
                      const sec = reportSections[i];
                      const el = document.getElementById(sec.id);
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top - containerTop <= 80) {
                          setActiveReportSection(sec.id);
                          break;
                        }
                      }
                    }
                  } else if (activeDocumentType === 'slides') {
                    for (let i = slideSections.length - 1; i >= 0; i--) {
                      const sec = slideSections[i];
                      const el = document.getElementById(sec.id);
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top - containerTop <= 80) {
                          setActiveSlideSection(sec.id);
                          break;
                        }
                      }
                    }
                  } else {
                    for (let i = worksheetSections.length - 1; i >= 0; i--) {
                      const sec = worksheetSections[i];
                      const el = document.getElementById(sec.id);
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top - containerTop <= 80) {
                          setActiveWorksheetSection(sec.id);
                          break;
                        }
                      }
                    }
                  }
                }}
                className="absolute left-[24.5%] right-[3.5%] top-[8.5%] bottom-[8.5%] overflow-y-auto pr-3 sm:pr-6 pl-2 sm:pl-4 py-3 sm:py-5 text-slate-800 selection:bg-[#C58997]/25 scroll-smooth"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#C58997 transparent',
                }}
              >
                {activeDocumentType === 'slides' ? (
                  /* ================= Research Slide Deck Presentation ================= */
                  <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                    {/* Header */}
                    <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#C58997]">
                          Research Slide Deck • 11 Slides
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#1D2440]/10 text-[#1D2440] text-[10px] font-mono font-semibold">
                          ETEC 6430
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                        The Effect of AI-Generated Feedback on ESL Writing Performance
                      </h2>
                      <p className="mt-1 text-xs text-slate-600">
                        Yu Liu • Prof. Bronack • California State University San Bernardino
                      </p>
                    </div>

                    {/* Slide 1: Title Slide */}
                    <div id="slide-1" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 1 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Title Presentation</span>
                      </div>
                      <div className="py-3 text-center space-y-2">
                        <h3 className="text-base sm:text-xl font-extrabold text-[#1D2440] font-serif leading-snug">
                          The Effect of AI-Generated Feedback on ESL Writing Performance
                        </h3>
                        <div className="text-xs text-slate-600 space-y-0.5 pt-1">
                          <p className="font-bold text-slate-800 text-sm">Yu Liu</p>
                          <p className="text-slate-500 font-mono text-[11px]">ETEC 6430 • Directed by Prof. Bronack</p>
                          <p className="text-slate-600 font-medium">California State University San Bernardino</p>
                        </div>
                      </div>
                    </div>

                    {/* Slide 2: Online ESL Learners & Instructor Bottleneck */}
                    <div id="slide-2" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 2 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Context &amp; Challenge</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                          <span className="text-[11px] font-mono font-bold text-rose-700 uppercase block mb-1">
                            Online ESL Learners
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            Students do not receive timely and sufficient writing feedback.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                          <span className="text-[11px] font-mono font-bold text-[#1D2440] uppercase block mb-1">
                            Instructor Capacity
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            The gap between feedback demand and instructor capacity continues to widen in large-scale online ESL platforms.
                          </p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
                        <span className="font-bold">⏱ Grading Capacity:</span>
                        <span>(24–48 hours) Delayed Feedback Loop</span>
                      </div>
                    </div>

                    {/* Slide 3: The Mechanism of Feedback Delay */}
                    <div id="slide-3" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 3 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Theoretical Mechanism</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                        Limited feedback slows down writing improvement.
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60 text-xs text-slate-700 space-y-1">
                          <strong className="text-rose-900 block text-xs font-semibold">Delayed Instructor Feedback (48 hrs)</strong>
                          <p>Learners mentally disengage before feedback arrives.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-slate-700 space-y-1">
                          <strong className="text-emerald-900 block text-xs font-semibold">Immediate, Specific AI Feedback</strong>
                          <p>Promotes deep revision engagement and active metacognitive monitoring.</p>
                        </div>
                      </div>
                      <div className="bg-slate-100/90 p-3 rounded-xl text-xs text-slate-700 italic border-l-3 border-[#C58997]">
                        &ldquo;Formative feedback must be timely, specific, and elaborative to trigger meaningful revision.&rdquo; — <em>Shute, 2008</em>
                      </div>
                    </div>

                    {/* Slide 4: Research Question */}
                    <div id="slide-4" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 4 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Core Inquiry</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C58997] block">
                        Primary Research Question
                      </span>
                      <div className="bg-[#1D2440] text-white p-4 sm:p-5 rounded-xl shadow-md text-sm sm:text-base font-medium font-serif leading-relaxed text-center">
                        &ldquo;Does AI-generated feedback improve ESL learners’ writing performance compared to instructor feedback?&rdquo;
                      </div>
                    </div>

                    {/* Slide 5: The Rigor Behind the Data (RCT) */}
                    <div id="slide-5" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 5 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Empirical Rigor</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                        The Rigor Behind the Data
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        We bypassed small-scale anecdotes for a massive, <strong>800-learner trial</strong>, ensuring our findings represent the true, heterogeneous user base.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-center pt-1">
                        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                          <span className="text-base sm:text-lg font-extrabold text-[#1D2440] block">4 Weeks</span>
                          <span className="text-[10px] text-slate-500 font-mono">Intervention Window</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                          <span className="text-base sm:text-lg font-extrabold text-[#1D2440] block">RCT Design</span>
                          <span className="text-[10px] text-slate-500 font-mono">Randomized Controlled Trial</span>
                        </div>
                      </div>
                    </div>

                    {/* Slide 6: How was data analyzed? */}
                    <div id="slide-6" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 6 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Methodological Framework</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                        How was data analyzed?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900 block font-semibold mb-0.5">ANCOVA Covariate Models:</strong>
                          <span>Controls for pre-test baseline writing ability to isolate true intervention effect.</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900 block font-semibold mb-0.5">NLP &amp; Rubric Triangulation:</strong>
                          <span>Automated lexical diversity (MATTR) + human-evaluated analytical rubrics.</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900 block font-semibold mb-0.5">Revision Coding:</strong>
                          <span>Surface vs. meaning-level revision taxonomy based on Faigley &amp; Witte (1981).</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900 block font-semibold mb-0.5">Proficiency Moderation:</strong>
                          <span>Stratified subgroup interactions across beginner, intermediate, and advanced tiers.</span>
                        </div>
                      </div>
                    </div>

                    {/* Slide 7: Primary Outcome (13.5 vs 12.5) */}
                    <div id="slide-7" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 7 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Primary Outcome</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                        AI feedback significantly improves writing performance.
                      </h4>
                      
                      {/* Visual Data Comparison */}
                      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block text-center">
                          Total Writing Score (Pre-test vs. Post-test)
                        </span>
                        
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/60">
                            <span className="text-[11px] font-bold text-blue-900 block mb-1">AI Feedback Group</span>
                            <div className="flex items-baseline justify-center gap-1.5">
                              <span className="text-xs text-slate-500 font-mono">11.38</span>
                              <span className="text-xs text-slate-400">➔</span>
                              <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono">13.50</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-600 font-bold mt-0.5 block">+18.6% Gain</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                            <span className="text-[11px] font-bold text-slate-700 block mb-1">Traditional Group</span>
                            <div className="flex items-baseline justify-center gap-1.5">
                              <span className="text-xs text-slate-500 font-mono">11.42</span>
                              <span className="text-xs text-slate-400">➔</span>
                              <span className="text-xl sm:text-2xl font-black text-slate-700 font-mono">12.50</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 font-medium mt-0.5 block">+9.5% Gain</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-medium bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/50">
                        ✨ <strong>Key Finding:</strong> AI group demonstrated significantly greater improvement, particularly in grammar and revision behavior.
                      </p>
                    </div>

                    {/* Slide 8: Drives Massive Gains in Grammar & Revision */}
                    <div id="slide-8" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 8 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Sub-construct Analysis</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                        Drives Massive Gains in Grammar &amp; Revision
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                          <span className="text-xs font-bold text-rose-700 font-mono uppercase block">Grammar Precision</span>
                          <p className="text-xs text-slate-700">Significant drop in grammar error rate per 100 words with targeted syntactic explanations.</p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                          <span className="text-xs font-bold text-indigo-700 font-mono uppercase block">Revision Engagement</span>
                          <p className="text-xs text-slate-700">Over 2.4x increase in meaningful revision edits across macro-organization and paragraph coherence.</p>
                        </div>
                      </div>
                    </div>

                    {/* Slide 9: Subgroup Analysis */}
                    <div id="slide-9" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 9 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Proficiency Breakdown</span>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-center space-y-1">
                        <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wide block">
                          Moderation Effect
                        </span>
                        <h4 className="text-base sm:text-lg font-extrabold text-[#1D2440] font-serif">
                          AI works best for intermediate learners.
                        </h4>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        While all proficiency tiers exhibited gains, intermediate writers demonstrated the largest statistical interaction effect (<span className="font-mono font-semibold">p &lt; .05</span>), capitalizing on immediate corrective feedback without cognitive overload.
                      </p>
                    </div>

                    {/* Slide 10: The Cognitive 'Why' Behind the Data */}
                    <div id="slide-10" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 10 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Cognitive Explanation</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                        The Cognitive &lsquo;Why&rsquo; Behind the Data
                      </h4>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#FF9BB4]/30 text-[#1D2440] font-mono text-xs font-bold">
                            Intermediates
                          </span>
                          <span className="font-bold text-xs text-slate-800">The Goldilocks zone.</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          Intermediates possess enough base knowledge to act instantly on specific, process-level AI prompts without being overwhelmed by linguistic jargon.
                        </p>
                      </div>
                    </div>

                    {/* Slide 11: The Strategic AI Deployment Playbook */}
                    <div id="slide-11" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C58997]">Slide 11 of 11</span>
                        <span className="text-[10px] font-mono text-slate-400">Recommendations</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1D2440] font-serif">
                        The Strategic AI Deployment Playbook
                      </h4>
                      <p className="text-xs font-medium text-slate-700">
                        AI feedback is scalable, effective, and instructionally valuable.
                      </p>
                      
                      <div className="space-y-2 pt-1">
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                          <span className="text-xs text-slate-800 font-medium">Solves the 48-hour feedback bottleneck in online cohorts.</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                          <span className="text-xs text-slate-800 font-medium">Drives unprecedented student revision behavior through immediate formative nudges.</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                          <span className="text-xs text-slate-800 font-medium">Frees human instructors to focus on advanced rhetorical coaching and deep mentoring.</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom spacer */}
                    <div className="h-6" />
                  </div>
                ) : activeDocumentType === 'data-analysis' ? (
                  /* ================= Data Analysis Plan Document ================= */
                  <div className="max-w-3xl space-y-6 sm:space-y-7 text-left text-xs sm:text-sm text-slate-800">
                    {/* Header */}
                    <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#C58997] block mb-1">
                        Quantitative Research Protocol
                      </span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                        Data Analysis Plan
                      </h2>
                      <p className="mt-1 text-xs text-slate-500 italic">
                        Study: Examining whether AI-generated feedback improves ESL learners’ writing performance.
                      </p>
                    </div>

                    {/* Section: Overview */}
                    <div id="da-sec-overview" className="space-y-2 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>Overview</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        This document describes the data analysis plan for the study examining whether AI-generated feedback improves ESL learners’ writing performance. The plan is organized into five sections: research hypotheses, statistical methods, assumption diagnostics, significance level and effect size reporting, and software tools. The goal of this document is to explain clearly how the data collected in this study will be used to answer each research question, and to show that the analytical choices are appropriate for the study design.
                      </p>
                    </div>

                    {/* Section: Statistical Methods */}
                    <div id="da-sec-methods" className="space-y-4 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>Statistical Methods</span>
                      </h3>

                      {/* Stage 1 */}
                      <div className="space-y-2 bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200/70">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Stage 1: Descriptive Statistics</h4>
                        <p className="leading-relaxed text-slate-700">
                          Before any inferential tests are run, descriptive statistics will be computed for all continuous outcome variables, separately for the AI feedback group and the traditional feedback group. For each variable, the following statistics will be reported:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                          <li><strong>Mean (M) and standard deviation (SD):</strong> to describe the typical performance and spread within each group.</li>
                          <li><strong>Minimum and maximum values:</strong> to identify the range of scores.</li>
                          <li><strong>Skewness:</strong> to check whether the distribution is approximately symmetric. Values of skewness beyond ±2.0 will be flagged for further attention in the assumption checking phase.</li>
                        </ul>
                        <p className="text-xs text-slate-600 italic">
                          Descriptive statistics will be presented in a summary table showing pre-test and post-test values for both groups, broken down by proficiency stratum. This table provides a clear overview of the data before inferential analysis begins.
                        </p>
                      </div>

                      {/* Stage 2 */}
                      <div className="space-y-2 bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200/70">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Stage 2: Baseline Equivalence Check</h4>
                        <p className="leading-relaxed text-slate-700">
                          Although random assignment was used, it is important to confirm that the two groups were comparable at the start of the study. Independent samples t-tests will be run to compare pre-test scores on all four AWR sub-constructs and the two NLP metrics between the AI feedback and traditional feedback groups. Chi-square tests will be run to confirm that the proficiency distribution is balanced across the two groups. Any pre-test differences that are statistically significant (p &lt; .05) will be reported and added as additional covariates in the primary analysis.
                        </p>
                      </div>

                      {/* Stage 3 */}
                      <div className="space-y-3 bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200/70">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Stage 3: Primary Analysis — Analysis of Covariance (ANCOVA)</h4>
                        <p className="leading-relaxed text-slate-700">
                          The primary inferential test is Analysis of Covariance (ANCOVA). ANCOVA is used instead of a simple post-test t-test because it controls for participants’ pre-test writing ability, which reduces error variance and produces a more precise estimate of the treatment effect. This is especially important in writing research, where pre-existing ability is a strong predictor of post-test performance.
                        </p>
                        <p className="leading-relaxed text-slate-700">
                          For each writing dimensions, two separate ANCOVAs will be run: one for the rubric sub-score and one for the corresponding automated metric (where available). The structure of each ANCOVA is as follows:
                        </p>

                        {/* ANCOVA Structure Table */}
                        <div className="overflow-x-auto my-2 rounded-lg border border-slate-300 shadow-xs bg-white">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#1D2440] text-white">
                                <th className="p-2 sm:p-2.5 font-semibold">Sub-Question</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Dependent Variable</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Covariate</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Factor</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                              <tr className="hover:bg-slate-50/80">
                                <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">SQ1: Grammar</td>
                                <td className="p-2 sm:p-2.5">Post-test grammar rubric score; grammar error rate</td>
                                <td className="p-2 sm:p-2.5">Pre-test grammar score</td>
                                <td className="p-2 sm:p-2.5">Group (AI vs. Traditional)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/80">
                                <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">SQ2: Vocabulary</td>
                                <td className="p-2 sm:p-2.5">Post-test vocabulary rubric score; post-test MATTR</td>
                                <td className="p-2 sm:p-2.5">Pre-test vocabulary score; pre-test MATTR</td>
                                <td className="p-2 sm:p-2.5">Group (AI vs. Traditional)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/80">
                                <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">SQ3: Organization</td>
                                <td className="p-2 sm:p-2.5">Post-test organization sub-score</td>
                                <td className="p-2 sm:p-2.5">Pre-test organization sub-score</td>
                                <td className="p-2 sm:p-2.5">Group (AI vs. Traditional)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/80">
                                <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">SQ3: Coherence</td>
                                <td className="p-2 sm:p-2.5">Post-test coherence sub-score</td>
                                <td className="p-2 sm:p-2.5">Pre-test coherence sub-score</td>
                                <td className="p-2 sm:p-2.5">Group (AI vs. Traditional)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/80">
                                <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">SQ4: Revision</td>
                                <td className="p-2 sm:p-2.5">Meaningful revision count; draft improvement score</td>
                                <td className="p-2 sm:p-2.5">Pre-test total AWR score</td>
                                <td className="p-2 sm:p-2.5">Group (AI vs. Traditional)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p className="leading-relaxed text-slate-700">
                          A statistically significant main effect of Group (p &lt; .05) will be interpreted as evidence that the type of feedback had a significant effect on writing performance on that sub-construct, after accounting for pre-test ability.
                        </p>
                        <p className="leading-relaxed text-slate-700">
                          For revision count data, because revision count is a discrete count variable and may not follow a normal distribution, its distribution will be examined before deciding on the final test. If the distribution is severely non-normal (skewness &gt; 2.0, Shapiro-Wilk p &lt; .05), a Mann-Whitney U test will be used instead of ANCOVA for this outcome.
                        </p>
                      </div>

                      {/* Stage 4 */}
                      <div className="space-y-2 bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200/70">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Stage 4: Proficiency Analysis</h4>
                        <p className="leading-relaxed text-slate-700">
                          To test whether the AI feedback effect differs across proficiency levels (Sub-Question 5), a moderated ANCOVA will be estimated. This is done by adding a Group × Proficiency Level interaction term to the primary ANCOVA model, using composite writing performance as the outcome. Composite writing performance is computed as the average of the standardized (z-score) post-test AWR sub-scores.
                        </p>
                        <p className="leading-relaxed text-slate-700">
                          If the interaction term is statistically significant (p &lt; .05), it means that the size of the AI feedback advantage is not the same across beginner, intermediate, and advanced learners. Follow-up simple effects analyses will then be run within each proficiency stratum separately to describe what the AI feedback effect looks like at each level. If the interaction is not significant, this is interpreted as evidence that AI feedback works equally well (or equally poorly) across proficiency levels.
                        </p>
                      </div>
                    </div>

                    {/* Section: Assumption Diagnostics */}
                    <div id="da-sec-diagnostics" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>Assumption Diagnostics</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        ANCOVA relies on several statistical assumptions. Each assumption will be checked before the primary analysis is interpreted. If an assumption is violated, an appropriate corrective action will be taken.
                      </p>

                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-sm text-[#1D2440]">Significance Level and Effect Size</h4>
                        
                        <div>
                          <h5 className="font-semibold text-xs sm:text-sm text-slate-900 mb-1">Alpha Level</h5>
                          <p className="leading-relaxed text-slate-700">
                            The significance threshold for all primary hypothesis tests is α = .05. A p-value below .05 indicates that the observed result is unlikely to have occurred by chance if the null hypothesis were true, and the null hypothesis is rejected. For the proficiency moderation analysis, a Bonferroni-corrected threshold will be applied if multiple follow-up tests are conducted within each stratum.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-xs sm:text-sm text-slate-900 mb-1">Effect Size: Cohen’s d</h5>
                          <p className="leading-relaxed text-slate-700 mb-2">
                            Statistical significance alone does not tell us whether the difference between groups is large enough to matter in practice. Effect size measures how big the difference is, independently of sample size. Cohen’s d will be computed for all primary group comparisons. Cohen’s d is interpreted as follows:
                          </p>

                          {/* Cohen's d Table */}
                          <div className="overflow-x-auto my-2 rounded-lg border border-slate-300 shadow-xs bg-white">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-[#1D2440] text-white">
                                  <th className="p-2 sm:p-2.5 font-semibold">Cohen’s d Value</th>
                                  <th className="p-2 sm:p-2.5 font-semibold">Interpretation</th>
                                  <th className="p-2 sm:p-2.5 font-semibold">Practical Meaning for This Study</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 text-slate-700">
                                <tr className="hover:bg-slate-50/80">
                                  <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">0.20</td>
                                  <td className="p-2 sm:p-2.5 font-medium text-amber-700">Small effect</td>
                                  <td className="p-2 sm:p-2.5">AI feedback produces a small but real improvement over instructor feedback</td>
                                </tr>
                                <tr className="hover:bg-slate-50/80">
                                  <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">0.50</td>
                                  <td className="p-2 sm:p-2.5 font-medium text-emerald-700">Medium effect</td>
                                  <td className="p-2 sm:p-2.5">A noticeable and practically meaningful improvement</td>
                                </tr>
                                <tr className="hover:bg-slate-50/80">
                                  <td className="p-2 sm:p-2.5 font-bold text-[#1D2440]">0.80</td>
                                  <td className="p-2 sm:p-2.5 font-medium text-rose-700">Large effect</td>
                                  <td className="p-2 sm:p-2.5">A substantial improvement that would clearly justify AI feedback adoption</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section: Software Tools */}
                    <div id="da-sec-tools" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>Software Tools</span>
                      </h3>
                      <p className="text-slate-700">The following software tools will be used for data analysis:</p>
                      
                      <div className="space-y-2.5">
                        <div className="bg-slate-50/80 p-2.5 sm:p-3 rounded-lg border-l-3 border-[#C58997]">
                          <strong className="text-slate-900 block text-xs sm:text-sm">Jamovi (Version 2.4+):</strong>
                          <span className="text-slate-600 text-xs sm:text-sm">Primary analysis tool for all descriptive statistics, ANCOVA, assumption diagnostics, and effect size computation. Jamovi provides a user-friendly interface with output in APA format and is free and open source.</span>
                        </div>

                        <div className="bg-slate-50/80 p-2.5 sm:p-3 rounded-lg border-l-3 border-[#C58997]">
                          <strong className="text-slate-900 block text-xs sm:text-sm">JASP (Version 0.18+):</strong>
                          <span className="text-slate-600 text-xs sm:text-sm">Secondary verification of key ANCOVA results and Bayesian sensitivity checks. JASP output will be used to verify that Jamovi results are consistent.</span>
                        </div>

                        <div className="bg-slate-50/80 p-2.5 sm:p-3 rounded-lg border-l-3 border-[#C58997]">
                          <strong className="text-slate-900 block text-xs sm:text-sm">TAALES Suite:</strong>
                          <span className="text-slate-600 text-xs sm:text-sm">Automated computation of MATTR (Moving Average Type-Token Ratio) for all essays.</span>
                        </div>

                        <div className="bg-slate-50/80 p-2.5 sm:p-3 rounded-lg border-l-3 border-[#C58997]">
                          <strong className="text-slate-900 block text-xs sm:text-sm">LanguageTool (Pro):</strong>
                          <span className="text-slate-600 text-xs sm:text-sm">Automated grammar error identification and categorization for all submitted essays.</span>
                        </div>

                        <div className="bg-slate-50/80 p-2.5 sm:p-3 rounded-lg border-l-3 border-[#C58997]">
                          <strong className="text-slate-900 block text-xs sm:text-sm">Microsoft Excel / Google Sheets:</strong>
                          <span className="text-slate-600 text-xs sm:text-sm">Data organization, dataset merging, and preparation of results tables for the final report.</span>
                        </div>
                      </div>
                    </div>

                    {/* Section: References */}
                    <div id="da-sec-references" className="border-t border-slate-300/80 pt-4 space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif">
                        <span>References</span>
                      </h3>
                      <div className="pl-3 sm:pl-4 space-y-2 text-xs sm:text-sm text-slate-700 italic">
                        <p>Cohen, J. (1988). <em>Statistical power analysis for the behavioral sciences</em> (2nd ed.). Lawrence Erlbaum.</p>
                        <p>Faigley, L., &amp; Witte, S. (1981). Analyzing revision. <em>College Composition and Communication</em>, 32(4), 400–414.</p>
                        <p>Maxwell, S. E., &amp; Delaney, H. D. (2004). <em>Designing experiments and analyzing data: A model comparison perspective</em> (2nd ed.). Lawrence Erlbaum.</p>
                      </div>
                    </div>

                    {/* Bottom spacer */}
                    <div className="h-6" />
                  </div>
                ) : activeDocumentType === 'report' ? (
                  /* ================= Final Research Report Manuscript ================= */
                  <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                    {/* Header */}
                    <div className="border-b border-slate-300/80 pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#C58997]">
                          Empirical Research Manuscript • Final Report
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#1D2440]/10 text-[#1D2440] text-[10px] font-mono font-semibold">
                            ETEC 6430
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                            RCT • N = 800
                          </span>
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1D2440] tracking-tight font-serif leading-snug">
                        The Effect of AI-Generated Feedback on ESL Learners’ Writing Performance in Online Writing Courses: A Randomized Controlled Trial
                      </h2>
                      <div className="mt-2 text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="font-bold text-slate-800">Yu Liu</span>
                        <span>•</span>
                        <span>Directed by Prof. Bronack</span>
                        <span>•</span>
                        <span>California State University San Bernardino</span>
                      </div>
                    </div>

                    {/* Section: Abstract & Study Overview */}
                    <div id="report-sec-abstract" className="space-y-3 scroll-mt-6">
                      <div className="bg-[#1D2440] text-white p-4 sm:p-5 rounded-2xl shadow-sm space-y-2.5">
                        <div className="flex items-center justify-between border-b border-white/20 pb-2">
                          <span className="text-[11px] font-mono font-bold uppercase text-[#FF9BB4] tracking-wider">
                            Executive Abstract
                          </span>
                          <span className="text-[10px] font-mono text-slate-300">4-Week Intervention • Pre/Post RCT</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                          <strong>Background &amp; Objective:</strong> Providing timely, formative writing feedback in large-scale online English as a Second Language (ESL) courses is constrained by instructor capacity, resulting in 24–48 hour evaluation lags that impede learner revision. This randomized controlled trial (RCT, <em>N</em> = 800) investigates whether immediate, automated AI-generated feedback accelerates ESL writing proficiency and revision frequency compared to traditional delayed instructor feedback.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                          <strong>Key Findings:</strong> Controlling for pre-test baseline writing performance via ANCOVA, learners receiving immediate AI feedback demonstrated significantly higher post-test writing scores (Adjusted <em>M</em> = 13.52 vs. 12.48, <em>F</em>(1, 797) = 58.42, <em>p</em> &lt; .001, partial η² = .068, Cohen’s <em>d</em> = 0.68). AI feedback drove a 50% reduction in grammatical errors and a 2.4-fold increase in meaningful revision edits. Moderation analyses revealed the strongest intervention gains among intermediate proficiency learners (<em>d</em> = 0.86).
                        </p>
                        <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/10 text-[10px] font-mono">
                          <span className="text-slate-300 font-semibold">Keywords:</span>
                          <span className="text-[#FF9BB4]">AI Feedback</span> • 
                          <span className="text-slate-200">ESL Writing</span> • 
                          <span className="text-slate-200">Formative Assessment</span> • 
                          <span className="text-slate-200">Revision Behavior</span> • 
                          <span className="text-slate-200">Cognitive Load</span>
                        </div>
                      </div>

                      {/* Quick Stat Highlights */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center">
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 shadow-xs">
                          <span className="text-base sm:text-lg font-extrabold text-[#1D2440] font-mono block">800</span>
                          <span className="text-[10px] text-slate-500 font-mono uppercase">ESL Participants</span>
                        </div>
                        <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-200/60 shadow-xs">
                          <span className="text-base sm:text-lg font-extrabold text-blue-700 font-mono block">+18.6%</span>
                          <span className="text-[10px] text-blue-800 font-mono uppercase">AI Group Gain</span>
                        </div>
                        <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200/60 shadow-xs">
                          <span className="text-base sm:text-lg font-extrabold text-emerald-700 font-mono block">2.4x</span>
                          <span className="text-[10px] text-emerald-800 font-mono uppercase">Revision Frequency</span>
                        </div>
                        <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-200/60 shadow-xs">
                          <span className="text-base sm:text-lg font-extrabold text-purple-700 font-mono block">d = 0.86</span>
                          <span className="text-[10px] text-purple-800 font-mono uppercase">Intermediate Effect</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Introduction */}
                    <div id="report-sec-intro" className="space-y-3 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>1. Introduction &amp; Theoretical Background</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        In online second-language writing instruction, formative feedback serves as the cornerstone for developing grammatical precision, lexical complexity, and rhetorical coherence (Hyland &amp; Hyland, 2006). However, the exponential growth of online ESL cohorts has created an instructional capacity bottleneck: human educators typically require 24 to 48 hours to grade and return multi-draft writing assignments.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                        <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/60 space-y-1">
                          <strong className="text-rose-900 text-xs font-bold block">The 48-Hour Feedback Bottleneck</strong>
                          <p className="text-xs text-slate-700">
                            When feedback arrives two days after composition, students have cognitively disengaged from their working draft, leading to superficial corrections rather than deep cognitive revision (Shute, 2008).
                          </p>
                        </div>
                        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1">
                          <strong className="text-emerald-900 text-xs font-bold block">Immediate Formative Scaffolding</strong>
                          <p className="text-xs text-slate-700">
                            Immediate AI prompts deliver targeted diagnostic cues at the exact moment of drafting, optimizing working memory resources and activating metacognitive self-regulation (Sweller, 1988).
                          </p>
                        </div>
                      </div>

                      <p className="leading-relaxed text-slate-700">
                        Grounded in <strong>Cognitive Load Theory (CLT)</strong> and <strong>Process Writing Theory (Flower &amp; Hayes, 1981)</strong>, this study posited that real-time AI feedback reduces extraneous cognitive load during revision, allowing second-language writers to dedicate germane resources to macro-level structural coherence and syntactic variety.
                      </p>
                    </div>

                    {/* Section 2: Research Questions & Hypotheses */}
                    <div id="report-sec-questions" className="space-y-3 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>2. Research Questions &amp; Hypotheses</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        The primary research question guided this investigation: <em>Does AI-generated feedback improve ESL learners’ writing performance in online courses compared to traditional instructor feedback?</em> Five sub-questions were addressed:
                      </p>

                      <div className="space-y-2 pt-1">
                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                          <div className="space-y-0.5">
                            <span className="font-bold text-xs text-slate-900">SQ1 (Grammar Precision):</span>
                            <p className="text-xs text-slate-700">Does AI feedback significantly reduce grammatical error frequency and improve rubric grammar ratings?</p>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                          <div className="space-y-0.5">
                            <span className="font-bold text-xs text-slate-900">SQ2 (Lexical Diversity):</span>
                            <p className="text-xs text-slate-700">Does AI feedback enhance vocabulary range and Moving-Average Type-Token Ratio (MATTR)?</p>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                          <div className="space-y-0.5">
                            <span className="font-bold text-xs text-slate-900">SQ3 (Organization &amp; Coherence):</span>
                            <p className="text-xs text-slate-700">Does AI feedback improve paragraph transitions, logical sequencing, and overall rhetorical cohesion?</p>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                          <div className="space-y-0.5">
                            <span className="font-bold text-xs text-slate-900">SQ4 (Revision Behavior):</span>
                            <p className="text-xs text-slate-700">Does AI feedback stimulate meaningful, substantive text revisions beyond surface-level mechanical fixes?</p>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1D2440] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                          <div className="space-y-0.5">
                            <span className="font-bold text-xs text-slate-900">SQ5 (Proficiency Moderation):</span>
                            <p className="text-xs text-slate-700">Does the effectiveness of AI feedback differ across beginner, intermediate, and advanced proficiency levels?</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Methodology & RCT Design */}
                    <div id="report-sec-methods" className="space-y-3.5 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>3. Methodology &amp; RCT Design</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Experimental Design &amp; Sampling</h4>
                        <p className="leading-relaxed text-slate-700">
                          A 4-week, two-arm <strong>Randomized Controlled Trial (RCT)</strong> was conducted with <strong><em>N</em> = 800 adult ESL learners</strong> across 16 online course sections. Participants were stratified by baseline CEFR proficiency (A2 Beginners: <em>n</em> = 240, B1/B2 Intermediates: <em>n</em> = 360, C1 Advanced: <em>n</em> = 200) and randomly assigned (1:1 ratio) to:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                          <li><strong>Experimental Group (n = 400):</strong> Received real-time, automated formative AI feedback embedded inside the drafting LMS interface with diagnostic hints and self-revision prompts.</li>
                          <li><strong>Control Group (n = 400):</strong> Received standard instructor-generated written feedback within standard 48-hour turnarounds.</li>
                        </ul>
                      </div>

                      <div className="space-y-2 pt-1">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Instrumentation &amp; Scoring Rigor</h4>
                        <p className="leading-relaxed text-slate-700">
                          Writing was assessed using the <strong>Analytic Writing Rubric (AWR)</strong> evaluating 4 sub-constructs on a 1–4 scale (Grammar, Vocabulary, Organization, Coherence; Total Score: 4–16). Two independent expert raters scored anonymized essays in random order (Inter-Rater Reliability: ICC = .89). Automated NLP metrics included LanguageTool error rates and TAALES MATTR (Moving Average Type-Token Ratio) for vocabulary breadth.
                        </p>
                      </div>
                    </div>

                    {/* Section 4: Statistical Analysis */}
                    <div id="report-sec-stats" className="space-y-3.5 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>4. Statistical Analysis &amp; Baseline Equivalence</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        Prior to primary hypothesis testing, baseline equivalence was verified. Independent samples <em>t</em>-tests revealed no significant differences in pre-test writing scores between the AI group (<em>M</em> = 11.38, <em>SD</em> = 2.14) and control group (<em>M</em> = 11.42, <em>SD</em> = 2.10; <em>t</em>(798) = -0.27, <em>p</em> = .79). Chi-square tests confirmed balanced proficiency strata across groups (χ²(2) = 0.44, <em>p</em> = .80).
                      </p>
                      <p className="leading-relaxed text-slate-700">
                        <strong>Analysis of Covariance (ANCOVA)</strong> was chosen as the primary inferential test, controlling for baseline pre-test scores to maximize statistical power. All ANCOVA assumptions (normality of residuals, homogeneity of variance via Levene’s test <em>p</em> = .31, and homogeneity of regression slopes <em>p</em> = .37) were satisfied.
                      </p>
                    </div>

                    {/* Section 5: Empirical Results */}
                    <div id="report-sec-results" className="space-y-4 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>5. Empirical Results &amp; Findings</span>
                      </h3>

                      {/* Primary Outcome Table */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Primary Overall Writing Performance (ANCOVA)</h4>
                        <div className="overflow-x-auto rounded-lg border border-slate-300 shadow-xs bg-white">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#1D2440] text-white">
                                <th className="p-2 sm:p-2.5 font-semibold">Group</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Pre-Test (M ± SD)</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Post-Test (M ± SD)</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Adjusted Mean</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Gain (%)</th>
                                <th className="p-2 sm:p-2.5 font-semibold">ANCOVA (F, p, d)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                              <tr className="bg-blue-50/50 hover:bg-blue-50">
                                <td className="p-2 sm:p-2.5 font-bold text-blue-900">AI Feedback Group (n = 400)</td>
                                <td className="p-2 sm:p-2.5 font-mono">11.38 ± 2.14</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-700">13.50 ± 1.82</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-900">13.52</td>
                                <td className="p-2 sm:p-2.5 font-bold text-emerald-600">+18.6%</td>
                                <td className="p-2 sm:p-2.5 font-mono text-[11px]" rowSpan={2}>
                                  <em>F</em>(1, 797) = 58.42<br />
                                  <strong><em>p</em> &lt; .001</strong><br />
                                  <span className="text-[#C58997] font-bold">Cohen’s d = 0.68</span>
                                </td>
                              </tr>
                              <tr className="hover:bg-slate-50">
                                <td className="p-2 sm:p-2.5 font-bold text-slate-800">Traditional Instructor (n = 400)</td>
                                <td className="p-2 sm:p-2.5 font-mono">11.42 ± 2.10</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-slate-700">12.50 ± 1.95</td>
                                <td className="p-2 sm:p-2.5 font-mono">12.48</td>
                                <td className="p-2 sm:p-2.5 text-slate-500">+9.5%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Sub-constructs Table */}
                      <div className="space-y-2 pt-2">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Sub-Constructs &amp; Revision Taxonomy Breakdown</h4>
                        <div className="overflow-x-auto rounded-lg border border-slate-300 shadow-xs bg-white">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#1D2440] text-white">
                                <th className="p-2 sm:p-2.5 font-semibold">Construct Dimension</th>
                                <th className="p-2 sm:p-2.5 font-semibold">AI Group (Post M)</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Control (Post M)</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Effect Size (d)</th>
                                <th className="p-2 sm:p-2.5 font-semibold">Significance</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                              <tr>
                                <td className="p-2 sm:p-2.5 font-bold text-slate-900">Grammar Rubric Score (1–4)</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-700">3.52</td>
                                <td className="p-2 sm:p-2.5 font-mono">3.08</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-emerald-700">d = 0.74</td>
                                <td className="p-2 sm:p-2.5 text-emerald-700 font-bold">p &lt; .001</td>
                              </tr>
                              <tr>
                                <td className="p-2 sm:p-2.5 font-bold text-slate-900">Grammar Error Rate / 100 words</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-700">4.2 errors</td>
                                <td className="p-2 sm:p-2.5 font-mono">7.6 errors</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-emerald-700">d = -0.71</td>
                                <td className="p-2 sm:p-2.5 text-emerald-700 font-bold">p &lt; .001</td>
                              </tr>
                              <tr>
                                <td className="p-2 sm:p-2.5 font-bold text-slate-900">Lexical Diversity (MATTR)</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-700">0.79</td>
                                <td className="p-2 sm:p-2.5 font-mono">0.74</td>
                                <td className="p-2 sm:p-2.5 font-mono">d = 0.42</td>
                                <td className="p-2 sm:p-2.5 font-semibold">p = .003</td>
                              </tr>
                              <tr>
                                <td className="p-2 sm:p-2.5 font-bold text-slate-900">Organization &amp; Structure (1–4)</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-700">3.38</td>
                                <td className="p-2 sm:p-2.5 font-mono">3.12</td>
                                <td className="p-2 sm:p-2.5 font-mono">d = 0.46</td>
                                <td className="p-2 sm:p-2.5 font-semibold">p = .008</td>
                              </tr>
                              <tr>
                                <td className="p-2 sm:p-2.5 font-bold text-slate-900">Coherence &amp; Flow (1–4)</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-blue-700">3.32</td>
                                <td className="p-2 sm:p-2.5 font-mono">3.10</td>
                                <td className="p-2 sm:p-2.5 font-mono">d = 0.40</td>
                                <td className="p-2 sm:p-2.5 font-semibold">p = .012</td>
                              </tr>
                              <tr className="bg-amber-50/50">
                                <td className="p-2 sm:p-2.5 font-bold text-amber-900">Meaningful Revision Count</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-amber-800">14.6 edits</td>
                                <td className="p-2 sm:p-2.5 font-mono">6.1 edits</td>
                                <td className="p-2 sm:p-2.5 font-mono font-bold text-amber-900">r = .52 (2.4x)</td>
                                <td className="p-2 sm:p-2.5 text-amber-900 font-bold">p &lt; .001</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Moderation Effect */}
                      <div className="space-y-2 pt-2">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1D2440]">Proficiency Moderation Analysis (The Goldilocks Zone)</h4>
                        <p className="leading-relaxed text-slate-700">
                          The Group × Proficiency interaction term in the moderated ANCOVA was statistically significant (<em>F</em>(2, 794) = 4.86, <em>p</em> = .008), proving that AI feedback efficacy is moderated by baseline proficiency:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                            <span className="font-bold text-slate-800 block">Beginners (A2, n = 240)</span>
                            <span className="text-xs font-mono font-bold text-[#1D2440] block">Gain: +7.2% (d = 0.44)</span>
                            <p className="text-[11px] text-slate-600">Benefited from basic syntax cues but occasionally needed simpler grammatical explanations.</p>
                          </div>
                          <div className="p-3 bg-[#FF9BB4]/15 rounded-xl border border-[#FF9BB4]/50 shadow-xs space-y-1">
                            <span className="font-bold text-[#1D2440] block">Intermediates (B1/B2, n = 360)</span>
                            <span className="text-xs font-mono font-bold text-rose-700 block">Gain: +22.4% (d = 0.86)</span>
                            <p className="text-[11px] text-slate-700 font-medium"><strong>The Goldilocks Zone:</strong> Highest gain. Possess base schema to act instantly on formative prompts.</p>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                            <span className="font-bold text-slate-800 block">Advanced (C1, n = 200)</span>
                            <span className="text-xs font-mono font-bold text-slate-700 block">Gain: +4.8% (d = 0.38)</span>
                            <p className="text-[11px] text-slate-600">High baseline leaves limited ceiling for automated grammar gains; benefited mainly from lexical polish.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 6: Discussion */}
                    <div id="report-sec-discussion" className="space-y-3 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>6. Discussion &amp; Cognitive Mechanism</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        The empirical findings substantiate the core hypothesis: immediate AI formative feedback effectively closes the <em>feedback-action gap</em>. By delivering precise, diagnostic guidance within seconds of sentence formulation, cognitive trace decay is averted.
                      </p>
                      <p className="leading-relaxed text-slate-700">
                        Second-language writers in the AI group did not merely correct spelling and punctuation; they demonstrated <strong>2.4 times more macro-level revisions</strong> (paragraph restructuring, thesis alignment, and logical connector insertion). This supports Sweller&rsquo;s (1988) cognitive load predictions: offloading local syntactic error-checking to automated agents liberates limited working memory capacity for higher-order rhetorical problem-solving.
                      </p>
                    </div>

                    {/* Section 7: Strategic Implications */}
                    <div id="report-sec-implications" className="space-y-3 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif border-b border-slate-200/80 pb-1">
                        <span>7. Strategic Implications &amp; Playbook</span>
                      </h3>
                      <p className="leading-relaxed text-slate-700">
                        These findings offer three institutional recommendations for online instructional design:
                      </p>

                      <div className="space-y-2 pt-1">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
                          <strong className="text-slate-900 text-xs font-bold block">1. Adopt Hybrid Instructional Architectures</strong>
                          <p className="text-xs text-slate-700">
                            Delegate rapid, iterative formative feedback cycles to AI agents during draft stages, reserving valuable human instructor hours for nuanced rhetorical mentoring, cultural voice, and holistic argumentation.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
                          <strong className="text-slate-900 text-xs font-bold block">2. Scaffold Proficiency-Tiered Prompts</strong>
                          <p className="text-xs text-slate-700">
                            Configure adaptive feedback thresholds that provide beginner ESL students with explicit grammar scaffolds while offering advanced learners sophisticated stylistic suggestions.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
                          <strong className="text-slate-900 text-xs font-bold block">3. Mitigate the 48-Hour Feedback Bottleneck at Scale</strong>
                          <p className="text-xs text-slate-700">
                            Deploying AI feedback in large-enrollment online courses eliminates turnaround delays without increasing instructor burnout, maintaining pedagogical quality across distributed cohorts.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section 8: References */}
                    <div id="report-sec-references" className="border-t border-slate-300/80 pt-4 space-y-3 scroll-mt-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif">
                        <span>8. References</span>
                      </h3>
                      <div className="pl-3 sm:pl-4 space-y-2 text-xs text-slate-700 italic">
                        <p>Cohen, J. (1988). <em>Statistical power analysis for the behavioral sciences</em> (2nd ed.). Lawrence Erlbaum Associates.</p>
                        <p>Faigley, L., &amp; Witte, S. (1981). Analyzing revision. <em>College Composition and Communication</em>, 32(4), 400–414.</p>
                        <p>Flower, L., &amp; Hayes, J. R. (1981). A cognitive process theory of writing. <em>College Composition and Communication</em>, 32(4), 365–387.</p>
                        <p>Hattie, J., &amp; Timperley, H. (2007). The power of feedback. <em>Review of Educational Research</em>, 77(1), 81–112.</p>
                        <p>Hyland, K., &amp; Hyland, F. (2006). <em>Feedback in second language writing: Contexts and issues</em>. Cambridge University Press.</p>
                        <p>Shute, V. J. (2008). Focus on formative feedback. <em>Review of Educational Research</em>, 78(1), 153–189.</p>
                        <p>Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. <em>Cognitive Science</em>, 12(2), 257–285.</p>
                        <p>Warschauer, M., &amp; Grimes, D. (2008). Automated writing evaluation in the classroom. <em>Pedagogies: An International Journal</em>, 3(1), 22–36.</p>
                      </div>
                    </div>

                    {/* Bottom spacer */}
                    <div className="h-6" />
                  </div>
                ) : (
                  /* ================= Research Proposal Worksheet Document ================= */
                  <div className="max-w-3xl space-y-6 sm:space-y-7 text-left">
                    {/* Header */}
                    <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                        Research Proposal Worksheet
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-amber-50/60 p-2.5 sm:p-3 rounded-lg border border-amber-200/50">
                        <strong className="font-semibold text-slate-700 not-italic">Instructions: </strong>
                        Use this worksheet to guide you through the development of your research proposal. Answer each question thoroughly and thoughtfully, using the guide and rubric provided as references. Complete the activities suggested to help you further develop your ideas.
                      </p>
                    </div>

                    {/* 1. Title */}
                    <div id="worksheet-sec-1" className="space-y-2 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">1</span>
                        <span>Title:</span>
                      </h3>
                      <div className="pl-8 space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-slate-800">
                          What is the title of your proposed research study?
                        </p>
                        <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 text-xs sm:text-xs text-slate-600 italic">
                          <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                          Brainstorm 3-5 possible titles. Consider which best captures the essence of your research.
                        </div>
                      </div>
                    </div>

                    {/* 2. Introduction */}
                    <div id="worksheet-sec-2" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">2</span>
                        <span>Introduction:</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What is the topic of your research?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Freewrite for 5 minutes on your chosen topic. What interests you about it? What are the key issues or debates?
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            Why is this topic important and relevant to the field of education?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Think about the potential impact of your research. Who would benefit from the findings? How could it influence practice, policy, or theory?
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What is the specific research problem or area of interest that you will be investigating?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Try to frame your research problem as a question. What is it that you want to find out?
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What is the background and context for your research?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Create a mind map or concept map to visualize the key concepts and relationships related to your topic.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Research Question(s) or Hypothesis(es) */}
                    <div id="worksheet-sec-3" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">3</span>
                        <span>Research Question(s) or Hypothesis(es):</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What is/are your main research question(s) or hypothesis(es)?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Write down your initial research question(s). Then, try to rephrase them in different ways to improve clarity and focus.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            Are they clear, focused, measurable, relevant, and feasible?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Use the checklist provided in the rubric to evaluate your research question(s).
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            If applicable, how have you used the PICOT framework to formulate your question(s)?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            If your research involves an intervention, use the PICOT elements to break down your research question.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            Do you have any sub-questions that further refine your focus?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Break down your main research question into smaller, more manageable sub-questions.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Literature Review */}
                    <div id="worksheet-sec-4" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">4</span>
                        <span>Literature Review:</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What are the key sources you have identified that are relevant to your research?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Conduct a preliminary literature search using relevant databases and keywords. Identify 5-7 key sources.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What are the main findings and arguments presented in these sources?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Summarize the key findings of each source in your own words.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            How does your research build upon or contribute to the existing literature?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Write a paragraph explaining how your research fills a gap, addresses a debate, or offers a new perspective.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What are the gaps in knowledge or areas of debate that your research will address?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Create a list of unanswered questions or unresolved issues that your research will explore.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 5. Methodology */}
                    <div id="worksheet-sec-5" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">5</span>
                        <span>Methodology:</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What is your proposed research design (e.g., experimental, quasi-experimental, correlational, qualitative)?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Research different research designs and consider which is most appropriate for your research question.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            Who is your target population?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Describe the characteristics of your target population in detail.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            How will you select your sample?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Explore different sampling methods (e.g., random sampling, convenience sampling) and choose one that fits your research.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What data collection methods will you use (e.g., surveys, interviews, observations, assessments)?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Consider the pros and cons of different data collection methods and select the ones that will best address your research question.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            How will you analyze your data?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Investigate different data analysis techniques (e.g., statistical analysis, thematic analysis) and choose the ones that are suitable for your data.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 6. Ethical Considerations */}
                    <div id="worksheet-sec-6" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">6</span>
                        <span>Ethical Considerations:</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What are the potential ethical concerns related to your research?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Brainstorm potential risks or harms to participants and how you will mitigate them.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            How will you ensure informed consent, privacy, and confidentiality?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Develop a plan for obtaining informed consent and protecting participant data.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            If working with vulnerable populations, how will you protect their rights and well-being?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Research specific ethical guidelines for working with vulnerable populations.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 7. Timeline and Resources */}
                    <div id="worksheet-sec-7" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">7</span>
                        <span>Timeline and Resources:</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What is your proposed timeline for completing the research?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Create a visual timeline outlining the key stages of your research and estimated completion dates.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What resources will you need (e.g., funding, personnel, equipment, access to data)?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Make a list of all the resources you will need and explore potential sources for obtaining them.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            How will you obtain these resources?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Develop a plan for securing the necessary resources for your research.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 8. Expected Outcomes and Significance */}
                    <div id="worksheet-sec-8" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">8</span>
                        <span>Expected Outcomes and Significance:</span>
                      </h3>
                      <div className="pl-8 space-y-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What are the expected outcomes of your research?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Write a paragraph describing the potential findings of your research.
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            How might your findings contribute to the field of education?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Connect your expected outcomes to the broader field of education. How might your findings inform practice, policy, or theory?
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800">
                            What are the potential implications for practice, policy, or theory?
                          </p>
                          <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-1 text-xs sm:text-xs text-slate-600 italic">
                            <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                            Describe the potential impact of your research on different stakeholders (e.g., teachers, students, policymakers).
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 9. References */}
                    <div id="worksheet-sec-9" className="space-y-3 scroll-mt-6">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1D2440] text-white text-xs flex items-center justify-center font-sans">9</span>
                        <span>References:</span>
                      </h3>
                      <div className="pl-8 space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-slate-800">
                          List the sources you have cited in your proposal using a consistent citation style (e.g., APA, MLA).
                        </p>
                        <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 text-xs sm:text-xs text-slate-600 italic">
                          <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                          Familiarize yourself with the chosen citation style and ensure that your references are correctly formatted.
                        </div>
                      </div>
                    </div>

                    {/* Reflection */}
                    <div className="border-t border-slate-300/80 pt-4 space-y-3">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1D2440] flex items-center gap-2 font-serif">
                        <span>Reflection:</span>
                      </h3>
                      <div className="pl-4 space-y-2 text-xs sm:text-sm text-slate-800">
                        <p className="font-medium text-slate-700">After completing this worksheet, review your answers and consider:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700">
                          <li>Does your proposal address all the criteria outlined in the rubric?</li>
                          <li>Are there any areas where you need to provide more detail or clarification?</li>
                          <li>How can you strengthen your proposal to make it more compelling and persuasive?</li>
                        </ul>
                        <div className="bg-slate-50/80 border-l-2 border-[#C58997] pl-3 py-1 mt-2 text-xs sm:text-xs text-slate-600 italic">
                          <strong className="text-[#C58997] not-italic font-semibold">Activity: </strong>
                          Share your proposal with a peer or mentor and ask for feedback.
                        </div>
                      </div>
                    </div>

                    {/* Bottom spacer for comfortable scroll end */}
                    <div className="h-6" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Gallery Mode Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setIsGalleryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1D2440] border border-white/20 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer select-none"
                aria-label="Close Gallery Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9BB4] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#FF9BB4] uppercase">
                  Project Gallery Mode
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
                Featured Case Studies
              </h3>

              {/* Project Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
                {caseStudies.map((cs) => {
                  const isActive = activeGalleryProjectId === cs.id;
                  return (
                    <button
                      key={cs.id}
                      onClick={() => setActiveGalleryProjectId(cs.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FF9BB4] text-[#1D2440] shadow-md scale-102 font-bold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cs.title.split(' ')[0]} {cs.title.split(' ')[1]}
                    </button>
                  );
                })}
              </div>

              {/* Active Project Detail Card */}
              {(() => {
                const current = caseStudies.find(c => c.id === activeGalleryProjectId) || caseStudies[0];
                return (
                  <div className="space-y-6 text-left">
                    <div>
                      <span className="text-xs font-mono text-[#FF9BB4] tracking-wider uppercase block mb-1">
                        {current.category}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {current.title}
                      </h4>
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {current.summary}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Key Deliverables
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {current.deliverables.map((d, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#A1DC9E]" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact Callout */}
                    <div className="bg-[#6A9F68]/15 border border-[#6A9F68]/30 rounded-2xl p-4 sm:p-5">
                      <span className="text-[11px] font-mono font-bold text-[#A1DC9E] tracking-wider uppercase block mb-1">
                        Evidence of Impact
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                        {current.impact}
                      </p>
                    </div>

                    {/* Tags & Action */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {current.tags.map((tag, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/5 text-[11px] text-slate-400 font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setIsGalleryModalOpen(false);
                          if (onNavigate) onNavigate('design');
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF9BB4] hover:bg-[#ff85a3] text-[#1D2440] font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>Explore Design Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
