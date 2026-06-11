import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiSend,
  FiGithub, FiLinkedin, FiCheckCircle, FiAlertCircle, FiX,
} from 'react-icons/fi';
import '../styles/animations.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/gokul-p-4a47323a9/';
const GITHUB_URL   = 'https://github.com/GokulDev03';

const INFO = [
  { icon: <FiMail size={18} />,   label: 'Email',    value: 'gokulprabakaran05@gmail.com', href: 'mailto:gokulprabakaran05@gmail.com' },
  { icon: <FiPhone size={18} />,  label: 'Phone',    value: '+91-9025649921',              href: 'tel:+919025649921'                 },
  { icon: <FiMapPin size={18} />, label: 'Location', value: 'Palakkad, India',             href: null                                },
];

const SOCIALS = [
  { icon: <FiGithub size={20} />,   label: 'GitHub',   href: GITHUB_URL   },
  { icon: <FiLinkedin size={20} />, label: 'LinkedIn', href: LINKEDIN_URL },
];

/* ── Toast ── */
function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = type === 'success'
    ? 'bg-green-50 dark:bg-green-500/15 border-green-300 dark:border-green-500/40 text-green-700 dark:text-green-400'
    : 'bg-red-50 dark:bg-red-500/15 border-red-300 dark:border-red-500/40 text-red-700 dark:text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      exit={{    opacity: 0, y: 20, scale: 0.95  }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-xl ${styles}`}
    >
      {type === 'success'
        ? <FiCheckCircle size={18} className="shrink-0" />
        : <FiAlertCircle size={18} className="shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        <FiX size={14} />
      </button>
    </motion.div>
  );
}

/* ── Field wrapper ── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-xl ' +
  'bg-white dark:bg-gray-800/60 ' +
  'border border-gray-200 dark:border-gray-700/60 ' +
  'text-gray-900 dark:text-white ' +
  'placeholder-gray-400 dark:placeholder-gray-600 text-sm ' +
  'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 ' +
  'hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200';

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
};

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form,    setForm]    = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [toast,   setToast]   = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        'service_alaa4eq',
        'template_uqvm2vr',
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'gokulprabakaran05@gmail.com',
        },
        '5XC4koAyY5t5rLEw9'
      );
      setToast({ type: 'success', message: "Message sent! I'll get back to you soon." });
      setForm(EMPTY);
    } catch (err) {
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {toast && (
          <Toast key="toast" type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <section id="contact" className="py-24 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-indigo-500 dark:text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">
              Reach Out
            </p>
            <h2 className="inline-block text-4xl font-bold text-gray-900 dark:text-white relative">
              Get In Touch
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left: info + socials */}
            <motion.div
              variants={leftVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                I'm always open to new opportunities and collaborations. Whether you
                have a project in mind or just want to say hello — drop me a message!
              </p>

              {/* Info cards */}
              <div className="flex flex-col gap-3">
                {INFO.map(({ icon, label, value, href }) => {
                  const card = (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-indigo-400 dark:hover:border-indigo-500/40 rounded-xl px-5 py-4 transition-colors duration-200 group"
                    >
                      <span className="text-indigo-500 dark:text-indigo-400 animate-pulse-glow p-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 shrink-0">
                        {icon}
                      </span>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-widest font-medium mb-0.5">{label}</p>
                        <p className="text-gray-800 dark:text-gray-200 text-sm font-medium group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-200">{value}</p>
                      </div>
                    </motion.div>
                  );
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      {card}
                    </a>
                  ) : (
                    <div key={label}>{card}</div>
                  );
                })}
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">Find me on</p>
                <div className="flex gap-3">
                  {SOCIALS.map(({ icon, label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 text-sm font-medium"
                    >
                      {icon} {label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: contact form */}
            <motion.form
              variants={rightVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/40 rounded-2xl p-6 shadow-sm dark:shadow-none"
            >
              <Field label="Name">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Subject">
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry / Collaboration / Just saying hi"
                  className={inputClass}
                />
              </Field>

              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hi..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                className="btn-shimmer relative w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg shadow-indigo-600/30 mt-1"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </motion.button>
            </motion.form>

          </div>
        </div>
      </section>
    </>
  );
}