import React from 'react';

const CreativeStatement: React.FC = () => {
  return (
    <section className="relative bg-[#050505] text-[#F4F4F4] py-28 sm:py-36 lg:py-48 overflow-hidden hairline-b select-none">
      {/* Editorial Corner Micro-Labels */}
      <div className="w-full px-4 sm:px-8 lg:px-16 relative">
        <div className="relative border border-[#1a1a1a] bg-[#0B0B0B] p-8 sm:p-16 lg:p-24">
          
          {/* Four Corner Crosshairs */}
          <div className="absolute top-2 left-2 font-mono text-[9px] text-[#3A3A3A]">+</div>
          <div className="absolute top-2 right-2 font-mono text-[9px] text-[#3A3A3A]">+</div>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#3A3A3A]">+</div>
          <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#3A3A3A]">+</div>

          {/* Top Edge Micro Meta */}
          <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-[#B5B5B5] uppercase pb-6 sm:pb-8 hairline-b mb-8 sm:mb-12">
            <span>// 07 — SECOND MANIFESTO</span>
            <span className="text-[#3A3A3A] hidden sm:inline">•</span>
            <span>DISCIPLINE OVER TRENDS</span>
            <span className="text-[#3A3A3A] hidden sm:inline">•</span>
            <span>EST. 2026</span>
          </div>

          {/* Main Statement Typography */}
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="font-sans font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05] tracking-[-0.03em] text-[#F4F4F4]">
              GOOD WORK IS BUILT ON GOOD QUESTIONS. STRATEGY PROVIDES THE DIRECTION, DESIGN GIVES IT FORM, AND REFINEMENT{' '}
              <span className="inline-block px-2 sm:px-3 bg-[#F4F4F4] text-[#050505] tracking-normal font-black">
                ENSURES
              </span>{' '}
              EVERY DETAIL SUPPORTS THE BIGGER PICTURE.
            </h3>
          </div>

          {/* Bottom Edge Micro Meta */}
          <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase pt-6 sm:pt-8 hairline-t mt-8 sm:mt-12 gap-4">
            <div>FRAMEWORK // RESEARCH → STRATEGY → EXECUTION</div>
            <div>[ SYSTEM VALIDATED 2026 ]</div>
            <div>JESSE OGOULA // STUDIO PORTFOLIO</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeStatement;
