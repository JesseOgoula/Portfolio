import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [target, setTarget] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'project'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on pointer-capable desktops
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const targetEl = e.target as HTMLElement | null;
      if (!targetEl) return;

      if (targetEl.closest('[data-cursor="project"]')) {
        setCursorState('project');
      } else if (
        targetEl.closest('a, button, [role="button"], input, textarea, select, [data-cursor="link"]')
      ) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  // Smooth lerp for cursor following
  useEffect(() => {
    let animId: number;

    const loop = () => {
      setPos((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.18,
        y: prev.y + (target.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [target]);

  if (!visible) return null;

  const isProject = cursorState === 'project';
  const isLink = cursorState === 'link';

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out will-change-transform hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`cursor-circle -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 ${
          isProject
            ? 'w-20 h-20 rounded-full bg-white text-black font-mono text-[9px] font-bold tracking-widest uppercase text-center leading-tight shadow-2xl'
            : isLink
            ? 'w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40'
            : 'w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        }`}
      >
        {isProject && (
          <span className="select-none leading-[1.1]">
            VIEW<br />PROJECT
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
