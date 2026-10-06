import { CaseStudy, Competency } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'interactive-microlearning',
    title: 'Client Report & Model Selection (QiYao EdTech)',
    category: 'K–12 English Grammar • Supplementary E-Learning',
    summary: 'A comprehensive instructional design analysis and model selection for Mr. Zhao (QiYao EdTech), bridging textbook-driven grammar drills to authentic essay writing transfer via Notion.',
    deliverables: [
      'Client and Topic Report (8 Comprehensive Sections)',
      'Milestone 2: Model Selection Worksheet (7 Sections)',
      'Hybrid Framework (Backward Design + Gagné’s Nine Events)',
      '4-Phase Cognitive Sequencing Architecture'
    ],
    impact: 'Synthesized Backward Design + Gagné’s Nine Events into a scalable asynchronous e-learning unit on Notion with formative feedback and authentic assessment rubrics.',
    tags: ['Client Report', 'Model Selection', 'Backward Design', 'Gagné Nine Events', 'Notion E-Learning']
  },
  {
    id: 'gamified-onboarding',
    title: 'Analysis Report (QiYao EdTech)',
    category: 'QiYao EdTech • Systematic ID Foundation',
    summary: 'A comprehensive analytical foundation decomposing the 5-step instructional hierarchy, subordinate skills, entry behaviors validation, learner characteristics (Grades 2–5), and contextual constraints.',
    deliverables: [
      'Instructional Goal & Context Statement',
      '5-Step Instructional & Subordinate Skills Decomposition',
      'Entry Behaviors & 4-Source Evidence Validation',
      'Learner Analysis & 5 Cognitive Misconceptions',
      'Dual Learning & Performance Context Matrix'
    ],
    impact: 'Established the analytical hierarchy for K–12 grammar mastery: decomposed 5 major steps, validated 4 entry behaviors, and mapped 5 cognitive misconceptions for targeted scaffolding.',
    tags: ['Instructional Analysis', 'Skill Hierarchy', 'Entry Behaviors', 'Misconceptions', 'Notion Context']
  },
  {
    id: 'accessible-stem',
    title: 'Design Report: Objectives, Assessment & Instructional Flow',
    category: 'QiYao EdTech • Systematic ID Specification',
    summary: 'Formulates 6 criterion-referenced performance objectives (B/C/Cr), authentic formative & summative assessment alignments, a 4-phase instructional flow, and an evidence-based reasoning matrix.',
    deliverables: [
      '6 Mager Performance Objectives (Behavior, Conditions, Criteria)',
      'Formative & Summative Assessment Alignment Matrix',
      '3 Core Assessment Design Principles (Performance over Recall)',
      '4-Phase Instructional Sequencing (Gagné + UbD + Cognitive Load)',
      'Evidence-Based Design Reasoning Matrix'
    ],
    impact: 'Engineered an authentic transfer pipeline moving students from scaffolded color-coding to a 100–150 word multi-tense writing assessment evaluated via criterion rubrics.',
    tags: ['Performance Objectives', 'Assessment Alignment', 'Instructional Flow', 'Cognitive Load', 'Backward Design']
  },
  {
    id: 'presentation-slides',
    title: 'ETEC 6440 Presentation Slides (Designing for Grammar Transfer)',
    category: 'QiYao EdTech • Executive Project Presentation',
    summary: 'Executive presentation deck (11 slides) synthesizing the QiYao EdTech performance gap, learners & constraints, the hybrid Backward Design + Gagné framework, and Notion instructional delivery architecture.',
    deliverables: [
      '11-Slide Executive Deck (ETEC 6440 Presentation)',
      'Performance Gap Breakdown & Transfer Failure Analysis',
      'Learners & Contextual Constraints Synthesis',
      'Hybrid Backward Design + Gagné Cognitive Alignment Model',
      'Instructional Flow & Notion Implementation Artifacts'
    ],
    impact: 'Synthesized theoretical models and empirical learner data into an executive visual presentation demonstrating cognitive scaffolding fading and transfer attainment.',
    tags: ['Presentation Slides', 'ETEC 6440', 'Grammar Transfer', 'Cognitive Scaffolding', 'Notion Implementation']
  }
];

export const competencies: Competency[] = [
  {
    title: 'Learning Theory & Foundations',
    description: 'Grounding instruction in cognitive load theory, constructivism, and Mayer’s multimedia learning principles.',
    iconName: 'BookOpen',
    skills: ['Cognitive Task Analysis', 'Curriculum Mapping', 'Backward Design (UbD)', 'Bloom’s Taxonomy']
  },
  {
    title: 'Instructional & UX Design',
    description: 'Translating complex subject matter into frictionless, intuitive, learner-centered experiences.',
    iconName: 'Layout',
    skills: ['Rapid Storyboarding', 'Prototyping in Figma', 'Branching Narratives', 'Microlearning Architecture']
  },
  {
    title: 'EdTech & Development',
    description: 'Building robust digital learning deliverables that integrate seamlessly with modern learning management systems.',
    iconName: 'Laptop',
    skills: ['Articulate Storyline 360', 'SCORM & xAPI / cmi5', 'Canvas & Moodle Admin', 'HTML5 / CSS / Web Interactivity']
  },
  {
    title: 'Research & Learning Analytics',
    description: 'Evaluating instructional efficacy using quantitative telemetry, A/B learning cohorts, and qualitative interviews.',
    iconName: 'BarChart2',
    skills: ['Formative Assessment', 'Kirkpatrick Evaluation', 'Learner Telemetry', 'A/B Retention Testing']
  }
];

export const techStack = [
  { name: 'Articulate 360 / Storyline', level: 'Advanced Authoring', category: 'Authoring' },
  { name: 'Figma & UI/UX Design', level: 'Interactive Prototyping', category: 'Design' },
  { name: 'Canvas / Blackboard / Moodle', level: 'LMS Architecture', category: 'Platform' },
  { name: 'xAPI & Learning Analytics', level: 'Telemetry & Reporting', category: 'Research' },
  { name: 'Adobe Creative Suite', level: 'Graphic & Media Assets', category: 'Media' },
  { name: 'Camptasia & Audio Editing', level: 'Video Production', category: 'Multimedia' },
  { name: 'HTML5 / JavaScript / CSS', level: 'Interactive Components', category: 'Development' },
  { name: 'Qualtrics & Survey Design', level: 'Learner Needs Assessment', category: 'Research' }
];
