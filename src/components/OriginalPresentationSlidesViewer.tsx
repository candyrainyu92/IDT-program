import React from 'react';

const ShineStoneLogo: React.FC<{
  imgLeft: string;
  imgTop: string;
  txtLeft: string;
  txtTop: string;
}> = ({ imgLeft, imgTop, txtLeft, txtTop }) => (
  <>
    <img
      src="/presentation/image8.png"
      alt=""
      className="absolute object-contain pointer-events-none select-none"
      style={{ left: imgLeft, top: imgTop, width: '9.00%', height: '10.73%' }}
    />
    <div
      className="absolute flex items-center pointer-events-none select-none font-semibold text-black whitespace-nowrap"
      style={{
        left: txtLeft,
        top: txtTop,
        width: '11.89%',
        height: '7.31%',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.66cqw',
      }}
    >
      Shine Stone.
    </div>
  </>
);

const SlideCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="relative w-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] rounded-sm overflow-hidden select-text"
    style={{
      aspectRatio: '24479250 / 13679475',
      containerType: 'inline-size',
    }}
  >
    {children}
  </div>
);

export const OriginalPresentationSlidesViewer: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center gap-5 bg-[#525659]">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6 pb-8">
        {/* SLIDE 1 */}
        <SlideCanvas>
          {/* 3 Overlapping Translucent Circles */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: '59.85%',
              top: '32.40%',
              width: '15.51%',
              height: '27.75%',
              backgroundColor: 'rgba(68, 114, 196, 0.62)',
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: '52.87%',
              top: '36.52%',
              width: '30.01%',
              height: '53.70%',
              backgroundColor: 'rgba(255, 0, 0, 0.62)',
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: '48.82%',
              top: '32.58%',
              width: '25.96%',
              height: '46.46%',
              backgroundColor: 'rgba(255, 192, 0, 0.62)',
            }}
          />

          {/* Yu Liu */}
          <div
            className="absolute font-semibold text-black leading-none flex items-center"
            style={{
              left: '5.45%',
              top: '14.73%',
              width: '12.76%',
              height: '7.86%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.80cqw',
            }}
          >
            Yu Liu
          </div>

          {/* ETEC 6440 */}
          <div
            className="absolute font-normal text-[#221E1F] leading-none flex items-center"
            style={{
              left: '5.98%',
              top: '21.04%',
              width: '7.20%',
              height: '3.37%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.25cqw',
            }}
          >
            ETEC 6440
          </div>

          {/* Designing for Grammar Transfer */}
          <div
            className="absolute text-black leading-[1.05] flex flex-col justify-center"
            style={{
              left: '5.45%',
              top: '56.26%',
              width: '52.87%',
              height: '20.95%',
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: '5.97cqw',
            }}
          >
            <div>Designing for </div>
            <div>Grammar Transfer</div>
          </div>

          {/* California State University San Bernardino */}
          <div
            className="absolute font-normal text-[#221E1F] leading-none flex items-center"
            style={{
              left: '5.98%',
              top: '82.54%',
              width: '42.84%',
              height: '5.27%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            California State University San Bernardino
          </div>

          {/* Client Box */}
          <div
            className="absolute bg-black text-white font-semibold flex items-center justify-center"
            style={{
              left: '70.11%',
              top: '13.18%',
              width: '9.34%',
              height: '7.86%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.80cqw',
            }}
          >
            Client
          </div>

          {/* /Qi Yao Educational Technology */}
          <div
            className="absolute font-normal text-black leading-[1.15] flex flex-col justify-center"
            style={{
              left: '73.85%',
              top: '21.14%',
              width: '21.24%',
              height: '14.53%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.08cqw',
            }}
          >
            <div>/Qi Yao Educational</div>
            <div>Technology</div>
          </div>

          {/* Focus: Tense Application in Writing */}
          <div
            className="absolute font-normal text-[#221E1F] leading-none flex items-center justify-end text-right"
            style={{
              left: '72.80%',
              top: '30.21%',
              width: '23.34%',
              height: '4.39%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.25cqw',
            }}
          >
            Focus: Tense Application in Writing
          </div>
        </SlideCanvas>

        {/* SLIDE 2 */}
        <SlideCanvas>
          <div
            className="absolute font-semibold text-black leading-[1.05]"
            style={{
              left: '4.74%',
              top: '8.66%',
              width: '71.18%',
              height: '34.77%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '6.12cqw',
            }}
          >
            <div>The </div>
            <div>Performance Gap</div>
          </div>

          <div
            className="absolute bg-black"
            style={{
              left: '52.20%',
              top: '8.06%',
              width: '4.87%',
              height: '1.22%',
            }}
          />

          <ShineStoneLogo
            imgLeft="78.56%"
            imgTop="4.83%"
            txtLeft="83.83%"
            txtTop="8.04%"
          />

          <img
            src="/presentation/image7.png"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '-1.76%',
              top: '31.37%',
              width: '97.48%',
              height: '58.42%',
            }}
          />

          <div
            className="absolute font-bold text-black text-center leading-tight flex flex-col justify-center"
            style={{
              left: '5.54%',
              top: '40.83%',
              width: '19.07%',
              height: '9.14%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            Learn: Textbook Exposure
          </div>
          <div
            className="absolute font-normal text-black text-center leading-snug"
            style={{
              left: '7.85%',
              top: '51.52%',
              width: '14.74%',
              height: '15.40%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.45cqw',
            }}
          >
            Students learn grammar rules via textbook exercises.
          </div>

          <div
            className="absolute font-bold text-black text-center leading-tight flex flex-col justify-center"
            style={{
              left: '37.62%',
              top: '40.64%',
              width: '19.07%',
              height: '9.14%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            <div>Structural</div>
            <div>Misalignment</div>
          </div>
          <div
            className="absolute font-normal text-black text-center leading-snug"
            style={{
              left: '39.96%',
              top: '52.28%',
              width: '14.74%',
              height: '11.75%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.45cqw',
            }}
          >
            Lack of learning outcomes and assessment.
          </div>

          <div
            className="absolute font-bold text-black text-center leading-tight flex flex-col justify-center"
            style={{
              left: '69.69%',
              top: '40.83%',
              width: '19.07%',
              height: '9.14%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            <div>Fail to Apply:</div>
            <div>Transfer Failure</div>
          </div>
          <div
            className="absolute font-normal text-black text-center leading-snug"
            style={{
              left: '72.07%',
              top: '52.28%',
              width: '14.74%',
              height: '11.75%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.45cqw',
            }}
          >
            Knowledge does not transfer to authentic writing.
          </div>

          <div
            className="absolute font-normal text-black leading-[1.25]"
            style={{
              left: '63.72%',
              top: '77.60%',
              width: '33.24%',
              height: '15.07%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            The performance gap reflects a misalignment between instruction, assessment, and desired outcomes rather than mere exposure to content.
          </div>
        </SlideCanvas>

        {/* SLIDE 3 */}
        <SlideCanvas>
          <ShineStoneLogo
            imgLeft="3.38%"
            imgTop="6.26%"
            txtLeft="8.65%"
            txtTop="9.47%"
          />

          <div
            className="absolute font-semibold text-black leading-[1.05]"
            style={{
              left: '11.54%',
              top: '17.00%',
              width: '38.46%',
              height: '33.00%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '6.12cqw',
            }}
          >
            Learners and Design Constraints
          </div>

          <div
            className="absolute font-semibold text-black leading-none"
            style={{
              left: '54.90%',
              top: '18.66%',
              width: '4.30%',
              height: '12.13%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '6.12cqw',
            }}
          >
            “
          </div>

          <div
            className="absolute font-bold text-black leading-tight flex items-center"
            style={{
              left: '60.07%',
              top: '24.00%',
              width: '30.27%',
              height: '7.42%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '3.11cqw',
            }}
          >
            Variable Learners
          </div>

          <ul
            className="absolute font-normal text-black list-disc pl-[1.8cqw] space-y-[0.35cqw]"
            style={{
              left: '62.47%',
              top: '33.50%',
              width: '34.79%',
              height: '16.42%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
              lineHeight: 1.35,
            }}
          >
            <li>Mixed-grade (grade 2-5)</li>
            <li>Beginner to low-intermediate</li>
            <li>Driven by K-12 exam performance</li>
          </ul>

          {/* 3 Colored Constraint Boxes */}
          <div
            className="absolute"
            style={{
              left: '8.91%',
              top: '53.89%',
              width: '19.57%',
              height: '32.81%',
              backgroundColor: '#1F3864',
            }}
          />
          <div
            className="absolute"
            style={{
              left: '25.49%',
              top: '53.85%',
              width: '17.74%',
              height: '32.81%',
              backgroundColor: '#FF0000',
            }}
          />
          <div
            className="absolute"
            style={{
              left: '43.14%',
              top: '53.89%',
              width: '17.91%',
              height: '32.81%',
              backgroundColor: '#FFC000',
            }}
          />

          <div
            className="absolute text-white font-normal leading-tight"
            style={{
              left: '10.30%',
              top: '58.92%',
              width: '12.47%',
              height: '10.01%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            Limited Instructional Time
          </div>
          <div
            className="absolute text-white font-normal leading-snug"
            style={{
              left: '10.46%',
              top: '72.61%',
              width: '15.23%',
              height: '10.39%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.45cqw',
            }}
          >
            1.5-2 hours per session
          </div>

          <div
            className="absolute text-white font-normal leading-tight"
            style={{
              left: '27.77%',
              top: '58.92%',
              width: '12.47%',
              height: '10.01%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            Platform Environment
          </div>
          <div
            className="absolute text-white font-normal leading-snug"
            style={{
              left: '27.76%',
              top: '71.83%',
              width: '15.23%',
              height: '10.39%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.45cqw',
            }}
          >
            Notion delivery; Segmented &amp; asynchronous
          </div>

          <div
            className="absolute text-white font-normal leading-tight"
            style={{
              left: '45.06%',
              top: '58.92%',
              width: '12.47%',
              height: '10.01%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.66cqw',
            }}
          >
            Curriculum Rules
          </div>
          <div
            className="absolute text-white font-normal leading-snug"
            style={{
              left: '44.74%',
              top: '71.28%',
              width: '15.23%',
              height: '10.39%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.45cqw',
            }}
          >
            No structured assessment tools natively available.
          </div>
        </SlideCanvas>

        {/* SLIDE 4 */}
        <SlideCanvas>
          <div
            className="absolute font-semibold text-black leading-[1.08]"
            style={{
              left: '5.07%',
              top: '5.85%',
              width: '89.85%',
              height: '28.73%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '4.57cqw',
            }}
          >
            Hybrid Instructional Design Approach
          </div>

          <div
            className="absolute bg-black"
            style={{
              left: '91.29%',
              top: '19.06%',
              width: '4.87%',
              height: '1.16%',
            }}
          />

          <img
            src="/presentation/image10.png"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '5.07%',
              top: '21.59%',
              width: '87.22%',
              height: '63.63%',
            }}
          />

          <ShineStoneLogo
            imgLeft="2.09%"
            imgTop="85.22%"
            txtLeft="7.36%"
            txtTop="88.43%"
          />
        </SlideCanvas>

        {/* SLIDE 5 */}
        <SlideCanvas>
          <div
            className="absolute font-bold text-black leading-[1.22]"
            style={{
              left: '8.66%',
              top: '9.96%',
              width: '87.76%',
              height: '10.68%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.28cqw',
            }}
          >
            <div>Backward Design (Macro Alignment) + Gagné (Micro Sequencing)</div>
            <div>= Aligned Cognitive Scaffold.</div>
          </div>

          <div
            className="absolute bg-black"
            style={{
              left: '86.47%',
              top: '19.43%',
              width: '4.87%',
              height: '1.22%',
            }}
          />

          <img
            src="/presentation/image9.png"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '4.05%',
              top: '27.36%',
              width: '89.70%',
              height: '59.53%',
            }}
          />

          <ShineStoneLogo
            imgLeft="79.26%"
            imgTop="84.67%"
            txtLeft="84.53%"
            txtTop="87.88%"
          />
        </SlideCanvas>

        {/* SLIDE 6 */}
        <SlideCanvas>
          <ShineStoneLogo
            imgLeft="6.07%"
            imgTop="7.62%"
            txtLeft="11.34%"
            txtTop="10.83%"
          />

          <img
            src="/presentation/image6.png"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '18.89%',
              top: '28.84%',
              width: '60.96%',
              height: '71.05%',
            }}
          />

          <div
            className="absolute font-semibold text-black leading-none flex items-center"
            style={{
              left: '8.67%',
              top: '20.01%',
              width: '52.08%',
              height: '14.17%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '6.12cqw',
            }}
          >
            Instructional
          </div>

          <div
            className="absolute bg-black text-white font-semibold leading-none flex items-center px-[0.8cqw]"
            style={{
              left: '8.97%',
              top: '31.81%',
              width: '16.05%',
              height: '10.48%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '5.08cqw',
            }}
          >
            Flow.
          </div>

          <div
            className="absolute font-semibold text-black leading-none"
            style={{
              left: '48.71%',
              top: '13.42%',
              width: '4.93%',
              height: '31.86%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '6.12cqw',
            }}
          >
            “
          </div>

          <div
            className="absolute font-normal text-black leading-[1.2]"
            style={{
              left: '55.12%',
              top: '9.95%',
              width: '46.18%',
              height: '9.67%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.08cqw',
            }}
          >
            The Systematic fading of cognitive scaffolding.
          </div>
        </SlideCanvas>

        {/* SLIDE 7 */}
        <SlideCanvas>
          <ShineStoneLogo
            imgLeft="6.07%"
            imgTop="7.62%"
            txtLeft="11.34%"
            txtTop="10.83%"
          />

          <div
            className="absolute font-semibold text-black leading-none flex items-center"
            style={{
              left: '54.28%',
              top: '6.09%',
              width: '34.39%',
              height: '8.77%',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '3.74cqw',
            }}
          >
            Implementation
          </div>

          <img
            src="/presentation/image5.jpg"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '7.32%',
              top: '18.35%',
              width: '64.15%',
              height: '72.10%',
            }}
          />
        </SlideCanvas>

        {/* SLIDE 8 */}
        <SlideCanvas>
          <img
            src="/presentation/image1.jpg"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '6.86%',
              top: '5.53%',
              width: '83.26%',
              height: '91.80%',
            }}
          />

          <ShineStoneLogo
            imgLeft="78.91%"
            imgTop="5.53%"
            txtLeft="84.18%"
            txtTop="8.74%"
          />
        </SlideCanvas>

        {/* SLIDE 9 */}
        <SlideCanvas>
          <img
            src="/presentation/image4.jpg"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '6.90%',
              top: '4.67%',
              width: '72.39%',
              height: '90.66%',
            }}
          />

          <ShineStoneLogo
            imgLeft="77.74%"
            imgTop="7.20%"
            txtLeft="83.01%"
            txtTop="10.41%"
          />
        </SlideCanvas>

        {/* SLIDE 10 */}
        <SlideCanvas>
          <img
            src="/presentation/image3.jpg"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '15.07%',
              top: '4.06%',
              width: '77.26%',
              height: '87.07%',
            }}
          />

          <ShineStoneLogo
            imgLeft="-0.47%"
            imgTop="4.06%"
            txtLeft="4.80%"
            txtTop="7.28%"
          />
        </SlideCanvas>

        {/* SLIDE 11 */}
        <SlideCanvas>
          <img
            src="/presentation/image2.jpg"
            alt=""
            className="absolute object-contain pointer-events-none select-none"
            style={{
              left: '8.05%',
              top: '8.20%',
              width: '83.11%',
              height: '76.07%',
            }}
          />

          <ShineStoneLogo
            imgLeft="3.50%"
            imgTop="84.49%"
            txtLeft="8.77%"
            txtTop="87.70%"
          />
        </SlideCanvas>
      </div>
    </div>
  );
};
