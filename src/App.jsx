import { useEffect, useState } from 'react';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import Skills         from './components/Skills';
import Projects       from './components/Projects';
import Experience     from './components/Experience';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import CustomCursor   from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import './styles/animations.css';

/*
  Sections fade in sequentially on first load.
  Each wrapper starts opacity-0/translateY(24px) and transitions
  to full opacity once 'loaded' flips true, with increasing delays.
*/
const SECTIONS = [
  { Component: Hero,       delay: 0   },
  { Component: About,      delay: 80  },
  { Component: Skills,     delay: 160 },
  { Component: Projects,   delay: 240 },
  { Component: Experience, delay: 320 },
  { Component: Contact,    delay: 400 },
  { Component: Footer,     delay: 480 },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);

  /* Trigger after first paint so the transition is visible */
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true));
    });
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      {SECTIONS.map(({ Component, delay }) => (
        <div
          key={Component.name}
          style={{
            opacity:    loaded ? 1 : 0,
            transform:  loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        >
          <Component />
        </div>
      ))}
    </div>
  );
}
