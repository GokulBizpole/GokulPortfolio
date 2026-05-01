import { useEffect, useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiDownload } from 'react-icons/fi';
import '../styles/animations.css';

const info = [
  { icon: <FiMail size={15} />,  label: 'Email',    value: 'gokulprabakaran05@gmail.com' },
  { icon: <FiPhone size={15} />, label: 'Phone',    value: '+91-9025649921'              },
  { icon: <FiMapPin size={15} />,label: 'Location', value: 'Palakkad, India'             },
];

const techBadges = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'];

/* Fires once when element enters the viewport */
function useInView(options = {}) {
  const ref     = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default function About() {
  const [sectionRef, inView] = useInView();
  const [titleHovered, setTitleHovered] = useState(false);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-2">
            Get to Know Me
          </p>
          <h2
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
            className={`text-4xl font-bold text-white inline-block cursor-default select-none transition-all ${titleHovered ? 'animate-glitch' : ''}`}
          >
            About <span className="text-indigo-400">Me</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div
          className={`grid md:grid-cols-2 gap-14 items-center ${inView ? 'animate-stagger' : 'opacity-0'}`}
        >

          {/* ── Left: profile photo ── */}
          <div className="flex justify-center">
            <div className="animate-float-slow">
              <div
                className="animate-rotate-border rounded-2xl p-1"
                style={{ '--bg-color': '#111827' }}
              >
                <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-900/40">
                  {/* Replace with <img src="..." alt="Gokul P" className="w-full h-full object-cover" /> */}
                  <span className="text-white text-8xl font-extrabold select-none">G</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: content ── */}
          <div className="flex flex-col gap-6">

            {/* Bio */}
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I'm{' '}
              <span className="text-white font-semibold">Gokul P</span>, a{' '}
              <span className="text-indigo-400 font-medium">Full Stack Developer (MERN)</span>{' '}
              with <span className="text-white font-medium">1+ year</span> of hands-on experience
              building responsive and scalable web applications. I specialize in{' '}
              <span className="text-indigo-400 font-medium">React.js, Next.js, TypeScript</span>, and{' '}
              <span className="text-indigo-400 font-medium">Node.js</span>. Passionate about clean
              code, reusable components, and delivering great user experiences.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {info.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 hover:border-indigo-500/50 transition-colors duration-200"
                >
                  <span className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wide">
                    {icon} {label}
                  </span>
                  <span className="text-gray-300 text-sm break-all">{value}</span>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 font-medium">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((tech) => (
                  <span
                    key={tech}
                    className="animate-pulse-glow px-3 py-1.5 text-sm font-medium bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 rounded-lg hover:bg-indigo-600/25 hover:border-indigo-400/50 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/resume.pdf"
                download
                className="btn-shimmer relative px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors duration-200 shadow-lg shadow-indigo-700/30"
              >
                <FiDownload size={15} /> Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 border border-indigo-500/50 text-indigo-400 hover:text-white hover:bg-indigo-600/20 rounded-xl font-semibold text-sm transition-colors duration-200"
              >
                Contact Me
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
