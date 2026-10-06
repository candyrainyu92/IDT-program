import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ChevronUp, 
  Globe2,
  Users2,
  Layers,
  Award
} from 'lucide-react';

interface ExperienceSectionProps {
  onNavigate?: (sectionId: string) => void;
}

interface RoleItem {
  title: string;
  period: string;
  highlights: string[];
}

interface ExperienceItem {
  id: string;
  organization: string;
  location: string;
  overallPeriod?: string;
  badge: string;
  accentColor: string;
  borderAccent: string;
  bgGradient: string;
  roles: RoleItem[];
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'turtle-rock',
    organization: 'Turtle Rock Elementary',
    location: 'Irvine, CA, USA',
    badge: 'Elementary & Digital Inclusion',
    accentColor: '#FF9BB4',
    borderAccent: 'border-[#FF9BB4]/30',
    bgGradient: 'from-[#FF9BB4]/10 via-[#1D2440] to-[#1D2440]',
    roles: [
      {
        title: 'Volunteer',
        period: '8/2024 – 12/2024',
        highlights: [
          'Assisted teachers in integrating digital and interactive learning activities into daily classroom routines.',
          'Observed classroom practices using California Teaching Performance Expectations (TPEs), focusing on strategies to help students from diverse backgrounds adapt to instruction.',
          'Supported the organization and execution of the school’s Book Fair Event, coordinating activities and engaging students and families.'
        ]
      }
    ],
    tags: [
      'California TPEs',
      'Digital Learning Activities',
      'Culturally Responsive Adaptation',
      'Book Fair Event Coordination'
    ]
  },
  {
    id: 'qiyao-edtech',
    organization: 'Zhengzhou QiYao Education and Technology',
    location: 'Zhengzhou, China',
    overallPeriod: '7/2020 – 7/2023',
    badge: 'K–12 EdTech & Curriculum Leadership',
    accentColor: '#709A02',
    borderAccent: 'border-[#709A02]/30',
    bgGradient: 'from-[#709A02]/10 via-[#1D2440] to-[#1D2440]',
    roles: [
      {
        title: 'Director of Education',
        period: '7/2022 – 7/2023',
        highlights: [
          'Led curriculum development across Reading, English, Mathematics, and after-school programs using ADDIE and instructional design principles.',
          'Conducted teacher training in curriculum implementation, digital pedagogy, and data-informed instructional strategies.',
          'Oversaw school-wide events to engage the community and showcase student learning outcomes.',
          'Managed teacher recruitment and continuous professional development pipelines.',
          'Developed STEAM-based digital learning materials and piloted innovative instructional technologies.'
        ]
      },
      {
        title: 'Manager of English Department',
        period: '7/2020 – 7/2022',
        highlights: [
          'Designed a three-stage immersive English program applying Universal Design for Learning (UDL) principles.',
          'Upgraded assessment system with adaptive learning applications (Exact Path) to track learner progress and inform instruction.',
          'Trained teachers to apply curriculum philosophy and leverage digital tools for authentic student evaluation.',
          'Managed teacher schedules and coordinated instructional delivery while responding promptly to parent feedback.',
          'Operated and managed the company’s English program Official account, creating multimedia content to promote courses and engage students and parents.'
        ]
      }
    ],
    tags: [
      'ADDIE Model',
      'Universal Design for Learning (UDL)',
      'Exact Path Adaptive Assessment',
      'Teacher Professional Development',
      'STEAM Curriculum Engineering',
      'Official Channel Operations'
    ]
  },
  {
    id: 'henan-kindergarten',
    organization: 'Kindergarten of Henan Province',
    location: 'Henan, China',
    overallPeriod: '2/2016 – 7/2020',
    badge: 'Early Childhood & Foundational Pedagogy',
    accentColor: '#FFD166',
    borderAccent: 'border-[#FFD166]/30',
    bgGradient: 'from-[#FFD166]/10 via-[#1D2440] to-[#1D2440]',
    roles: [
      {
        title: 'Lead Teacher',
        period: '9/2018 – 7/2020',
        highlights: [
          'Designed and implemented curricula for 3–6-year-olds integrating STEAM methodologies and Chinese traditional culture.',
          'Partnered with Beijing Normal University on preschool-to-elementary transition research and pilot programs.',
          'Provided professional development on technology-enhanced instruction and digital learning tools.',
          'Co-developed Lego Wedo 2.0 math and programming curriculum; guided student teams to compete in the World Robot Olympiad (WRO).'
        ]
      },
      {
        title: 'Teacher',
        period: '9/2016 – 7/2018',
        highlights: [
          'Delivered multi-subject instruction tailored for children aged 3–6.',
          'Assisted the Lead Teacher in curriculum development, lesson planning, and classroom digital tools integration.',
          'Supported inclusive education projects for students with disabilities, fostering an equitable environment.'
        ]
      },
      {
        title: 'Intern',
        period: '2/2016 – 7/2016',
        highlights: [
          'Assisted in lesson planning, daily instruction, and classroom technology integration.',
          'Gained hands-on experience in learner-centered curriculum design and early childhood pedagogy.'
        ]
      }
    ],
    tags: [
      'Early Childhood STEAM',
      'Lego Wedo 2.0 & WRO Robotics',
      'Beijing Normal University Collaboration',
      'Inclusive Education',
      'Technology-Enhanced Instruction'
    ]
  }
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="experience-section"
      className="relative w-full bg-[#1D2440] text-white pt-16 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10"
    >
      {/* Ambient Radial Glowing Backdrops */}
      <div 
        aria-hidden="true" 
        className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#FF9BB4]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[#709A02]/5 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#FFD166]/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF9BB4] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#FF9BB4]">
              Career Journey &amp; Practice
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-inter tracking-tight text-white mb-4 sm:mb-5">
            Professional Experience
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Bridging instructional design theory, adaptive learning technologies, and curriculum engineering across K–12 and early learning systems in the United States and China.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#FF9BB4] font-inter block">8+ Years</span>
              <span className="text-xs text-slate-400 font-medium">Educational Practice &amp; ID</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#709A02] font-inter block">Management</span>
              <span className="text-xs text-slate-400 font-medium">Educational Leadership</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#FFD166] font-inter block">English Learning</span>
              <span className="text-xs text-slate-400 font-medium">Curricula Development</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#93C5FD] font-inter block">STEAM &amp; Tech</span>
              <span className="text-xs text-slate-400 font-medium">Curricula &amp; Robotics</span>
            </div>
          </div>
        </div>

        {/* Timeline List of Experiences */}
        <div className="space-y-8 sm:space-y-12">
          {EXPERIENCES.map((exp, expIdx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: expIdx * 0.1 }}
              className={`relative rounded-3xl bg-gradient-to-br ${exp.bgGradient} border ${exp.borderAccent} p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all hover:border-white/30`}
            >
              {/* Card Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/15">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-inter text-white tracking-tight">
                      {exp.organization}
                    </h3>
                    <span 
                      style={{ color: exp.accentColor, borderColor: `${exp.accentColor}40`, backgroundColor: `${exp.accentColor}15` }}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                    >
                      {exp.badge}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 font-mono">
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {exp.location}
                    </span>
                    {exp.overallPeriod && (
                      <>
                        <span className="text-white/30">•</span>
                        <span className="inline-flex items-center gap-1.5 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          Overall: {exp.overallPeriod}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Roles Under this Organization */}
              <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                {exp.roles.map((role, roleIdx) => (
                  <div 
                    key={roleIdx}
                    className={`relative ${exp.roles.length > 1 && roleIdx > 0 ? 'pt-6 border-t border-white/10' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span 
                          style={{ backgroundColor: exp.accentColor }}
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                        />
                        <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight font-inter">
                          {role.title}
                        </h4>
                      </div>
                      
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 w-fit">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {role.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed pl-1">
                      {role.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span 
                            style={{ color: exp.accentColor }} 
                            className="mt-1 font-bold text-sm shrink-0"
                          >
                            •
                          </span>
                          <span className="text-slate-200">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Skill Tags Strip */}
              <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mr-1">
                  Key Competencies:
                </span>
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Chapter Pathways */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block mb-1">
              Explore Featured Works
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dive into Yu Liu’s Portfolio
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate?.('foundation')}
              className="group p-5 rounded-2xl bg-white/5 hover:bg-[#FF9BB4]/15 border border-white/10 hover:border-[#FF9BB4]/50 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#FF9BB4]">01. FOUNDATION</span>
                <ArrowRight className="w-4 h-4 text-[#FF9BB4] transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Learning Theories</h4>
              <p className="text-xs text-slate-400 leading-normal">Cognitive load, ADDIE, Gagné &amp; constructivist design foundations.</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.('research')}
              className="group p-5 rounded-2xl bg-white/5 hover:bg-[#FFD166]/15 border border-white/10 hover:border-[#FFD166]/50 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#FFD166]">02. RESEARCH</span>
                <ArrowRight className="w-4 h-4 text-[#FFD166] transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Empirical Inquiry</h4>
              <p className="text-xs text-slate-400 leading-normal">Learning analytics, telemetry data, and academic evaluation.</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.('design')}
              className="group p-5 rounded-2xl bg-white/5 hover:bg-[#709A02]/15 border border-white/10 hover:border-[#709A02]/50 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#709A02]">03. DESIGN</span>
                <ArrowRight className="w-4 h-4 text-[#709A02] transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Curriculum &amp; Systems</h4>
              <p className="text-xs text-slate-400 leading-normal">Microlearning, Notion architectures &amp; grammar transfer systems.</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.('technology')}
              className="group p-5 rounded-2xl bg-white/5 hover:bg-[#6EE7B7]/15 border border-white/10 hover:border-[#6EE7B7]/50 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#6EE7B7]">04. TECHNOLOGY</span>
                <ArrowRight className="w-4 h-4 text-[#6EE7B7] transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Interactive EdTech</h4>
              <p className="text-xs text-slate-400 leading-normal">Storyline simulations, web interactivity, and LMS integrations.</p>
            </button>
          </div>

          {/* Back to top button */}
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-medium text-white transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
