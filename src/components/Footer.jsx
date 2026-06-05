import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import '../styles/animations.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/gokul-p-4a47323a9/';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const SOCIALS = [
  { icon: <FiGithub size={20} />,   label: 'GitHub',   href: 'https://github.com/GokulDev03'          },
  { icon: <FiLinkedin size={20} />, label: 'LinkedIn', href: LINKEDIN_URL                             },
  { icon: <FiMail size={20} />,     label: 'Email',    href: 'mailto:gokulprabakaran05@gmail.com'     },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Back-to-top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 24 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ pointerEvents: showTop ? 'auto' : 'none' }}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 transition-colors duration-200"
      >
        <FiArrowUp size={18} />
      </motion.button>

      <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-indigo-500/20 pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="animate-pulse-glow-text text-2xl font-extrabold text-indigo-500 dark:text-indigo-400 tracking-tight select-none"
          >
            Gokul <span className="text-gray-900 dark:text-white">P</span>
          </a>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 font-medium"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-24 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              &copy; 2026 Gokul P. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Built with{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">React.js</span> &amp;{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">Tailwind CSS</span>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
