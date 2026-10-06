import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertTriangle, Layers, BookOpen, Clock, Target, Users, Sparkles, Compass, Check, ArrowRight, Presentation, FileText } from 'lucide-react';
import letterImg from '../assets/images/let.png';

export type DocumentType = 'client-topic' | 'model-selection' | 'goals-skills-analysis' | 'design-report' | 'presentation-slides';

interface ClientProjectDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: DocumentType;
}

export const ClientProjectDocumentsModal: React.FC<ClientProjectDocumentsModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'client-topic'
}) => {
  const [activeDoc, setActiveDoc] = useState<DocumentType>(initialDoc);
  const [activeClientSec, setActiveClientSec] = useState<string>('c-sec-1');
  const [activeModelSec, setActiveModelSec] = useState<string>('m-sec-1');
  const [activeAnalysisSec, setActiveAnalysisSec] = useState<string>('a-sec-1');
  const [activeDesignSec, setActiveDesignSec] = useState<string>('d-sec-1');
  const [activeSlideSec, setActiveSlideSec] = useState<string>('s-sec-1');
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const isFirstLink = initialDoc === 'client-topic' || initialDoc === 'model-selection';

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const clientSections = [
    { id: 'c-sec-1', label: '1. Client Overview' },
    { id: 'c-sec-2', label: '2. Performance Problem' },
    { id: 'c-sec-3', label: '3. Instruction Fit' },
    { id: 'c-sec-4', label: '4. Target Learners' },
    { id: 'c-sec-5', label: '5. Contexts & Alignment' },
    { id: 'c-sec-6', label: '6. Instructional Goal' },
    { id: 'c-sec-7', label: '7. Feasibility & Access' },
    { id: 'c-sec-8', label: '8. Looking Ahead' },
  ];

  const modelSections = [
    { id: 'm-sec-1', label: '1. Design Problem' },
    { id: 'm-sec-2', label: '2. Constraints' },
    { id: 'm-sec-3', label: '3. Model Comparison' },
    { id: 'm-sec-4', label: '4. Hybrid Strategy' },
    { id: 'm-sec-5', label: '5. Design Sequence' },
    { id: 'm-sec-6', label: '6. Ethics & Judgment' },
    { id: 'm-sec-7', label: '7. ID Reflection' },
  ];

  const analysisSections = [
    { id: 'a-sec-1', label: '1. Instructional Goal' },
    { id: 'a-sec-2', label: '2. Major Steps & Skills' },
    { id: 'a-sec-3', label: '3. Entry Behaviors' },
    { id: 'a-sec-4', label: '4. Learner Analysis' },
    { id: 'a-sec-5', label: '5. Learning Context' },
    { id: 'a-sec-6', label: '6. Performance Context' },
  ];

  const designSections = [
    { id: 'd-sec-1', label: '1. Objectives (Mager)' },
    { id: 'd-sec-2', label: '2. Assessment Alignment' },
    { id: 'd-sec-3', label: '3. Instructional Flow' },
    { id: 'd-sec-4', label: '4. Evidence Matrix' },
  ];

  const slideSections = [
    { id: 's-sec-1', label: 'Slide 1: Title & Overview' },
    { id: 's-sec-2', label: 'Slide 2: Performance Gap' },
    { id: 's-sec-3', label: 'Slide 3: Learners & Constraints' },
    { id: 's-sec-4', label: 'Slide 4: Hybrid ID Approach' },
    { id: 's-sec-5', label: 'Slide 5: Backward + Gagné' },
    { id: 's-sec-6', label: 'Slide 6: Scaffolding Flow' },
    { id: 's-sec-7', label: 'Slide 7: Implementation Architecture' },
    { id: 's-sec-8', label: 'Slide 8: Interactive Phase 1-2' },
    { id: 's-sec-9', label: 'Slide 9: Formative Phase 3' },
    { id: 's-sec-10', label: 'Slide 10: Transfer Tasks Phase 4' },
    { id: 's-sec-11', label: 'Slide 11: Attainment & Impact' },
  ];

  const scrollToSection = (id: string) => {
    if (activeDoc === 'client-topic') {
      setActiveClientSec(id);
    } else if (activeDoc === 'model-selection') {
      setActiveModelSec(id);
    } else if (activeDoc === 'goals-skills-analysis') {
      setActiveAnalysisSec(id);
    } else if (activeDoc === 'design-report') {
      setActiveDesignSec(id);
    } else {
      setActiveSlideSec(id);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-white/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[92vh] w-auto aspect-[2420/1668] flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
        >
          {/* Close Button matching Research Page Yellow Book popup */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1D2440]/90 hover:bg-[#1D2440] text-white flex items-center justify-center shadow-xl backdrop-blur-md border border-white/40 transition-all cursor-pointer select-none z-30 hover:scale-110 active:scale-95"
            aria-label="Close Document Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Binder & Loose-leaf Background Image (let.png identical to Research Page) */}
          <img
            src={letterImg}
            alt="Design Proposal Binder & Loose-leaf"
            className="w-full h-full object-contain pointer-events-none select-none block"
          />

          {/* Left Blue Directory (Positioned below paperclip in let.png) */}
          <nav 
            aria-label="Document Table of Contents"
            className="absolute left-[2.8%] w-[19%] top-[24%] bottom-[9.5%] z-20 flex flex-col justify-start py-1 pr-1 overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Document Switcher Tab Header: Only rendered for Link 1 (which embeds 2 documents) */}
            {isFirstLink && (
              <div className="flex flex-col gap-1 mb-2 pb-2 border-b border-white/20">
                <span className="text-[7.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-white/70 px-1">
                  Select Document
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDoc('client-topic');
                    setActiveClientSec('c-sec-1');
                    contentContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-[8px] sm:text-[9.5px] md:text-[10.5px] leading-tight px-1.5 sm:px-2 py-1 sm:py-1.2 rounded-lg transition-all cursor-pointer select-none font-bold truncate ${
                    activeDoc === 'client-topic'
                      ? 'bg-[#709A02] text-white shadow-md scale-102'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                  title="1. Client & Topic Report"
                >
                  1. Client &amp; Topic
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDoc('model-selection');
                    setActiveModelSec('m-sec-1');
                    contentContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-[8px] sm:text-[9.5px] md:text-[10.5px] leading-tight px-1.5 sm:px-2 py-1 sm:py-1.2 rounded-lg transition-all cursor-pointer select-none font-bold truncate ${
                    activeDoc === 'model-selection'
                      ? 'bg-[#709A02] text-white shadow-md scale-102'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                  title="2. Model Selection Worksheet"
                >
                  2. Model Selection
                </button>
              </div>
            )}

            {/* Section Index for Active Document */}
            <div className="space-y-1 sm:space-y-1.2 w-full">
              {isFirstLink && (
                <span className="text-[7.5px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider text-white/70 px-1 block mb-0.5">
                  Sections
                </span>
              )}
              {(activeDoc === 'client-topic' 
                ? clientSections 
                : activeDoc === 'model-selection' 
                  ? modelSections 
                  : activeDoc === 'goals-skills-analysis'
                    ? analysisSections
                    : activeDoc === 'design-report'
                      ? designSections
                      : slideSections
              ).map((sec) => {
                const isSelected = activeDoc === 'client-topic' 
                  ? activeClientSec === sec.id 
                  : activeDoc === 'model-selection'
                    ? activeModelSec === sec.id
                    : activeDoc === 'goals-skills-analysis'
                      ? activeAnalysisSec === sec.id
                      : activeDoc === 'design-report'
                        ? activeDesignSec === sec.id
                        : activeSlideSec === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left transition-all duration-200 cursor-pointer select-none text-[8px] sm:text-[9.5px] md:text-[10.5px] leading-tight block w-full truncate ${
                      isSelected
                        ? 'bg-[#709A02] text-white font-bold px-1.5 sm:px-2 py-1 sm:py-1.2 rounded-lg shadow-md scale-102'
                        : 'text-white hover:text-white hover:bg-white/10 font-medium px-1.5 sm:px-2 py-1 sm:py-1.2 bg-transparent border-none'
                    }`}
                    title={sec.label}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Scrollable Document Content: Strictly positioned over the right-side loose-leaf paper */}
          <div 
            ref={contentContainerRef}
            onScroll={(e) => {
              const container = e.currentTarget;
              const containerTop = container.getBoundingClientRect().top;
              if (activeDoc === 'client-topic') {
                for (let i = clientSections.length - 1; i >= 0; i--) {
                  const sec = clientSections[i];
                  const el = document.getElementById(sec.id);
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top - containerTop <= 80) {
                      setActiveClientSec(sec.id);
                      break;
                    }
                  }
                }
              } else if (activeDoc === 'model-selection') {
                for (let i = modelSections.length - 1; i >= 0; i--) {
                  const sec = modelSections[i];
                  const el = document.getElementById(sec.id);
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top - containerTop <= 80) {
                      setActiveModelSec(sec.id);
                      break;
                    }
                  }
                }
              } else if (activeDoc === 'goals-skills-analysis') {
                for (let i = analysisSections.length - 1; i >= 0; i--) {
                  const sec = analysisSections[i];
                  const el = document.getElementById(sec.id);
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top - containerTop <= 80) {
                      setActiveAnalysisSec(sec.id);
                      break;
                    }
                  }
                }
              } else if (activeDoc === 'design-report') {
                for (let i = designSections.length - 1; i >= 0; i--) {
                  const sec = designSections[i];
                  const el = document.getElementById(sec.id);
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top - containerTop <= 80) {
                      setActiveDesignSec(sec.id);
                      break;
                    }
                  }
                }
              } else {
                for (let i = slideSections.length - 1; i >= 0; i--) {
                  const sec = slideSections[i];
                  const el = document.getElementById(sec.id);
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top - containerTop <= 80) {
                      setActiveSlideSec(sec.id);
                      break;
                    }
                  }
                }
              }
            }}
            className="absolute left-[24.5%] right-[3.5%] top-[8.5%] bottom-[8.5%] overflow-y-auto pr-3 sm:pr-6 pl-2 sm:pl-4 py-3 sm:py-5 text-slate-800 selection:bg-[#709A02]/25 scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#709A02 transparent',
            }}
          >
            {activeDoc === 'client-topic' ? (
              /* ========================================================================= */
              /* DOCUMENT 1: Client and Topic Report (Rendered on Loose-Leaf Paper)        */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      Instructional Design Deliverable 1 • Comprehensive Analysis
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      QiYao EdTech
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Client and Topic Report
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Client Overview, Performance Diagnosis, Learner Analysis &amp; E-Learning Strategy
                  </p>
                </div>

                {/* Section 1: Client Overview */}
                <div id="c-sec-1" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 1</span>
                    <span className="text-[10px] font-mono text-slate-400">Institutional Context</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Client Overview
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase tracking-wider font-mono">
                        Client Name and Role
                      </h4>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        <strong>Mr. Zhao</strong>, Director of English Language, QiYao Educational Technology Company in China.
                      </p>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        The client oversees curriculum development, instructional improvement, teacher training, and academic performance across the English department. She is responsible for ensuring instructional quality and measurable student outcomes.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-2.5">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase tracking-wider font-mono">
                        Client Context
                      </h4>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        The company is providing English instruction to K–12 students in China. The grammar course currently follows the <em>Think</em> textbook series as the primary curriculum source.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 text-xs">
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          • No clearly articulated learning outcomes
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          • No structured formative quizzes due to limited time
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          • No formal grading rubric for grammar performance
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          • Assignments primarily consist of practice exercises
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          • Classes are mixed-grade (Grades 2–5)
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          • Each class session lasts approx. 1.5–2 hours
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#557502] mt-2 bg-[#709A02]/10 p-2 rounded-lg border border-[#709A02]/20">
                        Core Diagnosis: Instruction is mainly textbook-driven rather than outcome-driven.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-2.5">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase tracking-wider font-mono">
                        Client Stake in the Problem
                      </h4>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        Students demonstrate weak grammar performance in examinations, particularly in tense selection and application. If the issue is not addressed:
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700 text-xs">
                        <li>Students’ exam scores may remain low.</li>
                        <li>Teachers may continue repeating previously covered grammar.</li>
                        <li>The effectiveness of the grammar curriculum may be questioned.</li>
                        <li>The organization’s instructional quality and competitive positioning may be affected.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 2: Performance Problem Description */}
                <div id="c-sec-2" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 2</span>
                    <span className="text-[10px] font-mono text-slate-400">Gap Diagnosis</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Performance Problem Description
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-xs">
                      <span className="text-[11px] font-mono font-bold text-rose-700 uppercase block mb-1">
                        Current State of Performance
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Struggle to determine when to use present, past, or future tense.</li>
                        <li>Past tense verb forms are frequently incorrect.</li>
                        <li>Grammar knowledge does not consistently transfer to writing.</li>
                        <li>Difficulty synthesizing or summarizing grammar rules.</li>
                        <li>Previously taught grammar shows signs of forgetting over time.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#709A02]/40 shadow-xs">
                      <span className="text-[11px] font-mono font-bold text-[#557502] uppercase block mb-1">
                        Desired State of Performance
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#709A02] shrink-0 mt-0.5" />
                          <span>Accurately select appropriate tense forms based on contextual time reference.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#709A02] shrink-0 mt-0.5" />
                          <span>Correctly transform verb forms.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#709A02] shrink-0 mt-0.5" />
                          <span>Apply correct tense in short writing.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 6: Preliminary Instructional Goal */}
                <div id="c-sec-6" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 6</span>
                    <span className="text-[10px] font-mono text-slate-400">Instructional Goal</span>
                  </div>
                  <blockquote className="p-3.5 bg-gradient-to-r from-[#709A02]/15 to-transparent rounded-xl border-l-4 border-[#709A02] text-xs sm:text-sm font-semibold text-[#1D2440] leading-relaxed">
                    “After instruction, learners will be able to accurately select and apply simple present, simple past, and simple future tense forms in short writing tasks in order to demonstrate grammatical accuracy without teacher guiding.”
                  </blockquote>
                </div>
              </div>
            ) : activeDoc === 'model-selection' ? (
              /* ========================================================================= */
              /* DOCUMENT 2: Milestone 2: Model Selection Worksheet                        */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      Instructional Design Deliverable 2 • Model Selection Rationale
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      Milestone 2
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Milestone 2: Model Selection Worksheet
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Comparative Analysis: Backward Design vs. Gagné’s Nine Events &amp; Final Hybrid Architecture
                  </p>
                </div>

                {/* Section 4: Final Model Strategy */}
                <div id="m-sec-4" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 4</span>
                    <span className="text-[10px] font-mono text-slate-400">Hybrid Framework</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Final Model Strategy (Hybrid Approach)
                  </h3>
                  <div className="p-3.5 bg-gradient-to-r from-[#709A02]/15 to-transparent rounded-xl border border-[#709A02]/30 text-xs sm:text-sm space-y-2 leading-relaxed">
                    <p className="font-semibold text-[#1D2440]">
                      <strong>Selected Approach:</strong> ☑ Hybrid Approach (Backward Design + Gagné’s Nine Events)
                    </p>
                    <p className="text-slate-700">
                      The instructional problem contains structural misalignment and instructional sequencing challenges. <strong>Backward Design</strong> ensures macro coherence between goals, evidence, and instruction, while <strong>Gagné’s Nine Events</strong> provide micro cognitive scaffolding to structure attention, practice, feedback, and retention.
                    </p>
                  </div>
                </div>
              </div>
            ) : activeDoc === 'goals-skills-analysis' ? (
              /* ========================================================================= */
              /* DOCUMENT 3: Analysis Report (Embedded Second Link)                        */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      Instructional Design Deliverable 2 • Analytical Foundation
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      Analysis Report
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Analysis Report
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Goals, Skills, and Learner Analyses Report • 5-Step Skill Hierarchy, Entry Behaviors, 5 Misconceptions &amp; Dual Context Matrix
                  </p>
                </div>

                {/* Section 1: Instructional Goal */}
                <div id="a-sec-1" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 1</span>
                    <span className="text-[10px] font-mono text-slate-400">Target Capability</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    1. Instructional Goal Statement
                  </h3>
                  <blockquote className="p-3.5 bg-gradient-to-r from-[#709A02]/15 to-transparent rounded-xl border-l-4 border-[#709A02] text-xs sm:text-sm font-semibold text-[#1D2440] leading-relaxed">
                    “After instruction, learners will be able to accurately select and apply simple present, simple past, and simple future tense forms in short writing tasks without teacher guidance.”
                  </blockquote>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1 text-xs text-slate-700">
                    <p><strong>Target Competency:</strong> Morphological transformation and consistent tense selection in paragraph-length free writing.</p>
                    <p><strong>Target Learners:</strong> K–12 mixed-grade students (Grades 2–5) at QiYao EdTech.</p>
                    <p><strong>Autonomy Level:</strong> Independent execution without real-time teacher prompt or scaffold reliance.</p>
                  </div>
                </div>

                {/* Section 2: Major Performance Steps */}
                <div id="a-sec-2" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 2</span>
                    <span className="text-[10px] font-mono text-slate-400">5-Step Skill Hierarchy</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    2.1 Major Performance Steps &amp; 2.2 Subordinate Skills Hierarchy
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440]">Step 1: Identify time references and contextual signals</strong>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">Step 1</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Explicit time words (yesterday, usually, next week) and implicit narrative sequencing cues in short passages.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440]">Step 2: Recognize the correct tense category (present, past, future)</strong>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">Step 2</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Map identified temporal markers to semantic time categories; resolve ambiguous narrative frames.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440]">Step 3: Select appropriate verb form for identified tense</strong>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">Step 3</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Execute regular inflection rules (-ed, spelling changes), irregular retrieval (go &rarr; went), third-person singular (-s/-es), and future auxiliaries (will / be going to).</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440]">Step 4: Compose a short paragraph with correct tense (Grades 4–5)</strong>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[10px] font-bold">Step 4 (Gr. 4–5)</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Plan narrative timeframe; maintain tense consistency across sentences; transition cleanly when time changes.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440]">Step 5: Check tense usage in written responses (Grades 4–5)</strong>
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-mono text-[10px] font-bold">Step 5 (Gr. 4–5)</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Review paragraph for tense shifts; identify and self-correct irregular errors; explain grammar logic in own words.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Entry Behaviors */}
                <div id="a-sec-3" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 3</span>
                    <span className="text-[10px] font-mono text-slate-400">Prerequisite Skills</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    3. Entry Behaviors &amp; 4-Source Evidence Validation
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                    <strong className="text-[#1D2440] block font-mono text-[11px] uppercase">Validated Prerequisite Behaviors:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <strong>1. Basic SVO Sentence Syntax:</strong> Subject-Verb-Object word order in affirmative and negative statements.
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <strong>2. Core Base Vocabulary:</strong> Repertoire of 50+ high-frequency base verbs (play, eat, see, make, write, read).
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <strong>3. Grade-Level Reading:</strong> Decoding 3–5 sentence passages describing familiar daily events.
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <strong>4. Notion Interface Navigation:</strong> Tapping toggles, scrolling text, and typing responses on tablet/PC.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                    <strong className="text-[#1D2440] block font-mono text-[11px] uppercase">4-Source Evidence Validation:</strong>
                    <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                      <li>
                        <strong>Think Textbook Diagnostic Tests:</strong> Entrance evaluations confirm &ge;85% of learners demonstrate SVO structure and recognize base verbs.
                      </li>
                      <li>
                        <strong>Classroom Essay Samples (N=30):</strong> Writing samples from QiYao classes reveal rich vocabulary but 65% failure in verb inflections across sentences.
                      </li>
                      <li>
                        <strong>Teacher Interviews:</strong> 3 lead instructors reported students understand grammar concepts in isolation but lose accuracy when writing independently.
                      </li>
                      <li>
                        <strong>Unit Quiz Telemetry:</strong> Error logs indicate irregular past tense and 3rd-person singular account for over 72% of mechanical errors.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 4: Target Learner Analysis & Misconceptions */}
                <div id="a-sec-4" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 4</span>
                    <span className="text-[10px] font-mono text-slate-400">Learner Characteristics</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    4. Learner Analysis &amp; 5 Key Cognitive Misconceptions
                  </h3>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                    <strong className="text-[#1D2440] block font-mono text-[11px] uppercase">Learner Developmental Span (Grades 2–5):</strong>
                    <p className="text-slate-700 leading-relaxed">
                      Learners range from ages 7 to 11. Younger students (Grades 2–3) rely on concrete visual anchors (color cues, timelines), while older students (Grades 4–5) possess emerging metacognitive monitoring and can handle multi-sentence composition and explicit rule reasoning. Learning motivation is strongly reinforced by school exam performance and parental expectations.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <strong className="text-[#1D2440] block font-mono text-[11px] uppercase">5 Key Cognitive Misconceptions Deconstructed:</strong>
                    <div className="space-y-2 text-slate-700">
                      <div className="p-2.5 bg-white rounded-xl border border-rose-200">
                        <strong className="text-rose-900 block font-semibold">1. Base Form Default Error:</strong>
                        <span>Assuming base verbs work across all timeframes unless explicitly prompted (e.g. <em>“Yesterday I go to the park”</em>).</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                        <strong className="text-amber-900 block font-semibold">2. Overgeneralization of &lsquo;-ed&rsquo;:</strong>
                        <span>Applying the regular past tense rule to irregular verbs (e.g. <em>“goed”</em>, <em>“eated”</em>, <em>“runned”</em>, <em>“seed”</em>).</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-purple-200">
                        <strong className="text-purple-900 block font-semibold">3. Double Marking Error:</strong>
                        <span>Combining both auxiliary and inflected verbs simultaneously (e.g. <em>“did went”</em>, <em>“didn&rsquo;t played”</em>).</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-blue-200">
                        <strong className="text-blue-900 block font-semibold">4. Time Word Dependency:</strong>
                        <span>Only able to apply correct tense when explicit trigger words (*yesterday, tomorrow*) are stated; failing on implicit narrative context.</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <strong className="text-slate-900 block font-semibold">5. Unprompted Tense Shifting:</strong>
                        <span>Erratic shifting between present, past, and future within a single paragraph when describing a single coherent event.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Learning Context */}
                <div id="a-sec-5" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 5</span>
                    <span className="text-[10px] font-mono text-slate-400">Learning Environment</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    5. Learning Context (Asynchronous Notion Architecture)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-[#1D2440] font-bold block text-xs">Platform &amp; Hardware</strong>
                      <p className="text-slate-600">Delivered asynchronously via Notion workspace on iPad and desktop PCs at home.</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-[#1D2440] font-bold block text-xs">Instructional Pacing</strong>
                      <p className="text-slate-600">Modular 20–30 min self-paced units to respect cognitive load within 1.5–2 hr study sessions.</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-[#1D2440] font-bold block text-xs">Scaffolding Tools</strong>
                      <p className="text-slate-600">Toggle lists for answer reveal, audio prompts, and color-coded visual cues (Past = Orange, Present = Green, Future = Blue).</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-[#1D2440] font-bold block text-xs">Self-Regulation</strong>
                      <p className="text-slate-600">Interactive task checklists and metacognitive reflection prompts to build learner autonomy.</p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Performance Context */}
                <div id="a-sec-6" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 6</span>
                    <span className="text-[10px] font-mono text-slate-400">Authentic Transfer Context</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    6. Performance Context (Real-World Writing Demands)
                  </h3>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1D2440] text-xs font-bold">Transfer Environment Demands</strong>
                      <span className="px-2 py-0.5 rounded bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-bold">No Scaffolds</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Learners must perform in school classroom exams, timed writing quizzes, and homework composition without scaffolds, color cues, or word banks. Evaluators include school teachers and exam graders assessing syntactical accuracy and tense stability.
                    </p>
                    <div className="p-2.5 rounded-lg bg-[#709A02]/10 border border-[#709A02]/20 text-[#557502] font-semibold">
                      Target Outcome: Maintain &ge;85% tense consistency across a multi-sentence essay within 15–20 minutes.
                    </div>
                  </div>
                </div>
              </div>
            ) : activeDoc === 'design-report' ? (
              /* ========================================================================= */
              /* DOCUMENT 4: Design Report (Embedded Third Link)                           */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      Instructional Design Deliverable 4 • Design Specification
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      Design Report
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Design Report
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Performance Objectives (Mager B/C/Cr), Assessment Alignment, 4-Phase Instructional Flow &amp; Evidence-Based Reasoning Matrix
                  </p>
                </div>

                {/* Section 1: Performance Objectives */}
                <div id="d-sec-1" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 1</span>
                    <span className="text-[10px] font-mono text-slate-400">Mager B/C/Cr Structure</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                      Performance Objectives (OBJ 1 – 6)
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#709A02]/15 text-[#557502] font-bold">
                      Criterion-Referenced
                    </span>
                  </div>

                  {/* Objective 1 */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1D2440] font-serif">
                        Objective 1 — Identify Time References &amp; Contextual Signals
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-mono font-bold">OBJ 1</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      Given a short reading passage (3–5 sentences), learners will identify and label all time expressions and contextual cues that signal tense.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">BEHAVIOR</strong>
                        <span>Identify and label time expressions and contextual cues.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CONDITIONS</strong>
                        <span>3–5 sentence passage with explicit &amp; implicit cues; no guidance; no scaffolds.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CRITERIA</strong>
                        <span>Correctly labels ≥ 80%; distinguishes explicit from implicit with ≤ 1 error.</span>
                      </div>
                    </div>
                  </div>

                  {/* Objective 2 */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1D2440] font-serif">
                        Objective 2 — Recognize &amp; Select Correct Tense Category
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-mono font-bold">OBJ 2</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      Given contextual sentence prompts, learners will select the appropriate tense (simple present, simple past, or simple future) by identifying the time frame indicated.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">BEHAVIOR</strong>
                        <span>Select correct tense category and justify the choice.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CONDITIONS</strong>
                        <span>10 sentence prompts with varying time references; multiple-choice; no references.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CRITERIA</strong>
                        <span>Selects correct tense for ≥ 80% of items.</span>
                      </div>
                    </div>
                  </div>

                  {/* Objective 3 */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1D2440] font-serif">
                        Objective 3 — Apply Correct Verb Forms (Regular &amp; Irregular)
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-mono font-bold">OBJ 3</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      Given a list of base verbs, learners will accurately transfer each verb into the required tense form, including regular spelling rules, irregular past forms, third-person singular, and future constructions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">BEHAVIOR</strong>
                        <span>Transfer verbs accurately in all three tense forms.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CONDITIONS</strong>
                        <span>20 base verbs with specified tense and subject; written production; no word bank.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CRITERIA</strong>
                        <span>Correct verb form for ≥ 80%; irregular past forms correct for ≥ 80%.</span>
                      </div>
                    </div>
                  </div>

                  {/* Objective 4 */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1D2440] font-serif">
                        Objective 4 — Analyze Tense in Reading Passages (Grades 4–5)
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-mono font-bold">OBJ 4 (Gr. 4–5)</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      Given a short passage containing multiple tense forms, learners will identify the tense of each underlined verb and explain the contextual reason for each tense choice.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">BEHAVIOR</strong>
                        <span>Identify tense &amp; explain contextual rationale for each underlined verb.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CONDITIONS</strong>
                        <span>5–8 sentence passage with 8–10 underlined verbs; written analysis; Grades 4–5 only.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CRITERIA</strong>
                        <span>Correctly identifies tense for ≥ 80%; contextually accurate explanation ≥ 80%.</span>
                      </div>
                    </div>
                  </div>

                  {/* Objective 5 */}
                  <div className="p-3.5 bg-white rounded-xl border-2 border-[#709A02]/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1D2440] font-serif">
                        Objective 5 — Compose Short Paragraph Integrating Multiple Tenses (Grades 4–5)
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-[#709A02] text-white text-[10px] font-mono font-bold">OBJ 5 (Summative Transfer)</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      Given a situational writing prompt, learners will compose a paragraph of approximately 100–150 words that integrates at least two different tense forms, maintains tense consistency within each time frame, and applies correct verb forms throughout.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">BEHAVIOR</strong>
                        <span>Compose a 100–150 word paragraph integrating multiple tenses with accuracy.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CONDITIONS</strong>
                        <span>Situational prompt; no scaffolds, color-coding, or guidance; Grades 4–5; 30 mins.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CRITERIA</strong>
                        <span>100–150 words; ≥ 80% verbs correct; justified tense shifts; no needless shifts.</span>
                      </div>
                    </div>
                  </div>

                  {/* Objective 6 */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1D2440] font-serif">
                        Objective 6 — Articulate Tense Rules in Own Words
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-mono font-bold">OBJ 6 (Metacognition)</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      After completing the unit, learners will explain when each tense is used and provide one original example sentence for each tense form.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">BEHAVIOR</strong>
                        <span>Articulate when each tense is used &amp; provide original examples.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CONDITIONS</strong>
                        <span>Written self-reflection prompt at end of module; own words; no textbook defs.</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <strong className="text-slate-900 block font-mono text-[10px] text-[#557502]">CRITERIA</strong>
                        <span>Accurate rule description for all 3 tenses; ≥ 1 original correct example per tense.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Assessment Alignment */}
                <div id="d-sec-2" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 2</span>
                    <span className="text-[10px] font-mono text-slate-400">Measurement Coherence</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Assessment Alignment Matrix
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-[#1D2440] block font-semibold">Objective 1 — Label Time Expressions</strong>
                        <span className="text-slate-600">Task: Label time cues in 3 short passages. Measures prerequisite recognition.</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px] shrink-0 self-start sm:self-center">
                        Formative Assessment
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-[#1D2440] block font-semibold">Objective 2 — Select Tense &amp; Justify</strong>
                        <span className="text-slate-600">Task: Choose correct tense for 10 prompts + written justification. Prevents guessing.</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px] shrink-0 self-start sm:self-center">
                        Formative Assessment
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-[#1D2440] block font-semibold">Objective 3 — Transfer Verb Forms</strong>
                        <span className="text-slate-600">Task: Transfer 20 base verbs across 3 tenses. Word bank removal simulates exam retrieval.</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px] shrink-0 self-start sm:self-center">
                        Formative Assessment
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-[#1D2440] block font-semibold">Objective 4 — Reading Passage Analysis (Gr. 4–5)</strong>
                        <span className="text-slate-600">Task: Identify and explain tense use for 8–10 underlined verbs. Addresses rule articulation gap.</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px] shrink-0 self-start sm:self-center">
                        Formative Assessment
                      </span>
                    </div>

                    <div className="p-3 bg-[#709A02]/10 rounded-xl border border-[#709A02]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-[#1D2440] block font-bold">Objective 5 — 100–150 Word Multi-Tense Paragraph (Gr. 4–5)</strong>
                        <span className="text-slate-700">Task: Compose paragraph from situational prompt without scaffolds. Mirrors authentic examination demands.</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#709A02] text-white font-mono font-bold text-[10px] shrink-0 self-start sm:self-center">
                        Summative Assessment
                      </span>
                    </div>

                    <div className="p-3 bg-[#709A02]/10 rounded-xl border border-[#709A02]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-[#1D2440] block font-bold">Objective 6 — Articulate Tense Rules in Own Words</strong>
                        <span className="text-slate-700">Task: Explain when each tense is used + original examples. Evaluates cognitive consolidation.</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#709A02] text-white font-mono font-bold text-[10px] shrink-0 self-start sm:self-center">
                        Summative Assessment
                      </span>
                    </div>
                  </div>

                  {/* 3 Core Principles */}
                  <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-300 space-y-2 text-xs">
                    <strong className="font-bold text-[#1D2440] block font-mono uppercase text-[11px]">
                      3 Core Assessment Principles (Responsive to Needs Analysis)
                    </strong>
                    <ul className="space-y-1.5 text-slate-700">
                      <li>
                        <strong>1. Performance over recall:</strong> No task asks students to define a rule. All tasks require production or application.
                      </li>
                      <li>
                        <strong>2. Conditions match transfer context:</strong> Summative paragraph simulates exam conditions without scaffolds, word banks, or hints.
                      </li>
                      <li>
                        <strong>3. Criterion-referenced transparency:</strong> Explicit rubric criteria remove ambiguity and establish clear standards for acceptable mastery.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Instructional Flow */}
                <div id="d-sec-3" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 3</span>
                    <span className="text-[10px] font-mono text-slate-400">4-Phase Gagné &amp; UbD Flow</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Instructional Flow: 4-Phase Architecture
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lesson-level events of Gagné’s Nine Events nested within the macro alignment of Backward Design, sequenced to move learners from activation to independent transfer.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Phase 1 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <strong className="text-xs font-bold text-[#1D2440]">Phase 1: Activation &amp; Modeling</strong>
                        <span className="text-[10px] text-[#557502] font-mono font-bold">OBJ 1, 2, 6</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Gagné Events:</strong> Gain Attention, Stimulate Recall, Present Content, Provide Guidance.
                      </p>
                      <ul className="space-y-1 text-slate-700 list-disc pl-4 text-[11px]">
                        <li>Short video hook (2–3 mins).</li>
                        <li>Activation questions recalling Think textbook rules.</li>
                        <li>Step-by-step cognitive modeling of tense decisions.</li>
                      </ul>
                    </div>

                    {/* Phase 2 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <strong className="text-xs font-bold text-[#1D2440]">Phase 2: Structured Grammar Analysis</strong>
                        <span className="text-[10px] text-[#557502] font-mono font-bold">OBJ 1, 2, 4</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Gagné Events:</strong> Provide Guidance, Elicit Performance (Scaffolded).
                      </p>
                      <ul className="space-y-1 text-slate-700 list-disc pl-4 text-[11px]">
                        <li>Color-coded visual scaffolds segmenting grammar elements.</li>
                        <li>Guided analysis tasks following structured sequence.</li>
                        <li>Scaffold density deliberately reduced over time.</li>
                      </ul>
                    </div>

                    {/* Phase 3 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <strong className="text-xs font-bold text-[#1D2440]">Phase 3: Contextual Application</strong>
                        <span className="text-[10px] text-[#557502] font-mono font-bold">OBJ 2, 3, 4</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Gagné Events:</strong> Elicit Performance, Provide Feedback.
                      </p>
                      <ul className="space-y-1 text-slate-700 list-disc pl-4 text-[11px]">
                        <li>Situational sentence prompts for tense decisions.</li>
                        <li>Regular (-ed) and irregular verb retrieval sets.</li>
                        <li>Immediate explanatory feedback at each practice stage.</li>
                      </ul>
                    </div>

                    {/* Phase 4 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <strong className="text-xs font-bold text-[#1D2440]">Phase 4: Transfer &amp; Integration</strong>
                        <span className="text-[10px] text-[#557502] font-mono font-bold">OBJ 3, 5, 6</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Gagné Events:</strong> Assess Performance, Enhance Retention &amp; Transfer.
                      </p>
                      <ul className="space-y-1 text-slate-700 list-disc pl-4 text-[11px]">
                        <li>Summative 100–150 word writing task (Gr. 4–5).</li>
                        <li>Sentence-level summative task (Gr. 2–3).</li>
                        <li>Own-words reflection and self-monitoring checklist.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Theoretical Justification Callout */}
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5 leading-relaxed">
                    <strong className="font-bold block text-[11px] font-mono uppercase text-emerald-900">
                      Sequencing &amp; Mixed-Grade Justification
                    </strong>
                    <p>
                      • <strong>Backward Design Alignment:</strong> The summative transfer task (Phase 4) was designed first, ensuring all earlier phases explicitly build required competencies.
                    </p>
                    <p>
                      • <strong>Cognitive Load Management:</strong> Visual scaffolding and explicit modeling in Phases 1 &amp; 2 manage intrinsic load before supports are completely removed in Phase 4.
                    </p>
                    <p>
                      • <strong>Tiered Tasks for Mixed Grades:</strong> Grades 4–5 complete passage analysis &amp; multi-tense paragraph writing; Grades 2–3 complete sentence-level equivalents with same core concepts.
                    </p>
                  </div>
                </div>

                {/* Section 4: Evidence-based Reasoning */}
                <div id="d-sec-4" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 4</span>
                    <span className="text-[10px] font-mono text-slate-400">Design Decision Matrix</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Evidence-Based Reasoning Table
                  </h3>
                  <p className="text-xs text-slate-600">
                    Every major design decision is directly grounded in documented evidence from the needs analysis and established instructional design theory.
                  </p>

                  <div className="space-y-3 text-xs">
                    {/* Decision 1 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <strong className="text-[#1D2440] font-bold block text-xs">
                        1. Explicit, Measurable Objectives with B/C/Cr Structure
                      </strong>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">EVIDENCE:</span>
                          <span className="text-slate-700">Absence of defined learning outcomes primary cause of gap.</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">THEORETICAL BASIS:</span>
                          <span className="text-slate-700">Mager (1984): Criterion-referenced objective design.</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">DESIGN OUTCOME:</span>
                          <span className="text-[#557502] font-semibold">OBJ 1–6 include observable behavior, conditions &amp; numeric criteria.</span>
                        </div>
                      </div>
                    </div>

                    {/* Decision 2 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <strong className="text-[#1D2440] font-bold block text-xs">
                        2. Performance-Based Assessments (No Recall-Only Tasks)
                      </strong>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">EVIDENCE:</span>
                          <span className="text-slate-700">Students state rules but fail in authentic writing (declarative/procedural gap).</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">THEORETICAL BASIS:</span>
                          <span className="text-slate-700">DeKeyser (2007) L2 procedural acquisition; Wiggins &amp; McTighe (2005).</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">DESIGN OUTCOME:</span>
                          <span className="text-[#557502] font-semibold">All assessments require production, selection, or application; zero definition tasks.</span>
                        </div>
                      </div>
                    </div>

                    {/* Decision 3 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <strong className="text-[#1D2440] font-bold block text-xs">
                        3. Color-Coded Visual Scaffolding with Planned Fading
                      </strong>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">EVIDENCE:</span>
                          <span className="text-slate-700">Grades 2–3 benefit from visual cues; abstract grammar difficult without context.</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">THEORETICAL BASIS:</span>
                          <span className="text-slate-700">Sweller (1988) cognitive load theory; Wood et al. (1976) scaffold fading.</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">DESIGN OUTCOME:</span>
                          <span className="text-[#557502] font-semibold">Three-stage fading sequence in Phase 2; supports removed in Phase 4.</span>
                        </div>
                      </div>
                    </div>

                    {/* Decision 4 */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <strong className="text-[#1D2440] font-bold block text-xs">
                        4. Grade-Differentiated Tasks (Grades 2–3 vs. Grades 4–5)
                      </strong>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">EVIDENCE:</span>
                          <span className="text-slate-700">Developmental variability across mixed grades; older learners have stronger capacity.</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">THEORETICAL BASIS:</span>
                          <span className="text-slate-700">Vygotsky (1978): Zone of Proximal Development (ZPD).</span>
                        </div>
                        <div>
                          <span className="font-mono text-slate-400 block text-[9.5px]">DESIGN OUTCOME:</span>
                          <span className="text-[#557502] font-semibold">OBJ 4 &amp; 5 restricted to Gr. 4–5; Gr. 2–3 complete sentence-level tasks.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================================================= */
              /* DOCUMENT 5: ETEC 6440 Presentation Slides (Embedded Fourth Link)          */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      Executive Presentation • 11 Slide Deck
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      ETEC 6440
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Designing for Grammar Transfer: Tense Application in Writing
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Yu Liu • Directed by Prof. Bronack • California State University San Bernardino • Client: Qi Yao Educational Technology
                  </p>
                </div>

                {/* Slide 1: Title & Overview */}
                <div id="s-sec-1" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 1 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Title Presentation</span>
                  </div>
                  <div className="py-2 text-center space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#557502] font-bold block">
                      California State University San Bernardino
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold text-[#1D2440] font-serif leading-snug">
                      Designing for Grammar Transfer
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700">
                      Focus: Tense Application in Writing
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-slate-600">
                      <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 shadow-2xs">
                        <strong>Author:</strong> Yu Liu
                      </span>
                      <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 shadow-2xs">
                        <strong>Course:</strong> ETEC 6440
                      </span>
                      <span className="px-2.5 py-1 bg-[#709A02]/10 text-[#557502] rounded-md border border-[#709A02]/30 font-bold shadow-2xs">
                        <strong>Client:</strong> Qi Yao Educational Technology
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slide 2: The Performance Gap */}
                <div id="s-sec-2" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 2 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Problem Diagnosis</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    The Performance Gap
                  </h3>

                  {/* Core Insight Epigraph */}
                  <div className="bg-white p-3.5 rounded-xl border-l-4 border-[#709A02] text-xs text-slate-700 italic shadow-2xs">
                    &ldquo;The performance gap reflects a misalignment between instruction, assessment, and desired outcomes rather than mere exposure to content.&rdquo;
                  </div>

                  {/* 3 Pillar Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/90 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">
                        Learn: Textbook Exposure
                      </span>
                      <p className="text-slate-700 font-medium">
                        Students learn grammar rules via isolated textbook exercises and fill-in-the-blanks.
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/90 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-rose-700 uppercase block">
                        Structural Misalignment
                      </span>
                      <p className="text-slate-700 font-medium">
                        Lack of authentic learning outcomes, systematic assessment rubrics, and deliberate practice.
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/90 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#557502] uppercase block">
                        Fail to Apply: Transfer Failure
                      </span>
                      <p className="text-slate-700 font-medium">
                        Knowledge remains isolated and does not transfer to authentic, multi-sentence composition.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slide 3: Learners and Design Constraints */}
                <div id="s-sec-3" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 3 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Context &amp; Constraints</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Learners and Design Constraints
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440] font-bold text-xs">Limited Instructional Time</strong>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-mono font-bold">1.5–2 Hours</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        1.5 to 2 hours per session. Demands high instructional efficiency and zero extraneous cognitive load.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440] font-bold text-xs">Variable Learners</strong>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-mono font-bold">Grades 2–5</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Mixed-grade (grade 2–5), beginner to low-intermediate English proficiency, highly driven by K–12 exam performance.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440] font-bold text-xs">Platform Environment</strong>
                        <span className="px-2 py-0.5 rounded bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-bold">Notion Delivery</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Segmented, modular &amp; asynchronous e-learning delivered entirely within Notion.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1D2440] font-bold text-xs">Curriculum Rules</strong>
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 text-[10px] font-mono font-bold">Custom Tools</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        No structured assessment tools natively available; required engineering custom criterion rubrics and visual scaffolds.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slide 4: Hybrid Instructional Design Approach */}
                <div id="s-sec-4" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 4 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Theoretical Framework</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Hybrid Instructional Design Approach
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image10.png" 
                      alt="Hybrid Instructional Design Approach Diagram" 
                      className="w-full max-h-72 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 4.1: Hybrid Integration Architecture of Macro Alignment and Micro Sequencing
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    By combining <strong>Backward Design (UbD)</strong> for macro curriculum alignment (outcomes &rarr; evidence &rarr; learning plan) with <strong>Gagné’s Nine Events of Instruction</strong> for micro-lesson sequencing, instruction is tightly coupled with authentic writing transfer.
                  </p>
                </div>

                {/* Slide 5: Backward Design + Gagné Mapping */}
                <div id="s-sec-5" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 5 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Macro + Micro Alignment</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Backward Design (Macro) + Gagné (Micro) = Aligned Cognitive Scaffold
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image9.png" 
                      alt="Backward Design and Gagné Cognitive Mapping" 
                      className="w-full max-h-72 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 5.1: Stage-by-Event Cognitive Scaffold Alignment
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 space-y-1.5 shadow-2xs">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#557502] font-bold shrink-0">Stage 1 &rarr; Events 1–3:</span>
                      <span>Gain attention with story vignettes, inform objectives, stimulate recall of past experiences.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#557502] font-bold shrink-0">Stage 2 &rarr; Events 6–8:</span>
                      <span>Elicit verb transformations, provide explanatory feedback, assess paragraph transfer.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#557502] font-bold shrink-0">Stage 3 &rarr; Events 4, 5, 9:</span>
                      <span>Present stimulus with visual time markers, provide guided discovery, enhance transfer through free paragraph writing.</span>
                    </div>
                  </div>
                </div>

                {/* Slide 6: Instructional Flow */}
                <div id="s-sec-6" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 6 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Instructional Flow</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                      Instructional Flow: Fading Cognitive Scaffolding
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#709A02]/15 text-[#557502] font-bold">
                      4 Phases
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image6.png" 
                      alt="Instructional Flow Diagram" 
                      className="w-full max-h-72 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 6.1: The Systematic Fading of Cognitive Scaffolding across 4 Phases
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <strong className="text-[#557502] block font-mono text-[11px]">Phase 1: Context Activation</strong>
                      <span className="text-slate-600">Activate temporal schema with authentic, relatable narratives.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <strong className="text-[#557502] block font-mono text-[11px]">Phase 2: Guided Rule Synthesis</strong>
                      <span className="text-slate-600">Color-coded temporal anchors and guided rule induction.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <strong className="text-[#557502] block font-mono text-[11px]">Phase 3: Contrastive Practice</strong>
                      <span className="text-slate-600">Paired sentence transformations and immediate error feedback.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <strong className="text-[#557502] block font-mono text-[11px]">Phase 4: Authentic Application</strong>
                      <span className="text-slate-600">Independent multi-tense paragraph composition without scaffolds.</span>
                    </div>
                  </div>
                </div>

                {/* Slide 7: Implementation (Notion) */}
                <div id="s-sec-7" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 7 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Implementation Architecture</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Implementation: Notion E-Learning Architecture
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image5.jpg" 
                      alt="Implementation Architecture in Notion" 
                      className="w-full max-h-80 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 7.1: Modular Notion Course Dashboard &amp; Interactive Learning Blocks
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Designed for asynchronous delivery on Notion: features toggle-based progressive disclosure, audio embeds for listening support, callout checkpoints, and automated progress trackers.
                  </p>
                </div>

                {/* Slide 8: Interactive Phase 1 & 2 Modules */}
                <div id="s-sec-8" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 8 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Interactive Lessons</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Interactive Modules: Phases 1 &amp; 2
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image1.jpg" 
                      alt="Interactive Phase 1 and 2 Implementation" 
                      className="w-full max-h-80 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 8.1: Context Activation and Rule Synthesis Interactive Pages
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Visual cues color-code temporal markers (Past = Orange, Present = Green, Future = Blue) to reinforce semantic understanding before eliciting formal syntactic rules.
                  </p>
                </div>

                {/* Slide 9: Formative Practice Phase 3 */}
                <div id="s-sec-9" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 9 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Formative Practice</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Formative Practice &amp; Contrastive Exercises: Phase 3
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image4.jpg" 
                      alt="Formative Practice and Contrastive Drills" 
                      className="w-full max-h-80 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 9.1: Scaffolded Error Correction &amp; Contrastive Tense Exercises
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Targets frequent student misconceptions (e.g. &ldquo;yesterday I go&rdquo;, &ldquo;tomorrow I went&rdquo;) with contrastive side-by-side rewriting and immediate formative feedback callouts.
                  </p>
                </div>

                {/* Slide 10: Transfer Assessment Phase 4 */}
                <div id="s-sec-10" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 10 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Authentic Transfer</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Authentic Writing Transfer &amp; Rubrics: Phase 4
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image3.jpg" 
                      alt="Authentic Writing Transfer and Scoring Rubric" 
                      className="w-full max-h-80 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 10.1: Summative Paragraph Writing Tasks &amp; Criterion-Referenced Scoring Rubric
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Learners write complete 100–150 word paragraphs integrating all three timeframes without scaffolds. Evaluated via a 3-criteria analytic rubric (Tense Consistency, Verb Morphology, Temporal Marker Alignment).
                  </p>
                </div>

                {/* Slide 11: Evaluation & Attainment */}
                <div id="s-sec-11" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Slide 11 of 11</span>
                    <span className="text-[10px] font-mono text-slate-400">Evaluation &amp; Impact</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Evaluation &amp; Instructional Attainment: Grammar Transfer Achieved
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center">
                    <img 
                      src="/presentation/image2.jpg" 
                      alt="Evaluation Outcomes and Grammar Transfer Attainment" 
                      className="w-full max-h-80 object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                      Figure 11.1: Measurable Grammar Transfer Attainment &amp; Client Evaluation Outcomes
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 space-y-2 shadow-2xs">
                    <strong className="text-[#1D2440] font-bold block text-xs">
                      Key Instructional Project Outcomes:
                    </strong>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                      <li>
                        <strong>Performance Gap Bridged:</strong> Successfully moved learners from isolated textbook recognition to spontaneous, accurate tense usage in independent paragraph writing.
                      </li>
                      <li>
                        <strong>Scaffold Fading Validated:</strong> 85%+ students maintained correct tense consistency even after the removal of color coding in Phase 4.
                      </li>
                      <li>
                        <strong>Client Adoption:</strong> Mr. Zhao and Qi Yao Educational Technology adopted the Notion delivery architecture as a permanent supplementary learning pipeline.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
