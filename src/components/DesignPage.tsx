import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'motion/react';
import folderImg from '../assets/images/Untitled_Artwork_6.png';
import notebookImg from '../assets/images/Untitled_Artwork_4.png';
import artworkFolderImg from '../assets/images/Untitled_Artwork_transparent.png';
import tornImg from '../assets/images/torn.png';
import tornJpg from '../assets/images/torn.jpg';
import notebookCoverImg from '../assets/images/Notebook 2.png';
import { PaperTear } from './PaperTear';
import { BookScroll } from './BookScroll';
import { ClientProjectDocumentsModal } from './ClientProjectDocumentsModal';
import { caseStudies } from '../data/portfolioData';
import { ChevronDown, ChevronUp, RotateCw, CheckCircle2, ArrowLeft, ArrowRight, X, Sparkles, Layers, FileText } from 'lucide-react';

interface DesignPageProps {
  onBackToHome: () => void;
  onNavigate?: (sectionId: string) => void;
}

interface StepItem {
  id: string;
  letter: string;
  name: string;
  title: string;
  items: string[];
  color: string;
}

const ADDIE_STEPS: StepItem[] = [
  {
    id: 'analyze',
    letter: 'A',
    name: 'Analyze',
    title: 'Analyze',
    items: [
      'Identify performance gaps',
      'Analyze learners',
      'Analyze context',
      'Identify constraints',
      'Clarify goals'
    ],
    color: '#FF9BB4'
  },
  {
    id: 'design',
    letter: 'D',
    name: 'Design',
    title: 'Design',
    items: [
      'Plan assessment',
      'Select instructional strategies',
      'Sequence content',
      'Select media/technology'
    ],
    color: '#A1DC9E'
  },
  {
    id: 'develop',
    letter: 'D',
    name: 'Develop',
    title: 'Develop',
    items: [
      'Create materials',
      'Develop activities',
      'Produce media',
      'Build prototypes',
      'Conduct formative review'
    ],
    color: '#FFD166'
  },
  {
    id: 'implement',
    letter: 'I',
    name: 'Implement',
    title: 'Implement',
    items: [
      'Prepare learners/instructors',
      'Deploy materials',
      'Facilitate delivery',
      'Provide support'
    ],
    color: '#6EE7B7'
  },
  {
    id: 'evaluate',
    letter: 'E',
    name: 'Evaluate',
    title: 'Evaluate',
    items: [
      'Collect evidence',
      'Assess effectiveness',
      'Conduct formative/summative evaluation',
      'Identify improvements',
      'Revise'
    ],
    color: '#93C5FD'
  }
];

export const DesignPage: React.FC<DesignPageProps> = ({ onBackToHome, onNavigate }) => {
  // Mouse Parallax Physics for Hero Title Green Folder Icon (identical to Foundation)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.1 });

  const parallaxX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const parallaxRotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const parallaxRotateY = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const parallaxRotateZ = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleFolderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleFolderMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Section 1: Scroll Pinned Animation (What is instructional design?)
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

  const folderArcX = useTransform(smoothDefProgress, [0.05, 0.58], ["0%", "117%"]);
  const folderArcY = useTransform(smoothDefProgress, [0.05, 0.32, 0.58], ["0px", "14px", "0px"]);
  const folderArcRotate = useTransform(smoothDefProgress, [0.05, 0.58], ["0deg", "-5deg"]);
  const rightCardOpacity = useTransform(smoothDefProgress, [0.58, 0.82], [0, 1]);
  const rightCardY = useTransform(smoothDefProgress, [0.58, 0.82], ["10px", "0px"]);

  // Section 2: Staircase and Strategy Comparison
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<'backward' | 'sam' | null>(null);

  const handleSelectModel = (model: 'backward' | 'sam') => {
    setActiveModel((prev) => (prev === model ? null : model));
  };

  // Section 3: Interactive Book & Gallery Modal State (From Model to Practice)
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docModalTab, setDocModalTab] = useState<'client-topic' | 'model-selection' | 'goals-skills-analysis' | 'design-report' | 'presentation-slides'>('client-topic');
  const [activeGalleryProjectId, setActiveGalleryProjectId] = useState<string>('interactive-microlearning');

  const handleGalleryClick = (projectId?: string) => {
    if (projectId === 'interactive-microlearning') {
      setActiveGalleryProjectId('interactive-microlearning');
      setDocModalTab('client-topic');
      setIsDocModalOpen(true);
    } else if (projectId === 'gamified-onboarding') {
      setActiveGalleryProjectId('gamified-onboarding');
      setDocModalTab('goals-skills-analysis');
      setIsDocModalOpen(true);
    } else if (projectId === 'accessible-stem') {
      setActiveGalleryProjectId('accessible-stem');
      setDocModalTab('design-report');
      setIsDocModalOpen(true);
    } else if (projectId === 'all' || projectId === 'presentation-slides') {
      setActiveGalleryProjectId('presentation-slides');
      setDocModalTab('presentation-slides');
      setIsDocModalOpen(true);
    } else if (projectId) {
      setActiveGalleryProjectId(projectId);
      setIsGalleryModalOpen(true);
    } else {
      setIsGalleryModalOpen(true);
    }
  };

  // Connector Lines Measurement
  const diagramContainerRef = useRef<HTMLDivElement>(null);

  // References for ADDIE Steps
  const stepA_Ref = useRef<HTMLDivElement>(null);
  const stepD1_Ref = useRef<HTMLDivElement>(null);
  const stepD2_Ref = useRef<HTMLDivElement>(null);
  const stepI_Ref = useRef<HTMLDivElement>(null);
  const stepE_Ref = useRef<HTMLDivElement>(null);

  // References for Backward Design Stages
  const bdStage1_Ref = useRef<HTMLDivElement>(null);
  const bdStage2_Ref = useRef<HTMLDivElement>(null);
  const bdStage3_Ref = useRef<HTMLDivElement>(null);

  // References for SAM Phases
  const samPhase1_Ref = useRef<HTMLDivElement>(null);
  const samPhase2_Ref = useRef<HTMLDivElement>(null);
  const samPhase3_Ref = useRef<HTMLDivElement>(null);
  const samTabRef = useRef<HTMLButtonElement>(null);

  // Reference for Right Column and dynamic positioning
  const rightColRef = useRef<HTMLDivElement>(null);
  const [buttonsTop, setButtonsTop] = useState<number | null>(null);
  const [stagePositions, setStagePositions] = useState<{
    stage3Top: number;
    stage2Top: number;
    stage1Top: number;
  } | null>(null);
  const [samPositions, setSamPositions] = useState<{
    phase3Top: number;
    phase2Top: number;
    phase1Top: number;
    phase3Left?: number;
    phase3Width?: number;
    phase2Left?: number;
  } | null>(null);

  interface LineCoord {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    label?: string;
    labelOffsetX?: number;
    labelOffsetY?: number;
  }

  const [lines, setLines] = useState<LineCoord[]>([]);

  const updateConnectingLines = () => {
    if (!diagramContainerRef.current) return;
    const containerRect = diagramContainerRef.current.getBoundingClientRect();

    // Dynamically calculate Design top and Analyze bottom relative to right column
    const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
    let computedPositions = stagePositions;
    let computedSam = samPositions;

    if (isDesktop && stepD1_Ref.current && stepA_Ref.current && rightColRef.current) {
      const d1Rect = stepD1_Ref.current.getBoundingClientRect();
      const aRect = stepA_Ref.current.getBoundingClientRect();
      const rightRect = rightColRef.current.getBoundingClientRect();

      const dTop = d1Rect.top - rightRect.top;
      const aBottom = aRect.bottom - rightRect.top;

      // Stage box heights (fixed 50px each)
      const h3 = bdStage3_Ref.current ? bdStage3_Ref.current.offsetHeight : 50;
      const h2 = bdStage2_Ref.current ? bdStage2_Ref.current.offsetHeight : 50;
      const h1 = bdStage1_Ref.current ? bdStage1_Ref.current.offsetHeight : 50;

      // 1. Stage 3 shifted upward by 2% of right column height
      const shift2Percent = rightRect.height * 0.02;
      const s3Top = dTop - shift2Percent;
      // 2. Stage 1 bottom aligns with Analyze bottom: s1Top + h1 = aBottom => s1Top = aBottom - h1
      const s1Top = aBottom - h1;

      // 3. Stage 2 in between Stage 3 and Stage 1 with equal gap:
      const totalSpan = aBottom - s3Top;
      const totalBoxHeight = h1 + h2 + h3;
      const gap = (totalSpan - totalBoxHeight) / 2;

      const s2Top = s3Top + h3 + gap;

      computedPositions = {
        stage3Top: s3Top,
        stage2Top: s2Top,
        stage1Top: s1Top,
      };
      setStagePositions(computedPositions);
      setButtonsTop(aBottom);

      // SAM positions aligned with corresponding ADDIE steps
      if (stepE_Ref.current && stepD2_Ref.current && stepA_Ref.current && rightColRef.current) {
        const eRect = stepE_Ref.current.getBoundingClientRect();
        const d2Rect = stepD2_Ref.current.getBoundingClientRect();
        const aRect = stepA_Ref.current.getBoundingClientRect();

        // 1. Phase 3: centerline aligned with the boundary line between Evaluate and Implement (Phase 3的中线与Evaluate和Implement的交界线对齐)
        const boundaryE_I = eRect.bottom - rightRect.top;
        const p3Top = boundaryE_I - 116 / 2;

        // 2. Phase 2: centerline aligned with Design (D1) top edge (Phase 2的中线与Design的上方对齐)
        const p2Top = dTop - 116 / 2;
        // Shift Phase 2 right by 8% (3% + 5% additional) of the diagram canvas width
        const p2Left = Math.max(96, Math.round(containerRect.width * 0.08));

        // 3. Phase 1: corresponds to Analyze step (centered on Analyze)
        const aCenterY = aRect.top - rightRect.top + aRect.height / 2;
        const p1Top = aCenterY - 46 / 2;

        // 4. Phase 3: Left edge aligns with SAM Model tab left edge (Phase 3的左方与SAM Model左方对齐)
        let p3Left = rightRect.width * 0.5 + 8;
        let p3Width = rightRect.width * 0.5 - 8;
        if (samTabRef.current) {
          const samTabRect = samTabRef.current.getBoundingClientRect();
          p3Left = samTabRect.left - rightRect.left;
          p3Width = samTabRect.width;
        }

        computedSam = {
          phase3Top: p3Top,
          phase2Top: p2Top,
          phase1Top: p1Top,
          phase3Left: p3Left,
          phase3Width: p3Width,
          phase2Left: p2Left,
        };
        setSamPositions(computedSam);
      }
    } else if (stepA_Ref.current && rightColRef.current) {
      const aRect = stepA_Ref.current.getBoundingClientRect();
      const rightRect = rightColRef.current.getBoundingClientRect();
      setButtonsTop(aRect.bottom - rightRect.top);
    }

    const getAnchor = (el: HTMLElement | null, side: 'left' | 'right' = 'right', offsetY = 0) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        x: side === 'right' ? rect.right - containerRect.left : rect.left - containerRect.left,
        y: rect.top - containerRect.top + rect.height / 2 + offsetY,
      };
    };

    const pA = getAnchor(stepA_Ref.current, 'right');
    const pD1 = getAnchor(stepD1_Ref.current, 'right');
    const pD2 = getAnchor(stepD2_Ref.current, 'right');
    const pI = getAnchor(stepI_Ref.current, 'right');
    const pE = getAnchor(stepE_Ref.current, 'right');

    if (!activeModel) {
      setLines([]);
      return;
    }

    const newLines: LineCoord[] = [];

    if (activeModel === 'backward') {
      const rightRect = rightColRef.current?.getBoundingClientRect();
      const pStage1Left = bdStage1_Ref.current ? getAnchor(bdStage1_Ref.current, 'left')?.x : (rightRect ? rightRect.left - containerRect.left : null);
      const pStage2Left = bdStage2_Ref.current ? getAnchor(bdStage2_Ref.current, 'left')?.x : (rightRect ? rightRect.left - containerRect.left : null);
      const pStage3Left = bdStage3_Ref.current ? getAnchor(bdStage3_Ref.current, 'left')?.x : (rightRect ? rightRect.left - containerRect.left : null);

      const h3 = bdStage3_Ref.current ? bdStage3_Ref.current.offsetHeight : 50;
      const h2 = bdStage2_Ref.current ? bdStage2_Ref.current.offsetHeight : 50;
      const h1 = bdStage1_Ref.current ? bdStage1_Ref.current.offsetHeight : 50;

      const stage3CenterY = computedPositions && rightRect 
        ? rightRect.top - containerRect.top + computedPositions.stage3Top + h3 / 2
        : (getAnchor(bdStage3_Ref.current, 'left')?.y ?? null);
      const stage2CenterY = computedPositions && rightRect 
        ? rightRect.top - containerRect.top + computedPositions.stage2Top + h2 / 2
        : (getAnchor(bdStage2_Ref.current, 'left')?.y ?? null);
      const stage1CenterY = computedPositions && rightRect 
        ? rightRect.top - containerRect.top + computedPositions.stage1Top + h1 / 2
        : (getAnchor(bdStage1_Ref.current, 'left')?.y ?? null);

      // Backward Design stages correspond to Analyze and Design steps:
      // Stage 1 (Identify Desired Results) connects horizontally from Analyze (A)
      if (pA && typeof pStage1Left === 'number' && typeof stage1CenterY === 'number') {
        newLines.push({
          id: 'a-stage1',
          x1: pA.x,
          y1: stage1CenterY,
          x2: pStage1Left,
          y2: stage1CenterY,
          label: 'Translate Needs into Desired Outcomes',
        });
      }

      // Bottom-right corner coordinates of Design (D1) step block
      const d1Rect = stepD1_Ref.current ? stepD1_Ref.current.getBoundingClientRect() : null;
      const d1BottomRightX = d1Rect ? d1Rect.right - containerRect.left : (pD1 ? pD1.x : null);
      const d1BottomRightY = d1Rect ? d1Rect.bottom - containerRect.top : null;

      // Stage 2 (Determine Acceptable Evidence) connects from Design (D1)
      // Keep starting point at least 16px above Design's bottom-right corner so it never overlaps with Stage 1 diagonal line
      const stage2StartY = typeof stage2CenterY === 'number' && typeof d1BottomRightY === 'number'
        ? Math.min(stage2CenterY, d1BottomRightY - 16)
        : (stage2CenterY ?? (pD1 ? pD1.y : null));

      if (pD1 && typeof pStage2Left === 'number' && typeof stage2CenterY === 'number' && typeof stage2StartY === 'number') {
        newLines.push({
          id: 'd1-stage2',
          x1: pD1.x,
          y1: stage2StartY,
          x2: pStage2Left,
          y2: stage2CenterY,
          label: 'Align Evidence with Outcomes',
        });
      }

      // Stage 3 (Plan Learning Experiences and Instruction) connects horizontally from Design (D1)
      if (pD1 && typeof pStage3Left === 'number' && typeof stage3CenterY === 'number') {
        newLines.push({
          id: 'd1-stage3',
          x1: pD1.x,
          y1: stage3CenterY,
          x2: pStage3Left,
          y2: stage3CenterY,
          label: 'Design Learning for the Outcomes',
        });
      }

      // Diagonal line branched strictly from Design (D1) bottom-right corner to Stage 1 (Identify Desired Results)
      if (typeof d1BottomRightX === 'number' && typeof d1BottomRightY === 'number' && typeof pStage1Left === 'number' && typeof stage1CenterY === 'number') {
        newLines.push({ id: 'd1-stage1', x1: d1BottomRightX, y1: d1BottomRightY, x2: pStage1Left, y2: stage1CenterY });
      }
    } else {
      const rightRect = rightColRef.current?.getBoundingClientRect();
      const pPhase1Left = samPhase1_Ref.current 
        ? getAnchor(samPhase1_Ref.current, 'left')?.x 
        : (rightRect ? rightRect.left - containerRect.left : null);
      const pPhase2Left = computedSam?.phase2Left !== undefined && rightRect
        ? rightRect.left - containerRect.left + computedSam.phase2Left
        : (samPhase2_Ref.current 
            ? getAnchor(samPhase2_Ref.current, 'left')?.x 
            : (rightRect ? rightRect.left - containerRect.left + 96 : null));
      const pPhase3Left = computedSam?.phase3Left !== undefined && rightRect
        ? rightRect.left - containerRect.left + computedSam.phase3Left
        : (samPhase3_Ref.current 
            ? getAnchor(samPhase3_Ref.current, 'left')?.x 
            : (rightRect ? rightRect.left - containerRect.left + (rightRect.width * 0.5 + 8) : null));

      const p1CenterY = computedSam && rightRect
        ? rightRect.top - containerRect.top + computedSam.phase1Top + 46 / 2
        : (getAnchor(samPhase1_Ref.current, 'left')?.y ?? (pA ? pA.y : null));

      const p2TopY = computedSam && rightRect
        ? rightRect.top - containerRect.top + computedSam.phase2Top
        : (samPhase2_Ref.current ? samPhase2_Ref.current.getBoundingClientRect().top - containerRect.top : null);

      const p3CenterY = computedSam && rightRect
        ? rightRect.top - containerRect.top + computedSam.phase3Top + 116 / 2
        : (samPhase3_Ref.current ? samPhase3_Ref.current.getBoundingClientRect().top - containerRect.top + 116 / 2 : null);

      const p3TopY = computedSam && rightRect
        ? rightRect.top - containerRect.top + computedSam.phase3Top + 26
        : (samPhase3_Ref.current ? samPhase3_Ref.current.getBoundingClientRect().top - containerRect.top + 26 : null);

      const p3BotY = computedSam && rightRect
        ? rightRect.top - containerRect.top + computedSam.phase3Top + 116 - 14
        : (samPhase3_Ref.current ? samPhase3_Ref.current.getBoundingClientRect().bottom - containerRect.top - 14 : null);

      // Phase 1 (Preparation Phase) connects horizontally from Analyze (A) to Phase 1 left edge
      if (pA && typeof pPhase1Left === 'number' && typeof p1CenterY === 'number') {
        newLines.push({
          id: 'a-phase1',
          x1: pA.x,
          y1: pA.y,
          x2: pPhase1Left,
          y2: p1CenterY,
          label: 'Gather Information Quickly',
        });
      }

      // Phase 2 (Iterative Design Phase) connects with Develop (D2), Design (D1), and Evaluate (E)
      if (typeof pPhase2Left === 'number') {
        // Develop connects horizontally straight to Phase 2 (Design和Develop连接Phase 2，连接线尽量是直线，与连接Phase 3的线错开起始点)
        if (pD2) {
          newLines.push({
            id: 'd2-phase2',
            x1: pD2.x,
            y1: pD2.y + 14,
            x2: pPhase2Left,
            y2: pD2.y + 14,
            label: 'Early development',
          });
        }
        // Design connects horizontally straight to Phase 2 (Design不连接Phase 3)
        if (pD1) {
          newLines.push({
            id: 'd1-phase2',
            x1: pD1.x,
            y1: pD1.y,
            x2: pPhase2Left,
            y2: pD1.y,
            label: 'Prototype',
          });
        }
        // Evaluate connects diagonally to Phase 2 top edge (Evaluate斜线连接Phase 2)
        if (pE && typeof p2TopY === 'number') {
          newLines.push({
            id: 'e-phase2',
            x1: pE.x,
            y1: pE.y + 14,
            x2: pPhase2Left + 36,
            y2: p2TopY,
            label: 'Gather formative feedback',
          });
        }
      }

      // Phase 3 (Iterative Development Phase) connects from Evaluate (E), Implement (I), and Develop (D2)
      if (typeof pPhase3Left === 'number') {
        // Evaluate connects with horizontal straight line (Evaluate和Implement连接Phase 3用直线)
        if (pE) {
          newLines.push({
            id: 'e-phase3',
            x1: pE.x,
            y1: pE.y,
            x2: pPhase3Left,
            y2: pE.y,
            label: 'formative evaluation',
          });
        }
        // Implement connects with horizontal straight line, shifted upward so it never intersects with Develop line
        if (pI) {
          const iPhase3Y = pI.y - 32;
          newLines.push({
            id: 'i-phase3',
            x1: pI.x,
            y1: iPhase3Y,
            x2: pPhase3Left,
            y2: iPhase3Y,
            label: 'Test in Practice',
          });
        }
        // Develop connects diagonally to Phase 3 (Develop连接Phase 3用斜线，与Phase 2连线起始点错开不重叠)
        if (pD2 && typeof p3BotY === 'number') {
          newLines.push({
            id: 'd2-phase3',
            x1: pD2.x,
            y1: pD2.y - 18,
            x2: pPhase3Left,
            y2: p3BotY,
            label: 'Build & Refine',
          });
        }
      }
    }

    setLines(newLines);
  };

  useEffect(() => {
    updateConnectingLines();
    const handleResize = () => updateConnectingLines();
    window.addEventListener('resize', handleResize);
    
    // Multiple intervals to ensure lines update as animations expand/collapse
    const t1 = setTimeout(updateConnectingLines, 60);
    const t2 = setTimeout(updateConnectingLines, 220);
    const t3 = setTimeout(updateConnectingLines, 500);

    // ResizeObserver for dynamic layout changes
    let observer: ResizeObserver | null = null;
    if (diagramContainerRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateConnectingLines();
      });
      observer.observe(diagramContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (observer) observer.disconnect();
    };
  }, [activeModel, expandedStepId]);

  return (
    <motion.div
      id="design-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen bg-[#1D2440] text-white flex flex-col items-center pt-24 sm:pt-28 pb-0 selection:bg-[#FF9BB4] selection:text-[#1D2440]"
    >
      {/* ========================================================================= */}
      {/* 1. Page Main Title: "What I can do" (Exact same structure & physics as Foundation) */}
      {/* ========================================================================= */}
      <div 
        id="design-title-hero-section"
        className="relative w-full max-w-5xl mx-auto px-6 h-[72vh] min-h-[460px] max-h-[640px] flex flex-col items-center justify-center text-center -translate-y-[6vh]"
      >
        <h1 
          id="design-hero-title"
          className="relative inline-flex items-center justify-center select-none flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-0"
        >
          {/* Layer 1: What I (Bottom Layer, z-10) */}
          <span 
            id="design-title-what-i"
            className="relative z-10 text-[#FF9BB4] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans mr-2 sm:mr-0"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            What I
          </span>

          {/* Layer 2: Green Folder Icon (Middle Layer, z-20, fly-in landing + floating parallax + interactive mouse parallax) */}
          <motion.div 
            id="design-title-folder"
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
            {/* Interactive Mouse Parallax Layer */}
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
              {/* Floating Parallax Swaying Loop */}
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
                  src={notebookImg} 
                  alt="Design Green Notebook" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Layer 3: can do (Top Layer, z-30) */}
          <span 
            id="design-title-can-do"
            className="relative z-30 text-[#FF9BB4] font-black text-5xl sm:text-7xl md:text-[95px] lg:text-[120px] tracking-tight leading-none font-sans ml-2 sm:ml-0"
            style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
          >
            can do
          </span>
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* 2. Section: "What is instructional design?" (Pinned Scroll Animation Track) */}
      {/* ========================================================================= */}
      <div 
        ref={definitionTrackRef} 
        id="design-definition-scroll-track"
        className="relative w-full h-[220vh] -mt-[14vh]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-14 sm:pt-20 lg:pt-24 overflow-hidden">
          <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 
              id="design-definition-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-center mb-8 md:mb-12 tracking-tight leading-tight flex flex-row items-center justify-center gap-x-2 sm:gap-x-3.5 flex-nowrap whitespace-nowrap"
            >
              <span className="text-white font-black">What is</span>
              <span className="text-[#FF9BB4] font-black">instructional design?</span>
            </h2>

            {/* Two Manila Kraft Folder Quote Cards */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch justify-center w-full mx-auto relative">
              
              {/* Left Definition Column (Shifted upward by 7%) */}
              <div className="relative flex items-center justify-start -translate-y-[7%]">
                
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
                    className="relative w-full aspect-[3508/2480] -translate-x-[25%] origin-top-left scale-[1.35] filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
                  >
                    <img 
                      src={artworkFolderImg} 
                      alt="Instructional Design Definition Manila Folder" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                  </div>
                </motion.div>

                {/* Layer 2: Static Quote Text and Citation Badge */}
                <div 
                  id="design-quote-card-left"
                  className="relative z-20 w-full aspect-[3508/2480] -translate-x-[25%] origin-top-left scale-[1.35]"
                >
                  {/* Text Overlay centered in the beige folder with 5% downward offset */}
                  <div className="absolute inset-0 px-[14%] sm:px-[16%] py-[12%] flex flex-col items-center justify-center text-center translate-y-[5%]">
                    <blockquote 
                      id="design-quote-left-blockquote"
                      className="text-[20px] font-bold leading-[28px] tracking-normal font-sans text-white drop-shadow-sm select-text"
                    >
                      “Instructional design is a system of procedures for developing education and training materials consistently and reliably.”
                    </blockquote>
                  </div>

                  {/* Green Tape / Citation Badge positioned at top-left corner shifted down by 5% */}
                  <div className="absolute top-[13%] left-[10%] rotate-[-4deg] bg-[#6A9F68] text-white font-bold text-[clamp(9px,0.9vw,12px)] px-3 py-1.5 rounded-sm shadow-md border border-[#568754]/80 select-none">
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
                className="relative z-20 flex flex-col justify-center translate-x-[10%]"
              >
                <div className="relative w-full translate-y-16 sm:translate-y-[70px]">
                  <blockquote 
                    id="design-quote-card-right-text"
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                    className="text-[26px] font-bold leading-[38.6px] tracking-normal text-black select-text antialiased"
                  >
                    “Instructional design is a learner-centered process that uses creativity and evidence to create meaningful, measurable, and continuously improved learning experiences.”
                  </blockquote>
                </div>

                {/* Green "Yu Liu" Tape Tag positioned at bottom-left corner of beige folder shifted down */}
                <div className="self-start mt-8 sm:mt-10 -rotate-[3deg] scale-[1.1] origin-left bg-[#6A9F68] px-4 py-1.5 rounded-sm shadow-md border border-[#568754]/80 select-none translate-y-16 sm:translate-y-[70px]">
                  <span 
                    className="text-white font-black text-xs sm:text-sm tracking-wide block"
                    style={{ color: '#FFFFFF', opacity: 1 }}
                  >
                    Yu Liu
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Subtle Downward Indicator Chevron */}
            <div className="relative z-30 flex justify-center mt-6 sm:mt-8 translate-y-[190%] pointer-events-none">
              <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-slate-400/80 animate-bounce filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Section 2: "One Process, Multiple Design Strategies" & Staircase */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        
        {/* H2 Title: centered on the screen on a single line, shifted upward by 5% */}
        <div className="w-full mb-10 sm:mb-14 flex items-center justify-center text-center -translate-y-6 sm:-translate-y-8">
          <h2 
            id="design-strategies-title"
            className="font-black text-white tracking-tight text-center whitespace-nowrap flex flex-row items-center justify-center gap-x-2 sm:gap-x-3.5 flex-nowrap"
            style={{ 
              fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: '1.2'
            }}
          >
            <span>One Process,</span> <span className="text-[#FF9BB4]">Multiple Design Strategies</span>
          </h2>
        </div>

        <div ref={diagramContainerRef} className="relative w-full">
          
          {/* Dynamic SVG Connection Lines Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible hidden md:block">
            {lines.map((line) => {
              // Direct straight line between (x1, y1) and (x2, y2)
              const pathD = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;
              const dx = line.x2 - line.x1;
              const dy = line.y2 - line.y1;
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);
              const midX = (line.x1 + line.x2) / 2 + (line.labelOffsetX || 0);
              const midY = (line.y1 + line.y2) / 2 + (line.labelOffsetY || 0);

              return (
                <g key={line.id}>
                  {/* Thin 0.5px Pure White Line */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Clean White Anchor Pins */}
                  <circle cx={line.x1} cy={line.y1} r="2" fill="#FFFFFF" />
                  <circle cx={line.x2} cy={line.y2} r="2" fill="#FFFFFF" />

                  {/* Small White Label Text on connecting line */}
                  {line.label && (
                    <motion.text
                      x={midX}
                      y={midY}
                      transform={Math.abs(angle) > 2 ? `rotate(${angle.toFixed(1)}, ${midX}, ${midY})` : undefined}
                      dy={line.labelOffsetY !== undefined ? 0 : -6}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      className="text-[10px] sm:text-[10.5px] font-medium tracking-tight fill-white select-none pointer-events-none"
                      style={{
                        filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.9))',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {line.label}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Two-Column Grid: Left Staircase & Right Model Strategy Panes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            
            {/* LEFT COLUMN (Span 6): Five-Step Staircase Graphic */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              
              {/* Five-Step Seamless Pink Staircase (每个长方形色块拼接成楼梯，analyze右上角接design左下角，以此类推) */}
              <div className="w-full relative h-[560px] min-h-[560px]">
                <div className="relative h-[480px] w-full" style={{ perspective: 1200 }}>
                  
                  {/* Render 5 pink rectangular steps joined corner-to-corner into a continuous staircase with bottom-to-top unfolding */}
                  {[...ADDIE_STEPS].reverse().map((step, revIdx) => {
                    // Actual index in bottom-up: revIdx 0 is Evaluate (idx 4), revIdx 4 is Analyze (idx 0)
                    const stepIndex = 4 - revIdx;
                    const isExpanded = expandedStepId === step.id;

                    // Reference mapping for connecting lines
                    const assignRef = (el: HTMLDivElement | null) => {
                      if (step.id === 'analyze') (stepA_Ref as any).current = el;
                      if (step.id === 'design') (stepD1_Ref as any).current = el;
                      if (step.id === 'develop') (stepD2_Ref as any).current = el;
                      if (step.id === 'implement') (stepI_Ref as any).current = el;
                      if (step.id === 'evaluate') (stepE_Ref as any).current = el;
                    };

                    // Block dimensions: width W = 96px, height H = 96px
                    // Corner-to-corner seamless staircase geometry:
                    const stepWidth = 96;
                    const stepHeight = 96;
                    const stepLeft = stepIndex * stepWidth;
                    const stepTop = (4 - stepIndex) * stepHeight;

                    return (
                      <motion.div 
                        key={step.id} 
                        className="absolute"
                        style={{ 
                          left: `${stepLeft}px`, 
                          top: `${stepTop}px`,
                          width: `${stepWidth}px`,
                          height: `${stepHeight}px`,
                          transformOrigin: 'bottom center',
                        }}
                        initial={{ 
                          opacity: 0, 
                          rotateX: -75, 
                          scaleY: 0.15,
                          y: 36,
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          rotateX: 0, 
                          scaleY: 1,
                          y: 0,
                        }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: stepIndex * 0.12, 
                          ease: [0.22, 1, 0.36, 1] 
                        }}
                        onAnimationComplete={() => {
                          updateConnectingLines();
                        }}
                      >
                        {/* Step Letter Above the Pink Block (紧贴粉色色块的上边，左方与粉色色块左方对齐，20号 Impact 字体) */}
                        <span 
                          className="absolute bottom-full left-0 mb-0 translate-y-[2px] z-20 text-[20px] text-white select-none leading-none pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                          style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
                        >
                          {step.letter}
                        </span>

                        {/* Pink Solid Rectangular Step Block (粉色长方形色块) */}
                        <div
                          ref={assignRef}
                          onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                          className={`w-full h-full bg-[#FF9BB4] border border-[#FF80A0] shadow-md flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-all duration-200 relative z-10 ${
                            isExpanded 
                              ? 'ring-2 ring-white shadow-[0_0_20px_rgba(255,155,180,0.6)] brightness-105' 
                              : 'hover:brightness-105 hover:shadow-lg'
                          }`}
                        >
                          {/* Step Name in bold dark navy text for high contrast */}
                          <span className="font-black text-sm sm:text-base text-[#1D2440] tracking-wide text-center leading-tight">
                            {step.title}
                          </span>

                          {/* Key Tasks Sub-label with Toggle Chevron */}
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#1D2440]/75">
                            <span>{isExpanded ? 'Close' : 'Key Tasks'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3 text-[#1D2440]" />
                            ) : (
                              <ChevronDown className="w-3 h-3 text-[#1D2440]" />
                            )}
                          </div>
                        </div>

                        {/* Expandable Panel: Expands Upward (向上展开) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.96 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute bottom-full left-0 mb-2 w-[270px] sm:w-[290px] bg-[#1A2035] border-2 border-[#FF9BB4] rounded-2xl p-4 shadow-[0_16px_36px_rgba(0,0,0,0.65)] z-40 backdrop-blur-md"
                            >
                              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                                <span className="text-xs font-mono font-bold text-[#FF9BB4] uppercase tracking-wider">
                                  {step.name} Key Tasks
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedStepId(null);
                                  }}
                                  className="text-slate-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                              <ul className="space-y-1.5 text-left">
                                {step.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-100 font-medium leading-snug">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9BB4] flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}

                </div>

                {/* ADDIE Model Card (Placed directly below Analyze, left-aligned with Analyze) */}
                <motion.div 
                  className="absolute left-0 transition-all duration-150"
                  style={{ top: buttonsTop !== null ? `calc(${buttonsTop}px + 3%)` : 'calc(480px + 3%)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    id="card-addie-model"
                    className="px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-white/20 bg-transparent flex flex-col justify-center text-left relative transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
                  >
                    <span 
                      className="font-extrabold text-white tracking-tight truncate block"
                      style={{ fontSize: '20px', lineHeight: '26px' }}
                    >
                      ADDIE Model
                    </span>
                    <span 
                      className="font-bold text-[#FF9BB4] mt-0.5 truncate block"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      Structure the Process
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* RIGHT COLUMN (Span 6): Fixed stable height (560px) preventing any layout shifting */}
            <div ref={rightColRef} className="lg:col-span-6 relative w-full h-[560px] min-h-[560px]">
              
              {/* Dynamic Interactive Model Views (Aligned horizontally with ADDIE staircase) */}
              <AnimatePresence mode="wait">
                {activeModel === 'backward' && (
                  <motion.div
                    key="backward-view"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    {/* Stage 3: Plan Learning Experiences and Instruction (Shifted upward by 2% from Design) */}
                    <motion.div
                      ref={bdStage3_Ref}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                      style={{ top: stagePositions ? `${stagePositions.stage3Top}px` : '415px' }}
                      className="absolute left-0 w-fit max-w-[85%] h-[50px] px-4 sm:px-5 py-2.5 rounded-2xl bg-[#252E4D]/90 border border-white/20 shadow-lg text-left transition-all hover:border-[#FFD166]/60 flex items-center gap-3 sm:gap-3.5"
                    >
                      <span className="px-2.5 py-1 rounded bg-[#FFD166]/15 border border-[#FFD166]/40 text-[#FFD166] font-mono text-xs font-bold uppercase tracking-wider shrink-0">
                        Stage 3
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug whitespace-nowrap">
                        Plan Learning Experiences and Instruction
                      </h4>
                    </motion.div>

                    {/* Stage 2: Determine Acceptable Evidence (Centered between Stage 3 and Stage 1 with equal spacing) */}
                    <motion.div
                      ref={bdStage2_Ref}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{ top: stagePositions ? `${stagePositions.stage2Top}px` : '494px' }}
                      className="absolute left-0 w-fit max-w-[85%] h-[50px] px-4 sm:px-5 py-2.5 rounded-2xl bg-[#252E4D]/90 border border-white/20 shadow-lg text-left transition-all hover:border-[#A1DC9E]/60 flex items-center gap-3 sm:gap-3.5"
                    >
                      <span className="px-2.5 py-1 rounded bg-[#A1DC9E]/15 border border-[#A1DC9E]/40 text-[#A1DC9E] font-mono text-xs font-bold uppercase tracking-wider shrink-0">
                        Stage 2
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug whitespace-nowrap">
                        Determine Acceptable Evidence
                      </h4>
                    </motion.div>

                    {/* Stage 1: Identify Desired Results (Bottom aligned with Analyze Step A bottom) */}
                    <motion.div
                      ref={bdStage1_Ref}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ top: stagePositions ? `${stagePositions.stage1Top}px` : '572px' }}
                      className="absolute left-0 w-fit max-w-[85%] h-[50px] px-4 sm:px-5 py-2.5 rounded-2xl bg-[#252E4D]/90 border border-white/20 shadow-lg text-left transition-all hover:border-[#FF9BB4]/60 flex items-center gap-3 sm:gap-3.5"
                    >
                      <span className="px-2.5 py-1 rounded bg-[#FF9BB4]/15 border border-[#FF9BB4]/40 text-[#FF9BB4] font-mono text-xs font-bold uppercase tracking-wider shrink-0">
                        Stage 1
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug whitespace-nowrap">
                        Identify Desired Results
                      </h4>
                    </motion.div>
                  </motion.div>
                )}

                {/* MODEL B: Successive Approximation Model (SAM) */}
                {activeModel === 'sam' && (
                  <motion.div
                    key="sam-view"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative text-left"
                  >
                  {/* Phase 3: Iterative Development Phase (Yellow Theme, connects with I, E) */}
                  <motion.div
                    ref={samPhase3_Ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      top: samPositions ? `${samPositions.phase3Top}px` : '38px',
                      left: samPositions?.phase3Left !== undefined ? `${samPositions.phase3Left}px` : 'calc(50% + 8px)',
                      width: samPositions?.phase3Width ? `${samPositions.phase3Width}px` : 'calc(50% - 8px)',
                    }}
                    className="absolute h-[116px] px-2 py-2 rounded-2xl bg-[#252E4D]/90 border border-white/20 shadow-lg flex flex-col justify-center transition-all hover:border-[#FFD166]/60 overflow-hidden"
                  >
                    {/* 2x2 Clockwise Circular Loop in Yellow */}
                    <div 
                      className="relative w-[286px] h-[92px] mx-auto select-none shrink-0"
                      style={{ 
                        transform: samPositions?.phase3Width && samPositions.phase3Width < 296 
                          ? `scale(${Math.max(0.75, (samPositions.phase3Width - 12) / 286)})` 
                          : undefined 
                      }}
                    >
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 286 92">
                        <defs>
                          <marker id="arrow-p3-r" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#FFD166" />
                          </marker>
                          <marker id="arrow-p3-d" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#FFD166" />
                          </marker>
                          <marker id="arrow-p3-l" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#FFD166" />
                          </marker>
                          <marker id="arrow-p3-u" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#FFD166" />
                          </marker>
                        </defs>
                        {/* Top: Develop -> Implement */}
                        <line x1="72" y1="11" x2="200" y2="11" stroke="#FFD166" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p3-r)" />
                        {/* Right: Implement -> Evaluate */}
                        <line x1="247" y1="26" x2="247" y2="66" stroke="#FFD166" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p3-d)" />
                        {/* Bottom: Evaluate -> Revise */}
                        <line x1="210" y1="81" x2="64" y2="81" stroke="#FFD166" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p3-l)" />
                        {/* Left: Revise -> Develop */}
                        <line x1="30" y1="66" x2="30" y2="26" stroke="#FFD166" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p3-u)" />
                      </svg>

                      {/* Node 1: Develop (Top-Left) */}
                      <div className="absolute top-0 left-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD166] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Develop
                        </span>
                      </div>

                      {/* Node 2: Implement (Top-Right) */}
                      <div className="absolute top-0 right-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD166] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Implement
                        </span>
                      </div>

                      {/* Node 3: Evaluate (Bottom-Right) */}
                      <div className="absolute bottom-0 right-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD166] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Evaluate
                        </span>
                      </div>

                      {/* Node 4: Revise (Bottom-Left) */}
                      <div className="absolute bottom-0 left-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD166] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Revise
                        </span>
                      </div>

                      {/* Center: Phase 3 — Iterative Development */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1 rounded-lg bg-[#1D2440] border border-[#FFD166]/50 shadow-md text-center whitespace-nowrap">
                        <span className="text-[11px] font-bold text-white tracking-wide block">
                          Phase 3 — Iterative Development
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phase 2: Iterative Design Phase (Green Theme, placed at Develop step) */}
                  <motion.div
                    ref={samPhase2_Ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      top: samPositions ? `${samPositions.phase2Top}px` : '230px',
                      left: samPositions?.phase2Left !== undefined ? `${samPositions.phase2Left}px` : '96px',
                    }}
                    className="absolute w-fit min-w-[310px] max-w-[340px] h-[116px] p-2.5 rounded-2xl bg-[#252E4D]/90 border border-white/20 shadow-lg flex flex-col justify-center transition-all hover:border-[#A1DC9E]/60"
                  >
                    {/* 2x2 Clockwise Circular Loop in Green */}
                    <div className="relative w-[286px] h-[92px] mx-auto select-none">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 286 92">
                        <defs>
                          <marker id="arrow-p2-r" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#A1DC9E" />
                          </marker>
                          <marker id="arrow-p2-d" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#A1DC9E" />
                          </marker>
                          <marker id="arrow-p2-l" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#A1DC9E" />
                          </marker>
                          <marker id="arrow-p2-u" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" fill="#A1DC9E" />
                          </marker>
                        </defs>
                        {/* Top: Design -> Prototype */}
                        <line x1="68" y1="11" x2="202" y2="11" stroke="#A1DC9E" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p2-r)" />
                        {/* Right: Prototype -> Review */}
                        <line x1="247" y1="26" x2="247" y2="66" stroke="#A1DC9E" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p2-d)" />
                        {/* Bottom: Review -> Revise */}
                        <line x1="210" y1="81" x2="64" y2="81" stroke="#A1DC9E" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p2-l)" />
                        {/* Left: Revise -> Design */}
                        <line x1="30" y1="66" x2="30" y2="26" stroke="#A1DC9E" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow-p2-u)" />
                      </svg>

                      {/* Node 1: Design (Top-Left) */}
                      <div className="absolute top-0 left-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#A1DC9E] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Design
                        </span>
                      </div>

                      {/* Node 2: Prototype (Top-Right) */}
                      <div className="absolute top-0 right-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#A1DC9E] text-[#1D2440] font-black text-[10px] shadow-sm tracking-wider">
                          Prototype
                        </span>
                      </div>

                      {/* Node 3: Review (Bottom-Right) */}
                      <div className="absolute bottom-0 right-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#A1DC9E] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Review
                        </span>
                      </div>

                      {/* Node 4: Revise (Bottom-Left) */}
                      <div className="absolute bottom-0 left-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#A1DC9E] text-[#1D2440] font-black text-[11px] shadow-sm tracking-wider">
                          Revise
                        </span>
                      </div>

                      {/* Center: Phase 2 — Iterative Design */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1 rounded-lg bg-[#1D2440] border border-[#A1DC9E]/50 shadow-md text-center whitespace-nowrap">
                        <span className="text-[11px] font-bold text-white tracking-wide block">
                          Phase 2 — Iterative Design
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phase 1: Preparation Phase (White Text, placed at Analyze step) */}
                  <motion.div
                    ref={samPhase1_Ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ top: samPositions ? `${samPositions.phase1Top}px` : '496px' }}
                    className="absolute left-0 w-fit max-w-[340px] h-[46px] px-4 py-2.5 rounded-2xl bg-[#252E4D]/90 border border-white/20 shadow-lg flex items-center transition-all hover:border-white/40"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide whitespace-nowrap">
                      Phase 1---Preparation Phase
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Parallel Two Model Tabs (Screen right, top aligned with bottom of Analyze + 3%) */}
              <div 
                className="absolute left-0 right-0 min-h-0 grid grid-cols-2 gap-3 sm:gap-4 transition-all duration-150"
                style={{ top: buttonsTop !== null ? `calc(${buttonsTop}px + 3%)` : 'calc(480px + 3%)' }}
              >
                
                {/* 1. Backward Design Tab */}
                <button
                  type="button"
                  id="tab-backward-design"
                  onClick={() => handleSelectModel('backward')}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-center text-left relative ${
                    activeModel === 'backward'
                      ? 'bg-transparent border-[#FF9BB4] ring-2 ring-[#FF9BB4]/50 shadow-[0_4px_20px_rgba(255,155,180,0.25)] scale-[1.02]'
                      : 'bg-transparent hover:bg-white/5 border-white/20 hover:border-white/40'
                  }`}
                >
                  <span 
                    className="font-extrabold text-white tracking-tight truncate block"
                    style={{ fontSize: '20px', lineHeight: '26px' }}
                  >
                    Backward Design
                  </span>
                  <span 
                    className="font-bold text-[#FF9BB4] mt-0.5 truncate block"
                    style={{ fontSize: '16px', lineHeight: '20px' }}
                  >
                    Strengthen Alignment
                  </span>
                </button>

                {/* 2. Successive Approximation Model (SAM) Tab */}
                <button
                  ref={samTabRef}
                  type="button"
                  id="tab-sam-modal"
                  onClick={() => handleSelectModel('sam')}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-center text-left relative ${
                    activeModel === 'sam'
                      ? 'bg-transparent border-[#FF9BB4] ring-2 ring-[#FF9BB4]/50 shadow-[0_4px_20px_rgba(255,155,180,0.25)] scale-[1.02]'
                      : 'bg-transparent hover:bg-white/5 border-white/20 hover:border-white/40'
                  }`}
                >
                  <span 
                    className="font-extrabold text-white tracking-tight truncate block"
                    style={{ fontSize: '20px', lineHeight: '26px' }}
                  >
                    SAM Model
                  </span>
                  <span 
                    className="font-bold text-[#FF9BB4] mt-0.5 truncate block"
                    style={{ fontSize: '16px', lineHeight: '20px' }}
                  >
                    Make the Process Iterative
                  </span>
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Transition Statement before Torn Paper */}
      <section 
        className="w-full max-w-5xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 mb-4 z-10"
      >
        <p 
          className="text-white font-normal leading-relaxed text-center sm:text-left max-w-4xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', lineHeight: '36px' }}
        >
          No single model fits every project. Models provide structure, but the learner, problem, context, and constraints should guide how the process is applied.
        </p>
      </section>

      {/* 4. Realistic WebGL Torn Paper Section Transition */}
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

        {/* 5. Bottom Section in #2B2B2B (From Model to Practice) */}
        <div 
          className="w-full bg-[#2B2B2B] text-white pt-8 sm:pt-12 pb-8 sm:pb-10 relative -mt-16 sm:-mt-24"
        >
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* H2 Title: "From Model to Practice" */}
            <h2 
              id="design-from-model-to-practice-title"
              className="text-3xl sm:text-5xl md:text-[50px] font-black text-center mb-8 tracking-tight"
              style={{ fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif" }}
            >
              From Model <span className="text-[#FF9BB4]">to Practice</span>
            </h2>
          </section>

          {/* Group container for the statement box and all subsequent elements */}
          <div 
            className="w-full relative translate-y-[3%]"
            style={{ transform: 'translateY(3%)' }}
          >
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Text Box Statement */}
              <div className="max-w-4xl mx-auto text-left mb-12">
                <p 
                  className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed bg-white/[0.05] border border-white/15 rounded-2xl py-6 px-7 sm:px-10 shadow-lg text-left"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  The projects below show how I applied instructional design principles to analyze needs, align goals and learning experiences, develop solutions, and refine them through feedback and evaluation.
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
                      coverSrc={notebookCoverImg}
                      showLabels={false}
                      title="Design Projects"
                      leafTitle="Project Gallery"
                      author="Yu Liu"
                      textColor="#709A02"
                      mode="projects"
                      isOpen={isBookOpen}
                      onToggle={setIsBookOpen}
                      onGalleryClick={handleGalleryClick}
                    />
                  </div>
                </div>

                {/* Right Column: Reflection / Insights Text Box (Fades out when book opens) */}
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
                        Design Practice Reflection
                      </span>
                    </div>

                    <div className="space-y-6 text-left">
                      <div className="relative pl-5 border-l-2 border-[#FF9BB4]">
                        <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-normal leading-relaxed">
                          Instructional design changed how I think about models. I no longer see them as fixed procedures to follow step by step, but as frameworks and strategies that help me make intentional design decisions.
                        </p>
                      </div>

                      <div className="relative pl-5 border-l-2 border-white/20">
                        <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed">
                          In my future practice, I want to adapt the design process to the learner, problem, context, and available evidence rather than force every project into the same model. For me, effective instructional design is not about following a model perfectly, but knowing how and why to use it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Navigation */}
            <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14 mb-2">
              <div 
                className="flex flex-wrap items-center justify-center gap-4 -translate-y-[7vh]"
                style={{ transform: 'translateY(-7vh)' }}
              >
                <button
                  id="design-to-research-btn"
                  onClick={() => onNavigate?.('research')}
                  className="px-8 py-2.5 bg-[#FF9BB4] hover:bg-[#ff85a3] text-[#1D2440] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 text-[#1D2440]" />
                  <span>Explore Research</span>
                </button>

                <button
                  id="design-back-home-bottom-btn"
                  onClick={onBackToHome}
                  className="px-8 py-2.5 bg-white text-[#1D2440] hover:bg-slate-100 font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95"
                >
                  Back To Home
                </button>

                <button
                  id="design-to-tech-btn"
                  onClick={() => onNavigate?.('technology')}
                  className="px-8 py-2.5 bg-[#FF9BB4] hover:bg-[#ff85a3] text-[#1D2440] font-inter font-bold text-sm sm:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Explore Technology</span>
                  <ArrowRight className="w-4 h-4 text-[#1D2440]" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

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
                <span className="w-2.5 h-2.5 rounded-full bg-[#709A02] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#709A02] uppercase">
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
                          ? 'bg-[#709A02] text-[#141712] shadow-md scale-102 font-bold'
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
                      <span className="text-xs font-mono text-[#709A02] tracking-wider uppercase block mb-1">
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
                        {current.deliverables.map((deliv, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/15 text-xs text-slate-200 font-medium"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="p-4 rounded-2xl bg-[#709A02]/10 border border-[#709A02]/30">
                      <span className="text-xs font-mono font-bold text-[#709A02] uppercase tracking-wider block mb-1">
                        Measurable Impact
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-white">
                        {current.impact}
                      </p>
                    </div>

                    {/* Direct Document View Button for first case study */}
                    {current.id === 'interactive-microlearning' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGalleryModalOpen(false);
                          setDocModalTab('client-topic');
                          setIsDocModalOpen(true);
                        }}
                        className="w-full py-3.5 px-5 rounded-2xl bg-[#709A02] hover:bg-[#5d8102] text-[#141712] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read Full Documents (Client Report &amp; Model Selection)</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}

                    {/* Direct Document View Button for second case study (Goals, Skills & Learner Analyses) */}
                    {current.id === 'gamified-onboarding' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGalleryModalOpen(false);
                          setDocModalTab('goals-skills-analysis');
                          setIsDocModalOpen(true);
                        }}
                        className="w-full py-3.5 px-5 rounded-2xl bg-[#709A02] hover:bg-[#5d8102] text-[#141712] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read Full Report (Analysis Report)</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}

                    {/* Direct Document View Button for third case study (Design Report) */}
                    {current.id === 'accessible-stem' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGalleryModalOpen(false);
                          setDocModalTab('design-report');
                          setIsDocModalOpen(true);
                        }}
                        className="w-full py-3.5 px-5 rounded-2xl bg-[#709A02] hover:bg-[#5d8102] text-[#141712] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read Full Report (Design Report: Objectives, Assessment &amp; Flow)</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}

                    {/* Direct Document View Button for fourth case study (Presentation Slides) */}
                    {current.id === 'presentation-slides' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGalleryModalOpen(false);
                          setDocModalTab('presentation-slides');
                          setIsDocModalOpen(true);
                        }}
                        className="w-full py-3.5 px-5 rounded-2xl bg-[#709A02] hover:bg-[#5d8102] text-[#141712] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Presentation Slides (ETEC 6440 11-Slide Deck)</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {current.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-[#709A02] border border-[#709A02]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Documents Reader Modal (Client & Topic Report + Model Selection Worksheet) */}
      <ClientProjectDocumentsModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        initialDoc={docModalTab}
      />

    </motion.div>
  );
};
