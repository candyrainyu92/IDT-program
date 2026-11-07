import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertTriangle, Layers, BookOpen, Clock, Target, Users, Sparkles, Compass, Check, ArrowRight, Presentation, FileText } from 'lucide-react';
import letterImg from '../assets/images/let.png';
import { Etec6920DesignReportView } from './Etec6920DesignReportView';

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

  const isFirstLink = false;

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
    { id: 'c-sec-1', label: '1. Instructional Context' },
    { id: 'c-sec-2', label: '2. Learner Analysis' },
    { id: 'c-sec-3', label: '3. Performance Gap' },
    { id: 'c-sec-4', label: '4. Evidence' },
    { id: 'c-sec-5', label: '5. Cause Analysis' },
    { id: 'c-sec-6', label: '6. Instructional Factors' },
    { id: 'c-sec-7', label: '7. Key Findings' },
    { id: 'c-sec-8', label: '8. Design Implications' },
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
    { id: 'a-sec-1', label: '1. Scope & Priorities' },
    { id: 'a-sec-2', label: '2. Design Approach' },
    { id: 'a-sec-3', label: '3. Goals & Outcomes' },
    { id: 'a-sec-4', label: '4. Content & Module Map' },
    { id: 'a-sec-5', label: '5. Assessment Plan' },
    { id: 'a-sec-6', label: '6. Subskills & Sequence' },
    { id: 'a-sec-7', label: '7. Instructional Strategies' },
    { id: 'a-sec-8', label: '7B. Delivery Platform' },
    { id: 'a-sec-9', label: '8. Prototype Spec' },
    { id: 'a-sec-10', label: '9. Implementation Plan' },
    { id: 'a-sec-11', label: '10. Evaluation & Appendices' },
  ];

  const designSections = [
    { id: 'd-sec-1', label: '1. Purpose & Tryout Context' },
    { id: 'd-sec-2', label: '2. Assessment Findings' },
    { id: 'd-sec-3', label: '3. Evaluation Findings' },
    { id: 'd-sec-4', label: '4. Revision Priorities' },
    { id: 'd-sec-5', label: '5. Implementation & Verification' },
    { id: 'd-sec-6', label: '6. Revision Workflow' },
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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#EFE8DC]/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[92vh] w-auto aspect-[2420/1668] flex items-center justify-center drop-shadow-[0_25px_50px_rgba(76,71,71,0.18)]"
        >
          {/* Close Button matching Research Page Yellow Book popup */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4C4747] hover:bg-[#3a3636] text-[#EFE8DC] flex items-center justify-center shadow-xl backdrop-blur-md border border-[#EFE8DC]/40 transition-all cursor-pointer select-none z-30 hover:scale-110 active:scale-95"
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
              /* DOCUMENT 1: Analysis Report (Think Supplementary E-Learning Project)      */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      ETEC 6920 • Analysis Report
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      QiYao EdTech
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Analysis Report
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
                    Think Supplementary E-Learning Project
                  </p>
                </div>

                {/* Section 1. Instructional Context */}
                <div id="c-sec-1" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 1</span>
                    <span className="text-[10px] font-mono text-slate-400">Instructional Context</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 1. Instructional Context
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">1.1 Client and Program Background</h4>
                      <p className="mb-2">
                        The client is Ms. Zhao, Director of English Language at QiYao Educational Technology Company in China. She oversees the English program and coordinates curriculum improvement, teacher support, and instructional quality.
                      </p>
                      <p className="mb-2">
                        The Think program provides supplementary English instruction to students in Grades 2–5. It currently includes five classes with 67 students. Classes generally last approximately two hours, including a break. Instruction is primarily conducted in English, with some Chinese support for younger learners.
                      </p>
                      <p>
                        The program was introduced quickly in response to market demand. According to the client, formal placement procedures, explicit learning outcomes, and a coordinated assessment framework were not fully established before implementation. Teachers generally follow the textbook sequence, while arranging additional practice, homework, and tests according to their class progress.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">1.2 Stakeholder Priorities</h4>
                      <p className="mb-2">
                        The first client interview identified grammar improvement as an immediate priority and independent writing as a longer-term aspiration. Parents primarily expect improved school examination performance. The client is concerned about the effects of limited progress on parent satisfaction, course reputation, and enrollment.
                      </p>
                      <p className="mb-2">
                        During the second meeting, the client clarified that the supplementary project should follow Think content rather than mirror the pace of school English courses. The intended educational direction is sustained language development. Improved school performance remains a stakeholder expectation, but immediate examination gains are not the sole basis for the proposed product.
                      </p>
                      <p>
                        The client’s aspiration for a 150-word piece of academic writing requires further definition. It does not yet constitute an agreed performance standard across all textbook levels.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">1.3 Proposed Project Scope</h4>
                      <p className="mb-2">
                        The client envisions a supplementary e-learning product covering the complete Think series, from Starter through Level 5.
                      </p>
                      <p className="mb-1">The proposed resource would:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Supplement existing classroom instruction.</li>
                        <li>Strengthen grammar application and written production.</li>
                        <li>Retain connections between reading, grammar, and writing.</li>
                        <li>Allow supplementary content to be reorganized rather than strictly following textbook units.</li>
                        <li>Include reference resources, such as vocabulary lists and grammar rules.</li>
                        <li>Support self-paced learning, self-checking of grammar practice, and teacher feedback on writing.</li>
                      </ul>
                      <p className="mb-2">
                        The client prefers Notion as the delivery platform. However, technical suitability, learner access, submission procedures, and permissions require verification.
                      </p>
                      <p>
                        The complete series represents the client’s long-term product vision. The initial development scope, prototype coverage, and implementation schedule still require agreement and management approval.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2. Learner Analysis */}
                <div id="c-sec-2" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 2</span>
                    <span className="text-[10px] font-mono text-slate-400">Learner Analysis</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 2. Learner Analysis
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">2.1 Current Learner Groups</h4>
                      <p className="mb-2">
                        The current learners are elementary students in Grades 2–5 receiving English instruction outside their regular school program.
                      </p>
                      <div className="overflow-x-auto my-2">
                        <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                              <th className="p-2 border border-slate-200">Class</th>
                              <th className="p-2 border border-slate-200">Students</th>
                              <th className="p-2 border border-slate-200">Grades</th>
                              <th className="p-2 border border-slate-200">Current Textbook</th>
                              <th className="p-2 border border-slate-200">Reported Unit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border border-slate-200">Think 1</td><td className="p-2 border border-slate-200">15</td><td className="p-2 border border-slate-200">Grade 3</td><td className="p-2 border border-slate-200">Level 1</td><td className="p-2 border border-slate-200">Unit 4</td></tr>
                            <tr><td className="p-2 border border-slate-200">Think 2</td><td className="p-2 border border-slate-200">15</td><td className="p-2 border border-slate-200">Grades 4–5</td><td className="p-2 border border-slate-200">Level 2</td><td className="p-2 border border-slate-200">Unit 2</td></tr>
                            <tr><td className="p-2 border border-slate-200">Think 3</td><td className="p-2 border border-slate-200">12</td><td className="p-2 border border-slate-200">Grades 4–5</td><td className="p-2 border border-slate-200">Level 1</td><td className="p-2 border border-slate-200">Unit 8</td></tr>
                            <tr><td className="p-2 border border-slate-200">Think 4</td><td className="p-2 border border-slate-200">11</td><td className="p-2 border border-slate-200">Grades 4–5</td><td className="p-2 border border-slate-200">Level 1</td><td className="p-2 border border-slate-200">Unit 9</td></tr>
                            <tr><td className="p-2 border border-slate-200">Think 5</td><td className="p-2 border border-slate-200">14</td><td className="p-2 border border-slate-200">Grades 2–3</td><td className="p-2 border border-slate-200">Starter</td><td className="p-2 border border-slate-200">Unit 9</td></tr>
                            <tr className="font-bold bg-slate-50"><td className="p-2 border border-slate-200">Total</td><td className="p-2 border border-slate-200">67</td><td className="p-2 border border-slate-200">Grades 2–5</td><td className="p-2 border border-slate-200">—</td><td className="p-2 border border-slate-200">—</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mb-2">
                        Grade level alone does not explain English proficiency. Teacher A reported that some younger students demonstrate stronger oral language and vocabulary than older classmates. The pre-test results also show different placement profiles among classes containing the same grades.
                      </p>
                      <p>
                        Instructional grouping should therefore consider demonstrated skills, textbook experience, and support needs alongside age.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">2.2 Pre-Test Results</h4>
                      <p className="mb-2">
                        The supplied Think Second Edition Pre-Test guidance describes the assessment as a tool for selecting an appropriate course-book level and identifying students who may need additional support.
                      </p>
                      <p className="mb-2">The reported results for 67 students are:</p>
                      <div className="overflow-x-auto my-2">
                        <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                              <th className="p-2 border border-slate-200">Think Pre-Test Placement Band</th>
                              <th className="p-2 border border-slate-200">Score Range</th>
                              <th className="p-2 border border-slate-200">Students</th>
                              <th className="p-2 border border-slate-200">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border border-slate-200">A1</td><td className="p-2 border border-slate-200">0–15</td><td className="p-2 border border-slate-200">1</td><td className="p-2 border border-slate-200">1.5%</td></tr>
                            <tr><td className="p-2 border border-slate-200">A2</td><td className="p-2 border border-slate-200">16–33</td><td className="p-2 border border-slate-200">45</td><td className="p-2 border border-slate-200">67.2%</td></tr>
                            <tr><td className="p-2 border border-slate-200">B1</td><td className="p-2 border border-slate-200">34–51</td><td className="p-2 border border-slate-200">20</td><td className="p-2 border border-slate-200">29.9%</td></tr>
                            <tr><td className="p-2 border border-slate-200">B1+</td><td className="p-2 border border-slate-200">52–69</td><td className="p-2 border border-slate-200">1</td><td className="p-2 border border-slate-200">1.5%</td></tr>
                            <tr><td className="p-2 border border-slate-200">B2</td><td className="p-2 border border-slate-200">70–87</td><td className="p-2 border border-slate-200">0</td><td className="p-2 border border-slate-200">0%</td></tr>
                            <tr><td className="p-2 border border-slate-200">C1</td><td className="p-2 border border-slate-200">88–112</td><td className="p-2 border border-slate-200">0</td><td className="p-2 border border-slate-200">0%</td></tr>
                            <tr className="font-bold bg-slate-50"><td className="p-2 border border-slate-200">Total</td><td className="p-2 border border-slate-200">—</td><td className="p-2 border border-slate-200">67</td><td className="p-2 border border-slate-200">100%</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-2">Percentages are rounded.</p>
                      <p className="mb-2">
                        The reported overall mean is 30.52 out of 112, with a median of 30, a standard deviation of 8.02, and a range of 15–55.
                      </p>
                      <p>
                        These figures describe performance on a course-placement assessment. The maximum score covers a wide range of textbook levels; consequently, a mean of 30.52 should not be interpreted as a low achievement percentage or a course failure.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">2.3 Placement Patterns by Class</h4>
                      <div className="overflow-x-auto my-2">
                        <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                              <th className="p-2 border border-slate-200">Classroom</th>
                              <th className="p-2 border border-slate-200">Mean</th>
                              <th className="p-2 border border-slate-200">Score Range</th>
                              <th className="p-2 border border-slate-200">Placement Distribution</th>
                              <th className="p-2 border border-slate-200">Preliminary Interpretation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border border-slate-200">1</td><td className="p-2 border border-slate-200">31.07</td><td className="p-2 border border-slate-200">25–35</td><td className="p-2 border border-slate-200">A2: 11; B1: 4</td><td className="p-2 border border-slate-200">Most results fall within the band associated with Level 1; some students may need additional challenges.</td></tr>
                            <tr><td className="p-2 border border-slate-200">2</td><td className="p-2 border border-slate-200">42.00</td><td className="p-2 border border-slate-200">35–55</td><td className="p-2 border border-slate-200">B1: 14; B1+: 1</td><td className="p-2 border border-slate-200">Results are broadly consistent with placement in Level 2.</td></tr>
                            <tr><td className="p-2 border border-slate-200">3</td><td className="p-2 border border-slate-200">27.75</td><td className="p-2 border border-slate-200">23–31</td><td className="p-2 border border-slate-200">A2: 12</td><td className="p-2 border border-slate-200">All results fall within the band associated with Level 1.</td></tr>
                            <tr><td className="p-2 border border-slate-200">4</td><td className="p-2 border border-slate-200">29.55</td><td className="p-2 border border-slate-200">25–36</td><td className="p-2 border border-slate-200">A2: 9; B1: 2</td><td className="p-2 border border-slate-200">Most results support Level 1 placement, with some variation.</td></tr>
                            <tr><td className="p-2 border border-slate-200">5</td><td className="p-2 border border-slate-200">20.79</td><td className="p-2 border border-slate-200">15–25</td><td className="p-2 border border-slate-200">A1: 1; A2: 13</td><td className="p-2 border border-slate-200">Most results suggest consideration of Level 1 placement; writing readiness requires separate examination.</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mb-2">
                        These interpretations replace categorical judgments such as “extremely matched.” They indicate broad consistency with the publisher’s placement recommendations, rather than confirmed mastery.
                      </p>
                      <p className="mb-2">
                        Think 5 classroom requires particular attention. Most students fall within the A2 placement band, while the reviewed Starter assignments show difficulties constructing complete sentences and responding fully to writing prompts. This combination suggests that course-placement performance and independent writing ability may differ. It does not automatically establish that the class is incorrectly placed.
                      </p>
                      <p>
                        Because students have already received Think instruction, the assessment represents their current placement profile. It cannot establish whether their original placement was appropriate when they entered the program.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">2.4 CEFR Coverage and Demonstrated Proficiency</h4>
                      <p className="mb-2">
                        Cambridge’s official Think Starter CEFR guide states that the book “covers level A1 of the CEFR.” This describes the curriculum’s coverage and alignment. It does not, by itself, establish the proficiency attained by an individual learner.
                      </p>
                      <p className="mb-2">The supplied Second Edition materials identify the following course-level associations:</p>
                      <div className="overflow-x-auto my-2">
                        <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                              <th className="p-2 border border-slate-200">Think Level</th>
                              <th className="p-2 border border-slate-200">Associated CEFR Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border border-slate-200">Starter</td><td className="p-2 border border-slate-200">A1</td></tr>
                            <tr><td className="p-2 border border-slate-200">Level 1</td><td className="p-2 border border-slate-200">A2</td></tr>
                            <tr><td className="p-2 border border-slate-200">Level 2</td><td className="p-2 border border-slate-200">B1</td></tr>
                            <tr><td className="p-2 border border-slate-200">Level 3</td><td className="p-2 border border-slate-200">B1+</td></tr>
                            <tr><td className="p-2 border border-slate-200">Level 4</td><td className="p-2 border border-slate-200">B2</td></tr>
                            <tr><td className="p-2 border border-slate-200">Level 5</td><td className="p-2 border border-slate-200">C1</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mb-1">For this project, three concepts must remain distinct:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li><strong>Curriculum coverage:</strong> the language content and performance expectations addressed by a textbook.</li>
                        <li><strong>Course placement:</strong> the textbook level suggested by the Think Pre-Test.</li>
                        <li><strong>Demonstrated proficiency:</strong> what a learner can independently perform across relevant language tasks.</li>
                      </ul>
                      <p>
                        The available pre-test summary supports course-placement analysis. It does not independently verify each learner’s complete CEFR proficiency or writing competence.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">2.5 Learning Experience and Support Needs</h4>
                      <p className="mb-2">
                        Teachers report that students are familiar with textbook activities, workbook exercises, and teacher-led answer review. Some students perform adequately when tasks target one grammar structure, but experience difficulty when structures are combined or teacher prompts are removed.
                      </p>
                      <p className="mb-1">Writing support needs differ:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Reviewed Starter work indicates difficulty with basic sentence construction and complete responses to prompts.</li>
                        <li>Reviewed Level 1 work indicates greater paragraph production, with continuing problems in accuracy, sentence completeness, and relevance.</li>
                        <li>Level 2 writing needs have not been established through the assignment evidence currently available.</li>
                      </ul>
                      <p>
                        Students’ own motivations have not been directly investigated. Parental expectations and the client’s commercial objectives should not be presented as confirmed learner motivations.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">2.6 Age, Language Background</h4>
                      <p>
                        The target learners are elementary students in Grades 2–5 learning English in a predominantly Chinese-language environment. Their experience is therefore situated primarily within an English as a Foreign Language (EFL) context.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3. Performance Gap */}
                <div id="c-sec-3" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 3</span>
                    <span className="text-[10px] font-mono text-slate-400">Performance Gap</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 3. Performance Gap
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">3.1 Current Performance</h4>
                      <p className="mb-2">
                        The available evidence indicates that students do not consistently transfer grammar knowledge into independent written performance.
                      </p>
                      <p className="mb-1">Reported and observed difficulties include:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Selecting and maintaining appropriate tense forms.</li>
                        <li>Forming grammatically complete sentences.</li>
                        <li>Using subject–verb agreement and auxiliary verbs correctly.</li>
                        <li>Answering reading questions with complete written responses.</li>
                        <li>Addressing all parts of a writing prompt.</li>
                        <li>Maintaining relevance and organization in short texts.</li>
                        <li>Applying grammar when multiple structures are combined.</li>
                      </ul>
                      <p>Teacher accounts also indicate that supported performance may exceed independent performance.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">3.2 Desired Performance</h4>
                      <p className="mb-2">A preliminary instructional goal is:</p>
                      <blockquote className="p-3 bg-gradient-to-r from-[#709A02]/15 to-transparent rounded-xl border-l-4 border-[#709A02] font-semibold text-[#1D2440] mb-2">
                        After completing an appropriate supplementary learning sequence, learners will be able to independently apply level-appropriate grammar to produce complete, relevant sentences and connected written texts in response to contextualized tasks.
                      </blockquote>
                      <p className="mb-2">This goal reflects the broader project rather than limiting instruction to three simple tenses.</p>
                      <p className="mb-1">Level-specific expectations should be developed from textbook targets, demonstrated learner needs, and agreed assessment criteria. Potential dimensions include:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Grammatical accuracy.</li>
                        <li>Sentence completeness.</li>
                        <li>Coverage of task requirements.</li>
                        <li>Relevance to the topic.</li>
                        <li>Organization and connections between ideas.</li>
                        <li>Independent revision.</li>
                      </ul>
                      <p>Exact task lengths, accuracy thresholds, support conditions, and mastery criteria have not yet been established.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">3.3 Preliminary Gap Statement</h4>
                      <p className="mb-2">
                        There is a preliminary discrepancy between the demands of the reviewed grammar and writing tasks and students’ demonstrated ability to complete those tasks independently.
                      </p>
                      <p className="mb-2">
                        For Starter learners, the discrepancy is particularly evident in sentence formation and full responses to guided writing prompts. For Level 1 learners, it is evident in mixed grammar application and the production of accurate, complete, and relevant paragraphs.
                      </p>
                      <p className="mb-2">
                        The gap is currently qualitative. It cannot yet be quantified against a common performance standard because assignment samples have not been consistently scored using agreed criteria.
                      </p>
                      <p>
                        Current unit coverage must also be considered. For example, the supplied curriculum map introduces Starter past-tense content in Units 10–11, while Think 5 is reported to be studying Unit 9. Errors involving content not yet taught should not automatically be classified as failure to retain or transfer prior instruction.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4. Evidence */}
                <div id="c-sec-4" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 4</span>
                    <span className="text-[10px] font-mono text-slate-400">Evidence</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 4. Evidence
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">4.1 Information Sources</h4>
                      <p className="mb-1">This analysis draws on:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Two client meeting records.</li>
                        <li>Questionnaire responses from three teachers.</li>
                        <li>The provided review of student assignments and teacher markings.</li>
                        <li>The supplied Think grammar and writing curriculum analysis.</li>
                        <li>Think Second Edition Pre-Test guidance.</li>
                        <li>Reported pre-test statistics for 67 students.</li>
                        <li>Cambridge’s official Think Starter CEFR guide.</li>
                      </ul>
                      <p>Client and teacher statements provide stakeholder perspectives. Assignment findings provide evidence of written performance. Placement results provide an additional view of course-level readiness.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">4.2 Student Assignment Findings</h4>
                      <div className="overflow-x-auto my-2">
                        <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                              <th className="p-2 border border-slate-200">Area</th>
                              <th className="p-2 border border-slate-200">Starter Findings</th>
                              <th className="p-2 border border-slate-200">Level 1 Findings</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Grammar application</td><td className="p-2 border border-slate-200">Tense errors, incorrect verb forms, missing auxiliaries, and word-order errors</td><td className="p-2 border border-slate-200">Frequent errors in mixed grammar exercises and inconsistent tense use</td></tr>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Sentence completeness</td><td className="p-2 border border-slate-200">Incomplete answers to reading questions and difficulty constructing sentences</td><td className="p-2 border border-slate-200">Sentence fragments within compositions</td></tr>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Writing-task coverage</td><td className="p-2 border border-slate-200">Responses omit guiding questions and generally contain fewer than five sentences</td><td className="p-2 border border-slate-200">Paragraphs are produced, but may include irrelevant sentences</td></tr>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Organization</td><td className="p-2 border border-slate-200">Disorganized responses and off-topic content</td><td className="p-2 border border-slate-200">Relatively clear overall direction, with inconsistent topic focus</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p>These findings support differentiated instructional needs. They do not establish the prevalence of each error across all students because sample numbers and representativeness have not been documented.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">4.3 Teacher Observations</h4>
                      <p className="mb-1">Teacher responses provide converging evidence that:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Oral participation and some reading performance have improved.</li>
                        <li>Independent writing remains difficult.</li>
                        <li>Mixed grammar tasks are more challenging than single-structure exercises.</li>
                        <li>Teacher prompts and task breakdowns can help students produce responses.</li>
                        <li>Writing homework completion is limited.</li>
                        <li>Correcting an answer does not necessarily demonstrate understanding.</li>
                      </ul>
                      <p className="mb-2">
                        Teacher B’s example of students retaining a third-person singular ending after <em>does</em> or <em>doesn’t</em> identifies one specific issue for further diagnostic examination.
                      </p>
                      <p>
                        Teacher C’s observation that some students can explain ideas in Chinese but struggle to express them in English suggests that idea generation and English expression should be examined separately.
                      </p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">4.4 Curriculum Findings</h4>
                      <p className="mb-2">
                        The supplied curriculum analysis shows progression from foundational sentence structures and short written responses to more complex grammar and extended genres.
                      </p>
                      <div className="overflow-x-auto my-2">
                        <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                              <th className="p-2 border border-slate-200">Textbook Range</th>
                              <th className="p-2 border border-slate-200">Broad Grammar Progression</th>
                              <th className="p-2 border border-slate-200">Broad Writing Progression</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Starter</td><td className="p-2 border border-slate-200">Basic sentence patterns, present forms, introductory past forms, and common modal expressions</td><td className="p-2 border border-slate-200">Personal information, descriptions, and short guided texts</td></tr>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Level 1</td><td className="p-2 border border-slate-200">Contrasts among present and past forms, future expressions, and introductory present perfect</td><td className="p-2 border border-slate-200">Paragraphs, emails, messages, and short articles</td></tr>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Level 2</td><td className="p-2 border border-slate-200">Expanded perfect forms, conditionals, passive structures, and reported language</td><td className="p-2 border border-slate-200">Stories, reports, articles, and short essays</td></tr>
                            <tr><td className="p-2 border border-slate-200 font-semibold">Levels 3–5</td><td className="p-2 border border-slate-200">Increasingly complex clauses, modality, discourse structures, and advanced grammatical choices</td><td className="p-2 border border-slate-200">More varied and extended writing, including essays, proposals, reviews, and reports</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mb-3">
                        The earlier review raised concerns about brief explanations, workbook demands, and writing scaffolding. These remain potential areas for supplementation.
                      </p>

                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 mb-3">
                        <h5 className="font-bold text-[#1D2440] text-xs sm:text-sm">Unit-Level Example Analysis: Starter Unit 1</h5>
                        <p>
                          The designer’s review of Starter Unit 1 identifies question words and the verb <em>be</em> as the principal grammar content, including:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>a grammar rap video</li>
                          <li>brief rule explanation</li>
                          <li>elected-response exercises</li>
                          <li>an oral question-and-answer activity.</li>
                        </ul>
                        <p>
                          The writing task asks learners to provide personal information in response to questions. According to the review, no written model or explicit sequence connecting the grammar exercises to the final writing task was identified.
                        </p>
                        <p>
                          There is a plausible content connection: question words support understanding personal-information questions, and <em>be</em> supports responses such as “I am nine years old.” However, practice selecting question words or forms of <em>be</em> does not necessarily provide sufficient preparation for independently constructing those responses.
                        </p>
                        <p>
                          The example does not establish that the grammar sequence is inappropriate across the series. It identifies a specific area where the materials may require supplementation for the current learners.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-[#709A02]/30 space-y-2">
                        <h5 className="font-bold text-[#557502] text-xs sm:text-sm">Addition to Section 4.4: Curriculum Findings (4/22/2026)</h5>
                        <p className="font-bold text-[#1D2440]">Cross-Level Grammar Progression</p>
                        <p>
                          The content mapping of THINK Starter through Level 5 identifies a progression in which grammatical structures are introduced, revisited, contrasted, and extended.
                        </p>
                        <p>
                          For example, present simple and present continuous are introduced separately in Starter, contrasted in Level 1, and included in a broader present-tense review in Level 3. Past-time expression develops from past simple to past continuous, past perfect, and integrated narrative use. Conditional structures progress from the first conditional to second, third, and mixed conditionals.
                        </p>
                        <p>
                          These findings revise the earlier concern about an unclear grammar sequence. The series demonstrates an identifiable progression, although related content is distributed across different units and levels. The mapping alone does not establish whether the connections between successive topics are sufficiently explicit for the current learners.
                        </p>
                        <p className="font-bold text-[#1D2440] pt-1">Prerequisite Knowledge and Instructional Continuity</p>
                        <p>
                          Later structures depend on earlier grammatical and sentence-level knowledge. Passive constructions require understanding of sentence roles, forms of <em>be</em>, and past participles. Reported speech requires control of relevant tense forms, pronoun reference, and statement word order. Mixed conditionals require understanding of conditional patterns and relationships between past and present situations.
                        </p>
                        <p>
                          The content mapping identifies these prerequisite relationships but does not establish whether they are consistently checked or reinforced before more complex content is introduced.
                        </p>
                        <p>
                          Given the sentence-completeness, auxiliary-verb, agreement, and word-order errors observed in student assignments, prerequisite preparation warrants attention in the supplementary course. This finding does not establish that these foundations are absent from the textbook or classroom instruction.
                        </p>
                        <p className="font-bold text-[#1D2440] pt-1">Connections Between Grammar and Writing</p>
                        <p>
                          The mapping identifies functional connections between grammar content and writing topics. Examples include present simple for routines, narrative tenses for past events, modal expressions for advice, passive constructions for processes, and cause-and-effect expressions for problem reports.
                        </p>
                        <p>
                          However, a content connection does not establish an adequate instructional transition. Writing also requires prompt comprehension, vocabulary selection, sentence construction, relevance, organization, and revision.
                        </p>
                        <p>
                          The Starter Unit 1 review provides a specific example of a possible gap between controlled grammar practice and independent sentence production. Teacher observations and student assignments support examining this transition more closely. The same gap has not yet been established across every unit or level.
                        </p>
                        <p className="font-bold text-[#1D2440] pt-1">Increasing Writing Demands</p>
                        <p>
                          Writing tasks across the series involve increasingly varied purposes, grammatical choices, and organizational demands. Later levels include argumentation, evaluation, formal correspondence, and data reporting.
                        </p>
                        <p>
                          This progression cannot be evaluated through word count or genre labels alone. Task difficulty also depends on required content, vocabulary, sentence complexity, available models, and instructional support.
                        </p>
                        <p>
                          For the current learners, textbook placement should therefore be considered alongside demonstrated writing readiness when determining suitable task demands.
                        </p>
                        <p className="font-bold text-[#1D2440] pt-1">Scope of the Curriculum Evidence</p>
                        <p>
                          The mapping supports an overview of content progression across all six levels. Detailed rule extraction is more complete for Starter through Level 4 than for Level 5.
                        </p>
                        <p>
                          Student assignment findings currently concern Starter and Level 1. Consequently, the analysis does not establish learner performance gaps across Levels 2–5 or the adequacy of practice throughout the complete series.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">4.5 Evidence Limitations</h4>
                      <p className="mb-1">The present evidence does not establish:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Each learner’s complete CEFR proficiency.</li>
                        <li>The frequency of every grammar error.</li>
                        <li>Level 2–5 writing needs.</li>
                        <li>The effectiveness of existing oral feedback.</li>
                        <li>A causal relationship between a particular teaching practice and student errors.</li>
                        <li>The likely improvement produced by the proposed e-learning resource.</li>
                      </ul>
                      <p>The pre-test summary also lacks item-level results and documented administration conditions. These limitations should inform subsequent diagnostic work.</p>
                    </div>
                  </div>
                </div>

                {/* Section 5. Cause Analysis */}
                <div id="c-sec-5" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 5</span>
                    <span className="text-[10px] font-mono text-slate-400">Cause Analysis</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 5. Cause Analysis
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p>The evidence identifies several plausible contributors. These are working explanations rather than confirmed causes.</p>
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">5.1 Unclear Performance Expectations</h4>
                      <p>The client and teachers report a lack of explicit course and level-specific outcomes. This may make it difficult to determine what learners should demonstrate independently and when additional support is required.</p>
                    </div>
                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">5.2 Limited Transfer Opportunities</h4>
                      <p>Teachers describe limited writing practice and greater difficulty with mixed grammar tasks. Students may receive insufficient opportunities to move from practicing an identified structure to choosing and applying structures independently.</p>
                    </div>
                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">5.3 Insufficient Support for Written Production</h4>
                      <p className="mb-2">Assignment findings and teacher observations suggest difficulty moving from prompts or examples to complete written responses.</p>
                      <p>Support may be needed for sentence construction, prompt interpretation, idea selection, and organization. These needs should be distinguished rather than treated as a single grammar problem.</p>
                    </div>
                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">5.4 Feedback and Follow-Up</h4>
                      <p className="mb-2">Some reviewed corrections are difficult to distinguish or lack detail. Teachers also report that checking whether students can apply corrections in a new task is not consistently built into instruction.</p>
                      <p>This may limit opportunities to identify persistent misunderstandings. However, visible markings alone do not establish the absence of oral feedback.</p>
                    </div>
                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">5.5 Variation in Prerequisite Skills</h4>
                      <p className="mb-2">Vocabulary, reading comprehension, sentence construction, and independence vary among learners. A student’s difficulty may arise from misunderstanding the prompt, lacking an expression, or applying a grammar rule incorrectly.</p>
                      <p>Further diagnosis should distinguish these possibilities before selecting instructional responses.</p>
                    </div>
                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">5.6 Explanatory Support and Learner–Task Fit</h4>
                      <p className="mb-2">The unit-level review raises a concern about whether grammar explanations and demonstrations sufficiently support understanding and independent application.</p>
                      <p className="mb-2">In this project, greater instructional depth should mean clearer relationships, contextualized examples, contrasting errors, and guided application. It does not necessarily require more advanced grammar content or extensive grammatical terminology.</p>
                      <p className="mb-2">Writing tasks may also require several skills simultaneously: prompt comprehension, vocabulary retrieval, sentence construction, spelling, and organization. Where these prerequisite skills are not yet stable, limited scaffolding may make independent writing difficult.</p>
                      <p>Teacher reports of dependence on prompts and assignment findings involving incomplete sentences are consistent with this explanation. However, they do not establish that brief textbook explanations caused the observed difficulties. Prior knowledge, actual classroom instruction, practice opportunities, and feedback remain relevant influences.</p>
                    </div>
                  </div>
                </div>

                {/* Section 6. Instructional and Non-Instructional Factors */}
                <div id="c-sec-6" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 6</span>
                    <span className="text-[10px] font-mono text-slate-400">Instructional &amp; Non-Instructional Factors</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 6. Instructional and Non-Instructional Factors
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">6.1 Is Instruction Part of the Solution?</h4>
                      <p className="mb-2">Instruction is a justified part of the response because the available evidence shows difficulties in grammar application and written production.</p>
                      <p className="mb-1">Supplementary instruction could address:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Explicit explanation of selected grammar relationships.</li>
                        <li>Contextualized and mixed practice.</li>
                        <li>Sentence construction.</li>
                        <li>Guided progression toward independent writing.</li>
                        <li>Feedback followed by correction and reapplication.</li>
                        <li>Review of previously taught content.</li>
                      </ul>
                      <p>The evidence does not establish that instruction alone will resolve the problem.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">6.2 Non-Instructional Factors</h4>
                      <p className="mb-1">Relevant contextual and organizational factors include:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Heavy school homework demands.</li>
                        <li>Limited completion of optional supplementary work.</li>
                        <li>Parents’ requests to reduce additional homework.</li>
                        <li>Limited parental capacity to support English learning.</li>
                        <li>Restricted classroom time.</li>
                        <li>Teacher turnover and incomplete preparation.</li>
                        <li>Unconfirmed technology budget and teacher availability.</li>
                        <li>Management approval requirements.</li>
                      </ul>
                      <p>The proposed product would also be optional to purchase. Access, participation, and completion may therefore differ among students. These differences must be considered when interpreting later evaluation results.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">6.3 Learning and Performance Contexts</h4>
                      <p className="mb-2">The proposed learning context is self-paced, supplementary study outside scheduled lessons. Grammar work may be self-checked, while writing may receive teacher feedback.</p>
                      <p className="mb-2">The intended performance contexts include independent textbook-related tasks, writing activities, and examinations. Examination conditions and scoring requirements have not yet been documented sufficiently to define a single assessment environment.</p>
                      <p>Supplementary learning should therefore progressively reduce support and include independent application tasks, while preserving assistance during learning.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">6.4 Implementation Feasibility</h4>
                      <p className="mb-2">The client has expressed willingness to provide two teachers and arrange small-group formative evaluation, subject to management approval and necessary parental permission.</p>
                      <p className="mb-1">Before implementation, the project needs confirmation of:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Initial development scope and schedule.</li>
                        <li>Teacher responsibilities and available time.</li>
                        <li>Technology costs.</li>
                        <li>Student access and usability.</li>
                        <li>Feedback procedures.</li>
                        <li>Evaluation arrangements.</li>
                      </ul>
                      <p>Notion access permissions should not be described as guaranteed copyright protection or as preventing all sharing. Platform capabilities and practical access controls require verification.</p>
                    </div>
                  </div>
                </div>

                {/* Section 7. Key Findings */}
                <div id="c-sec-7" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 7</span>
                    <span className="text-[10px] font-mono text-slate-400">Key Findings</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 7. Key Findings
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p>The analysis establishes the following:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li><strong>The primary instructional concern is independent application.</strong> Assignment findings and teacher accounts indicate difficulty applying grammar accurately within written tasks.</li>
                      <li><strong>Course placement and writing competence are different questions.</strong> Most pre-test results are broadly consistent with current textbook levels, but this does not demonstrate independent writing mastery.</li>
                      <li><strong>Think 5 requires closer examination.</strong> Placement results suggest potential readiness for Level 1, while reviewed writing indicates continuing foundational needs.</li>
                      <li><strong>Learner needs differ by demonstrated performance.</strong> Starter and Level 1 samples show different patterns. Grade alone is insufficient for determining instructional support.</li>
                      <li><strong>The project has expanded beyond supplementary exercises.</strong> The client now envisions a self-paced product with instructional sequences, reference resources, and feedback.</li>
                      <li><strong>The evidence supports initial design, with limits.</strong> It supports a prototype addressing documented Starter and Level 1 needs. It does not yet justify detailed learner claims across all six levels.</li>
                      <li><strong>Sentence-construction support warrants closer attention.</strong> The review of Starter Unit 1 suggests a possible gap between controlled grammar practice and the support provided for independent written responses.</li>
                      <li><strong>Textbook suitability depends on learner readiness as well as level coverage.</strong> Age, EFL learning experience, reading ability, and prior writing practice should inform task demands and scaffolding. Placement results alone do not establish readiness for every writing task.</li>
                    </ol>

                    <div className="p-3.5 bg-white rounded-xl border border-[#709A02]/30 space-y-2 mt-3">
                      <h5 className="font-bold text-[#557502] text-xs sm:text-sm">Addition to Section 7: Key Findings (4/22/2026)</h5>
                      <ul className="list-disc pl-5 space-y-1.5">
                        <li><strong>The textbook series has an identifiable grammar progression.</strong> Related structures are revisited and extended across levels; their distribution across units does not by itself establish an inappropriate sequence.</li>
                        <li><strong>Prerequisite preparation requires attention.</strong> Existing sentence-level errors suggest a need to check foundational knowledge before introducing more complex applications.</li>
                        <li><strong>Grammar and writing are connected at the content level.</strong> The adequacy of the transition from grammar exercises to independent writing remains a separate instructional concern.</li>
                        <li><strong>Writing expectations require readiness-based interpretation.</strong> Textbook level, task length, and genre labels alone do not establish what individual learners can produce independently.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 8. Design Implications */}
                <div id="c-sec-8" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 8</span>
                    <span className="text-[10px] font-mono text-slate-400">Design Implications</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    Section 8. Design Implications
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.1 Establish Level-Specific Outcomes</h4>
                      <p className="mb-2">Develop measurable outcomes that connect textbook content with independent performance. Assessment tasks should follow those outcomes, with criteria addressing grammar, sentence completeness, relevance, and task coverage.</p>
                      <p>The client’s suggested score of approximately 90 should be treated as a proposed criterion requiring agreement about the assessment’s content and difficulty.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.2 Develop a Prerequisite-Based Content Map</h4>
                      <p className="mb-1">Map grammar and writing requirements across the series before reorganizing supplementary content. The map should distinguish:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Prerequisite skills.</li>
                        <li>Newly introduced content.</li>
                        <li>Review and extension.</li>
                        <li>Grammar contrasts requiring explicit practice.</li>
                        <li>Writing tasks requiring particular language resources.</li>
                      </ul>
                      <p>Initial modules should prioritize documented needs and content learners have already encountered.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.3 Use a Provisional Performance Sequence</h4>
                      <p className="mb-1">A working instructional analysis for contextualized writing is:</p>
                      <ol className="list-decimal pl-5 space-y-1 mb-2">
                        <li>Interpret the task and identify required content.</li>
                        <li>Determine the intended meaning and relevant time relationships.</li>
                        <li>Select appropriate grammatical structures.</li>
                        <li>Construct complete sentences.</li>
                        <li>Organize relevant sentences into a connected response.</li>
                        <li>Review and revise the response.</li>
                      </ol>
                      <p>This sequence requires different levels of complexity and support. It should not be restricted by grade without evidence of individual readiness.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.4 Validate Entry Skills</h4>
                      <p className="mb-2">Potential entry requirements include understanding task instructions, recognizing basic sentence elements, using necessary vocabulary, and navigating the learning resource.</p>
                      <p>These should be verified for the selected prototype learners. Enrollment, prior exposure, and a total placement score do not establish mastery of every prerequisite.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.5 Provide Differentiated Explanations and Writing Scaffolding</h4>
                      <p className="mb-2">Supplementary instruction should respond to learners’ demonstrated English literacy and writing readiness while considering age, task length, and independence.</p>
                      <p className="mb-2">For learners with foundational needs, provide contextualized explanations of complete sentence patterns, worked examples, relevant vocabulary, and guided sentence construction. Grammar practice should help learners connect forms with meaning and use.</p>
                      <p className="mb-2">Support should gradually decrease so that evaluation captures independent performance.</p>
                      <p className="mb-1">A possible progression for personal-information writing is:</p>
                      <ol className="list-decimal pl-5 space-y-1 mb-2">
                        <li>Construct a response with a sentence frame.</li>
                        <li>Connect responses into a short text when this is part of the objective.</li>
                        <li>Review the response using a manageable checklist.</li>
                      </ol>
                      <p className="mb-2">The amount of guidance should decrease as learners demonstrate independent performance. Familiar topics and short tasks can make participation more manageable, but should not replace checks of understanding and application.</p>
                      <p>Prototype evaluation should examine whether learners understand the explanations, can move from supported to independent responses, and can complete tasks within a feasible amount of time.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.6 Connect Reading, Grammar, and Writing</h4>
                      <p className="mb-2">Use manageable reading examples to demonstrate grammatical choices and provide models for written production.</p>
                      <p>Supplementary reading difficulty can be adjusted without removing reading from the learning sequence. This reflects the client’s preference to maintain connections among language skills.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.7 Design Feedback for Reapplication</h4>
                      <p className="mb-2">Grammar answer keys should explain relevant choices and common errors. Writing feedback should identify selected priorities and provide an opportunity to revise.</p>
                      <p>Where feasible, a subsequent task should examine whether learners can apply the feedback independently.</p>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">8.8 Prototype and Evaluate Before Scaling</h4>
                      <p className="mb-1">Begin with a manageable prototype grounded in the documented Starter and Level 1 needs. Formative evaluation should examine:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Independent task performance.</li>
                        <li>Clarity of instructions and navigation.</li>
                        <li>Completion time and workload.</li>
                        <li>Use of feedback.</li>
                        <li>Teacher review demands.</li>
                      </ul>
                      <p>Further development should use these findings alongside additional level-specific evidence. Claims about effectiveness across the full series should follow evaluation rather than precede it.</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#709A02]/30 space-y-2 mt-3">
                      <h5 className="font-bold text-[#557502] text-xs sm:text-sm">Addition to Section 8.9: Design Implications (4/22/2026)</h5>
                      <p className="font-bold text-[#1D2440]">Organize Related Content into Explicit Learning Progressions</p>
                      <p>The supplementary course should make relationships among grammatical structures visible through connected explanations, contextual comparisons, and cumulative application.</p>
                      <p>Related textbook content may be grouped into instructional sequences while retaining references to the original levels and units. Final module boundaries will be determined during design through intended performance, prerequisite requirements, and feasible workload.</p>
                      <p className="font-bold text-[#1D2440] pt-1">Check and Support Prerequisite Skills</p>
                      <p>Brief entry checks should identify whether learners possess the sentence-level and grammatical knowledge required for a module. Preparatory activities should address identified needs before learners attempt more complex tasks.</p>
                      <p className="font-bold text-[#1D2440] pt-1">Strengthen the Transition to Writing</p>
                      <p>Supplementary activities should connect grammatical form and meaning with complete sentence construction and relevant written responses. Models, guided construction, contextual choices, and revision should prepare learners for progressively independent performance.</p>
                    </div>
                  </div>
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
              <Etec6920DesignReportView />
            ) : activeDoc === 'design-report' ? (
              /* ========================================================================= */
              /* DOCUMENT 4: Revision Development Plan (Embedded Third Link)               */
              /* ========================================================================= */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Header */}
                <div className="border-b border-slate-300/80 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#709A02]">
                      QiYao’s THINK Supplementary E-Learning Project • ETEC 6920
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#709A02]/15 text-[#557502] text-[10px] font-mono font-semibold">
                      Revision Development Plan
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Revision Development Plan
                  </h2>
                </div>

                {/* 1. Purpose and Tryout Context */}
                <div id="d-sec-1" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 1</span>
                    <span className="text-[10px] font-mono text-slate-400">Purpose &amp; Tryout Context</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    1. Purpose and Tryout Context
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p>
                      This plan documents revisions to the THINK prototype based on teacher-reviewed formative assessment and formative evaluation observations from the two-week tryout of the first 15 learner-facing modules. The prototype includes two pathways: Grades 2–3 and Grades 4–5. The purpose of revision is to preserve instructional elements that appear to support learning and address barriers related to platform usability, language support, and activity design.
                    </p>
                    <p>
                      The findings are encouraging, but they do not establish that the prototype alone caused the observed learning gains. In particular, students may have studied some or all of the first 15 modules before the tryout.
                    </p>
                  </div>
                </div>

                {/* 2. Formative Assessment Findings and Revision Decisions */}
                <div id="d-sec-2" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 2</span>
                    <span className="text-[10px] font-mono text-slate-400">Formative Assessment Findings</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    2. Formative Assessment Findings and Revision Decisions
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Tasks 1–4: Strong performance and score improvement</h4>
                      <p className="mb-2">
                        The teacher-reviewed formative assessment showed that students performed well on Tasks 1–4 after the two-week tryout, with substantial improvement in assessment scores. Because students may already have studied the content covered in the first 15 modules, prior familiarity may have contributed to their performance.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Retain the current instructional sequence, explanations, and practice activities supporting Tasks 1–4.</li>
                        <li>Avoid unnecessary redesign where learners have demonstrated good performance.</li>
                        <li>Review item-level errors and teacher comments to identify concepts that still need clarification or additional practice.</li>
                        <li>In a future tryout, use parallel items or an unfamiliar context where possible to check application beyond previously studied examples.</li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Task 5: Improved sentence construction</h4>
                      <p className="mb-2">
                        Teacher observation indicated that students improved their sentence-construction skills during Task 5. Students appeared confident and were able to produce correct sentences quickly.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Retain the sentence-building activities and supports that appear to help learners construct accurate sentences.</li>
                        <li>Preserve opportunities for independent sentence production, not only recognition-based questions.</li>
                        <li>Continue monitoring accuracy, confidence, speed, and independence with new prompts to check transfer.</li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Writing task: More sentences and fewer grammatical errors</h4>
                      <p className="mb-2">
                        During the writing task, students produced noticeably more sentences, and grammatical errors occurred less frequently.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Retain the current writing-task structure and language supports.</li>
                        <li>Maintain the connection between grammar practice in earlier modules and the integrated writing task in M15.</li>
                        <li>Continue evaluating writing quality as well as quantity, including grammatical accuracy, relevance to the prompt, and organization.</li>
                        <li>Use a comparable but different writing prompt in a future tryout to check whether the improvement is maintained.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 3. Formative Evaluation Findings and Revision Decisions */}
                <div id="d-sec-3" className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 3</span>
                    <span className="text-[10px] font-mono text-slate-400">Formative Evaluation Findings</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    3. Formative Evaluation Findings and Revision Decisions
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Notion usability across grade-level pathways</h4>
                      <p className="mb-2">
                        Grades 2–3 students were not comfortable navigating the Notion platform. After discussion with the client, the team plans to provide printed copies of the learning materials as an additional option. Grades 4–5 students did not show the same difficulty using Notion.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Develop printable versions of the learning materials for Grades 2–3.</li>
                        <li>Continue using Notion for Grades 4–5, where students used the platform without reported difficulty.</li>
                        <li>Ensure that printed materials preserve the same objectives, examples, practice tasks, and sequence as the digital version.</li>
                        <li>Review print readability, page order, writing space, and ease of teacher distribution.</li>
                        <li>Treat printing as an alternative delivery format, not a change to learning objectives or assessment criteria.</li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Positive engagement with the digital platform</h4>
                      <p className="mb-2">
                        Teacher observation indicated that students liked using the digital platform and were able to maintain their attention during learning activities.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Retain the digital learning experience for Grades 4–5.</li>
                        <li>Preserve platform features and activity formats that supported engagement.</li>
                        <li>Continue monitoring attention and task completion, while distinguishing visible engagement from evidence of learning.</li>
                        <li>Avoid adding decorative or unnecessary interactions that may distract from the objectives.</li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Bilingual support in selected sections</h4>
                      <p className="mb-2">
                        The evaluation identified a need for Chinese bilingual support in selected areas, particularly learning objectives and checklists.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Add concise Chinese translations alongside the English objectives and checklists.</li>
                        <li>Keep English as the primary language for instructional content and target-language practice.</li>
                        <li>Use Chinese strategically to clarify expectations and help students understand what they are expected to learn or check.</li>
                        <li>Ask the client or a qualified bilingual reviewer to check translation accuracy, consistency, and age appropriateness.</li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-200/70 pt-3">
                      <h4 className="font-bold text-[#1D2440] text-sm mb-1">Step 4, “Think About the Meaning”: Cognitive load</h4>
                      <p className="mb-2">
                        Step 4, “Think About the Meaning,” is intended to assess students’ thinking and understanding. Although it currently uses multiple-choice questions, students were unfamiliar with this question type. The format therefore added cognitive load and made it harder for students to focus on the intended meaning-making process.
                      </p>
                      <p className="font-semibold text-[#1D2440] mb-1">Revision decisions</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Redesign Step 4 as an interactive activity rather than relying on the current multiple-choice format.</li>
                        <li>Use a concrete, guided interaction that allows students to demonstrate their understanding of meaning.</li>
                        <li>Preserve the learning purpose of the step while reducing unnecessary reading and test-taking demands.</li>
                        <li>Pilot the revised activity with both pathways and adjust scaffolding and complexity to suit each group.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. Revision Priorities */}
                <div id="d-sec-4" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 4</span>
                    <span className="text-[10px] font-mono text-slate-400">Revision Priorities</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    4. Revision Priorities
                  </h3>
                  <div className="overflow-x-auto my-2">
                    <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                      <thead>
                        <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                          <th className="p-2 border border-slate-200 w-[20%]">Priority</th>
                          <th className="p-2 border border-slate-200 w-[34%]">Planned revision</th>
                          <th className="p-2 border border-slate-200 w-[46%]">Rationale</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">High</td>
                          <td className="p-2 border border-slate-200">Provide printed materials for Grades 2–3</td>
                          <td className="p-2 border border-slate-200">Notion navigation created a usability barrier for this age group; the client has discussed the print option.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">High</td>
                          <td className="p-2 border border-slate-200">Redesign Step 4 as an interactive activity</td>
                          <td className="p-2 border border-slate-200">The multiple-choice format increased cognitive load for students unfamiliar with this question type.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Moderate</td>
                          <td className="p-2 border border-slate-200">Add Chinese support to objectives and checklists</td>
                          <td className="p-2 border border-slate-200">Bilingual clarification may improve understanding of expectations while keeping English-language practice central.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Maintain and monitor</td>
                          <td className="p-2 border border-slate-200">Retain sentence-building and writing supports</td>
                          <td className="p-2 border border-slate-200">Teacher observations indicate stronger sentence construction, increased writing output, and fewer grammatical errors.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Maintain and monitor</td>
                          <td className="p-2 border border-slate-200">Retain Notion for Grades 4–5</td>
                          <td className="p-2 border border-slate-200">Students in this pathway did not show difficulty using the platform and responded positively to digital learning.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Maintain and monitor</td>
                          <td className="p-2 border border-slate-200">Retain content assessed in Tasks 1–4, with targeted adjustments only where needed</td>
                          <td className="p-2 border border-slate-200">Students performed well, although prior exposure may have contributed to the results.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. Implementation and Verification */}
                <div id="d-sec-5" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 5</span>
                    <span className="text-[10px] font-mono text-slate-400">Implementation &amp; Verification</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    5. Implementation and Verification
                  </h3>
                  <div className="overflow-x-auto my-2">
                    <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                      <thead>
                        <tr className="bg-slate-100 text-[#1D2440] font-bold text-left">
                          <th className="p-2 border border-slate-200 w-[30%]">Revision</th>
                          <th className="p-2 border border-slate-200 w-[70%]">Verification method</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Printable materials for Grades 2–3</td>
                          <td className="p-2 border border-slate-200">Ask the teacher to review the print version; observe whether students can follow the sequence and complete tasks without platform navigation. Check readability and writing space.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Notion for Grades 4–5</td>
                          <td className="p-2 border border-slate-200">Conduct a brief walkthrough to confirm that students can access materials, navigate between steps, and complete activities.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Bilingual objectives and checklists</td>
                          <td className="p-2 border border-slate-200">Ask the client or a qualified reviewer to check translation accuracy and clarity; observe whether students understand the objectives and checklist items.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Interactive Step 4</td>
                          <td className="p-2 border border-slate-200">Pilot the revised activity with both pathways; observe whether students understand the interaction and demonstrate the intended meaning-making process with less unnecessary cognitive effort.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Sentence-building activities</td>
                          <td className="p-2 border border-slate-200">Use a new prompt and observe correctness, confidence, speed, and independence.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Writing task</td>
                          <td className="p-2 border border-slate-200">Use a comparable but different prompt; review sentence quantity, grammatical accuracy, relevance, and organization.</td>
                        </tr>
                        <tr className="align-top">
                          <td className="p-2 border border-slate-200 font-semibold text-[#1D2440]">Tasks 1–4</td>
                          <td className="p-2 border border-slate-200">Use parallel items or an unfamiliar context where possible to check application beyond previously studied examples.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6. Revision Workflow */}
                <div id="d-sec-6" className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#709A02]">Section 6</span>
                    <span className="text-[10px] font-mono text-slate-400">Revision Workflow</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    6. Revision Workflow
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <li>Organize teacher-reviewed assessment results and evaluation notes by task, pathway, and issue.</li>
                    <li>Separate direct observations from interpretations. For example, record strong performance on Tasks 1–4 while noting prior exposure as a possible explanation.</li>
                    <li>Prioritize revisions according to their impact on access, cognitive load, learning alignment, and implementation feasibility.</li>
                    <li>Revise the relevant materials while keeping both pathways aligned with the learning objectives.</li>
                    <li>Ask the client or teacher to review the revised materials before the next tryout.</li>
                    <li>Conduct a focused retest of the print materials, bilingual supports, and interactive Step 4.</li>
                    <li>Record the prototype version, changes, review feedback, and verification results.</li>
                    <li>Mark each issue as resolved, requiring further adjustment, or needing additional evidence.</li>
                  </ol>
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
