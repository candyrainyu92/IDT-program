import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, FileText } from 'lucide-react';

interface FoundationInterviewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoundationInterviewReportModal: React.FC<FoundationInterviewReportModalProps> = ({
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#EFE8DC] rounded-2xl shadow-2xl border border-[#4C4747]/20 flex flex-col overflow-hidden"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#F7F3EB] border-b border-[#4C4747]/15">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#DC9BB5]/30 flex items-center justify-center text-[#4C4747] flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#4C4747] truncate">
                    Interview Report: Exploring Corporate Instructional Design
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4C4747]/70 truncate">
                    Yu Liu · ETEC 5000 – Foundations of Instructional Design and Technology
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="/ETEC_5000_Interview_Report.html"
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

            {/* Scrollable APA Document Pages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
              {/* Page 1: APA Title Page */}
              <div
                style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                className="w-full max-w-[760px] mx-auto bg-white rounded-sm shadow-[0_8px_28px_rgba(76,71,71,0.12)] border border-[#4C4747]/10 px-6 sm:px-14 py-10 sm:py-14 text-[#111111] text-[15px] sm:text-[16px] leading-[2]"
              >
                <div className="text-right mb-16 sm:mb-24">Liu 1</div>
                <div className="text-center my-16 sm:my-24 space-y-0">
                  <h1 className="font-bold text-[15px] sm:text-[16px] mb-8">
                    Interview Report: Exploring Corporate Instructional Design
                  </h1>
                  <p>Yu Liu</p>
                  <p>California State University, San Bernardino</p>
                  <p>ETEC 5000 – Foundations of Instructional Design and Technology</p>
                  <p className="pt-8">Dr. Eun-Ok Baek</p>
                  <p>November 15, 2026</p>
                </div>
              </div>

              {/* Page 2+: Main Interview Report Content */}
              <div
                style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                className="w-full max-w-[760px] mx-auto bg-white rounded-sm shadow-[0_8px_28px_rgba(76,71,71,0.12)] border border-[#4C4747]/10 px-6 sm:px-14 py-10 sm:py-14 text-[#111111] text-[15px] sm:text-[16px] leading-[2] text-left space-y-4"
              >
                <div className="text-right mb-4">Liu 2</div>

                {/* Interview Metadata */}
                <div className="space-y-0 mb-6">
                  <p><strong>Name of Interviewee:</strong> Wei</p>
                  <p><strong>Date:</strong> November 11, 2025</p>
                  <p><strong>Place/Method of Communication:</strong> Zoom interview</p>
                  <p><strong>Duration:</strong> Approximately 90 minutes</p>
                </div>

                {/* Introduction */}
                <h2 className="font-bold text-center text-[15px] sm:text-[16px] pt-2">
                  Introduction
                </h2>
                <p className="indent-8">
                  On November 11, 2026, I conducted a Zoom interview with Miss Wei, a Senior Instructional Designer, who is working in the Global Corporate Operations (GCO) learning and Performance Department. She was also the person who first introduced me to instructional design and technology (IDT) as a professional field, which made her an especially meaningful interviewee. The purpose of this interview was to gain a deeper understanding of the responsibilities of instructional designers in corporate environments, explore emerging trends in instructional technology, and learn about career opportunities and the competencies required to enter the profession. Through her professional experiences and perspectives, I gained a clearer understanding of how instructional design principles are applied in workplace training and how the profession is evolving with the integration of artificial intelligence (AI) and other learning technologies.
                </p>

                {/* Background and Professional Responsibilities */}
                <h2 className="font-bold text-center text-[15px] sm:text-[16px] pt-2">
                  Background and Professional Responsibilities
                </h2>
                <p className="indent-8">
                  The interviewee graduated from the University of Texas at Austin with a degree in Educational Technology and has spent approximately ten years working in corporate training and learning design. Her responsibilities include designing e-learning courses, developing micro-learning experiences, integrating Training Needs Analysis (TNA) processes, creating reusable e-learning templates, and contributing to corporate payroll training programs.
                </p>
                <p className="indent-8">
                  Her career development also demonstrated how instructional designers can gradually expand their responsibilities. When she first joined the company, her primary responsibility was storyboarding as part of a production-line training process. Over time, she became involved in more stages of instructional design. After approximately 15 months, she was participating in the full design process and began taking the lead on instructional design projects. She described the instructional design workflow as beginning with analyzing existing training materials and identifying learning objectives. Designers then select appropriate media based on those objective and relevant instructional principles, develop course content and learning activities. This process highlights the importance of aligning learning activities and media with instructional goals rather than selecting technology simply because it is available.
                </p>
                <p className="indent-8">
                  The interviewee also emphasized several competencies and practices that contribute to effective instructional design. First, she highlighted creativity and learner-centered design. For example, when designing instruction to help learners identify different types of flowers, she suggested creating a flower-market game in which learners use clues to find the correct flowers instead of simply viewing pictures. She explained that questions, interaction, and immediate feedback can encourage attention and improve memory. She provided another example from payroll training. When the learning objective is to help employees distinguish between different tax calculation methods, simply presenting a formula table may not be sufficient. Instead, designers can use videos and visuals to explain basic calculations, followed by examples of two pay stubs with different salaries and tax calculations. Learners are then asked to identify and correct errors. She also recommended introducing learning objectives, expected completion time, and the relevance of the content at the beginning of a course so employees understand why the training matters.
                </p>
                <p className="indent-8">
                  Second, she emphasized collaboration and resource sharing. She developed a reusable demonstration and practice template that other team members could use, reducing repetitive work and improving team efficiency. She believes instructional designers should consider the needs of the entire team rather than focusing exclusively on individual projects. Because corporate projects often involve multiple designers, effective collaboration requires listening to different perspectives, explaining the strengths of one’s own ideas, remaining open-minded, and supporting colleagues when needed.
                </p>
                <p className="indent-8">
                  Finally, accessibility was another important responsibility in her work. Her company has more than 5000 employees globally, making it essential to consider employees with different abilities and learning needs. She spent time learning and applying the Web Content Accessibility Guidelines (WCAG), including adding alternative text to images and checking color contrast. Her experience reinforces the idea that accessibility is not an optional design feature but an important part of understanding and supporting diverse learners.
                </p>

                {/* Trends and New Directions in Instructional Technology */}
                <h2 className="font-bold text-center text-[15px] sm:text-[16px] pt-2">
                  Trends and New Directions in Instructional Technology
                </h2>
                <p className="indent-8">
                  The interviewee explained that AI is increasingly being used to accelerate instructional design workflows. It can help designers generate initial learning objectives, assessment plans, course outlines, and summaries, as well as support batch content generation. She observed that AI is particularly useful for writing and organizing information, helping designers produce an initial draft more efficiently. She also noted that some companies are beginning to assess candidates’ AI capabilities through recruitment case tasks. Rather than evaluating only the final product, employers may ask candidates to demonstrate how they used AI throughout the process of developing a virtual project. In addition, AI features are becoming more integrated into authoring tools such as Articulate Storyline and Rise, creating new possibilities for prototyping and course development. However, she emphasized that AI still has limitations. It may overlook important details, generate inaccurate or fabricated information, and lack the instructional judgement and creativity required to make appropriate design decisions. Human review remains essential. More importantly, instructional designers must communicate with stakeholders, understand organizational culture, negotiate different departmental needs, and coordinate projects. These responsibilities involve empathy, professional judgement, and interpersonal skills that AI cannot fully replace.
                </p>
                <p className="indent-8">
                  In her view, the future role of instructional designers will involve delegating repetitive tasks to AI while focusing on strategy, creativity, communication, and evaluation. She believes that professionals who fail to learn how to integrate AI into their workflows may become less competitive. Therefore, new instructional designers should develop AI literacy, learn to write effective prompts, and understand how AI can support different stages of the design process.
                </p>
                <p className="indent-8">
                  Another trend she discussed was gamification. She explains that corporate training often faces three challenges: low employee engagement, limited knowledge retention after training, and insufficient connections between training content and actual workplace performance. Gamification may help address some of these challenges by increasing engagement, encouraging social interaction, and supporting knowledge sharing. Common elements include points, leaderboards, and badges. However, she stressed that gamification should not simply involve adding game elements to a course. It requires a complete design framework that connects learning activities to organizational and business goals. For example, employees could take on the role of product managers in a simulated environment, where they make virtual product-development decisions and practice implementing those decisions. This type of experience allows employees to apply knowledge through realistic tasks rather than passively receiving information.
                </p>

                {/* Career Opportunities and Required Competencies */}
                <h2 className="font-bold text-center text-[15px] sm:text-[16px] pt-2">
                  Career Opportunities and Required Competencies
                </h2>
                <p className="indent-8">
                  The interviewee’s career journey provided practical insights into entering the instructional design profession. After her first semester of graduate school, she volunteered as an Educational Program Leader for a nonprofit organization. Although the position was unpaid, it gave her opportunities to develop course materials and gain practical experience. She later used some of these projects as examples when applying for jobs and building her portfolio. After completing one academic year, she began searching for internships and first participated in a three-month unpaid internship. In September of that year, she secured an instructional design internship at a large corporation. After graduation, she received a return offer. During graduate school, she also arranged coffee chats and phone conversations with approximately ten instructional designers from different companies and industries to better understand the profession.
                </p>
                <p className="indent-8">
                  Her experience suggests that practical projects, internships, professional networking, and portfolio development can all help new professionals enter the field. However, she clarified that not every company requires candidates to submit a portfolio. When a portfolio is requested, it can provide an advantage by demonstrating a candidate&apos;s experience and design capabilities. She emphasized that employers are interested not only in the final products but also in the design thinking behind them: how candidates analyze learning needs, make instructional decisions, and solve problems. Completing a wider range of projects can help demonstrate these abilities.
                </p>
                <p className="indent-8">
                  Technical proficiency is another important requirement. Candidates should be familiar with mainstream authoring tools and be prepared to demonstrate their actual level of proficiency. Knowledge of additional supporting tools can also broaden their capabilities and make them more adaptable to different project requirements.
                </p>
                <p className="indent-8">
                  Finally, the interviewee pointed out that the title &ldquo;Instructional Designer&rdquo; can represent very different responsibilities across organizations. Some positions focus mainly on formatting and updating Word or PowerPoint materials, while others involve video production, Storyline development, needs analysis, or complete course design.
                </p>

                {/* Reflection and Professional Direction */}
                <h2 className="font-bold text-center text-[15px] sm:text-[16px] pt-2">
                  Reflection and Professional Direction
                </h2>
                <p className="indent-8">
                  As someone with an educational background, my initial career goal has been to work as an instructional designer or curriculum developer in the EdTech industry, particularly in language learning. However, this interview broadened my understanding of potential career paths in instructional design. I became more interested in corporate training and realized that it is another meaningful direction where I could apply my educational experience and instructional design skills. This broader perspective also reflects the diverse roles and applications of instructional design discussed by Reiser and Dempsey (2018).
                </p>
                <p className="indent-8">
                  One important takeaway from the interview was the value of practical project experience. I previously focused heavily on developing my knowledge of instructional design theories and learning technologies. However, I now recognize that completing more projects and building a portfolio can provide practical evidence of my abilities. More importantly, projects should demonstrate not only the final product but also my design thinking, decision-making, and problem-solving processes. This helped me understand that becoming a competitive instructional designer requires the ability to apply theoretical knowledge to authentic design challenges.
                </p>
                <p className="indent-8">
                  The discussion about AI also reinforced my awareness that the profession is evolving. Carliner et al. (2025) explore how AI is already influencing the work of instructional designers, while <em>How Close Is AI to Taking Over the Role of the Instructional Designer?</em> also raises questions about the future relationship between AI and the profession. These perspectives connect with the interviewee&apos;s observation that AI can accelerate tasks such as drafting learning objectives, developing course outlines, and generating content, but still requires human judgment, creativity, and careful review. I now see AI integration as an essential professional skill rather than simply an optional technical ability. I need to explore how AI can support different stages of the instructional design process while maintaining instructional quality and learner-centered decision-making.
                </p>
                <p className="indent-8">
                  The interview also helped me better understand the potential of gamification in corporate training. Capatina et al. (2024) found that gamification can positively influence knowledge retention and job performance, while social interaction plays an important role in knowledge sharing. These findings connect with the interviewee&apos;s examples of using simulations, challenges, and immediate feedback to make workplace training more engaging and meaningful. At the same time, I learned that gamification should be aligned with learning objectives and organizational needs rather than added simply to make a course entertaining. This reinforced my understanding that effective instructional design should focus on meaningful learning and the application of knowledge in real-world contexts.
                </p>
                <p className="indent-8">
                  Finally, I recognized the importance of strengthening my communication and collaboration skills. As a non-native English speaker preparing to enter the U.S. professional environment, I need to continue improving my English communication, particularly when explaining design decisions, collaborating with colleagues, and communicating with stakeholders. The interview helped me realize that technical knowledge alone is not enough; instructional designers must also understand people, communicate effectively, and work collaboratively across teams.
                </p>
                <p className="indent-8">
                  Overall, this interview expanded my understanding of the instructional design profession and helped me identify practical areas for my professional development. I plan to remain open to both EdTech and corporate training opportunities, gain more hands-on project experience, develop stronger AI integration skills, and improve my communication and accessibility practices. Most importantly, I now understand that becoming an effective instructional designer involves more than mastering tools or producing learning materials. It requires combining instructional knowledge, creativity, technology, empathy, and collaboration to create meaningful learning experiences.
                </p>

                {/* References */}
                <h2 className="font-bold text-center text-[15px] sm:text-[16px] pt-4">
                  References
                </h2>
                <div className="space-y-3">
                  <p className="pl-8 -indent-8">
                    Reiser, R. A., &amp; Dempsey, J. V. (2025). <em>Trends and issues in instructional design and technology</em> (5th ed.). Pearson.
                  </p>
                  <p className="pl-8 -indent-8">
                    Capatina, A., Juarez-Varon, D., Micu, A., &amp; Micu, A. E. (2024). Leveling up in corporate training: Unveiling the power of gamification to enhance knowledge retention, knowledge sharing, and job performance. <em>Journal of Innovation &amp; Knowledge</em>, <em>9</em>(3), Article 100530.{' '}
                    <a
                      href="https://doi.org/10.1016/j.jik.2024.100530"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#DC9BB5] break-all"
                    >
                      https://doi.org/10.1016/j.jik.2024.100530
                    </a>
                  </p>
                  <p className="pl-8 -indent-8">
                    Carliner, S., Cucinelli, G., Karim, S., Carliner, S., Cucinelli, G., &amp; Karim, S. (2025, July 16). Will AI change the work of instructional designers? Maybe it already has. <em>Learning Guild</em>.{' '}
                    <a
                      href="https://www.learningguild.com/articles/will-ai-change-the-work-of-instructional-designers-maybe-it-already-has"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#DC9BB5] break-all"
                    >
                      https://www.learningguild.com/articles/will-ai-change-the-work-of-instructional-designers-maybe-it-already-has
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
