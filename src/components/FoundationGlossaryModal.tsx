import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, FileText } from 'lucide-react';

interface FoundationGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GlossaryEntry {
  num: number;
  term: string;
  subtitle?: string;
  definition: string;
  whyItMatters: string;
}

const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    num: 1,
    term: 'AECT',
    subtitle: '(Association for Educational Communications and Technology)',
    definition:
      'AECT is an international professional organization that supports the development of Instructional Design and Technology through research, professional definitions, academic publications, and ethical standards. It provides professional guidelines that help instructional designers to improve educational practices.',
    whyItMatters:
      'AECT shapes the field’s professional identity and practices and helps guide the advancement of Instructional Design and Technology through research, resources, professional standards, and ethical practices.',
  },
  {
    num: 2,
    term: 'The ADDIE model',
    subtitle: '(Analysis, Design, Development, Implementation and Evaluation)',
    definition:
      'The ADDIE model acts as a conceptual representation and systematic workflow comprising Analysis, Design, Development, Implementation, and Evaluation. It guides instructional designers through identifying learning needs, planning instructional strategies, developing learning materials, implementing instruction, and evaluating its effectiveness. These activities can be revisited as needed.',
    whyItMatters:
      'It provides a flexible framework that guides instructional designers through the entire design process, ensuring that learning needs, objectives, instructional strategies, and assessments are aligned to create effective learning solutions.',
  },
  {
    num: 3,
    term: 'Behaviorism',
    definition:
      'Behaviorism is a learning theory that focuses on observable changes in learners’ behavior resulting from practice, repetition, reinforcement, and feedback.',
    whyItMatters:
      'It is useful when learners need to develop specific foundational skills through clearly stated objectives and measurable performance. For example, beginning Spanish students may practice vocabulary, pronunciation, or basic sentence structures and receive immediate feedback to reinforce correct responses.',
  },
  {
    num: 4,
    term: 'Bloom’s Taxonomy',
    definition:
      'Bloom’s Taxonomy is a hierarchical framework that classifies cognitive learning objectives into six progressive levels, from less complex to more complex cognitive processes: remember, understand, apply, analyze, evaluate, and create.',
    whyItMatters:
      'It helps instructional designers develop learning outcomes and objectives at different levels, such as course, modules, lessons, and activities, while ensuring alignment between different levels and assessment.',
  },
  {
    num: 5,
    term: 'B. F. Skinner',
    definition:
      'B. F. Skinner was a psychologist and an influential scholar in behavioral learning theory. He is known for operant conditioning, which explains how the consequences of a behavior influence whether that behavior is likely to happen again.',
    whyItMatters:
      'One of the most influential scholars advocated behaviorism learning theory to help instructional designers to understand the theory of behavioral learning and be able to apply it to design the projects with measurable learning objectives, structured practice, immediate feedback, reinforcement.',
  },
  {
    num: 6,
    term: 'Cognitive Load Theory',
    definition:
      'Cognitive Load Theory explains how the limited capacity of working memory affects learning when learners process new information. It guides designers to minimize unnecessary materials, reduce cognitive demands, manage the complexity of information, and support learners organizing new knowledge effectively in the learning process.',
    whyItMatters:
      'Cognitive Load Theory is important because it helps instructional designers organize information clearly, reduce unnecessary mental effort, and make learning effective for learners.',
  },
  {
    num: 7,
    term: 'Connectivism',
    definition:
      'Connectivism is a learning perspective that explains learning as the process of creating connections among people, digital resources, information, and communities. It emphasizes the ability to find, evaluate, connect, and update knowledge in the rapidly changing digital environment.',
    whyItMatters:
      'Connectivism helps instructional designers create learning activities that encourage learners to build connections and learn through networks of people and digital resources such as databases, online communities, and Artificial Intelligence tools.',
  },
  {
    num: 8,
    term: 'Constructivism',
    definition:
      'Constructivism is a learning theory in which learners actively build understanding by connecting new information with their prior knowledge in real-world contexts. Instruction based on constructivism allows students to explore, collaborate, solve authentic problems, and create products that demonstrate their own understanding.',
    whyItMatters:
      'It provides a theoretical foundation for instructional designers to design learner-centered activities, authentic learning environments and appropriate scaffolding that support active knowledge construction.',
  },
  {
    num: 9,
    term: 'Dick & Carey Model',
    subtitle: '(Systems Approach Model)',
    definition:
      'The Dick and Carey Model is a systematic instructional design model introduced by Walter Dick and Lou Carey in 1978. It is also known as the Systems Approach Model. It views instruction as a system of interconnected components, so changes in one component may affect the others. Its ten main components are: identify instructional goals; conduct instructional analysis; analyze learners and contexts; write performance objectives; develop assessment instruments; develop instructional strategies; develop and select instructional materials; design and conduct formative evaluation; revise instruction; and design and conduct summative evaluation.',
    whyItMatters:
      'It is a high alignment design model easy for the beginner of instructional designers to follow the clear, structured roadmap to design the project.',
  },
  {
    num: 10,
    term: 'E-Learning',
    definition:
      'E-learning is a learning approach that uses digital technologies like networks, online platforms to develop instructional content, facilitate learning activities, and support assessment and interaction in synchronous or asynchronous.',
    whyItMatters:
      'E-learning enables instructional designers to create flexible, accessible, and scalable learning experiences, allowing learners to engage in interactive activities and learn across different locations and schedules.',
  },
  {
    num: 11,
    term: 'Formative Assessment',
    definition:
      'Formative Assessment is an ongoing process of gathering and using evidence of learners’ understanding and progress during learning, identifying learning gaps and adjusting instructional strategies to improve learning outcomes.',
    whyItMatters:
      "Formative Assessment is important because it helps instructional designers identify learners' learning gaps, provide feedback, and improve instruction during the learning process.",
  },
  {
    num: 12,
    term: 'Formative Evaluation',
    definition:
      'Formative evaluation is the ongoing data collection and analysis of evidence during the development or implementation of instruction to identify strengths, weaknesses, and what needs improvement. Guiding revisions to enhance instructional effectiveness.',
    whyItMatters:
      'It helps instructional designers identify design problems early, gather feedback from learners, and stakeholder, and make evidence-based revisions before an instructional product, lesson, or program is fully complete.',
  },
  {
    num: 13,
    term: 'Gagné’s Nine Events of Instruction',
    definition:
      'Robert M. Gagné organizes learning into nine sequence instruction events to support instructional designers to design projects. The nine events are: gain attention; inform learners of the objectives; stimulate recall of prior learning; present the content; provide learning guidance; elicit performance through practice; provide feedback; assess performance; and enhance retention and transfer so learners can remember and apply what they have learned in new situations.',
    whyItMatters:
      "Gagné’s Nine Events of Instruction plays an important role for learners' effective learning through step-by-step process. It provides instructional designers with a structure for organizing learning activities, guiding learners through the learning process, and aligning instruction with learning objectives.",
  },
  {
    num: 14,
    term: 'Instructional design and technology (IDT)',
    definition:
      'IDT is an ethical field that applies learning theories, systematic design processes, and technology to analyze learner’s needs, design and develop learning experiences that address instructional or non-instructional problems to improve learning and performance.',
    whyItMatters:
      'IDT is important for professionals to apply learning theories, strategies, design models, instructional design practices, and technology to improve learners’ learning experience and performance.',
  },
  {
    num: 15,
    term: 'Learning Experience Design (LXD)',
    definition:
      'LXD is a learner-centered approach that combines instructional design, learning sciences, and user experience design to create meaningful, engaging, and effective learning journeys.',
    whyItMatters:
      'LXD places the learners’ experience at the center of the design process. Effective LXD catches the learners’ attention and enhances their experiences, engaging, and accessibility, ultimately supporting better learning outcomes.',
  },
  {
    num: 16,
    term: 'Needs Assessment',
    definition:
      'Needs Assessment is a systematic process of identifying gaps between current and desired performance, investigating their underlying causes, and determining whether instructional or non-instructional solutions are needed.',
    whyItMatters:
      'Needs Assessment helps instructional designers recognize the root causes of performance gaps and design instructional or non-instructional solutions that ensure design decisions are evidence-based and address actual needs.',
  },
  {
    num: 17,
    term: 'Non-instructional solution',
    definition:
      'A non-instructional solution is an intervention used when a performance problem is not primarily caused by a lack of knowledge or skills and therefore cannot be solved through instruction design alone.',
    whyItMatters:
      'Non-instructional solutions help instructional designers address the causes of performance gap rather than assuming every problem requires training. These solutions may involve improving the broader environment, resources, procedures, expectations, incentives, communication to support effective performance.',
  },
  {
    num: 18,
    term: 'SAM (Successive Approximation Model)',
    definition:
      'SAM is an iterative instructional design model that emphasizes rapid prototyping, continuous feedback, and ongoing revisions rather than following a strictly linear process.',
    whyItMatters:
      'SAM is widely used in professional instructional design because it enables designers to rapidly develop prototypes, gather feedback, and refine learning solutions efficiently.',
  },
  {
    num: 19,
    term: 'Scaffolding',
    definition:
      'Scaffolding is an instructional strategy that helps learners complete tasks they cannot yet perform independently. The support is adjusted to learners’ needs and gradually removed as their competence develops.',
    whyItMatters:
      "It helps instructional designers create learning experiences that match learners' needs and current abilities, manage task complexity, and gradually guide learners toward independent learning.",
  },
  {
    num: 20,
    term: 'Self-assessment',
    definition:
      'It is a learner-centered assessment strategy in which learners evaluate their own knowledge, skills, and progress against established learning objectives, rubric, or criteria.',
    whyItMatters:
      'It is widely used in instructional design, particularly in formative assessment and self-paced learning. It helps learners monitor their progress, identify learning gaps, and make inform-decisions about next steps.',
  },
  {
    num: 21,
    term: 'Summative Evaluation',
    definition:
      'It’s an evaluation conducted at the end of an instructional program or intervention to determine its overall effectiveness and whether intended outcomes were achieved.',
    whyItMatters:
      'It provides evidence for judging the success of instruction and making decisions about continuing revising or expanding a program.',
  },
];

export const FoundationGlossaryModal: React.FC<FoundationGlossaryModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#EFE8DC] rounded-2xl shadow-2xl border border-[#4C4747]/20 flex flex-col overflow-hidden"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#F7F3EB] border-b border-[#4C4747]/15">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#DC9BB5]/30 flex items-center justify-center text-[#4C4747] flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#4C4747] truncate">
                    Glossary of Key Terminologies in the Field of IDT
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4C4747]/70 truncate">
                    Team 4 InstructHer · ETEC 5000: Foundations in Instructional Design and Technology
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="/ETEC_5000_Glossary_of_IDT_Terminology.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] hover:bg-[#DC9BB5] text-[#4C4747] font-inter font-bold text-xs transition-colors no-underline"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close document viewer"
                  className="w-8 h-8 rounded-full bg-[#EFE8DC] hover:bg-[#DC9BB5] text-[#4C4747] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Document Pages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
              {/* Page 1: Title Page */}
              <div
                style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                className="w-full max-w-[820px] mx-auto bg-white rounded-sm shadow-[0_8px_28px_rgba(76,71,71,0.12)] border border-[#4C4747]/10 px-6 sm:px-14 py-12 sm:py-16 text-[#111111] text-[15px] sm:text-[16px] leading-[2]"
              >
                <div className="text-center my-14 sm:my-20 space-y-0">
                  <h1 className="font-bold text-[15px] sm:text-[17px] mb-8">
                    Glossary of Key Terminologies in the Field of Instructional Design and Technology (IDT)
                  </h1>
                  <p>Team 4 InstructHer</p>
                  <p>Mariela Ortega, Yu Liu, Sabrina Lin, Carmen Mariscal Force</p>
                  <p>California State University, San Bernardino</p>
                  <p>ETEC 5000: Foundations in Instructional Design and Technology</p>
                  <p className="pt-8">Dr. Eun-Ok Baek</p>
                  <p>October 25, 2026</p>
                </div>
              </div>

              {/* Page 2: Glossary Table */}
              <div
                style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                className="w-full max-w-[820px] mx-auto bg-white rounded-sm shadow-[0_8px_28px_rgba(76,71,71,0.12)] border border-[#4C4747]/10 px-4 sm:px-10 py-8 sm:py-12 text-[#111111] text-[14px] sm:text-[15px] leading-[1.65] text-left"
              >
                <h2 className="font-bold text-center text-[15px] sm:text-[17px] mb-6">
                  Glossary of Key Terminologies in the Field of IDT
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-[#4C4747]/25 text-left">
                    <thead>
                      <tr className="bg-[#F7F3EB]">
                        <th className="border border-[#4C4747]/25 px-3 py-2.5 font-bold w-[24%]">
                          Terms
                        </th>
                        <th className="border border-[#4C4747]/25 px-3 py-2.5 font-bold w-[38%]">
                          Our Definition
                        </th>
                        <th className="border border-[#4C4747]/25 px-3 py-2.5 font-bold w-[38%]">
                          Why it matters
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {GLOSSARY_ENTRIES.map((item) => (
                        <tr key={item.num} className="align-top hover:bg-[#F7F3EB]/40">
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            <span className="font-bold">
                              {item.num}. {item.term}
                            </span>
                            {item.subtitle && (
                              <span className="block text-[13px] text-[#4C4747] mt-0.5">
                                {item.subtitle}
                              </span>
                            )}
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            {item.definition}
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            {item.whyItMatters}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Page 3: References & Meeting Log */}
              <div
                style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                className="w-full max-w-[820px] mx-auto bg-white rounded-sm shadow-[0_8px_28px_rgba(76,71,71,0.12)] border border-[#4C4747]/10 px-6 sm:px-14 py-10 sm:py-12 text-[#111111] text-[14px] sm:text-[15px] leading-[1.9] text-left space-y-6"
              >
                <div>
                  <h2 className="font-bold text-center text-[15px] sm:text-[17px] mb-4">
                    References
                  </h2>
                  <div className="space-y-2.5">
                    <p className="pl-8 -indent-8">
                      Anderson, L. W., &amp; Krathwohl, D. R. (Eds.). (2001). <em>A taxonomy for learning, teaching, and assessing: A revision of Bloom’s taxonomy of educational objectives</em>. Longman.
                    </p>
                    <p className="pl-8 -indent-8">
                      Allen, M. (2025). The Successive Approximation Model (SAM). In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 67–81). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Allen, M. W., &amp; Sites, R. (2012). <em>Leaving ADDIE for SAM: An agile model for developing the best learning experiences</em>. ASTD Press.
                    </p>
                    <p className="pl-8 -indent-8">
                      Andrade, H., &amp; Valtcheva, A. (2009). Promoting learning and achievement through self-assessment. <em>Theory Into Practice</em>, <em>48</em>(1), 12–19.{' '}
                      <a href="https://doi.org/10.1080/00405840802577544" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.1080/00405840802577544
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Cornell University, Center for Teaching Innovation. (n.d.). <em>Bloom’s taxonomy</em>.{' '}
                      <a href="https://teaching.cornell.edu/resource/blooms-taxonomy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://teaching.cornell.edu/resource/blooms-taxonomy
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Bunch, J., Jagger, C., Chaparro, R., &amp; Reaves, M. (2023, April 17). <em>Instructional design using the Dick and Carey systems approach</em>. Ask IFAS - Powered by EDIS.{' '}
                      <a href="https://ask.ifas.ufl.edu/publication/WC294" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://ask.ifas.ufl.edu/publication/WC294
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Dick, W., Carey, L., &amp; Carey, J. O. (2015). <em>The Systematic design of instruction</em> (8th ed.). Pearson.
                    </p>
                    <p className="pl-8 -indent-8">
                      Dousay, T. A., Stefaniak, J. E., &amp; Branch, R. M. (2025). Characteristics and evolution of foundational instructional design models. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 41–53). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Driscoll, M. P., &amp; Burner, K. J. (2025). Psychological foundations of instructional design. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 85–98). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Eberly Center. (n.d.). <em>Common assessment terms</em>. Carnegie Mellon University.{' '}
                      <a href="https://www.cmu.edu/teaching/assessment/basics/glossary.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://www.cmu.edu/teaching/assessment/basics/glossary.html
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Johnson, R. B., &amp; Van Haneghan, J. P. (2025). Evaluation in instructional design: A comparison of the major evaluation models. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 221–236). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Reilly, C., &amp; Reeves, T. C. (2025). Keep it real: The benefits of authentic tasks in contemporary learning environments. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 201–217). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Reiser, R. A., &amp; Carr-Chellman, A. A. (2025). What field did you say you were in? Defining and naming our field. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 3–14). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Stefaniak, J. E., &amp; Bagdy, L. (2025). The role of human performance technology in learning design. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 269–282). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Utecht, J., &amp; Keller, D. (2019). Becoming Relevant Again: Applying Connectivism Learning Theory to Today’s Classrooms. <em>Critical Questions in Education</em>, <em>10</em>(2), 107–119.
                    </p>
                    <p className="pl-8 -indent-8">
                      Welsh, L. A. H., &amp; Rowland, G. (2025). Systems influence on instructional design and technology. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 157–168). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                    <p className="pl-8 -indent-8">
                      Wilson, B. G., &amp; Novak, K. (2025). Constructivism for active, authentic learning. In R. A. Reiser, A. A. Carr-Chellman, &amp; J. V. Dempsey (Eds.), <em>Trends and issues in instructional design and technology</em> (5th ed., pp. 99–111). Routledge.{' '}
                      <a href="https://doi.org/10.4324/9781003502302" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                        https://doi.org/10.4324/9781003502302
                      </a>
                    </p>
                  </div>
                </div>

                {/* Meeting Log Section */}
                <div className="pt-6 border-t border-[#4C4747]/15 space-y-4 leading-[1.65]">
                  <h2 className="font-bold text-center text-[15px] sm:text-[17px]">
                    Meeting log
                  </h2>
                  <div className="space-y-1 text-[14px]">
                    <p><strong>Recorder:</strong> Carmen Mariscal Force</p>
                    <p><strong>Attendees:</strong> Mariela Ortega, Sabrina Lin, Yu Liu, Carmen Mariscal Force</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-[#4C4747]/25 text-left text-[13px]">
                      <thead>
                        <tr className="bg-[#F7F3EB]">
                          <th className="border border-[#4C4747]/25 px-3 py-2 font-bold w-[12%]">Date</th>
                          <th className="border border-[#4C4747]/25 px-3 py-2 font-bold w-[22%]">Topic</th>
                          <th className="border border-[#4C4747]/25 px-3 py-2 font-bold w-[42%]">Notes</th>
                          <th className="border border-[#4C4747]/25 px-3 py-2 font-bold w-[24%]">Meeting Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-top">
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 font-semibold">9/12/2026</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            Objective: To review and discuss our own definition of each term.<br /><br />
                            -Select the terms that best align with the prompt for this assignment.
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            <strong>Zoom Meeting:</strong><br />
                            Date: September 12, 2026<br />
                            Time: 8:00 a.m.<br />
                            Meeting Link: Join Zoom Meeting<br />
                            <strong>Details:</strong><br />
                            The team reviewed approximately 30 proposed glossary terms. We prioritized the terms most directly related to IDT and added several concepts that we considered essential to the glossary. The selected terms were then entered into the shared table.
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 break-words">
                            Topic: Follow-up meeting<br />
                            Time: Sep 12, 2026 08:00 AM Central Time (US and Canada)<br /><br />
                            Join Zoom Meeting<br />
                            <a href="https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                              https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1
                            </a>
                          </td>
                        </tr>
                        <tr className="align-top">
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 font-semibold">10/10/2026</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">13 terms completed</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            <strong>Zoom Meeting:</strong><br />
                            Date: October 10, 2026<br />
                            Time: 8:00 a.m.–11:15 a.m.<br />
                            Meeting Link: Join Zoom Meeting<br />
                            Zoom record:{' '}
                            <a href="https://drive.google.com/file/d/1byNSRTdpMyOMPOTZvAlZ8kwJwpan31R0/view?usp=drive_web" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                              https://drive.google.com/file/d/1byNSRTdpMyOMPOTZvAlZ8kwJwpan31R0/view?usp=drive_web
                            </a><br />
                            <strong>Details:</strong><br />
                            The team reviewed the glossary terms and Dr. Baek’s suggestions, adding the missing concepts for a total of 21 terms. Candice prepared the information for the first term, and the remaining 20 terms were divided among the four team members, with each member responsible for five definitions, explanations of importance, and graphics.<br />
                            After completing the individual work, the team reviewed each term collaboratively, shared suggestions, and revised the content until reaching consensus. The meeting was productive and took place in an atmosphere of respect and camaraderie. It was a positive teamwork experience in which every member felt heard and was able to freely suggest additions or changes. Because the group review was not completed, the team agreed to schedule another meeting to continue analyzing the glossary.
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 break-words">
                            Mariela Ortega is inviting you to a scheduled Zoom meeting.<br /><br />
                            Topic: Glossary Meeting<br />
                            Time: Oct 10, 2026 08:00 AM Pacific Time (US and Canada)<br /><br />
                            Join Zoom Meeting<br />
                            <a href="https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                              https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1
                            </a>
                          </td>
                        </tr>
                        <tr className="align-top">
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 font-semibold">10/12/2026</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">5 terms completed</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            <strong>Zoom Meeting:</strong><br />
                            Date: October 12, 2026<br />
                            Time: 4:00–5:15 p.m.<br />
                            Meeting Link: Join Zoom Meeting<br />
                            Zoom record:{' '}
                            <a href="https://drive.google.com/file/d/1xAiM1uWCm0vCm9F_4YDw8XjXDOS8JDoZ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                              https://drive.google.com/file/d/1xAiM1uWCm0vCm9F_4YDw8XjXDOS8JDoZ/view?usp=sharing
                            </a><br />
                            <strong>Details:</strong><br />
                            The team reviewed and discussed three additional glossary terms, collaboratively refining their definitions, significance, and supporting graphics. Since the glossary review was not completed, the team scheduled another Zoom meeting for Saturday, October 17, 2026, at 8:00 a.m.
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 break-words">
                            Topic: Glossary Meeting<br />
                            Time: Oct 12, 2026 04:00 PM Pacific Time<br />
                            Join Zoom Meeting<br />
                            <a href="https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                              https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1
                            </a><br /><br />
                            Meeting ID: 875 0252 2966<br />
                            Passcode: 660912
                          </td>
                        </tr>
                        <tr className="align-top">
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 font-semibold">10/17/2026</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">All glossary terms have been reviewed and completed.</td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5">
                            <strong>Zoom Meeting:</strong><br />
                            Date: October 17, 2026<br />
                            Time: 8:00 a.m.–11:05 am<br />
                            Meeting Link: Join Zoom Meeting<br />
                            <strong>Details:</strong><br />
                            The team completed the collaborative review of all glossary terms. Afterward, we prepared for the oral presentation by discussing and answering Dr. Baek’s proposed questions:<br />
                            • What is Instructional Design and Technology (IDT) based on the textbook or literature?<br />
                            • How would you explain IDT to someone who is unfamiliar with the field?<br />
                            • What are the key principles of behaviorism?<br />
                            • How might behaviorism be applied in instructional design?<br />
                            • How is one term or concept related to another concept in the glossary?<br />
                            Additionally, team members shared their knowledge and practiced defining the terms in their own words. We reviewed important IDT theories and models and strengthened our understanding through discussion. It was an enriching collaborative experience in which everyone contributed to the team’s learning and preparation.
                          </td>
                          <td className="border border-[#4C4747]/25 px-3 py-2.5 break-words">
                            Topic: Glossary Meeting<br />
                            Time: Oct 17, 2026 08:00 AM Pacific Time (US and Canada)<br />
                            Join Zoom Meeting<br />
                            <a href="https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#DC9BB5] break-all">
                              https://us06web.zoom.us/j/87502522966?pwd=jnHdtrWtTynonpALlI01UmpASoGuLA.1
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-2 text-[14px] pt-2">
                    <p><strong>Facilitators:</strong> Candice (Yu) Liu &amp; Sabrina Lin</p>
                    <div>
                      <p className="font-bold">Discussion prompt:</p>
                      <p>Why do you think this term is important to IDT?</p>
                      <p>Is this concept directly connected to our course readings?</p>
                      <p>Would an instructional designer need to understand this concept?</p>
                      <p>Do we already have another term that overlaps with this one?</p>
                    </div>
                    <div className="pt-3">
                      <p className="font-bold">Notes from Professor:</p>
                      <p>Team 4 InstructHER</p>
                      <p>[September 10</p>
                      <p>Dr. Baek:</p>
                      <p>
                        Hi InstructHER team,<br />
                        Great start! I really like your team name, InstructHER, and your meeting log shows strong organization and collaboration. Your team has already done an excellent job brainstorming more than 20 key IDT terms and creating a clear process for narrowing them down.<br />
                        As you continue, please make sure the final definitions are developed through team discussion and consensus, rather than simply dividing the terms and working independently. The goal is to benefit from everyone’s perspectives and create stronger definitions through collaboration and synergy.<br />
                        Keep up the great work!]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
