import { useState, useEffect, useRef } from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython,
  FaGitAlt, FaGithub,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiMongodb, SiMysql,
  SiNextdotjs, SiExpress, SiRedux, SiDjango, SiFlask,
  SiVscodium, SiPycharm,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import '../styles/animations.css';

/* ── Data ── */
const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools'];

const SKILLS = {
  Frontend: [
    { name: 'HTML5',       icon: <FaHtml5 />,      level: 'Advanced'      },
    { name: 'CSS3',        icon: <FaCss3Alt />,     level: 'Advanced'      },
    { name: 'JavaScript',  icon: <FaJs />,          level: 'Advanced'      },
    { name: 'TypeScript',  icon: <SiTypescript />,  level: 'Intermediate'  },
    { name: 'React.js',    icon: <FaReact />,       level: 'Advanced'      },
    { name: 'Next.js',     icon: <SiNextdotjs />,   level: 'Intermediate'  },
    { name: 'Redux',       icon: <SiRedux />,       level: 'Intermediate'  },
    { name: 'Tailwind CSS',icon: <SiTailwindcss />, level: 'Advanced'      },
  ],
  Backend: [
    { name: 'Node.js',   icon: <FaNodeJs />,   level: 'Intermediate' },
    { name: 'Express.js',icon: <SiExpress />,  level: 'Intermediate' },
    { name: 'Django',    icon: <SiDjango />,   level: 'Beginner'     },
    { name: 'Flask',     icon: <SiFlask />,    level: 'Beginner'     },
    { name: 'REST API',  icon: <FaNodeJs />,   level: 'Intermediate' },
  ],
  Database: [
    { name: 'MongoDB', icon: <SiMongodb />, level: 'Intermediate' },
    { name: 'MySQL',   icon: <SiMysql />,   level: 'Intermediate' },
  ],
  Tools: [
    { name: 'Git',     icon: <FaGitAlt />,  level: 'Advanced'     },
    { name: 'GitHub',  icon: <FaGithub />,  level: 'Advanced'     },
    { name: 'VS Code', icon: <VscCode />,   level: 'Advanced'     },
    { name: 'PyCharm', icon: <SiPycharm />, level: 'Intermediate' },
  ],
};

const LEVEL_COLOR = {
  Beginner:     'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
  Intermediate: 'text-blue-400   border-blue-500/40   bg-blue-500/10',
  Advanced:     'text-green-400  border-green-500/40  bg-green-500/10',
};

/* Fires once when element enters viewport */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* Flip card */
function SkillCard({ name, icon, level }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-36 cursor-pointer"
      style={{ perspective: '800px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:border-indigo-500/40 transition-colors duration-200"
        >
          <span className="text-4xl text-indigo-400 animate-pulse-glow rounded-full p-2">
            {icon}
          </span>
          <span className="text-sm font-semibold text-gray-200 text-center leading-tight px-2">
            {name}
          </span>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-indigo-600/15 border border-indigo-500/40"
        >
          <span className="text-2xl text-indigo-300">{icon}</span>
          <span className="text-sm font-bold text-white">{name}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${LEVEL_COLOR[level]}`}>
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend');
  const [fading,    setFading]    = useState(false);
  const [sectionRef, inView]      = useInView();

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setFading(true);
    setTimeout(() => { setActiveTab(tab); setFading(false); }, 220);
  };

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">
            What I Know
          </p>
          <h2 className="inline-block text-4xl font-bold text-white relative">
            Skills
            {/* Animated underline */}
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer" />
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => switchTab(cat)}
              className={[
                'px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                activeTab === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-700/30'
                  : 'bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:text-white hover:border-indigo-500/40',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill cards grid */}
        <div
          className={[
            'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 transition-opacity duration-200',
            inView
              ? fading ? 'opacity-0 animate-stagger' : 'opacity-100 animate-stagger'
              : 'opacity-0',
          ].join(' ')}
        >
          {SKILLS[activeTab].map(({ name, icon, level }) => (
            <SkillCard key={name} name={name} icon={icon} level={level} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {Object.entries(LEVEL_COLOR).map(([label, cls]) => (
            <span
              key={label}
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${cls}`}
            >
              {label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
