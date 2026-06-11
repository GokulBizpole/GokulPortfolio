import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiLinkedin } from 'react-icons/fi';
import '../styles/animations.css';

const RESUME_PATH  = '/assets/Resume/Gokul_FullStack_MERN_Resume_Updated%20(1).pdf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/gokul-p-4a47323a9/';
const EMAIL        = 'gokulprabakaran05@gmail.com';

const info = [
  { icon: <FiMail size={15} />,   label: 'Email',    value: EMAIL,            href: `mailto:${EMAIL}`   },
  { icon: <FiPhone size={15} />,  label: 'Phone',    value: '+91-9025649921', href: 'tel:+919025649921' },
  { icon: <FiMapPin size={15} />, label: 'Location', value: 'Palakkad, India', href: null               },
];

const techBadges = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'];

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const [titleHovered, setTitleHovered] = useState(false);

  return (
    <section id="about" className="py-24 px-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-indigo-500 dark:text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-2">
            Get to Know Me
          </p>
          <h2
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
            className={`text-4xl font-bold text-gray-900 dark:text-white inline-block cursor-default select-none transition-all ${titleHovered ? 'animate-glitch' : ''}`}
          >
            About <span className="text-indigo-500 dark:text-indigo-400">Me</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left: profile photo */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="animate-float-slow">
              <div
                className="animate-rotate-border rounded-2xl p-1"
                style={{ '--bg-color': 'var(--about-bg, #111827)' }}
              >
                <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-600/30 dark:shadow-indigo-900/40">
                  <img src="profile.jpeg" alt="Gokul" className='w-full h-full object-cover object-top'/>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Bio */}
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              I'm{' '}
              <span className="text-gray-900 dark:text-white font-semibold">Gokul P</span>, a{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">Full Stack Developer (MERN)</span>{' '}
              with <span className="text-gray-900 dark:text-white font-medium">1+ year</span> of hands-on
              experience building responsive and scalable web applications. I specialize in{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">React.js, Next.js, TypeScript</span>, and{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">Node.js</span>. Passionate about
              clean code, reusable components, and delivering great user experiences.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {info.map(({ icon, label, value, href }) => {
                const Card = (
                  <div className="flex flex-col gap-1 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-xl px-4 py-3 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors duration-200">
                    <span className="flex items-center gap-1.5 text-indigo-500 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wide">
                      {icon} {label}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm break-all">{value}</span>
                  </div>
                );
                return href ? (
                  <motion.a key={label} href={href} whileHover={{ scale: 1.02 }} className="block">
                    {Card}
                  </motion.a>
                ) : (
                  <div key={label}>{Card}</div>
                );
              })}
            </div>

            {/* Tech badges */}
            <div>
              <p className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-widest mb-3 font-medium">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.08 }}
                    className="animate-pulse-glow px-3 py-1.5 text-sm font-medium bg-indigo-50 dark:bg-indigo-600/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-600/25 transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href={RESUME_PATH}
                download="Gokul_FullStack_MERN_Resume.pdf"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-shimmer relative px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors duration-200 shadow-lg shadow-indigo-600/30"
              >
                <FiDownload size={15} /> Download Resume
              </motion.a>
              <motion.a
                href={`mailto:${EMAIL}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 border border-indigo-400 dark:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-600/20 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <FiMail size={15} /> Email Me
              </motion.a>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 border border-indigo-400 dark:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-600/20 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <FiLinkedin size={15} /> LinkedIn
              </motion.a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
