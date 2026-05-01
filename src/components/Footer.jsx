import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import '../styles/animations.css';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const SOCIALS = [
  {
    icon: <FiGithub size={20} />,
    label: 'GitHub',
    href: 'https://github.com/GokulDev03',
  },
  {
    icon: <FiLinkedin size={20} />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gokul-p',
  },
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    href: 'mailto:gokulprabakaran05@gmail.com',
  },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  /* Show back-to-top after 300 px of scroll */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Back-to-top button ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={[
          'fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full',
          'bg-indigo-600 hover:bg-indigo-500 text-white',
          'flex items-center justify-center shadow-lg shadow-indigo-700/40',
          'hover:shadow-indigo-600/60 hover:scale-110',
          'transition-all duration-300',
          showTop ? 'opacity-100 translate-y-0 animate-float' : 'opacity-0 translate-y-6 pointer-events-none',
        ].join(' ')}
      >
        <FiArrowUp size={18} />
      </button>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 border-t border-indigo-500/20 pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">

          {/* Name / logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="animate-pulse-glow-text text-2xl font-extrabold text-indigo-400 tracking-tight select-none"
          >
            Gokul <span className="text-white">P</span>
          </a>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200 font-medium"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className={[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  'bg-gray-800/60 border border-gray-700/50 text-gray-400',
                  'hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10',
                  'hover:scale-110 hover:shadow-lg hover:shadow-indigo-900/30',
                  'transition-all duration-200',
                ].join(' ')}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Bottom text */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2026 Gokul P. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Built with{' '}
              <span className="text-indigo-400 font-medium">React.js</span> &amp;{' '}
              <span className="text-indigo-400 font-medium">Tailwind CSS</span>{' '}
              <span className="text-red-400">❤️</span>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
