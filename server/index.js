import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

/* ─── Middleware ─────────────────────────────────────────────────────────── */
app.use(cors({
  origin:      process.env.FRONTEND_URL,
  methods:     ['POST'],
  credentials: false,
}));
app.use(express.json({ limit: '10kb' }));

/* ─── Nodemailer transporter ─────────────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

/* Verify SMTP credentials once on startup */
transporter.verify((err) => {
  if (err) {
    console.error('SMTP connection failed:', err.message);
    console.error('Check EMAIL_USER and EMAIL_PASS in server/.env');
  } else {
    console.log('SMTP connection verified — ready to send emails');
  }
});

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escape user-supplied text before embedding in HTML email */
function esc(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;')
    .replace(/\n/g, '<br>');
}

/* ─── POST /api/contact ──────────────────────────────────────────────────── */
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  /* ── Validation ── */
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }
  if (subject.trim().length < 3) {
    return res.status(400).json({ error: 'Subject must be at least 3 characters.' });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' });
  }

  /* ── Build & send email ── */
  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_TO || 'gokulprabakaran05@gmail.com',
      replyTo: email.trim(),
      subject: `[Portfolio] ${subject.trim()}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
        New Portfolio Message
      </h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
        Someone reached out through your portfolio contact form.
      </p>
    </div>

    <!-- Details table -->
    <div style="padding:24px 32px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 16px;background:#f9fafb;border-radius:8px 8px 0 0;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;width:90px;">Name</td>
          <td style="padding:12px 16px;background:#f9fafb;border-radius:0 8px 0 0;font-size:15px;color:#111827;font-weight:600;">${esc(name)}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#ffffff;border-top:1px solid #e5e7eb;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
          <td style="padding:12px 16px;background:#ffffff;border-top:1px solid #e5e7eb;">
            <a href="mailto:${esc(email)}" style="color:#4f46e5;font-size:15px;text-decoration:none;">${esc(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 0 8px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Subject</td>
          <td style="padding:12px 16px;background:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 0;font-size:15px;color:#111827;">${esc(subject)}</td>
        </tr>
      </table>
    </div>

    <!-- Message body -->
    <div style="padding:24px 32px;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
      <div style="background:#f9fafb;border-left:4px solid #4f46e5;border-radius:0 8px 8px 0;padding:16px 20px;">
        <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">${esc(message)}</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px 24px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Sent via <strong>Gokul P's Portfolio</strong> — Hit <em>Reply</em> to respond directly to ${esc(email)}.
      </p>
    </div>

  </div>
</body>
</html>
      `,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('sendMail error:', err.message);
    return res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
  }
});

/* ─── 404 catch-all ─────────────────────────────────────────────────────── */
app.use((_, res) => res.status(404).json({ error: 'Not found.' }));

/* ─── Start ─────────────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\nPortfolio API server running on http://localhost:${PORT}`);
  console.log(`POST /api/contact ready\n`);
});
