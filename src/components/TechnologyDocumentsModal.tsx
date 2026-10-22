import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  ExternalLink,
  FileText,
  PlayCircle,
  Award,
  Users,
  Layers,
  ClipboardCheck,
  BarChart3,
  Calendar,
  Wrench,
  Sparkles,
  PackageCheck,
} from 'lucide-react';
import letterImg from '../assets/images/let.png';

export type TechDocumentType = 'executive-summary' | 'delivery-plan' | 'assessment-plan';

interface TechnologyDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: TechDocumentType;
}

export const TechnologyDocumentsModal: React.FC<TechnologyDocumentsModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'executive-summary',
}) => {
  const [activeDoc, setActiveDoc] = useState<TechDocumentType>(initialDoc);
  const [activeSec, setActiveSec] = useState<string>('t-sec-1');
  const [showDrivePreview, setShowDrivePreview] = useState<boolean>(false);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const executiveSummarySections = [
    { id: 't-sec-1', label: '1. Project Overview' },
    { id: 't-sec-2', label: '2. Learning Objectives' },
    { id: 't-sec-3', label: '3. Audience & Context' },
    { id: 't-sec-4', label: '4. Platform & Materials' },
    { id: 't-sec-5', label: '5. Delivery Action' },
    { id: 't-sec-6', label: '6. Evaluation Plan' },
    { id: 't-sec-7', label: '7. Evaluation Results' },
  ];

  const deliveryPlanSections = [
    { id: 'dp-sec-exec', label: 'Executive Summary' },
    { id: 'dp-sec-a', label: 'a. What You Deliver' },
    { id: 'dp-sec-b', label: 'b. Learning Objectives' },
    { id: 'dp-sec-c', label: 'c. Delivery Tools' },
    { id: 'dp-sec-d', label: 'd. Delivery Materials' },
    { id: 'dp-sec-e', label: 'e. Target Audience' },
    { id: 'dp-sec-f', label: 'f. Timeline & Duration' },
    { id: 'dp-sec-good-start', label: 'Good Start Strategy' },
  ];

  const assessmentPlanSections = [
    { id: 'ap-sec-a', label: 'Part A: Evaluation Rubrics' },
    { id: 'ap-sec-roi', label: 'Selected: ROI Rubric' },
    { id: 'ap-sec-b', label: 'Part B: CSU QLT & OCS' },
    { id: 'ap-sec-c', label: 'Part C: Learning Outcomes' },
    { id: 'ap-sec-d', label: 'Part D: Teaching Effectiveness' },
  ];

  const sections =
    activeDoc === 'executive-summary'
      ? executiveSummarySections
      : activeDoc === 'delivery-plan'
      ? deliveryPlanSections
      : assessmentPlanSections;

  const getDefaultSec = (doc: TechDocumentType) => {
    if (doc === 'executive-summary') return 't-sec-1';
    if (doc === 'delivery-plan') return 'dp-sec-exec';
    return 'ap-sec-a';
  };

  // Sync activeDoc when modal opens or initialDoc changes
  useEffect(() => {
    if (isOpen) {
      setActiveDoc(initialDoc);
      setActiveSec(getDefaultSec(initialDoc));
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, initialDoc]);

  const handleSwitchDoc = (doc: TechDocumentType) => {
    setActiveDoc(doc);
    setActiveSec(getDefaultSec(doc));
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
  };

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

  const scrollToSection = (id: string) => {
    setActiveSec(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  const deliveryMaterials = [
    {
      name: 'Nissan Z Heritage Gallery',
      url: 'https://www3.nissan.co.jp/vehicles/new/z/gallery.html',
      type: 'Official Gallery',
    },
    {
      name: 'Nissan Z Trims Comparison',
      url: 'https://www.nissanusa.com/shopping-tools/build-price?models=nissan-z&modelYear=current-year',
      type: 'Interactive Tool',
    },
    {
      name: '2026 Nissan Z Detail Information',
      url: 'https://www.nissanusa.com/vehicles/sports-cars/nissan-z/heritage.html',
      type: 'Product Spec',
    },
    {
      name: '2026 Nissan Z Heritage Introduction Video',
      url: 'https://www.youtube.com/watch?v=T1e-X2PTSe0',
      type: 'Video Resource',
    },
    {
      name: 'Nissan Z Heritage History Video',
      url: 'https://youtu.be/imsbLkTT9Ac?si=MHZsZV1BguwNipj5',
      type: 'Video Resource',
    },
    {
      name: 'Nissan Z vs. Supra vs. Mustang Comparison Video',
      url: 'https://youtu.be/tNZ30cLKMno?si=7yQC-OWmgFw5xOku',
      type: 'Video Resource',
    },
    {
      name: 'Paper Documents Provided by SME',
      url: '',
      type: 'SME Resource',
    },
  ];

  const deliveryActions = [
    {
      objective: 'Understand Z heritage',
      activity: 'Heritage storytelling video',
      assessment: 'Scenario quiz',
    },
    {
      objective: 'Identify Heritage features',
      activity: 'Interactive hotspot game',
      assessment: 'Feature recognition questions',
    },
    {
      objective: 'Compare competitors',
      activity: 'Competitive analysis videos',
      assessment: 'Sort the Strengths',
    },
    {
      objective: 'Recognize engine differences',
      activity: 'Audio identification activity',
      assessment: 'Audio quiz',
    },
    {
      objective: 'Recommend trims',
      activity: 'Customer profile scenarios',
      assessment: 'Matching assessment',
    },
  ];

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
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[92vh] w-auto aspect-[2420/1668] flex items-center justify-center drop-shadow-[0_25px_50px_rgba(76,71,71,0.18)]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4C4747] hover:bg-[#3a3636] text-[#EFE8DC] flex items-center justify-center shadow-xl backdrop-blur-md border border-[#EFE8DC]/40 transition-all cursor-pointer select-none z-30 hover:scale-110 active:scale-95"
            aria-label="Close Document Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Binder & Loose-leaf Background Image */}
          <img
            src={letterImg}
            alt="Technology Deliverable Binder & Loose-leaf"
            className="w-full h-full object-contain pointer-events-none select-none block"
          />

          {/* Left Directory (Positioned below paperclip in let.png) */}
          <nav
            aria-label="Document Table of Contents"
            className="absolute left-[2.8%] w-[19%] top-[25%] bottom-[9.5%] z-20 flex flex-col justify-start py-1 pr-1 overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="space-y-1 sm:space-y-1.5 w-full">
              <span className="text-[7.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-white/75 px-2 block mb-1">
                {activeDoc === 'executive-summary'
                  ? 'Executive Summary'
                  : activeDoc === 'delivery-plan'
                  ? 'Delivery Plan'
                  : 'Assessment Plan'}
              </span>
              {sections.map((sec) => {
                const isSelected = activeSec === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left transition-all duration-200 cursor-pointer select-none text-[8.5px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px] leading-tight block w-full truncate ${
                      isSelected
                        ? 'bg-[#DC9BB5] text-[#4C4747] font-bold px-2 py-1 sm:py-1.5 rounded-lg shadow-md scale-102'
                        : 'text-white/90 hover:text-white hover:bg-white/10 font-medium px-2 py-1 sm:py-1.5 bg-transparent border-none'
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
              for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                const el = document.getElementById(sec.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  if (rect.top - containerTop <= 80) {
                    setActiveSec(sec.id);
                    break;
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
            {/* Top Document Switcher Bar */}
            <div className="max-w-3xl mb-4 flex flex-wrap items-center gap-2 pb-3 border-b border-slate-200/80">
              <button
                type="button"
                onClick={() => handleSwitchDoc('executive-summary')}
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer select-none ${
                  activeDoc === 'executive-summary'
                    ? 'bg-[#5E2B3B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                1. Executive Summary
              </button>
              <button
                type="button"
                onClick={() => handleSwitchDoc('delivery-plan')}
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer select-none ${
                  activeDoc === 'delivery-plan'
                    ? 'bg-[#5E2B3B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                2. E-Learning Delivery Plan
              </button>
              <button
                type="button"
                onClick={() => handleSwitchDoc('assessment-plan')}
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer select-none ${
                  activeDoc === 'assessment-plan'
                    ? 'bg-[#5E2B3B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                3. E-Learning Assessment Plan
              </button>
            </div>

            {activeDoc === 'executive-summary' ? (
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Document Header */}
                <div className="border-b border-slate-300/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9E586B]">
                      Technology Deliverable • E-Learning Executive Summary
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DC9BB5]/25 text-[#5E2B3B] text-[10px] font-mono font-semibold">
                      ETEC 6480 • May 8th 2026
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    Executive Summary: 2026 Nissan Z Heritage Edition Sales Training
                  </h2>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-600 font-medium">
                    <span><strong>Author:</strong> Yu Liu</span>
                    <span>•</span>
                    <span><strong>Instructor:</strong> Dr. Chen</span>
                    <span>•</span>
                    <span><strong>Institution:</strong> California State University San Bernardino</span>
                  </div>
                </div>

                {/* Section 1: Project Overview */}
                <div
                  id="t-sec-1"
                  className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 1</span>
                    <span className="text-[10px] font-mono text-slate-400">Instructional Solution</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>1. Project Overview</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      This project was developed as a sales training solution for Nissan dealership sales consultants. The training focuses specifically on the 2026 Nissan Z Heritage Edition and teaches learners how to position the vehicle emotionally, competitively, and strategically during customer interactions.
                    </p>
                    <p className="bg-[#DC9BB5]/15 border border-[#DC9BB5]/40 text-[#5E2B3B] p-3 rounded-xl text-xs sm:text-sm font-medium">
                      The course applies gamification, storytelling, multimedia learning, and scenario-based instruction to create a modern automotive sales training experience. Learners progress through three modules while earning visual upgrades to a virtual Nissan Z vehicle as part of a badge progression system.
                    </p>
                  </div>
                </div>

                {/* Section 2: Learning Objectives */}
                <div
                  id="t-sec-2"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 2</span>
                    <span className="text-[10px] font-mono text-slate-400">3 Interactive Modules</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>2. Learning Objectives</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700">
                    By the end of the training, learners will be able to:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Module 1 */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B] mb-1">
                        Module 1
                      </span>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-2">
                        Sell The Legacy
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Identify the historical significance of the Nissan Z Heritage Edition</li>
                        <li>Recognize unique Heritage Edition design features</li>
                        <li>Apply storytelling techniques to emotionally engage customers</li>
                      </ul>
                    </div>

                    {/* Module 2 */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B] mb-1">
                        Module 2
                      </span>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-2">
                        Know Your Weapon
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Compare the Nissan Z against competitors including the Toyota Supra and Ford Mustang</li>
                        <li>Explain the value proposition of the Nissan Z</li>
                        <li>Identify engine sound and performance differences between competitors</li>
                      </ul>
                    </div>

                    {/* Module 3 */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B] mb-1">
                        Module 3
                      </span>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-2">
                        Close The Deal
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Differentiate among Nissan Z trim levels</li>
                        <li>Explain Heritage Edition package pricing and value</li>
                        <li>Recommend appropriate trims based on customer profiles and budgets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 3: Target Audience & Learning Environment */}
                <div
                  id="t-sec-3"
                  className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 3</span>
                    <span className="text-[10px] font-mono text-slate-400">Learner &amp; Context Profile</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>3. Target Audience &amp; Learning Environment</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>Target Audience:</strong> The primary audience for this training includes Nissan sales consultants working at dealerships.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-2">
                        Learner Characteristics
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Ages approximately 25–55</li>
                        <li>Minimum one year of automotive sales experience</li>
                        <li>Familiarity with Nissan products</li>
                        <li>Limited knowledge of advanced Z Heritage Edition sales strategies</li>
                        <li>Preference for short, visual, and interactive training experiences</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-2">
                        Learning Environment
                      </h4>
                      <p className="text-xs text-slate-600 mb-2">
                        The course was designed for:
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Self-paced asynchronous learning</li>
                        <li>Mobile and desktop access</li>
                        <li>Fast-paced dealership work environments</li>
                        <li>Interrupted learning sessions with resume capability</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 4: E-learning Delivery Platforms (URLs) & Delivery Materials */}
                <div
                  id="t-sec-4"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 4</span>
                    <span className="text-[10px] font-mono text-slate-400">Articulate Rise &amp; Media Assets</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>4. E-learning Delivery Platforms (URLs) &amp; Delivery Materials</span>
                  </h3>

                  {/* Platform Link Callout */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#DC9BB5]/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B] block">
                        E-learning Delivery Platforms (URLs)
                      </span>
                      <a
                        href="https://share.articulate.com/ivq3JX90lWXEV7AHuDViV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-bold text-[#1D2440] hover:text-[#9E586B] underline break-all"
                      >
                        https://share.articulate.com/ivq3JX90lWXEV7AHuDViV
                      </a>
                    </div>
                    <a
                      href="https://share.articulate.com/ivq3JX90lWXEV7AHuDViV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DC9BB5] hover:bg-[#d188a6] text-[#4C4747] font-bold text-xs shrink-0 transition-all shadow-xs"
                    >
                      <span>Launch Course</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      <strong>Delivery Materials:</strong> The training materials for this project were designed to support a self-paced, multimedia-based e-learning experience for Nissan sales consultants.
                    </p>
                    <p>
                      All instructional materials were organized within the main course homepage and delivered through interactive digital formats, including modules, videos, activities, quizzes, and scenario-based learning assessments. The materials were developed to provide concise, engaging, and performance-focused learning experiences that align directly with the learning objectives of each module.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100/90 text-[#1D2440] border-b border-slate-200">
                          <th className="py-2.5 px-3 font-bold">Materials</th>
                          <th className="py-2.5 px-3 font-bold">Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/70">
                        {deliveryMaterials.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80">
                            <td className="py-2 px-3 font-semibold text-slate-800 align-top">
                              {item.name}
                            </td>
                            <td className="py-2 px-3 align-top break-all">
                              {item.url ? (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#9E586B] hover:text-[#5E2B3B] underline inline-flex items-center gap-1"
                                >
                                  <span>{item.url}</span>
                                  <ExternalLink className="w-3 h-3 shrink-0" />
                                </a>
                              ) : (
                                <span className="text-slate-500 font-mono">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    Paper documents provided by SME: N/A. This project primarily utilized custom-developed digital instructional materials and multimedia learning resources.
                  </p>
                </div>

                {/* Section 5: Delivery Action */}
                <div
                  id="t-sec-5"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 5</span>
                    <span className="text-[10px] font-mono text-slate-400">Instructional Alignment</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>5. Delivery Action</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    The delivery actions in this training project were designed to promote active learning, learner engagement, and practical application of sales knowledge. Rather than relying solely on passive video instruction, the course incorporated interactive activities, scenario-based assessment, competitive analysis exercises, and gamified assessments to support learner participation and knowledge transfer.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Each delivery action was aligned directly with one or more learning objectives and intended to simulate authentic dealership sales conversations and customer interactions.
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100/90 text-[#1D2440] border-b border-slate-200">
                          <th className="py-2.5 px-3 font-bold">Main Objective</th>
                          <th className="py-2.5 px-3 font-bold">Learning Activity</th>
                          <th className="py-2.5 px-3 font-bold">Assessment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/70">
                        {deliveryActions.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80">
                            <td className="py-2 px-3 font-semibold text-slate-800">{row.objective}</td>
                            <td className="py-2 px-3 text-slate-700">{row.activity}</td>
                            <td className="py-2 px-3 text-[#5E2B3B] font-medium">{row.assessment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 6: Corporate Training Effectiveness Evaluation */}
                <div
                  id="t-sec-6"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 6</span>
                    <span className="text-[10px] font-mono text-slate-400">Evaluation Methods</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>6. Corporate Training Effectiveness Evaluation</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    The evaluation plan for this project focused on measuring learner engagement, practical applicability, usability, and perceived effectiveness within a corporate sales training context. Unlike traditional academic e-learning environments that rely heavily on formal grading rubrics, this project emphasized authentic workplace application, sales communication confidence, and learner engagement.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    The evaluation approach was designed in consultation with Subject Matter Experts (SMEs) to reflect the practical goals of automotive sales training and the fast-paced dealership learning environment.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase tracking-wider font-mono mb-2 text-[#9E586B]">
                        1. SME Review and Feedback
                      </h4>
                      <p className="text-xs text-slate-600 mb-1.5">
                        Subject Matter Experts (SMEs), including Nissan sales and product professionals, reviewed the training materials, learning activities, and sales scenarios to evaluate:
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>accuracy of product information</li>
                        <li>realism of customer interaction scenarios</li>
                        <li>relevance to dealership sales conversations</li>
                        <li>effectiveness of competitive positioning strategies</li>
                        <li>alignment with real-world sales practices</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase tracking-wider font-mono mb-2 text-[#9E586B]">
                        2. Small Group Pilot Testing
                      </h4>
                      <p className="text-xs text-slate-600 mb-1.5">
                        A small pilot group consisting of Nissan sales consultants and related professionals participated in the training experience. Pilot participants completed the modules and provided feedback regarding:
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>course clarity and navigation</li>
                        <li>engagement and motivation</li>
                        <li>usefulness of activities</li>
                        <li>realism of sales scenarios</li>
                        <li>confidence in explaining Nissan Z features</li>
                        <li>applicability to customer interactions</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase tracking-wider font-mono mb-2 text-[#9E586B]">
                        3. Evaluation Tools
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>SME review report</li>
                        <li>Learner feedback survey</li>
                        <li>Completion tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 7: Evaluation Results */}
                <div
                  id="t-sec-7"
                  className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section 7</span>
                    <span className="text-[10px] font-mono text-slate-400">SME, Pilot &amp; Survey Findings</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif">
                    7. Evaluation Results
                  </h3>

                  {/* SME Review Results */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                    <h4 className="text-sm font-bold text-[#1D2440]">
                      SME Review Results
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      The training project was reviewed by a Subject Matter Expert (SME) with experience in Nissan product planning and sales training. Overall feedback indicated that the course successfully met the intended goals of creating an engaging, accessible, and practical sales training experience for dealership sales consultants.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      The SME noted that the delivery system was simple and efficient because learners could access the training directly through a shared link without requiring additional software installation or complex onboarding procedures. The course functioned effectively across desktop computers, tablets, and mobile devices, which was considered appropriate for the fast-paced dealership environment.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      The SME also confirmed that all product information, trim details, pricing references, and competitive positioning content were presented accurately and aligned with the source materials provided during the development process. From an instructional design perspective, the SME highlighted several strengths of the project:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                      <li>The course interface was visually appealing and professionally organized</li>
                      <li>The overall structure followed a logical progression from heritage storytelling to competitive positioning and customer recommendation</li>
                      <li>The training covered most of the key knowledge areas expected from Nissan sales consultants</li>
                      <li>Gamification elements and interactive learning activities increased learner engagement and reduced training fatigue</li>
                      <li>Scenario-based assessments were considered especially valuable because they simulated authentic customer conversations and practical sales decision-making</li>
                    </ul>
                    <p className="text-xs text-slate-600 bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-lg leading-relaxed">
                      <strong>One limitation identified by the SME</strong> was the absence of a dedicated Learning Management System (LMS). Due to budget and implementation constraints, the project could not provide advanced learning analytics, engagement tracking, or detailed learner performance reporting typically available in enterprise LMS environments.
                    </p>
                  </div>

                  {/* Small Group Pilot Results */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                    <h4 className="text-sm font-bold text-[#1D2440]">
                      Small Group Pilot Results
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      A small pilot group consisting of automotive sales professionals completed the training modules and provided feedback through informal interviews and learner satisfaction surveys.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Participants particularly appreciated:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                      <li>the visual interface design</li>
                      <li>organized module structure</li>
                      <li>interactive activities</li>
                      <li>embedded multimedia content</li>
                      <li>flexible self-paced navigation</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Learners stated that the embedded YouTube videos helped create a more relaxed and enjoyable learning experience. One participant commented that the course “felt less like mandatory training and more like watching automotive content during free time.”
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Another participant explained that the training increased enthusiasm for selling the Nissan Z Heritage Edition because the course emphasized emotional storytelling and vehicle identity rather than only technical specifications. The participant stated that the course shifted the mindset from “selling a product” to “selling a dream car experience.”
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Some pilot participants noted that certain sections still contained more text than preferred for a fast-paced sales training environment. This feedback suggested opportunities for future improvement through additional visual summaries, shorter text segments, or increased audio/video-based delivery.
                    </p>

                    {/* Google Drive Supporting Document Card + Inline Preview Toggle */}
                    <div className="mt-3 p-3 rounded-xl bg-[#F7F3EB] border border-[#DC9BB5]/60 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-[#9E586B] shrink-0" />
                          <a
                            href="https://drive.google.com/file/d/1fH3CNeRw32bxfMzDS4-6cXNLG3BXQ-Bd/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#9E586B] hover:text-[#5E2B3B] underline truncate"
                          >
                            https://drive.google.com/file/d/1fH3CNeRw32bxfMzDS4-6cXNLG3BXQ-Bd/view?usp=drive_link
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowDrivePreview((prev) => !prev)}
                            className="px-2.5 py-1 rounded-lg bg-[#DC9BB5] hover:bg-[#d188a6] text-[#4C4747] font-bold text-[11px] cursor-pointer transition-all"
                          >
                            {showDrivePreview ? 'Hide Inline Preview' : 'Preview Attached File'}
                          </button>
                          <a
                            href="https://drive.google.com/file/d/1fH3CNeRw32bxfMzDS4-6cXNLG3BXQ-Bd/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] transition-all"
                          >
                            <span>Open in Drive</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {showDrivePreview && (
                        <div className="w-full h-[360px] sm:h-[420px] rounded-lg overflow-hidden border border-slate-300 bg-white">
                          <iframe
                            src="https://drive.google.com/file/d/1fH3CNeRw32bxfMzDS4-6cXNLG3BXQ-Bd/preview"
                            title="Pilot Evaluation Supporting Document"
                            className="w-full h-full border-0"
                            allow="autoplay"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Learner Satisfaction Survey Summary */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-[#1D2440]">
                      Learner Satisfaction Survey Summary
                    </h4>

                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                        <h5 className="font-bold text-[#1D2440] mb-1">1. Course Clarity and Navigation</h5>
                        <p className="leading-relaxed">
                          Participants reported that the course navigation was clear and intuitive. The homepage structure, module organization, and progression system helped learners understand where to begin and how to move through the training efficiently. Learners also appreciated the ability to access the course on multiple devices.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                        <h5 className="font-bold text-[#1D2440] mb-1">2. Engagement and Motivation</h5>
                        <p className="leading-relaxed">
                          Gamification features, visual progression systems, and interactive activities were consistently identified as the most engaging aspects of the training. Participants stated that the course maintained attention more effectively than traditional slide-based dealership training programs.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                        <h5 className="font-bold text-[#1D2440] mb-1">3. Usefulness of Activities</h5>
                        <p className="leading-relaxed">
                          Learners found the interactive activities useful because they required active participation rather than passive content consumption. Scenario-based questions and comparison activities were viewed as especially practical for real sales conversations.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                        <h5 className="font-bold text-[#1D2440] mb-1">4. Realism of Sales Scenarios</h5>
                        <p className="leading-relaxed">
                          Participants responded positively to the realism of the customer interaction scenarios. The activities were perceived as closely aligned with authentic dealership conversations and customer concerns commonly encountered during vehicle sales consultations.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                        <h5 className="font-bold text-[#1D2440] mb-1">5. Confidence in Explaining Nissan Z Features</h5>
                        <p className="leading-relaxed mb-1.5">
                          Pilot participants reported increased confidence in explaining:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 mb-1.5">
                          <li>Heritage Edition features</li>
                          <li>trim differences</li>
                          <li>pricing justification</li>
                          <li>competitive advantages</li>
                          <li>emotional storytelling elements</li>
                        </ul>
                        <p className="leading-relaxed">
                          Several learners indicated that the training improved their ability to communicate the value and identity of the Nissan Z Heritage Edition beyond technical specifications alone.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#DC9BB5]/15 border border-[#DC9BB5]/40 text-[#5E2B3B]">
                        <h5 className="font-bold mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9E586B] shrink-0" />
                          <span>Applicability to Customer Interactions</span>
                        </h5>
                        <p className="leading-relaxed">
                          Learners believed the training content could be applied directly to real dealership customer interactions. The training was perceived as highly relevant to practical sales performance rather than theoretical product memorization.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeDoc === 'delivery-plan' ? (
              /* DOCUMENT 2: E-LEARNING DELIVERY PLAN */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Document Header */}
                <div className="border-b border-slate-300/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9E586B]">
                      Technology Deliverable • E-Learning Delivery Plan
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DC9BB5]/25 text-[#5E2B3B] text-[10px] font-mono font-semibold">
                      Course: ETEC 6480
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    E-Learning Delivery Plan: 2026 Nissan Z Heritage Edition Sales Training
                  </h2>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-600 font-medium">
                    <span><strong>Student:</strong> Yu Liu</span>
                    <span>•</span>
                    <span><strong>Course:</strong> ETEC 6480</span>
                    <span>•</span>
                    <span><strong>Program Duration:</strong> 45 Minutes (3 Gamified Modules)</span>
                  </div>
                </div>

                {/* Executive Summary */}
                <div
                  id="dp-sec-exec"
                  className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Overview</span>
                    <span className="text-[10px] font-mono text-slate-400">Dual Platform Strategy</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>Executive Summary</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      This document presents two delivery options for a 45-minute e-learning training program designed for Nissan sales consultants to master the 2026 Z Heritage Edition sales approach. The training consists of three gamified modules incorporating storytelling, competitive analysis, and customer-focused selling techniques.
                    </p>
                    <p className="bg-[#DC9BB5]/15 border border-[#DC9BB5]/40 text-[#5E2B3B] p-3 rounded-xl text-xs sm:text-sm font-medium">
                      <strong>Option A</strong> utilizes <strong>Paradiso LMS</strong> for a traditional enterprise learning management system experience, while <strong>Option B</strong> uses <strong>Notion integrated with H5P</strong> for a modern, flexible learning hub approach. Both options deliver identical learning content and achieve the same learning objectives.
                    </p>
                  </div>
                </div>

                {/* Section a: What You Will Deliver */}
                <div
                  id="dp-sec-a"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section a</span>
                    <span className="text-[10px] font-mono text-slate-400">Total Duration: 45 Minutes</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>a. What You Will Deliver</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700">
                    This project delivers a complete training module consisting of three interconnected learning units:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Module 1 • 15 mins</span>
                      <h4 className="font-bold text-[#1D2440] text-sm mt-0.5">“Sell The Legacy”</h4>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Module 2 • 15 mins</span>
                      <h4 className="font-bold text-[#1D2440] text-sm mt-0.5">“Know Your Weapon”</h4>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Module 3 • 15 mins</span>
                      <h4 className="font-bold text-[#1D2440] text-sm mt-0.5">“Close The Deal”</h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Total Duration: 45 minutes.</strong> This represents a focused sales training unit within a broader Nissan new product knowledge curriculum. Each module combines video instruction, interactive games, and scenario-based assessments, culminating in a badge progression system.
                  </p>
                </div>

                {/* Section b: Learning Objectives */}
                <div
                  id="dp-sec-b"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section b</span>
                    <span className="text-[10px] font-mono text-slate-400">9 Measurable Outcomes</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>b. Learning Objectives</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700">
                    By the end of this training module, sales consultants will be able to:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mb-2 text-[#9E586B] uppercase font-mono">
                        Module 1 Objectives — Sell The Legacy
                      </h4>
                      <ol className="text-xs text-slate-700 space-y-1.5 list-decimal pl-5">
                        <li>Identify Z heritage edition scarcity and GT-R connection that equals desirability and value retention.</li>
                        <li>Recognize Heritage Edition distinctive features (carbon fiber wing, bronze Ray wheels, heritage badging, Midnight Purple paint).</li>
                        <li>Demonstrate storytelling techniques that connect Z heritage to customer emotional triggers.</li>
                      </ol>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mb-2 text-[#9E586B] uppercase font-mono">
                        Module 2 Objectives — Know Your Weapon
                      </h4>
                      <ol start={4} className="text-xs text-slate-700 space-y-1.5 list-decimal pl-5">
                        <li>Compare and contrast the 2026 Z with primary competitors (Toyota Supra, Ford Mustang) across 3 key dimensions (performance, value, driving experience).</li>
                        <li>Justify Z pricing using competitive analysis and value proposition framework.</li>
                        <li>Distinguish Z's engine sound and performance characteristics from competitors.</li>
                      </ol>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mb-2 text-[#9E586B] uppercase font-mono">
                        Module 3 Objectives — Close The Deal
                      </h4>
                      <ol start={7} className="text-xs text-slate-700 space-y-1.5 list-decimal pl-5">
                        <li>Differentiate between four Z trim levels (Sport, Performance, Nismo, Heritage) based on features, pricing, and target customer.</li>
                        <li>Calculate and communicate the value proposition of the Heritage Edition package ($2,940).</li>
                        <li>Match appropriate Z trim recommendations to customer profiles based on budget, needs, and preferences.</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Section c: Tools for E-Learning Delivery */}
                <div
                  id="dp-sec-c"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section c</span>
                    <span className="text-[10px] font-mono text-slate-400">LMS vs. Non-LMS &amp; Authoring Stack</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>c. Tools for E-Learning Delivery</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B] block mb-1">
                        Option A
                      </span>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-2">
                        Paradiso LMS Delivery
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Cloud-based learning management system</li>
                        <li>Supports up to 50 users</li>
                        <li>Built-in gamification features</li>
                        <li>SCORM 1.2 and 2004 compliant</li>
                        <li>Mobile-responsive interface</li>
                        <li>Custom branding capabilities</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B] block mb-1">
                        Option B
                      </span>
                      <h4 className="font-bold text-[#1D2440] text-sm mb-2">
                        Notion Non-LMS Delivery
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Cloud-based all-in-one workspace</li>
                        <li>Modern, intuitive interface optimized for engagement</li>
                        <li>Mobile-responsive (iOS, Android, web)</li>
                        <li>Real-time updates and easy content modifications</li>
                        <li>Collaborative features for feedback</li>
                        <li>No software installation required</li>
                        <li>Unlimited pages and content</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-2">
                      Supporting Tools
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <h5 className="font-bold text-[#1D2440] text-xs mb-1">H5P (h5p.org) — Interactive Content</h5>
                        <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                          <li>Image Hotspots for &ldquo;find the differences&rdquo; game</li>
                          <li>Audio quiz for engine sound identification</li>
                          <li>Scenario-based activities</li>
                          <li>Embedded directly into Notion pages via iframe/link</li>
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <h5 className="font-bold text-[#1D2440] text-xs mb-1">Google Forms — Assessments &amp; Surveys</h5>
                        <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                          <li>Pre/post assessments</li>
                          <li>Module quizzes</li>
                          <li>Satisfaction surveys</li>
                          <li>Automatic data collection and analysis</li>
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <h5 className="font-bold text-[#1D2440] text-xs mb-1">Video Hosting</h5>
                        <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                          <li>YouTube (unlisted links for privacy)</li>
                          <li>Loom for commentary/narration</li>
                          <li>Or Vimeo for ad-free experience</li>
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <h5 className="font-bold text-[#1D2440] text-xs mb-1">Visual Assets</h5>
                        <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                          <li>Canva for badge graphics and infographics</li>
                          <li>Direct image embedding in Notion</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section d: Materials for Delivery */}
                <div
                  id="dp-sec-d"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section d</span>
                    <span className="text-[10px] font-mono text-slate-400">Course Assets &amp; Badge Progression</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>d. Materials for Delivery</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        Pre-Course Materials
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Welcome email with login credentials and course overview</li>
                        <li>Course orientation guide (PDF, 2 pages)</li>
                        <li>Platform navigation instructions</li>
                        <li>Technical requirements checklist</li>
                        <li>Course structure overview</li>
                        <li>Expected time commitment</li>
                        <li>Contact information for technical support</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        Module 1: Sell The Legacy
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Datsun Z - The legend Origin (Video)</li>
                        <li>Nissan Z - GT Sports Car for the people (Video)</li>
                        <li>Model Year (MY) 2026 Z Heritage Edition - The True Modern Heir of the Legend (Video)</li>
                        <li>Sales scenario quiz: 5 questions</li>
                        <li>Interactive &ldquo;Find the Difference&rdquo; game</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        Module 2: Know Your Weapon
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Supra Comparison</li>
                        <li>Mustang Comparison</li>
                        <li>6-Speed Manual Transmission vs 9-Speed Automatic Transmission video</li>
                        <li>Competitive Debate quiz - 5 scenario questions</li>
                        <li>&ldquo;Identify the Z&rdquo; audio game - 3 engine sounds</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        Module 3: Close The Deal
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Gradewalk Introduction - Sport / Performance / Heritage Edition / Nismo</li>
                        <li>Up to 420 HP, RWD with available LSD, 6-speed MT, Akebono Brakes, Recaro Seats etc.</li>
                        <li>Heritage Edition Features, Pricing, and Limited to 500 units in the US</li>
                        <li>Trim Matching quiz - 6 questions</li>
                        <li>Customer Profile Matching game - 3 scenarios</li>
                      </ul>
                    </div>
                  </div>

                  {/* Badge Progression System & Assessment Materials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#DC9BB5]/15 border border-[#DC9BB5]/40 text-[#5E2B3B]">
                      <h4 className="font-bold text-xs uppercase font-mono mb-2">
                        Badge Progression System (4 Levels)
                      </h4>
                      <ul className="text-xs space-y-1.5 list-disc pl-4">
                        <li><strong>Level 0:</strong> Base Z (starting image)</li>
                        <li><strong>Level 1:</strong> Bronze Ray Wheels + Heritage Sticker (Module 1 completion)</li>
                        <li><strong>Level 2:</strong> Carbon Fiber Wing (Module 2 completion)</li>
                        <li><strong>Level 3:</strong> Midnight Purple - Complete Heritage Edition (Module 3 completion)</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-2">
                        Assessment Materials
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>Pre-assessment survey (5 questions - knowledge baseline)</li>
                        <li>Module knowledge quiz (embedded in each module)</li>
                        <li>Learner satisfaction survey (8 questions)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section e: Target Audience */}
                <div
                  id="dp-sec-e"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section e</span>
                    <span className="text-[10px] font-mono text-slate-400">Primary Audience &amp; Pilot Group</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>e. Target Audience</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>Primary Audience:</strong> Nissan Sales Consultants
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-1.5">Learner Characteristics</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Age range: 25–55 years old</li>
                        <li>Professional role: Automotive sales consultants at Nissan dealerships</li>
                        <li>Experience level: Minimum 1 year of automotive sales experience</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-1.5">Prior Knowledge</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Basic automotive sales experience</li>
                        <li>Familiarity with Nissan product lineup</li>
                        <li>General understanding of sports car market</li>
                        <li>Limited knowledge of Z heritage 2026 selling techniques</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-1.5">Learning Preferences</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Prefer concise, practical training</li>
                        <li>Fast pace training</li>
                        <li>Visual learners (videos and images more effective than lengthy text)</li>
                        <li>Value real scenarios and application</li>
                        <li>Motivated by gamification and achievement</li>
                        <li>Limited time availability</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-1.5">Motivation &amp; Environment</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li><strong>Motivation:</strong> Increase confidence in selling performance vehicles, earn recognition as product expert, meet dealership sales targets</li>
                        <li><strong>Environment:</strong> Self-paced and asynchronous learning; may be interrupted and need to resume later; accessing from dealership computer or personal mobile device</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#DC9BB5]/60">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#9E586B] mb-1.5">Pilot Group</h4>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                      <li><strong>Size:</strong> 3–5 people</li>
                      <li><strong>Role:</strong> Z-Program Planner &amp; Dealer Field Training Team from Nissan North America</li>
                      <li><strong>Selection criteria:</strong> Mix of experience levels, willingness to provide detailed feedback</li>
                    </ul>
                  </div>
                </div>

                {/* Section f: Delivery Timeline and Duration */}
                <div
                  id="dp-sec-f"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Section f</span>
                    <span className="text-[10px] font-mono text-slate-400">March 16 – May 2, 2026</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>f. Delivery Timeline and Duration</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Phase 1 • March 16 – April 5 (3 weeks)</span>
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mt-0.5 mb-1.5">Platform Setup &amp; Content Collected</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Set up Paradiso LMS or Notion</li>
                        <li>Configure course structure and navigation</li>
                        <li>Upload all video content</li>
                        <li>Upload SCORM packages (H5P games)</li>
                        <li>Configure quizzes and assessments</li>
                        <li>Test all interactive elements</li>
                        <li>Set up gamification and badge system</li>
                        <li>Create learner accounts</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Phase 2 • April 6 – April 12 (1 week)</span>
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mt-0.5 mb-1.5">Testing</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Internal testing by project team</li>
                        <li>Technical troubleshooting</li>
                        <li>Content and link verification</li>
                        <li>Refinement based on test results</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Phase 3 • April 13 – April 19, 2026 (1 week)</span>
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mt-0.5 mb-1.5">Pilot Launch</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Send link to pilot participants</li>
                        <li>Provide platform orientation</li>
                        <li>Technical support availability</li>
                        <li>Duration per learner: 40 minutes (self-paced)</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Phase 4 • April 20 – May 2, 2026 (2 weeks)</span>
                      <h4 className="font-bold text-[#1D2440] text-xs sm:text-sm mt-0.5 mb-1.5">Data Collection &amp; Follow-up</h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Collect data</li>
                        <li>Administer satisfaction surveys</li>
                        <li>Conduct optional follow-up interviews</li>
                        <li>Export analytics from Paradiso</li>
                      </ul>
                    </div>
                  </div>

                  {/* Activity Duration Breakdown */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-2">
                      Activity Duration Details (Total: 52 Minutes)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <div className="text-[10px] font-mono text-slate-500">Module 1</div>
                        <div className="font-bold text-[#1D2440] text-xs">15 mins</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <div className="text-[10px] font-mono text-slate-500">Module 2</div>
                        <div className="font-bold text-[#1D2440] text-xs">12 mins</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <div className="text-[10px] font-mono text-slate-500">Module 3</div>
                        <div className="font-bold text-[#1D2440] text-xs">18 mins</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <div className="text-[10px] font-mono text-slate-500">Pre-Assessment</div>
                        <div className="font-bold text-[#1D2440] text-xs">3 mins</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <div className="text-[10px] font-mono text-slate-500">Feedback Survey</div>
                        <div className="font-bold text-[#1D2440] text-xs">4 mins</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Good Start Strategy */}
                <div
                  id="dp-sec-good-start"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Launch Strategy</span>
                    <span className="text-[10px] font-mono text-slate-400">Onboarding &amp; Orientation</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>Good Start</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Ensuring a successful launch is critical for learner engagement and completion. The &ldquo;Good Start&rdquo; strategy for Paradiso LMS or Notion delivery includes:
                  </p>

                  <div className="p-4 rounded-xl bg-[#DC9BB5]/15 border border-[#DC9BB5]/40 text-[#5E2B3B] space-y-1.5">
                    <h4 className="font-bold text-xs uppercase font-mono">1. Welcome Message</h4>
                    <blockquote className="text-xs sm:text-sm italic leading-relaxed">
                      &ldquo;Welcome to the 2026 Nissan Z Heritage Edition Sales Training! You'll master the art of selling one of the most exciting vehicles in our lineup. This isn't just another product knowledge dump. You'll engage with interactive games, competitive scenarios, and even build your own virtual Heritage Edition Z as you progress. By the end, you'll have the confidence and knowledge to turn Z enthusiasts into Z owners. Let's get started!&rdquo;
                    </blockquote>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        2. Course Orientation Page
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Overview of the Nissan Z 2026 and Heritage Edition</li>
                        <li>Gamified learning experience</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        &ldquo;How to Navigate This Course&rdquo;
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>Platform navigation tutorial (2-minute video or interactive tour)</li>
                        <li>How to access videos</li>
                        <li>How to play games</li>
                        <li>How to take quizzes</li>
                        <li>How to download resources</li>
                        <li>How to track progress</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-[#1D2440] text-xs uppercase font-mono text-[#9E586B] mb-1.5">
                        Motivation &amp; Expectations
                      </h4>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                        <li>What you'll gain from this training</li>
                        <li>How this applies to your daily sales activities</li>
                        <li>Average completion time</li>
                        <li>Tips for success</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* DOCUMENT 3: E-Learning Assessment Plan */
              <div className="max-w-3xl space-y-6 sm:space-y-8 text-left text-xs sm:text-sm text-slate-800">
                {/* Document Header */}
                <div className="border-b border-slate-300/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#9E586B]">
                      Technology Deliverable • E-Learning Assessment Plan
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DC9BB5]/25 text-[#5E2B3B] text-[10px] font-mono font-semibold">
                      ETEC 6480 • 19 February 2026
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D2440] tracking-tight font-serif">
                    E-Learning Assessment Plan: 2026 Nissan Z Heritage Edition Sales Training
                  </h2>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-600 font-medium">
                    <span><strong>Author:</strong> Yu Liu</span>
                    <span>•</span>
                    <span><strong>Instructor:</strong> Dr. Chen</span>
                    <span>•</span>
                    <span><strong>Course:</strong> ETEC 6480</span>
                    <span>•</span>
                    <span><strong>Date:</strong> 19 February 2026</span>
                  </div>
                </div>

                {/* PART A: Rubrics for Evaluating Online Instruction */}
                <div
                  id="ap-sec-a"
                  className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Part A</span>
                    <span className="text-[10px] font-mono text-slate-400">Comparative Rubric Analysis</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>PART A: Rubrics for Evaluating Online Instruction</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    To establish a rigorous and grounded framework for evaluating my e-learning delivery, I searched three widely recognized rubrics for evaluating online instruction:
                  </p>

                  <div className="space-y-3.5">
                    {/* Rubric 1: Quality Matters */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-[#1D2440] text-sm">
                          1. Quality Matters (QM) Higher Education Rubric
                        </h4>
                        <a
                          href="https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9E586B] hover:text-[#5E2B3B] underline"
                        >
                          <span>QM Higher Ed Rubric</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 break-all">
                        URL: https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        The Quality Matters Higher Education Rubric is one of the most widely adopted frameworks for online course quality assurance in the United States. Developed through a faculty-driven, peer-review process, the rubric consists of 8 General Standards and 44 Specific Review Standards. Its core design philosophy centers on the concept of alignment: critical course components including learning objectives, assessment and measurement, instructional materials, learner interaction, and course technology must work together to ensure students achieve the desired learning outcomes. Notably, QM focuses exclusively on course design rather than the quality of teaching or facilitation during delivery, and full access to the annotated rubric and formal QM certification requires institutional or individual membership.
                      </p>
                    </div>

                    {/* Rubric 2: CSU Chico ROI */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-[#1D2440] text-sm">
                          2. CSU Chico Rubric for Online Instruction (ROI)
                        </h4>
                        <a
                          href="https://www.csuchico.edu/eoi/rubric.shtml"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9E586B] hover:text-[#5E2B3B] underline"
                        >
                          <span>CSU Chico ROI</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 break-all">
                        URL: https://www.csuchico.edu/eoi/rubric.shtml
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        The Rubric for Online Instruction (ROI) was designed to answer a foundational question: &ldquo;What does high-quality online instruction look like?&rdquo; It functions simultaneously as a developmental self-evaluation tool for instructors creating or redesigning courses and as a formal evaluation instrument for assessing existing courses. The rubric is organized into 6 domains, with each domain containing multiple criteria evaluated across three progressive levels of quality: Baseline, Effective, and Exemplary. Unlike QM, which separates design from delivery, the ROI rubric explicitly addresses both course design elements and teaching delivery behaviors such as how instructors monitor and respond to student feedback and how they integrate innovative technologies to support authentic learning.
                      </p>
                    </div>

                    {/* Rubric 3: OSCQR */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-[#1D2440] text-sm">
                          3. OSCQR — SUNY Online Course Quality Review Rubric
                        </h4>
                        <a
                          href="https://oscqr.suny.edu/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9E586B] hover:text-[#5E2B3B] underline"
                        >
                          <span>OSCQR Rubric</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 break-all">
                        URL: https://oscqr.suny.edu/
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        The Online Course Quality Review Rubric (OSCQR) was adopted by the Online Learning Consortium (OLC) as its official Course Design Review scorecard. It contains 50 standards organized across 6 categories. What distinguishes OSCQR from QM and ROI is its explicitly non-evaluative, formative orientation. Rather than assigning a pass/fail score, OSCQR guides instructional designers and faculty in identifying actionable improvements and estimating the time needed to implement them, making it especially well-suited for continuous improvement cycles and newly designed courses.
                      </p>
                    </div>
                  </div>

                  {/* Selected Rubric Subsection */}
                  <div
                    id="ap-sec-roi"
                    className="p-4 rounded-xl bg-[#DC9BB5]/15 border border-[#DC9BB5]/50 text-[#5E2B3B] space-y-2.5 scroll-mt-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E586B]">
                        Selected Rubric Justification
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#5E2B3B] text-white text-[10px] font-mono font-semibold">
                        Baseline • Effective • Exemplary
                      </span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                      Selected Rubric: ROI Rubric (CSU Chico Rubric for Online Instruction)
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      After comparing all three instruments, I selected the <strong>ROI Rubric</strong> as the most appropriate framework for evaluating my 2026 Nissan Z Heritage Edition Sales Training course. First, the ROI rubric evaluates both instructional design quality and teaching delivery behaviors, which aligns with the dual goals of this assignment: assessing student learning outcomes and evaluating my own effectiveness as an instructional designer and facilitator. Second, its dedicated category on &ldquo;Innovative Teaching with Technology&rdquo; directly speaks to the core pedagogical strategies embedded in my course, including gamification, a badge progression system, interactive hotspot games, audio identification challenges, and video-based storytelling. Third, its three-tiered rating scale (Baseline, Effective, Exemplary) provides a clear, developmental roadmap that allows me to use the rubric both as a self-assessment checklist during course development and as an evaluation tool after delivery.
                    </p>
                  </div>
                </div>

                {/* PART B: CSU Quality Assurance in Online Instruction */}
                <div
                  id="ap-sec-b"
                  className="space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Part B</span>
                    <span className="text-[10px] font-mono text-slate-400">QLT Instrument &amp; OCS Ecosystem</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>PART B: CSU Quality Assurance in Online Instruction</span>
                  </h3>

                  {/* Official Resource Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <a
                      href="http://courseredesign.csuprojects.org/wp/qualityassurance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#9E586B] transition-all flex flex-col justify-between group"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Resource 1</span>
                      <span className="text-xs font-bold text-[#1D2440] group-hover:text-[#9E586B] flex items-center justify-between mt-1">
                        <span>QLT Program</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    </a>
                    <a
                      href="https://ocs.calstate.edu/courses"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#9E586B] transition-all flex flex-col justify-between group"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Resource 2</span>
                      <span className="text-xs font-bold text-[#1D2440] group-hover:text-[#9E586B] flex items-center justify-between mt-1">
                        <span>OCS Courses &amp; Resources</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    </a>
                    <a
                      href="https://ocs.calstate.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#9E586B] transition-all flex flex-col justify-between group"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Resource 3</span>
                      <span className="text-xs font-bold text-[#1D2440] group-hover:text-[#9E586B] flex items-center justify-between mt-1">
                        <span>CSU Online Course Services</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    </a>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/90">
                    <p>
                      The Quality Learning and Teaching (QLT) instrument was developed by the California State University system as a system-wide framework for evaluating and improving the quality of online and hybrid courses. Its development grew out of a comprehensive review of existing quality assurance models, most notably the CSU Chico Rubric for Online Instruction (ROI) and the Quality Matters (QM) rubric, combined with research on effective online pedagogy and input from faculty and instructional designers across CSU campuses. Consisting of 57 items organized into 9 to 10 sections, the QLT instrument provides concrete, observable criteria that serve both as a developmental guide for faculty designing new online courses and as a standardized rubric for formal peer and self-reviews.
                    </p>
                    <p>
                      Over the past five years, the CSU system has significantly scaled up its Quality Assurance (QLT) infrastructure to support faculty development, course certification, and student success across all 23 campuses. Through CSU Online Course Services (OCS), the Chancellor's Office offers structured, asynchronous professional development courses aligned directly with the QLT objectives. Additionally, CSU maintains QuARRy, an openly accessible repository of exemplary online learning resources and faculty-submitted course examples organized by QLT objectives. Together, these initiatives reflect a shift from isolated course evaluations toward a comprehensive, collaborative ecosystem of continuous quality improvement in online education across the CSU system.
                    </p>
                  </div>
                </div>

                {/* PART C: Assessing Learning Outcomes */}
                <div
                  id="ap-sec-c"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Part C</span>
                    <span className="text-[10px] font-mono text-slate-400">9 Objectives across 3 Modules</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>PART C: Assessing Learning Outcomes</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      In my 2026 Nissan Z Heritage Edition Sales Training course, assessing learning outcomes is approached as a systematic process that is tightly aligned with the nine stated learning objectives across the three modules. Rather than relying on a single end-of-course test that merely checks for completion, my assessment plan is grounded in the principle that every assessment activity must authentically measure whether learners have achieved the specific competencies described in the learning objectives. Therefore, every assessment instrument in this course is designed to map directly onto one or more specific learning objectives, ensuring full alignment between what learners are expected to do, how they are assessed, and what outcomes and competencies those assessments represent.
                    </p>
                  </div>
                </div>

                {/* PART D: Evaluating Teaching Effectiveness */}
                <div
                  id="ap-sec-d"
                  className="space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 scroll-mt-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B]">Part D</span>
                    <span className="text-[10px] font-mono text-slate-400">4-Lens Evaluation Framework</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2440] font-serif flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#9E586B] shrink-0" />
                    <span>PART D: Evaluating Teaching Effectiveness</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      Because this training is delivered as an asynchronous, self-paced corporate e-learning module in which I serve as both the instructional designer and the instructor, &ldquo;teaching effectiveness&rdquo; encompasses both the quality of my instructional design decisions and the effectiveness of the learning experience I facilitate through the platform. Rather than relying on a single metric, I will use a multi-dimensional approach to evaluate my teaching effectiveness, examining both instructional design and content delivery across four interconnected lenses:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="p-3 rounded-xl bg-[#DC9BB5]/10 border border-[#DC9BB5]/40">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B] block">Lens 1</span>
                        <span className="font-bold text-[#1D2440] text-xs sm:text-sm">
                          Learner Satisfaction &amp; Perceived Quality
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#DC9BB5]/10 border border-[#DC9BB5]/40">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B] block">Lens 2</span>
                        <span className="font-bold text-[#1D2440] text-xs sm:text-sm">
                          Engagement &amp; Completion Data
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#DC9BB5]/10 border border-[#DC9BB5]/40">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B] block">Lens 3</span>
                        <span className="font-bold text-[#1D2440] text-xs sm:text-sm">
                          Learning Performance Analytics
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#DC9BB5]/10 border border-[#DC9BB5]/40">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#9E586B] block">Lens 4</span>
                        <span className="font-bold text-[#1D2440] text-xs sm:text-sm">
                          Design Quality Against the ROI Rubric
                        </span>
                      </div>
                    </div>
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
