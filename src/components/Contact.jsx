import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import '../styles/animations.css';

/* ─── EmailJS config — replace with your real IDs ─────────────────────────
   Sign up at https://www.emailjs.com, create a service + template, then
   add your IDs here or move them to a .env file:
     VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
     VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
     VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   Template variables expected: {{from_name}}, {{from_email}}, {{message}}
──────────────────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

const INFO = [
  { icon: <FiMail size={18} />,  label: 'Email',    value: 'gokulprabakaran05@gmail.com', href: 'mailto:gokulprabakaran05@gmail.com' },
  { icon: <FiPhone size={18} />, label: 'Phone',    value: '+91-9025649921',              href: 'tel:+919025649921'                 },
  { icon: <FiMapPin size={18} />,label: 'Location', value: 'Palakkad, India',             href: null                                },
];

const SOCIALS = [
  { icon: <FiGithub size={20} />,  label: 'GitHub',   href: 'https://github.com/GokulDev03'        },
  { icon: <FiLinkedin size={20} />,label: 'LinkedIn',  href: 'https://linkedin.com/in/gokul-p'     },
];

/* ── Toast ── */
function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = type === 'success'
    ? 'bg-green-500/15 border-green-500/40 text-green-400'
    : 'bg-red-500/15 border-red-500/40 text-red-400';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-xl ${styles} animate-fade-in-up`}
    >
      {type === 'success'
        ? <FiCheckCircle size={18} className="flex-shrink-0" />
        : <FiAlertCircle size={18} className="flex-shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        <FiX size={14} />
      </button>
    </div>
  );
}

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Input field ── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-400 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/60 text-white placeholder-gray-600 text-sm ' +
  'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 ' +
  'hover:border-gray-600 transition-all duration-200';

export default function Contact() {
  const formRef           = useRef(null);
  const [sectionRef, inView] = useInView();
  const [sending, setSending] = useState(false);
  const [toast,   setToast]   = useState(null);   // { type, message } | null

  const closeToast = () => setToast(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setToast({ type: 'success', message: "Message sent! I'll get back to you soon." });
      formRef.current.reset();
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}

      <section id="contact" ref={sectionRef} className="py-24 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">
              Reach Out
            </p>
            <h2 className="inline-block text-4xl font-bold text-white relative">
              Get In Touch
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer" />
            </h2>
          </div>

          {/* Two-column grid */}
          <div className={`grid md:grid-cols-2 gap-12 items-start ${inView ? 'animate-stagger' : 'opacity-0'}`}>

            {/* ── Left: info + socials ── */}
            <div className="flex flex-col gap-6">
              <p className="text-gray-400 text-base leading-relaxed">
                I'm always open to new opportunities and collaborations. Whether you
                have a project in mind or just want to say hello — drop me a message!
              </p>

              {/* Info cards */}
              <div className="flex flex-col gap-3">
                {INFO.map(({ icon, label, value, href }) => {
                  const content = (
                    <div className="flex items-center gap-4 bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/40 rounded-xl px-5 py-4 transition-colors duration-200 group">
                      <span className="text-indigo-400 animate-pulse-glow p-2 rounded-full bg-indigo-500/10 flex-shrink-0">
                        {icon}
                      </span>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-0.5">{label}</p>
                        <p className="text-gray-200 text-sm font-medium group-hover:text-indigo-300 transition-colors duration-200">{value}</p>
                      </div>
                    </div>
                  );
                  return href
                    ? <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a>
                    : <div key={label}>{content}</div>;
                })}
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">Find me on</p>
                <div className="flex gap-3">
                  {SOCIALS.map(({ icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-lg hover:shadow-indigo-900/20 transition-all duration-200 text-sm font-medium"
                    >
                      {icon} {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: contact form ── */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

              <Field label="Name">
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your full name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project or just say hi..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <button
                type="submit"
                disabled={sending}
                className="btn-shimmer relative w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg shadow-indigo-700/30 mt-1"
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
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}
