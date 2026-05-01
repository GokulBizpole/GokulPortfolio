import { useEffect, useRef, useState } from 'react';
import { FiGithub, FiExternalLink, FiBriefcase, FiCalendar } from 'react-icons/fi';
import '../styles/animations.css';

const PROJECTS = [
  {
    title: 'BizpoleOne ERP Platform',
    description:
      'Comprehensive all-in-one business management platform covering finance, HR, inventory, and reporting modules. Implemented role-based access control and scalable modular architecture.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    role: 'Full Stack Developer',
    duration: 'Aug 2025 – Present',
    github: 'https://github.com/GokulDev03',
    live: null,
    gradient: 'from-indigo-500 via-purple-500 to-indigo-500',
  },
  {
    title: 'Dynamic Form Management System',
    description:
      'Web app with drag-and-drop form builder, configurable fields with real-time preview. Supports text, dropdown, checkbox, radio, date pickers with secure form submission storage.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    role: 'Full Stack Developer',
    duration: null,
    github: 'https://github.com/GokulDev03',
    live: null,
    gradient: 'from-purple-500 via-pink-500 to-purple-500',
  },
  {
    title: 'Hospital Management System',
    description:
      'Centralized hospital operations platform for patient records, doctor management, appointments, billing and reports with role-based access for Admin, Doctor and Receptionist.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
    role: 'Full Stack Developer',
    duration: 'Nov 2024 – Mar 2026',
    github: 'https://github.com/GokulDev03',
    live: null,
    gradient: 'from-cyan-500 via-indigo-500 to-cyan-500',
  },
];

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── 3D tilt card ── */
function ProjectCard({ project, slideDir }) {
  const cardRef  = useRef(null);
  const [cardInView, setCardInView] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCardInView(true); observerRef.current?.disconnect(); } },
      { threshold: 0.2 }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - top)  / height - 0.5;
    el.style.setProperty('--rotateX', `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty('--rotateY', `${( x * 12).toFixed(2)}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rotateX', '0deg');
    el.style.setProperty('--rotateY', '0deg');
    el.style.transition = 'transform 0.6s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
  };

  const slideClass = slideDir === 'left' ? 'animate-slide-left' : 'animate-slide-right';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-live flex flex-col rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700/50 shadow-xl hover:shadow-indigo-900/30 hover:border-indigo-500/40 transition-[border-color,box-shadow] duration-300 ${cardInView ? slideClass : 'opacity-0'}`}
    >
      {/* Gradient top border */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} bg-[length:200%_100%] animate-shimmer`} />

      <div className="tilt-content flex flex-col flex-1 p-6 gap-4">

        {/* Title */}
        <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>

        {/* Meta — role + duration */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <FiBriefcase size={11} className="text-indigo-400" />
            {project.role}
          </span>
          {project.duration && (
            <span className="flex items-center gap-1">
              <FiCalendar size={11} className="text-indigo-400" />
              {project.duration}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-medium bg-indigo-600/15 border border-indigo-500/25 text-indigo-300 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-shimmer relative flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gray-700/60 border border-gray-600/50 text-gray-300 hover:text-white hover:border-indigo-500/50 transition-colors duration-200"
          >
            <FiGithub size={13} /> GitHub
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer relative flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600/80 border border-indigo-500/50 text-white hover:bg-indigo-600 transition-colors duration-200"
            >
              <FiExternalLink size={13} /> Live Demo
            </a>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gray-800/40 border border-gray-700/30 text-gray-600 cursor-not-allowed select-none">
              <FiExternalLink size={13} /> Private
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

export default function Projects() {
  const [headingRef, headingInView] = useInView(0.3);

  return (
    <section id="projects" className="py-24 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">
            My Work
          </p>
          <h2 className="inline-block text-4xl font-bold text-white relative">
            Projects
            <span
              className={`absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer transition-all duration-700 ${headingInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
              style={{ transformOrigin: 'left' }}
            />
          </h2>
        </div>

        {/* Cards grid — alternating slide direction */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              slideDir={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
