import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import '../styles/animations.css';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeId,   setActiveId]   = useState('hero');
  const [visible,    setVisible]    = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity:   visible ? 1 : 0,
        transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease',
      }}
      className={[
        'fixed top-0 left-0 w-full z-50',
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/20'
          : 'bg-transparent border-b border-transparent',
        'transition-[background-color,border-color,box-shadow] duration-400',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleLinkClick('#hero')}
          className="animate-pulse-glow-text text-xl font-extrabold text-indigo-500 dark:text-indigo-400 tracking-tight select-none"
        >
          Gokul <span className="text-gray-900 dark:text-white">P</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id      = href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(href); }}
                  className={[
                    'relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 group',
                    isActive
                      ? 'text-indigo-500 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                  ].join(' ')}
                >
                  {label}
                  <span
                    className={[
                      'absolute bottom-0 left-3 right-3 h-px rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 origin-left',
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60',
                    ].join(' ')}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          maxHeight:  menuOpen ? '400px' : '0px',
          opacity:    menuOpen ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease',
          overflow:   'hidden',
        }}
        className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10"
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id      = href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(href); }}
                  className={[
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5',
                  ].join(' ')}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 shrink-0" />
                  )}
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
