import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Calendar as CalendarIcon, Video, Phone, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface ProjectMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectMeetingModal: React.FC<ProjectMeetingModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'ai-automation',
    description: '',
    preferredDate: '',
    preferredTime: 'morning',
    channel: 'google-meet',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Isolate scroll: stop Lenis virtual scroll and lock background body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
      setIsSubmitted(false);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const projectTypes = language === 'fr' ? [
    { id: 'ai-automation', label: 'IA & Automatisation (LLMs, Workflows)' },
    { id: 'product', label: 'Product Management & Agilité' },
    { id: 'marketing', label: 'Marketing Digital & Croissance' },
    { id: 'training', label: 'Formation & Pédagogie Active' },
    { id: 'consulting', label: 'Audit & Conseil Stratégique' },
  ] : [
    { id: 'ai-automation', label: 'AI & Workflow Automation (LLMs, APIs)' },
    { id: 'product', label: 'Product Management & Agile' },
    { id: 'marketing', label: 'Growth Marketing & Acquisition' },
    { id: 'training', label: 'Team Upskilling & Active Pedagogy' },
    { id: 'consulting', label: 'Strategic Audit & Advisory' },
  ];

  const timeSlots = language === 'fr' ? [
    { id: 'morning', label: 'Matinée (09h – 12h)' },
    { id: 'afternoon', label: 'Après-midi (14h – 17h)' },
    { id: 'evening', label: 'Fin de journée (17h – 19h)' },
  ] : [
    { id: 'morning', label: 'Morning (09:00 – 12:00)' },
    { id: 'afternoon', label: 'Afternoon (14:00 – 17:00)' },
    { id: 'evening', label: 'Late Day (17:00 – 19:00)' },
  ];

  const channels = [
    { id: 'google-meet', label: 'Google Meet', icon: Video },
    { id: 'whatsapp', label: 'WhatsApp (Visio / Appel)', icon: MessageSquare },
    { id: 'phone', label: language === 'fr' ? 'Téléphone direct' : 'Direct Phone', icon: Phone },
  ];

  const selectedTypeLabel = projectTypes.find(t => t.id === formData.projectType)?.label || formData.projectType;
  const selectedTimeLabel = timeSlots.find(t => t.id === formData.preferredTime)?.label || formData.preferredTime;
  const selectedChannelLabel = channels.find(c => c.id === formData.channel)?.label || formData.channel;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = language === 'fr' ? 'Votre nom est requis' : 'Name is required';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contact = language === 'fr' 
        ? 'Indiquez au moins un email ou un numéro WhatsApp'
        : 'Please provide at least an email or WhatsApp number';
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'fr' ? 'Email invalide' : 'Invalid email format';
    }
    if (!formData.description.trim()) {
      newErrors.description = language === 'fr' 
        ? 'Veuillez décrire brièvement votre projet'
        : 'Please briefly describe your project';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Génération du lien direct d'ajout à Google Calendar
  const getGoogleCalendarUrl = () => {
    const eventTitle = encodeURIComponent(
      language === 'fr'
        ? `Échange Projet : ${formData.name || 'Client'}${formData.company ? ` (${formData.company})` : ''} — ${selectedTypeLabel}`
        : `Project Meeting: ${formData.name || 'Client'}${formData.company ? ` (${formData.company})` : ''} — ${selectedTypeLabel}`
    );

    let dateStr = formData.preferredDate;
    if (!dateStr) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateStr = tomorrow.toISOString().split('T')[0];
    }

    let startH = 10;
    let endH = 10;
    let startM = 0;
    let endM = 30;

    if (formData.preferredTime === 'afternoon') {
      startH = 15;
      endH = 15;
      startM = 0;
      endM = 30;
    } else if (formData.preferredTime === 'evening') {
      startH = 17;
      endH = 17;
      startM = 30;
      endM = 60;
    }

    const cleanDate = dateStr.replace(/-/g, '');
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const finalEndH = endM === 60 ? startH + 1 : endH;
    const finalEndM = endM === 60 ? 0 : endM;
    const dates = `${cleanDate}T${pad(startH)}${pad(startM)}00/${cleanDate}T${pad(finalEndH)}${pad(finalEndM)}00`;

    const details = encodeURIComponent(
      `PROJET : ${selectedTypeLabel}\n` +
      `CLIENT : ${formData.name}\n` +
      (formData.company ? `SOCIÉTÉ : ${formData.company}\n` : '') +
      `EMAIL : ${formData.email}\n` +
      `TÉLÉPHONE / WHATSAPP : ${formData.phone}\n` +
      `CANAL SOUHAITÉ : ${selectedChannelLabel}\n\n` +
      `DESCRIPTION DU PROJET :\n${formData.description}\n\n` +
      (formData.channel === 'google-meet' ? 'NOTE: Visioconférence Google Meet demandée.\n' : '')
    );

    const location = encodeURIComponent(
      formData.channel === 'google-meet'
        ? 'Google Meet'
        : formData.channel === 'whatsapp'
          ? `WhatsApp : ${formData.phone}`
          : `Téléphone : ${formData.phone}`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${dates}&details=${details}&location=${location}${formData.email ? `&add=${encodeURIComponent(formData.email)}` : ''}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const gcalLink = getGoogleCalendarUrl();

    const payload = {
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      company: formData.company,
      project_type: formData.projectType,
      project_type_label: selectedTypeLabel,
      project_description: formData.description,
      preferred_date: formData.preferredDate || null,
      preferred_time: formData.preferredTime,
      preferred_time_label: selectedTimeLabel,
      preferred_channel: formData.channel,
      preferred_channel_label: selectedChannelLabel,
      is_google_meet: formData.channel === 'google-meet',
      google_calendar_url: gcalLink,
      language: language,
      created_at: new Date().toISOString(),
    };

    // 1. Envoi direct par email via FormSubmit (service simple, 0 serveur, réception directe sur Gmail)
    try {
      await fetch('https://formsubmit.co/ajax/adirignoogoula@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Portfolio Jesse Ogoula] Nouveau projet : ${formData.name} (${selectedTypeLabel})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.email || undefined,
          Nom: formData.name,
          Entreprise: formData.company || 'Non renseignée',
          Email: formData.email || 'Non renseigné',
          Telephone_WhatsApp: formData.phone || 'Non renseigné',
          Type_de_projet: selectedTypeLabel,
          Format_dechange: selectedChannelLabel + (formData.channel === 'google-meet' ? ' (Visioconférence Google Meet demandée)' : ''),
          Date_souhaitee: formData.preferredDate || 'À convenir',
          Creneau: selectedTimeLabel,
          Description_du_projet: formData.description,
          Lien_Google_Calendar_Direct: gcalLink,
        }),
      });
    } catch (err) {
      console.warn('FormSubmit notification error:', err);
    }

    // 2. Envoyer au Webhook optionnel si configuré dans .env.local
    const webhookUrl = (import.meta as any).env?.VITE_MEETING_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Webhook notification error:', err);
      }
    }

    // 3. Tenter d'enregistrer dans Supabase si configuré
    try {
      await supabase.from('project_appointments').insert([payload]);
    } catch {
      // Ignorer si la table n'est pas encore créée
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // WhatsApp formatted message link
  const whatsappText = encodeURIComponent(
    `Bonjour Jesse, je souhaite échanger sur mon projet :\n\n` +
    `• Nom : ${formData.name}\n` +
    (formData.company ? `• Entreprise : ${formData.company}\n` : '') +
    `• Contact : ${formData.phone || formData.email}\n` +
    `• Type de projet : ${selectedTypeLabel}\n` +
    (formData.preferredDate ? `• Date souhaitée : ${formData.preferredDate} (${selectedTimeLabel})\n` : '') +
    `• Canal : ${selectedChannelLabel}\n` +
    `• Objet : ${formData.description}`
  );
  const whatsappUrl = `https://wa.me/241077617569?text=${whatsappText}`;

  // Email formatted link
  const emailSubject = encodeURIComponent(`Demande de rendez-vous projet — ${formData.name}`);
  const emailBody = encodeURIComponent(
    `Bonjour Jesse,\n\nJe souhaite organiser un rendez-vous de cadrage pour mon projet :\n\n` +
    `Nom : ${formData.name}\n` +
    `Société : ${formData.company || 'N/A'}\n` +
    `Téléphone : ${formData.phone || 'N/A'}\n` +
    `Email : ${formData.email || 'N/A'}\n` +
    `Type de projet : ${selectedTypeLabel}\n` +
    `Date / Créneau souhaité : ${formData.preferredDate || 'À définir'} (${selectedTimeLabel})\n` +
    `Canal : ${selectedChannelLabel}\n\n` +
    `Description du projet :\n${formData.description}\n\nCordialement,`
  );
  const mailtoUrl = `mailto:adirignoogoula@gmail.com,contact@ogoulajesse.pro?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent="true"
        className="bg-[#0B0B0F] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-[#F4F4F4] my-auto max-h-[90vh] overflow-y-auto overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors border border-white/5"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* Confirmation View */
          <div className="text-center py-6 sm:py-8 space-y-6">
            <div className="w-16 h-16 bg-[#a45252]/15 border border-[#a45252]/30 text-[#e07a7a] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#a45252] uppercase block">
                {language === 'fr' ? '// DEMANDE BIEN REÇUE' : '// REQUEST RECEIVED'}
              </span>
              <h3 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                {language === 'fr' ? 'MERCI POUR VOTRE DEMANDE !' : 'THANK YOU!'}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#B5B5B5] max-w-md mx-auto leading-relaxed">
                {language === 'fr'
                  ? `Votre projet a bien été enregistré. Vous pouvez l'ajouter directement à votre calendrier et me notifier instantanément :`
                  : `Your project briefing has been recorded. You can add it directly to your calendar and notify me instantly:`}
              </p>
            </div>

            {/* Quick Actions Post-Submit (Calendar + WhatsApp + Email) */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#4285F4] hover:bg-[#3367D6] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-blue-500/10"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>{language === 'fr' ? 'Ajouter à mon Google Calendar' : 'Add to Google Calendar'}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'fr' ? 'Notifier sur WhatsApp' : 'Notify on WhatsApp'}</span>
              </a>

              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-white/15 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'fr' ? 'Envoyer par Email' : 'Send via Email'}</span>
              </a>
            </div>

            <div className="pt-4 hairline-t text-center">
              <button
                onClick={onClose}
                className="font-mono text-xs text-[#888] hover:text-white underline underline-offset-4 uppercase tracking-widest transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Fermer cette fenêtre' : 'Close window'}
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <div>
            {/* Header */}
            <div className="mb-6 sm:mb-8 pr-8">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#a45252] uppercase mb-2">
                <span className="w-1.5 h-1.5 bg-[#a45252]" />
                <span>{language === 'fr' ? '// 01 — PLANIFIER UN ÉCHANGE // 30 MIN' : '// 01 — SCHEDULE A MEETING // 30 MIN'}</span>
              </div>
              <h2 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                {language === 'fr' ? 'ÉCHANGEONS SUR VOTRE PROJET' : "LET'S DISCUSS YOUR PROJECT"}
              </h2>
              <p className="font-sans text-xs text-[#999] mt-2 leading-relaxed">
                {language === 'fr'
                  ? 'Une session de 30 minutes sans engagement pour diagnostiquer vos opportunités, clarifier vos objectifs et poser les bases de la collaboration.'
                  : 'A 30-minute discovery call to evaluate your opportunities, clarify objectives, and outline our collaboration roadmap.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5] mb-1.5">
                    {language === 'fr' ? 'Votre Nom & Prénom *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'fr' ? 'ex: Marc Dupont' : 'e.g. John Doe'}
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white placeholder-[#555] font-mono text-xs px-3.5 py-2.5 rounded-lg outline-none transition-colors"
                  />
                  {errors.name && <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.name}</span>}
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5] mb-1.5">
                    {language === 'fr' ? 'Entreprise / Organisation' : 'Company / Organization'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={language === 'fr' ? 'ex: Société, PME, Startup' : 'e.g. Acme Corp'}
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white placeholder-[#555] font-mono text-xs px-3.5 py-2.5 rounded-lg outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5] mb-1.5">
                    {language === 'fr' ? 'Email Professionnel *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@entreprise.com"
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white placeholder-[#555] font-mono text-xs px-3.5 py-2.5 rounded-lg outline-none transition-colors"
                  />
                  {errors.email && <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.email}</span>}
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5] mb-1.5">
                    {language === 'fr' ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+241 077 ... / +33 6 ..."
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white placeholder-[#555] font-mono text-xs px-3.5 py-2.5 rounded-lg outline-none transition-colors"
                  />
                  {errors.contact && <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.contact}</span>}
                </div>
              </div>

              {/* Row 3: Project Type */}
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5] mb-2">
                  {language === 'fr' ? 'Type d’intervention souhaité *' : 'Area of Engagement *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {projectTypes.map((pt) => {
                    const active = formData.projectType === pt.id;
                    return (
                      <button
                        type="button"
                        key={pt.id}
                        onClick={() => setFormData({ ...formData, projectType: pt.id })}
                        className={`text-left font-mono text-[11px] p-2.5 rounded-lg border transition-all ${
                          active
                            ? 'bg-[#a45252]/20 border-[#a45252] text-white font-bold'
                            : 'bg-[#131318] border-white/10 text-[#999] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {pt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5] mb-1.5">
                  {language === 'fr' ? 'Parlez-moi de votre projet & objectifs *' : 'Tell me about your project & goals *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={
                    language === 'fr'
                      ? 'Contexte, objectifs principaux, délais envisagés ou questions spécifiques...'
                      : 'Context, main objectives, timeline, or key questions to address...'
                  }
                  className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white placeholder-[#555] font-mono text-xs p-3 rounded-lg outline-none resize-none transition-colors"
                />
                {errors.description && (
                  <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.description}</span>
                )}
              </div>

              {/* Row 5: Date, Time & Preferred Channel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block font-mono text-[9px] tracking-wider uppercase text-[#B5B5B5] mb-1">
                    {language === 'fr' ? 'Date souhaitée' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white font-mono text-xs px-2.5 py-2 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-wider uppercase text-[#B5B5B5] mb-1">
                    {language === 'fr' ? 'Créneau' : 'Time Window'}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white font-mono text-xs px-2.5 py-2.5 rounded-lg outline-none"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts.id} value={ts.id} className="bg-[#131318] text-white">
                        {ts.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-wider uppercase text-[#B5B5B5] mb-1">
                    {language === 'fr' ? 'Format d’échange' : 'Preferred Channel'}
                  </label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white font-mono text-xs px-2.5 py-2.5 rounded-lg outline-none"
                  >
                    {channels.map((ch) => (
                      <option key={ch.id} value={ch.id} className="bg-[#131318] text-white">
                        {ch.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 hairline-t">
                <span className="font-mono text-[9px] text-[#666] uppercase">
                  {language === 'fr' ? 'Réponse sous 24h ouvrées garantie' : 'Guaranteed response within 24 business hours'}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#F4F4F4] text-[#050505] hover:bg-[#E0E0E0] font-mono text-xs font-bold tracking-[0.15em] uppercase rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span>
                    {isSubmitting
                      ? (language === 'fr' ? 'ENVOI EN COURS...' : 'SUBMITTING...')
                      : (language === 'fr' ? 'CONFIRMER LA DEMANDE' : 'CONFIRM REQUEST')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectMeetingModal;
