import { useEffect, useRef, useState } from 'react';
import { FiBriefcase, FiBookOpen, FiMapPin, FiCalendar } from 'react-icons/fi';
import '../styles/animations.css';

/* ── Data ── */
const WORK = [
  {
    type: 'work',
    role: 'Full Stack Developer',
    company: 'Bizpole',
    location: 'Palakkad',
    period: 'March 2026 – Present',
    current: true,
    description:
      'Developed and maintained multiple business modules for BizpoleOne ERP platform covering finance, HR and inventory. Built scalable REST APIs and reusable UI components.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
  },
  {
    type: 'work',
    role: 'Full Stack Developer',
    company: 'NextBrain Technologies',
    location: null,
    period: 'Nov 2024 – March 2026',
    current: false,
    description:
      'Built Hospital Management System with patient records, doctor management, appointments and billing. Implemented role-based access for Admin, Doctor and Receptionist.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'MySQL'],
  },
];

const EDUCATION = {
  type: 'education',
  degree: 'B.Com (Computer Application)',
  institution: 'CPA College',
  period: '2022 – 2025',
};

/* ── Per-card Intersection Observer hook ── */
function useCardInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ── Single timeline item ── */
function TimelineItem({ item, side, dotColor }) {
  const [ref, inView] = useCardInView();
  const isWork = item.type === 'work';

  /* Mobile: always slide from left. Desktop: alternate left/right. */
  const slideClass = side === 'left' ? 'animate-slide-left' : 'animate-slide-right';

  return (
    <>
      {/* ── Mobile layout (< md): left-rail dot + full-width card ── */}
      <div className="md:hidden grid grid-cols-[24px_1fr] gap-4 items-start">
        <div className="flex flex-col items-center pt-4">
          <div className={`w-3.5 h-3.5 rounded-full border-2 border-gray-950 flex-shrink-0 z-10 ${dotColor} ${item.current ? 'animate-pulse-glow' : ''}`} />
        </div>
        <CardBody ref={ref} item={item} inView={inView} slideClass="animate-slide-right" isWork={isWork} />
      </div>

      {/* ── Desktop layout (md+): centre-gutter alternating sides ── */}
      <div className="hidden md:grid grid-cols-[1fr_40px_1fr] items-start gap-0">
        {/* Left slot */}
        <div className={side === 'left' ? 'pr-6' : ''}>
          {side === 'left' && (
            <CardBody ref={ref} item={item} inView={inView} slideClass={slideClass} isWork={isWork} />
          )}
        </div>

        {/* Centre dot */}
        <div className="flex flex-col items-center pt-5">
          <div className={`w-4 h-4 rounded-full border-2 border-gray-950 flex-shrink-0 z-10 ${dotColor} ${item.current ? 'animate-pulse-glow' : ''}`} />
        </div>

        {/* Right slot */}
        <div className={side === 'right' ? 'pl-6' : ''}>
          {side === 'right' && (
            <CardBody ref={ref} item={item} inView={inView} slideClass={slideClass} isWork={isWork} />
          )}
        </div>
      </div>
    </>
  );
}

/* ── Card body (forwardRef so TimelineItem can observe it) ── */
const CardBody = ({ ref, item, inView, slideClass, isWork }) => (
  <div
    ref={ref}
    className={`transition-opacity duration-300 ${inView ? slideClass : 'opacity-0'}`}
  >
    <div className="bg-gray-800/60 border border-gray-700/50 hover:border-indigo-500/40 rounded-2xl p-5 shadow-lg hover:shadow-indigo-900/20 transition-all duration-300 animate-tilt-card">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          {isWork ? (
            <>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-base font-bold text-white leading-snug">{item.role}</h3>
                {item.current && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/15 border border-green-500/30 text-green-400 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="flex items-center gap-1.5 text-indigo-400 font-medium text-sm">
                <FiBriefcase size={12} />
                {item.company}
                {item.location && (
                  <span className="flex items-center gap-0.5 text-gray-500 font-normal text-xs">
                    <FiMapPin size={10} /> {item.location}
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold text-white mb-1">{item.degree}</h3>
              <p className="flex items-center gap-1.5 text-purple-400 font-medium text-sm">
                <FiBookOpen size={12} /> {item.institution}
              </p>
            </>
          )}
        </div>

        {/* Period badge */}
        <span className="flex items-center gap-1 text-[11px] text-gray-400 bg-gray-700/60 border border-gray-600/40 px-2.5 py-1 rounded-full whitespace-nowrap">
          <FiCalendar size={10} /> {item.period}
        </span>
      </div>

      {/* Description */}
      {isWork && (
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
      )}

      {/* Tech badges */}
      {isWork && (
        <div className="flex flex-wrap gap-1.5 animate-stagger">
          {item.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-medium bg-indigo-600/15 border border-indigo-500/25 text-indigo-300 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ── Section ── */
export default function Experience() {
  const headingRef = useRef(null);
  const lineRef    = useRef(null);
  const [headingInView, setHeadingInView] = useState(false);
  const [lineInView,    setLineInView]    = useState(false);

  useEffect(() => {
    const observers = [
      [headingRef.current, setHeadingInView],
      [lineRef.current,    setLineInView],
    ].map(([el, setter]) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  /* Interleave work entries with alternating sides, education always last on right */
  const items = [
    { data: WORK[0],   side: 'left',  dot: 'bg-indigo-500' },
    { data: WORK[1],   side: 'right', dot: 'bg-indigo-400' },
    { data: EDUCATION, side: 'left',  dot: 'bg-purple-500' },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">
            My Journey
          </p>
          <h2 className="inline-block text-4xl font-bold text-white relative">
            Experience &amp; Education
            <span
              className={`absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer transition-all duration-700 origin-left ${headingInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
            />
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative" ref={lineRef}>

          {/* Mobile left-rail line */}
          <div
            className={`md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-indigo-500/20 origin-top ${lineInView ? 'animate-draw-line' : 'scale-y-0'}`}
          />
          {/* Desktop centre line */}
          <div
            className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-indigo-500/20 origin-top ${lineInView ? 'animate-draw-line' : 'scale-y-0'}`}
          />

          <div className="flex flex-col gap-10">
            {items.map(({ data, side, dot }, i) => (
              <TimelineItem
                key={i}
                item={data}
                side={side}
                dotColor={dot}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
