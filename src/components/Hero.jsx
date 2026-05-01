import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import '../styles/animations.css';

const roles = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'React.js Developer',
  'Next.js Developer',
];

/* Typewriter hook — cycles through role strings */
function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }
  }, [charIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  useEffect(() => {
    setDisplayed(words[wordIndex].slice(0, charIndex));
  }, [charIndex, wordIndex, words]);

  return displayed;
}

/* Particle dots rendered in the background */
const particles = [
  { cls: 'particle-1', size: 6,  top: '18%', left: '12%' },
  { cls: 'particle-2', size: 4,  top: '65%', left: '8%'  },
  { cls: 'particle-3', size: 8,  top: '30%', left: '80%' },
  { cls: 'particle-4', size: 5,  top: '72%', left: '75%' },
  { cls: 'particle-5', size: 4,  top: '50%', left: '45%' },
  { cls: 'particle-6', size: 6,  top: '10%', left: '60%' },
];

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 px-6 pt-20 pb-10"
    >
      {/* Radial ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-700/15 blur-[80px]" />
      </div>

      {/* Floating background particles */}
      {particles.map(({ cls, size, top, left }) => (
        <span
          key={cls}
          className={`absolute rounded-full bg-indigo-400/30 animate-particle ${cls} pointer-events-none`}
          style={{ width: size, height: size, top, left }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left: text ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Greeting */}
          <p
            className="stagger-item text-indigo-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            style={{ animationDelay: '0.1s' }}
          >
            Welcome to my portfolio
          </p>

          {/* Name with glitch */}
          <h1
            className="stagger-item animate-glitch text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight"
            style={{ animationDelay: '0.2s' }}
          >
            Gokul <span className="text-indigo-400">P</span>
          </h1>

          {/* Typewriter role */}
          <div
            className="stagger-item flex items-center gap-2 text-xl md:text-2xl text-gray-300 font-medium mb-5 h-9"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-indigo-400">&gt;</span>
            <span
              className="border-r-2 border-indigo-400 pr-1"
              style={{ animation: 'cursorBlink 0.75s step-end infinite' }}
            >
              {role}
            </span>
          </div>

          {/* Bio */}
          <p
            className="stagger-item text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            style={{ animationDelay: '0.4s' }}
          >
            Building scalable web apps with{' '}
            <span className="text-indigo-400 font-medium">React.js</span>,{' '}
            <span className="text-indigo-400 font-medium">Next.js</span> &amp;{' '}
            <span className="text-indigo-400 font-medium">Node.js</span>.
          </p>

          {/* CTA buttons */}
          <div
            className="stagger-item flex flex-wrap justify-center md:justify-start gap-4 mb-8"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="#projects"
              className="btn-shimmer relative px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-indigo-700/30"
            >
              View My Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-shimmer relative px-6 py-3 border border-indigo-500 text-indigo-400 hover:text-white hover:bg-indigo-600/20 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <FiDownload size={16} /> Download Resume
            </a>
          </div>

          {/* Social icons */}
          <div
            className="stagger-item flex gap-5"
            style={{ animationDelay: '0.6s' }}
          >
            <a
              href="https://github.com/GokulDev03"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              <FiGithub size={20} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/gokul-p"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              <FiLinkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>

        {/* ── Right: profile photo ── */}
        <div className="flex justify-center md:justify-end">
          <div className="animate-float-slow">
            {/* Rotating gradient border wrapper */}
            <div
              className="animate-rotate-border rounded-full p-1"
              style={{ '--bg-color': '#030712' }}
            >
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-900/50">
                {/* Swap <img> here when photo is available */}
                <span className="text-white text-7xl font-extrabold select-none">G</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll-down bounce arrow */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-indigo-400 transition-colors duration-200"
        style={{ animation: 'floatUp 1.8s ease-in-out infinite' }}
      >
        <FiArrowDown size={26} />
      </a>
    </section>
  );
}
