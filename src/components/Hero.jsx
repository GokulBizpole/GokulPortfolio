import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import '../styles/animations.css';

const RESUME_PATH  = '/assets/Resume/Gokul_FullStack_MERN_Resume_Updated%20(1).pdf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/gokul-p-4a47323a9/';
const GITHUB_URL   = 'https://github.com/GokulDev03';

const roles = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'React.js Developer',
  'Next.js Developer',
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting,  setDeleting]  = useState(false);

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

const particles = [
  { cls: 'particle-1', size: 6, top: '18%', left: '12%' },
  { cls: 'particle-2', size: 4, top: '65%', left: '8%'  },
  { cls: 'particle-3', size: 8, top: '30%', left: '80%' },
  { cls: 'particle-4', size: 5, top: '72%', left: '75%' },
  { cls: 'particle-5', size: 4, top: '50%', left: '45%' },
  { cls: 'particle-6', size: 6, top: '10%', left: '60%' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-gray-950 px-6 pt-20 pb-10"
    >
      {/* Ambient glow — subtle in light mode */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-indigo-400/10 dark:bg-indigo-700/20 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-700/15 blur-[80px]" />
      </div>

      {/* Floating particles */}
      {particles.map(({ cls, size, top, left }) => (
        <span
          key={cls}
          className={`absolute rounded-full bg-indigo-400/20 dark:bg-indigo-400/30 animate-particle ${cls} pointer-events-none`}
          style={{ width: size, height: size, top, left }}
        />
      ))}

      <div className="relative z-10 max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left: text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <motion.p variants={itemVariants} className="text-indigo-500 dark:text-indigo-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Welcome to my portfolio
          </motion.p>

          <motion.h1 variants={itemVariants} className="animate-glitch text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            Gokul <span className="text-indigo-500 dark:text-indigo-400">P</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="flex items-center gap-2 text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-5 h-9">
            <span className="text-indigo-500 dark:text-indigo-400">&gt;</span>
            <span
              className="border-r-2 border-indigo-500 dark:border-indigo-400 pr-1"
              style={{ animation: 'cursorBlink 0.75s step-end infinite' }}
            >
              {role}
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Building scalable web apps with{' '}
            <span className="text-indigo-500 dark:text-indigo-400 font-medium">React.js</span>,{' '}
            <span className="text-indigo-500 dark:text-indigo-400 font-medium">Next.js</span> &amp;{' '}
            <span className="text-indigo-500 dark:text-indigo-400 font-medium">Node.js</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-shimmer relative px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-indigo-600/30"
            >
              View My Projects
            </motion.a>
            <motion.a
              href={RESUME_PATH}
              download="Gokul_FullStack_MERN_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-shimmer relative px-6 py-3 border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-600/30 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <FiDownload size={16} /> Download Resume
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex gap-5">
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              <FiGithub size={20} /> GitHub
            </motion.a>
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              <FiLinkedin size={20} /> LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: profile photo */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="flex justify-center md:justify-end"
        >
          <div className="animate-float-slow">
            <div
              className="animate-rotate-border rounded-full p-1"
              style={{ '--bg-color': 'var(--hero-bg, #030712)' }}
            >
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-600/30 dark:shadow-indigo-900/50">
                <span className="text-white text-7xl font-extrabold select-none">G</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
        style={{ animation: 'floatUp 1.8s ease-in-out infinite' }}
      >
        <FiArrowDown size={26} />
      </a>
    </section>
  );
}
