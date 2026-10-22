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

interface ExperienceEntry {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
}

const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'turtle-rock-volunteer',
    title: 'Volunteer',
    organization: 'Turtle Rock Elementary School',
    location: 'Irvine, CA, USA',
    period: '8/2024 – 12/2024',
  },
  {
    id: 'qiyao-director',
    title: 'Director of Education',
    organization: 'Zhengzhou QiYao Education and Technology',
    location: 'Zhengzhou, China',
    period: '7/2022 – 7/2023',
  },
  {
    id: 'qiyao-manager',
    title: 'Manager of English Learning Program',
    organization: 'Zhengzhou QiYao Education and Technology',
    location: 'Zhengzhou, China',
    period: '7/2020 – 7/2022',
  },
  {
    id: 'henan-lead-teacher',
    title: 'Lead Teacher',
    organization: 'Kindergarten of Henan Province',
    location: 'Henan, China',
    period: '9/2018 – 7/2020',
  },
  {
    id: 'henan-teacher',
    title: 'Teacher',
    organization: 'Kindergarten of Henan Province',
    location: 'Henan, China',
    period: '9/2016 – 7/2018',
  },
  {
    id: 'henan-intern',
    title: 'Intern',
    organization: 'Kindergarten of Henan Province',
    location: 'Henan, China',
    period: '2/2016 – 7/2016',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="experience-section"
      className="relative w-full bg-[#EFE8DC] text-[#4C4747] pt-16 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient Radial Glowing Backdrops */}
      <div 
        aria-hidden="true" 
        className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#DC9BB5]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[#709A02]/8 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#C8963E]/8 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Self-Introduction Block (Below "About me", Above "Professional Experience") */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: "-10%" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="-mt-6 sm:-mt-8 mb-10 sm:mb-14 pb-4 sm:pb-6 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12"
        >
          {/* Left: Self-Introduction Text */}
          <div className="md:w-7/12 lg:w-[54%] text-left">
            <p className="text-base sm:text-lg md:text-xl text-[#4C4747] font-medium leading-relaxed font-inter">
              Hi, I&apos;m an educator with over 8 years of experience in curriculum development, teaching, and educational management. I&apos;m currently pursuing a master&apos;s degree in Instructional Design and Technology at California State University, San Bernardino.
            </p>
          </div>

          {/* Right (Parallel): Four Button-Styled Tags */}
          <div className="md:w-5/12 lg:w-[44%] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {[
              'Instructional Design',
              'Curriculum Development',
              'UI/UX Design',
              'E-Learning Development',
            ].map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#DC9BB5] text-[#4C4747] font-inter font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(220,155,181,0.35)] border border-[#4C4747]/10 text-center whitespace-nowrap transition-transform hover:-translate-y-0.5 select-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-inter tracking-tight text-[#4C4747] text-left">
            Professional Experience
          </h2>
        </div>

        {/* Divider-Separated List of Experiences (No Cards) */}
        <div className="divide-y divide-[#4C4747]/15 border-t border-b border-[#4C4747]/15">
          {EXPERIENCES.map((exp, expIdx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: expIdx * 0.06 }}
              className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6"
            >
              {/* Left: Job Title & Company Name */}
              <div className="text-left space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-inter text-[#4C4747] tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-sm sm:text-base font-medium font-inter text-[#9D988F]">
                  {exp.organization}
                </p>
              </div>

              {/* Right: Location & Period */}
              <div className="text-left sm:text-right space-y-1 shrink-0">
                <p className="text-sm sm:text-base font-medium font-inter text-[#4C4747]">
                  {exp.location}
                </p>
                <p className="text-xs sm:text-sm font-mono text-[#9D988F]">
                  {exp.period}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reflection Section: From Experience to Intention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-24 text-left"
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-inter tracking-tight text-[#4C4747] mb-2 sm:mb-3">
              From Experience to Intention
            </h2>
            <h3 className="text-lg sm:text-xl font-semibold font-inter text-[#DC9BB5]">
              My Reflection on My IDT Learning Journey
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#4C4747] leading-relaxed font-inter">
            <p>
              Before studying IDT, I had already spent years working in education, developing curricula, and exploring different ways to make learning more engaging. I enjoyed creating learning experiences, but I often relied on my own experience and intuition to make design decisions.
            </p>
            <p>
              When I started this program, I thought I would mainly learn new design models and technologies. But along the way, I realized that IDT is much more than that. I began to think more deeply about how people learn, why learning problems happen, and how research and evidence can guide my decisions. I also learned that sometimes the best solution is not to create another course.
            </p>
          </div>
        </motion.div>

        {/* Back to top button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F3EB] hover:bg-white border border-[#4C4747]/15 text-xs sm:text-sm font-medium text-[#4C4747] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </section>
  );
};
