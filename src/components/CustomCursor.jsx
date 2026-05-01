import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const glowRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const gPos    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (glowRef.current) {
        gPos.current.x = lerp(gPos.current.x, pos.current.x, 0.1);
        gPos.current.y = lerp(gPos.current.y, pos.current.y, 0.1);
        glowRef.current.style.transform =
          `translate(${gPos.current.x}px, ${gPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dotRef.current?.querySelector('.dot-inner')?.classList.add('dot-hovered');
    };
    const onLeave = () => {
      dotRef.current?.querySelector('.dot-inner')?.classList.remove('dot-hovered');
    };

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, label'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      el.style.cursor = 'none';
    });

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.style.cursor = '';
      });
    };
  }, []);

  return (
    <>
      {/* Lagging glow ring */}
      <div
        ref={glowRef}
        id="cursor-glow"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="w-9 h-9 rounded-full border border-indigo-400/50 bg-indigo-500/5" />
      </div>

      {/* Snapping inner dot */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        {/* Transition lives on this inner div so hover scale actually animates */}
        <div
          className="dot-inner w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_3px_rgba(99,102,241,0.6)] transition-[width,height,background-color,box-shadow] duration-200"
        />
      </div>

      <style>{`
        .dot-inner.dot-hovered {
          width: 20px;
          height: 20px;
          background-color: rgba(99, 102, 241, 0.25);
          box-shadow: 0 0 18px 7px rgba(99, 102, 241, 0.45);
        }
        @media (pointer: coarse) {
          #cursor-dot, #cursor-glow { display: none !important; }
        }
      `}</style>
    </>
  );
}
