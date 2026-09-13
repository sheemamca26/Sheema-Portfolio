import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Phone, MapPin, Briefcase, Calendar, Clock, GraduationCap, Github, Linkedin, Sparkles, Copy, Check, ExternalLink, MessageCircle, Smartphone } from 'lucide-react';
import { ContactFormData, FormErrors } from '../types';
import { personalInfo } from '../data/portfolioData';

interface ContactSectionProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ inputRef }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Entry-Level / Junior Software Engineer',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [notifyViaWhatsApp, setNotifyViaWhatsApp] = useState(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const buildNotificationText = (data: ContactFormData) => {
    return (
      `Hi Sheema, I sent you an inquiry from your portfolio:\n\n` +
      `👤 *Name:* ${data.firstName} ${data.lastName}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📞 *Phone:* ${data.phone ? data.phone : 'Not specified'}\n` +
      `💼 *Role:* ${data.service}\n` +
      `📝 *Message:* ${data.message}\n\n` +
      `📍 *Location:* Hyderabad | Open to Relocation`
    );
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about the opportunity or inquiry';
    } else if (formData.message.trim().length < 8) {
      newErrors.message = 'Message must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const dataSnapshot = { ...formData };
    setSubmittedData(dataSnapshot);

    try {
      // 1. Dispatch form details to Sheema's email via FormSubmit AJAX service
      await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `🚀 Portfolio Job Inquiry: ${dataSnapshot.firstName} ${dataSnapshot.lastName} (${dataSnapshot.service})`,
          _template: 'table',
          _captcha: 'false',
          'Recruiter / Sender Name': `${dataSnapshot.firstName} ${dataSnapshot.lastName}`,
          'Sender Email': dataSnapshot.email,
          'Sender Phone': dataSnapshot.phone || 'Not provided',
          'Inquired Opportunity': dataSnapshot.service,
          'Message Content': dataSnapshot.message,
          'Destination Email': personalInfo.email,
          'Sheema Mobile Numbers': `${personalInfo.primaryPhone} / ${personalInfo.secondaryPhone}`,
          'Timestamp': new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.warn('FormSubmit background dispatch note:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // 2. If user chose to notify on mobile via WhatsApp, trigger WhatsApp with formatted details
      if (notifyViaWhatsApp) {
        const text = buildNotificationText(dataSnapshot);
        const waUrl = `https://wa.me/91${personalInfo.primaryPhone}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: 'Entry-Level / Junior Software Engineer',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <section id="contact" className="py-16 lg:py-20 border-t border-white/[0.08] scroll-mt-28">
      {/* Section Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181622] border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-300 mb-6">
        <Briefcase className="w-3.5 h-3.5 text-[#ff007a]" />
        <span>Hire Me / Contact</span>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
          Let's work together!
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          I am actively seeking entry-level opportunities as an <strong className="text-white font-medium">Associate Software Engineer</strong>, <strong className="text-white font-medium">Junior Java Developer</strong>, or <strong className="text-white font-medium">Python Full-Stack Developer</strong>. Reach out directly or send a message below.
        </p>
      </div>

      {/* Direct Contact Cards Highlight Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        {/* 1. Email */}
        <div className="p-4 rounded-2xl bg-[#14131e]/90 border border-white/[0.08] hover:border-[#ff007a]/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#ff007a]/15 text-[#ff007a] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy(personalInfo.email, 'email-card')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                title="Copy Email"
              >
                {copiedType === 'email-card' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">Email</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-white hover:text-[#ff007a] font-medium text-xs sm:text-sm break-all transition-colors mt-0.5 block"
            >
              {personalInfo.email}
            </a>
          </div>
          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-3 text-[11px] font-mono text-[#ff007a] hover:underline inline-flex items-center gap-1"
          >
            <span>Send Email</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 2. Phone */}
        <div className="p-4 rounded-2xl bg-[#14131e]/90 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy('9391621778 / 7013431104', 'phone-card')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                title="Copy Phone Numbers"
              >
                {copiedType === 'phone-card' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">Phone Numbers</span>
            <div className="mt-0.5 text-white font-mono font-semibold text-xs sm:text-sm">
              <a href="tel:9391621778" className="hover:text-emerald-400 transition-colors">9391621778</a>
              <span className="text-gray-500 mx-1">or</span>
              <a href="tel:7013431104" className="hover:text-emerald-400 transition-colors">7013431104</a>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-[11px] font-mono">
            <a href="tel:9391621778" className="text-emerald-400 hover:underline">Call 9391621778</a>
            <span className="text-gray-600">•</span>
            <a href="tel:7013431104" className="text-emerald-400 hover:underline">7013431104</a>
          </div>
        </div>

        {/* 3. Location */}
        <div className="p-4 rounded-2xl bg-[#14131e]/90 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Relocation OK
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">Location</span>
            <p className="text-white font-semibold text-sm mt-0.5">
              {personalInfo.location}
            </p>
          </div>
          <span className="mt-3 text-[11px] font-mono text-gray-400">
            Open to On-site / Remote
          </span>
        </div>

        {/* 4. LinkedIn */}
        <div className="p-4 rounded-2xl bg-[#14131e]/90 border border-white/[0.08] hover:border-[#0a66c2]/60 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/15 text-[#0a66c2] flex items-center justify-center">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0a66c2]/15 text-[#6ba7f5] border border-[#0a66c2]/30">
                Active
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">LinkedIn Profile</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#6ba7f5] font-mono text-xs truncate block mt-0.5"
            >
              sheema-2601mca
            </a>
          </div>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-[11px] font-mono text-[#0a66c2] hover:text-[#6ba7f5] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* Main Form Container */}
      <div className="rounded-3xl bg-[#14131e]/90 border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-10">
        
        {isSubmitted && submittedData ? (
          <div className="py-8 px-2 sm:px-4 animate-fadeIn">
            {/* Success Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
                Inquiry Dispatched Successfully!
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Thank you, <strong className="text-white font-semibold">{submittedData.firstName} {submittedData.lastName}</strong>! Your message has been dispatched to Sheema's email and mobile channels.
              </p>
            </div>

            {/* Two Channels Grid: Email & Mobile Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-8">
              
              {/* Channel A: Email Routing */}
              <div className="p-5 rounded-2xl bg-[#181625] border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <Mail className="w-4 h-4" />
                      <span>Email Delivery</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Dispatched</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">
                    Inquiry details forwarded to Sheema's verified address:
                  </p>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs sm:text-sm text-white font-medium break-all flex items-center justify-between">
                    <span>{personalInfo.email}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(personalInfo.email, 'email-success')}
                      className="p-1 hover:text-[#ff007a] text-gray-400 transition-colors ml-2 cursor-pointer"
                      title="Copy email"
                    >
                      {copiedType === 'email-success' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">
                    Includes sender details, requested role, contact info, and complete note.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2">
                  <a
                    href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Inquiry from ${submittedData.firstName} ${submittedData.lastName}`)}&body=${encodeURIComponent(buildNotificationText(submittedData))}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-mono transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#ff007a]" />
                    <span>Open in Email App / Gmail</span>
                  </a>
                </div>
              </div>

              {/* Channel B: Mobile Phone / WhatsApp Delivery */}
              <div className="p-5 rounded-2xl bg-[#181625] border border-[#25D366]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#25D366] text-xs font-mono font-semibold uppercase tracking-wider">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile Notification</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">
                    Ping Sheema directly on mobile with pre-filled inquiry details:
                  </p>

                  <div className="space-y-2">
                    {/* Primary WhatsApp */}
                    <a
                      href={`https://wa.me/91${personalInfo.primaryPhone}?text=${encodeURIComponent(buildNotificationText(submittedData))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between py-2 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs font-mono transition-all shadow-md shadow-[#25D366]/20"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 fill-black" />
                        <span>WhatsApp (9391621778 - Primary)</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Secondary WhatsApp */}
                    <a
                      href={`https://wa.me/91${personalInfo.secondaryPhone}?text=${encodeURIComponent(buildNotificationText(submittedData))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-mono border border-white/10 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>WhatsApp (7013431104 - Secondary)</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <a
                    href={`sms:+91${personalInfo.primaryPhone}?body=${encodeURIComponent(buildNotificationText(submittedData))}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Send SMS</span>
                  </a>
                  <a
                    href={`tel:${personalInfo.primaryPhone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-emerald-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 9391621778</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Submitted Information Summary Card */}
            <div className="max-w-4xl mx-auto rounded-2xl bg-[#0f0e17] border border-white/10 p-5 mb-8">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  Recorded Inquiry Details
                </span>
                <span className="text-[11px] font-mono text-gray-500">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block font-mono text-[10px] uppercase">Candidate / Sender</span>
                  <span className="text-white font-medium mt-0.5 block">{submittedData.firstName} {submittedData.lastName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-mono text-[10px] uppercase">Contact Email</span>
                  <span className="text-white font-medium mt-0.5 block truncate">{submittedData.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-mono text-[10px] uppercase">Contact Phone</span>
                  <span className="text-white font-medium mt-0.5 block">{submittedData.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-mono text-[10px] uppercase">Inquired Role</span>
                  <span className="text-[#ff007a] font-medium mt-0.5 block truncate">{submittedData.service}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs">
                <span className="text-gray-500 block font-mono text-[10px] uppercase mb-1">Message Content</span>
                <p className="text-gray-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5 font-sans">
                  {submittedData.message}
                </p>
              </div>
            </div>

            {/* Action to reset / send another */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-xl bg-[#1e1c2d] hover:bg-[#28253d] text-white border border-white/15 text-sm font-medium transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Send Another Note</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
            {/* Row 1: First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label
                  htmlFor="contact-firstName"
                  className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
                >
                  First Name <span className="text-[#ff007a]">*</span>
                </label>
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type="text"
                  id="contact-firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Priya"
                  className={`w-full bg-transparent border-b ${
                    errors.firstName
                      ? 'border-rose-500 text-rose-300'
                      : 'border-white/20 focus:border-[#ff007a]'
                  } py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors text-base`}
                />
                {errors.firstName && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.firstName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-lastName"
                  className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
                >
                  Last Name <span className="text-[#ff007a]">*</span>
                </label>
                <input
                  type="text"
                  id="contact-lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Sharma"
                  className={`w-full bg-transparent border-b ${
                    errors.lastName
                      ? 'border-rose-500 text-rose-300'
                      : 'border-white/20 focus:border-[#ff007a]'
                  } py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors text-base`}
                />
                {errors.lastName && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.lastName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
                >
                  Email Address / Recruiter Work Email <span className="text-[#ff007a]">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="recruiter@company.com"
                  className={`w-full bg-transparent border-b ${
                    errors.email
                      ? 'border-rose-500 text-rose-300'
                      : 'border-white/20 focus:border-[#ff007a]'
                  } py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors text-base`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
                >
                  Phone / WhatsApp <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 00000"
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#ff007a] py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors text-base"
                />
              </div>
            </div>

            {/* Row 3: Target Role / Opportunity Type */}
            <div>
              <label
                htmlFor="contact-service"
                className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
              >
                Inquired Role / Opportunity Type
              </label>
              <select
                id="contact-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-[#1b1928] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff007a] text-sm"
              >
                <option value="Entry-Level / Junior Software Engineer">Full-Time Entry-Level / Junior Software Engineer</option>
                <option value="Java Full-Stack Developer">Java Full-Stack Developer (Spring Boot / REST APIs / SQL)</option>
                <option value="Python Full-Stack Developer">Python Full-Stack Developer (Web Apps & APIs)</option>
                <option value="Graduate Engineer Trainee (GET)">Graduate Engineer Trainee (GET)</option>
                <option value="Software Developer Internship">Software Developer Internship / Apprentice</option>
                <option value="Recruiter Technical Discussion">Recruiter / Technical Interview Outreach</option>
              </select>
            </div>

            {/* Row 4: Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
              >
                Message / Job Opening Details <span className="text-[#ff007a]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your company name, role requirements, tech stack, job location, or interview process..."
                className={`w-full bg-transparent border-b ${
                  errors.message
                    ? 'border-rose-500 text-rose-300'
                    : 'border-white/20 focus:border-[#ff007a]'
                } py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors text-base resize-none`}
              />
              {errors.message && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Notification Route Assurance Banner */}
            <div className="p-4 rounded-2xl bg-[#0e0d16] border border-white/10 text-xs text-gray-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="font-mono text-gray-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5 font-semibold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff007a]" />
                  <span>Real-Time Dispatch Destinations</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active Endpoints</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono mb-3">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#ff007a] shrink-0" />
                  <span className="truncate text-gray-200">
                    <strong className="text-white font-medium">Email:</strong> {personalInfo.email}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate text-gray-200">
                    <strong className="text-white font-medium">Mobile:</strong> 9391621778 / 7013431104
                  </span>
                </div>
              </div>

              {/* WhatsApp Toggle */}
              <label className="flex items-center gap-2.5 cursor-pointer pt-2 border-t border-white/[0.06] select-none text-gray-300 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={notifyViaWhatsApp}
                  onChange={(e) => setNotifyViaWhatsApp(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#181625] border-white/20 text-[#25D366] accent-[#25D366] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Also trigger instant pre-filled WhatsApp alert to Sheema (9391621778) upon submission</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                id="btn-submit-contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#ff007a] hover:bg-[#e0006c] active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-[#ff007a]/25 hover:shadow-[#ff007a]/40 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Dispatching to Sheema's Email & Phone...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message / Inquire</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Immediate Joining (0 Days Notice)</span>
              </div>
            </div>

          </form>
        )}

      </div>

      {/* Fresher "Hire Me" Candidate Highlights & Quick Info Grid Down Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Job Readiness & Notice */}
        <div className="p-6 rounded-2xl bg-[#14131e]/80 border border-white/[0.08] hover:border-emerald-500/40 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 font-semibold">
            <Clock className="w-4 h-4" />
            <span>Job Readiness</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-gray-400">Notice Period:</span>
              <span className="text-emerald-400 font-semibold font-mono">Immediate (0 Days)</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-gray-400">Work Mode:</span>
              <span className="text-white font-medium">On-Site / Hybrid / Remote</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-gray-400">Location Preference:</span>
              <span className="text-white font-medium">Open to Relocation</span>
            </div>
          </div>
        </div>

        {/* Card 2: Target Roles & Education */}
        <div className="p-6 rounded-2xl bg-[#14131e]/80 border border-white/[0.08] hover:border-[#ff007a]/40 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff007a] mb-3 font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Target Roles</span>
          </div>
          <div className="space-y-1.5 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007a]" />
              <span>Associate Software Engineer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007a]" />
              <span>Junior Java Full-Stack Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007a]" />
              <span>Python Full-Stack Developer / GET</span>
            </div>
          </div>
        </div>

        {/* Card 3: Direct Connect & Profiles */}
        <div className="p-6 rounded-2xl bg-[#14131e]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold">
            <Mail className="w-4 h-4" />
            <span>Direct Contact & Profiles</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-gray-400 block text-[11px] font-mono">Email:</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-white hover:text-[#ff007a] transition-colors font-mono"
              >
                {personalInfo.email}
              </a>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px] font-mono">Phone:</span>
              <div className="text-white font-mono font-medium">
                <a href="tel:9391621778" className="hover:text-emerald-400 transition-colors">9391621778</a>
                <span className="text-gray-500 mx-1">/</span>
                <a href="tel:7013431104" className="hover:text-emerald-400 transition-colors">7013431104</a>
              </div>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px] font-mono">Location:</span>
              <span className="text-gray-200 font-mono font-medium">{personalInfo.location}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px] font-mono">Profiles:</span>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0a66c2] hover:underline font-mono text-xs"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white hover:text-gray-300 hover:underline font-mono text-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
