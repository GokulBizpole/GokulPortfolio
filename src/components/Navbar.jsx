import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/animations.css';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

/* Section ids matched to nav labels for Intersection Observer */
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeId,   setActiveId]   = useState('hero');
  const [visible,    setVisible]    = useState(false);       // slide-down on mount
  const observerRef = useRef(null);

  /* Slide down on first render */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* Glass effect on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Intersection Observer — highlight active section */
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
    /* Smooth scroll fallback for older browsers */
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
          ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent',
        'transition-[background-color,border-color,box-shadow] duration-400',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleLinkClick('#hero')}
          className="animate-pulse-glow-text text-xl font-extrabold text-indigo-400 tracking-tight select-none"
        >
          Gokul <span className="text-white">P</span>
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
                      ? 'text-indigo-400'
                      : 'text-gray-400 hover:text-white',
                  ].join(' ')}
                >
                  {label}
                  {/* Animated underline */}
                  <span
                    className={[
                      'absolute bottom-0 left-3 right-3 h-px rounded-full bg-indigo-400 transition-all duration-300 origin-left',
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60',
                    ].join(' ')}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          maxHeight:  menuOpen ? '400px' : '0px',
          opacity:    menuOpen ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease',
          overflow:   'hidden',
        }}
        className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-white/10"
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
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
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
