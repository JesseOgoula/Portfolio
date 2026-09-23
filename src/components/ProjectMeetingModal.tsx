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
    preferredTime: '10:00',
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
    { id: '09:00', label: '09h00 – 09h30' },
    { id: '09:30', label: '09h30 – 10h00' },
    { id: '10:00', label: '10h00 – 10h30' },
    { id: '10:30', label: '10h30 – 11h00' },
    { id: '11:00', label: '11h00 – 11h30' },
    { id: '11:30', label: '11h30 – 12h00' },
    { id: '14:00', label: '14h00 – 14h30' },
    { id: '14:30', label: '14h30 – 15h00' },
    { id: '15:00', label: '15h00 – 15h30' },
    { id: '15:30', label: '15h30 – 16h00' },
    { id: '16:00', label: '16h00 – 16h30' },
    { id: '16:30', label: '16h30 – 17h00' },
    { id: '17:00', label: '17h00 – 17h30' },
    { id: '17:30', label: '17h30 – 18h00' },
  ] : [
    { id: '09:00', label: '09:00 AM – 09:30 AM' },
    { id: '09:30', label: '09:30 AM – 10:00 AM' },
    { id: '10:00', label: '10:00 AM – 10:30 AM' },
    { id: '10:30', label: '10:30 AM – 11:00 AM' },
    { id: '11:00', label: '11:00 AM – 11:30 AM' },
    { id: '11:30', label: '11:30 AM – 12:00 PM' },
    { id: '14:00', label: '02:00 PM – 02:30 PM' },
    { id: '14:30', label: '02:30 PM – 03:00 PM' },
    { id: '15:00', label: '03:00 PM – 03:30 PM' },
    { id: '15:30', label: '03:30 PM – 04:00 PM' },
    { id: '16:00', label: '04:00 PM – 04:30 PM' },
    { id: '16:30', label: '04:30 PM – 05:00 PM' },
    { id: '17:00', label: '05:00 PM – 05:30 PM' },
    { id: '17:30', label: '05:30 PM – 06:00 PM' },
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

  // Formatage de la date sélectionnée pour l'affichage
  const getFormattedDisplayDate = () => {
    if (!formData.preferredDate) {
      return language === 'fr' ? 'Date à convenir (flexible)' : 'Date to be confirmed (flexible)';
    }
    try {
      const parts = formData.preferredDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
      return formData.preferredDate;
    } catch {
      return formData.preferredDate;
    }
  };

  // Génération du lien direct d'ajout à Google Calendar — pensé pour le client / prospect
  const getGoogleCalendarUrl = () => {
    const eventTitle = encodeURIComponent(
      language === 'fr'
        ? `Session Stratégique (30 min) : Jesse Ogoula × ${formData.name || 'Projet'}`
        : `Strategic Briefing (30 min): Jesse Ogoula × ${formData.name || 'Project'}`
    );

    let dateStr = formData.preferredDate;
    if (!dateStr) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateStr = tomorrow.toISOString().split('T')[0];
    }

    // Heure précise sélectionnée (ex: "14:30" ou "10:00")
    const timeParts = (formData.preferredTime || '10:00').split(':');
    const startH = timeParts.length >= 2 ? parseInt(timeParts[0], 10) : 10;
    const startM = timeParts.length >= 2 ? parseInt(timeParts[1], 10) : 0;

    // Calcul de l'heure de fin : exactement 30 minutes après
    const startTotalMinutes = startH * 60 + startM;
    const endTotalMinutes = startTotalMinutes + 30;
    const endH = Math.floor(endTotalMinutes / 60);
    const endM = endTotalMinutes % 60;

    const cleanDate = dateStr.replace(/-/g, '');
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dates = `${cleanDate}T${pad(startH)}${pad(startM)}00/${cleanDate}T${pad(endH)}${pad(endM)}00`;

    const details = encodeURIComponent(
      language === 'fr'
        ? `Rendez-vous de cadrage stratégique (30 min) avec Jesse Ogoula.\n\n` +
          `// OBJECTIF DE LA SESSION (30 MIN) :\n` +
          `Faire le point sur vos enjeux, diagnostiquer vos goulots d'étranglement opérationnels et identifier les opportunités concrètes pour votre projet (${selectedTypeLabel}).\n\n` +
          `// HORAIRE CONVENU :\n` +
          `${getFormattedDisplayDate()} de ${pad(startH)}h${pad(startM)} à ${pad(endH)}h${pad(endM)} (Heure du Gabon / WAT - UTC+1)\n\n` +
          `// DÉTAIL DU PROJET TRANSMIS :\n` +
          `"${formData.description}"\n\n` +
          `// FORMAT & CANAL :\n` +
          `${selectedChannelLabel}${formData.channel === 'google-meet' ? ' (Visioconférence Google Meet)' : ''}\n\n` +
          `// VOTRE INTERVENANT :\n` +
          `Jesse Ogoula — AI & Digital Transformation Lead\n` +
          `• Email : adirignoogoula@gmail.com\n` +
          `• Téléphone / WhatsApp : +241 077 61 75 69 / +241 066 19 57 86\n` +
          `• Portfolio : https://www.ogoulajesse.pro\n\n` +
          `// VOS COORDONNÉES ENREGISTRÉES :\n` +
          `• Nom : ${formData.name}\n` +
          (formData.company ? `• Entreprise : ${formData.company}\n` : '') +
          (formData.email ? `• Email : ${formData.email}\n` : '') +
          (formData.phone ? `• Téléphone / WhatsApp : ${formData.phone}\n` : '') +
          `\nNOTE : Merci de vous connecter 2 minutes avant l'heure convenue pour démarrer à l'heure.`
        : `30-minute Strategic Discovery Session with Jesse Ogoula.\n\n` +
          `// SESSION OBJECTIVE (30 MIN):\n` +
          `Assess your opportunities, identify operational bottlenecks, and outline actionable next steps for your project (${selectedTypeLabel}).\n\n` +
          `// SCHEDULED TIME:\n` +
          `${getFormattedDisplayDate()} from ${pad(startH)}:${pad(startM)} to ${pad(endH)}:${pad(endM)} (WAT / UTC+1)\n\n` +
          `// YOUR PROJECT BRIEF:\n` +
          `"${formData.description}"\n\n` +
          `// MEETING FORMAT:\n` +
          `${selectedChannelLabel}${formData.channel === 'google-meet' ? ' (Google Meet Video Call)' : ''}\n\n` +
          `// HOST:\n` +
          `Jesse Ogoula — AI & Digital Transformation Lead\n` +
          `• Email: adirignoogoula@gmail.com\n` +
          `• Phone / WhatsApp: +241 077 61 75 69 / +241 066 19 57 86\n` +
          `• Website: https://www.ogoulajesse.pro\n\n` +
          `// YOUR CONTACT DETAILS:\n` +
          `• Name: ${formData.name}\n` +
          (formData.company ? `• Company: ${formData.company}\n` : '') +
          (formData.email ? `• Email: ${formData.email}\n` : '') +
          (formData.phone ? `• Phone / WhatsApp: ${formData.phone}\n` : '') +
          `\nNOTE: Please connect 2 minutes before the scheduled time to optimize the session.`
    );

    const location = encodeURIComponent(
      formData.channel === 'google-meet'
        ? 'Google Meet (Visioconférence)'
        : formData.channel === 'whatsapp'
          ? `WhatsApp : +241 077 61 75 69`
          : `Téléphone : +241 077 61 75 69`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${dates}&details=${details}&location=${location}&add=adirignoogoula@gmail.com`;
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
          /* Redesigned Confirmation View — Client Centric with Google Calendar Reminder */
          <div className="py-2 sm:py-4 space-y-6 text-center">
            {/* Success Pill — Sober White Monochromatic */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/20 text-[#F4F4F4] font-mono text-[10px] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>{language === 'fr' ? '// DEMANDE ENREGISTRÉE AVEC SUCCÈS' : '// REQUEST CONFIRMED'}</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                {language === 'fr' ? 'MERCI POUR VOTRE DEMANDE !' : 'THANK YOU FOR REACHING OUT!'}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A5A5A5] max-w-lg mx-auto leading-relaxed">
                {language === 'fr'
                  ? `Votre projet a bien été transmis à Jesse Ogoula. Ajoutez dès maintenant ce créneau de 30 minutes à votre calendrier pour activer votre rappel automatique avant la réunion :`
                  : `Your project briefing has been sent to Jesse Ogoula. Add this 30-minute session to your calendar now to activate your automatic reminder:`}
              </p>
            </div>

            {/* Meeting Briefing Card */}
            <div className="bg-[#121218] border border-white/10 rounded-xl p-5 sm:p-6 text-left max-w-lg mx-auto shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 hairline-b">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#888]">
                  {language === 'fr' ? '// FICHE DE RENDEZ-VOUS' : '// SESSION BRIEFING'}
                </span>
                <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-white/10 text-white border border-white/10 tracking-wider">
                  30 MIN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#666] block mb-1">
                    {language === 'fr' ? 'Intervenant' : 'Host'}
                  </span>
                  <div className="font-semibold text-white">Jesse Ogoula</div>
                  <div className="text-[11px] text-[#888]">AI & Digital Transformation Lead</div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#666] block mb-1">
                    {language === 'fr' ? 'Format & Canal' : 'Meeting Format'}
                  </span>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    {formData.channel === 'google-meet' && <Video className="w-3.5 h-3.5 text-[#4285F4]" />}
                    {formData.channel === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />}
                    {formData.channel === 'phone' && <Phone className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{selectedChannelLabel}</span>
                  </div>
                  <div className="text-[11px] text-[#888]">
                    {formData.channel === 'google-meet'
                      ? (language === 'fr' ? 'Lien visio inclus dans le calendrier' : 'Video call link in invite')
                      : (language === 'fr' ? 'Échange direct' : 'Direct Call')}
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2 hairline-t">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#666] block mb-1">
                    {language === 'fr' ? 'Date & Heure précises' : 'Scheduled Date & Exact Time'}
                  </span>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#B5B5B5]" />
                    <span>{getFormattedDisplayDate()} — {selectedTimeLabel}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2 hairline-t">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#666] block mb-1">
                    {language === 'fr' ? 'Thématique' : 'Topic'}
                  </span>
                  <div className="text-[#ccc] leading-snug">
                    {selectedTypeLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Single Prominent Button: Google Calendar */}
            <div className="pt-2 max-w-lg mx-auto space-y-3">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#F4F4F4] hover:bg-[#FFFFFF] text-[#050505] font-mono text-xs font-black uppercase tracking-[0.15em] rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 text-[#050505]" />
                <span>{language === 'fr' ? 'AJOUTER À MON GOOGLE CALENDAR' : 'ADD TO MY GOOGLE CALENDAR'}</span>
              </a>

              <p className="font-mono text-[10px] text-[#777] max-w-md mx-auto leading-relaxed">
                {language === 'fr'
                  ? 'Enregistre la session dans votre calendrier avec le sujet, l’horaire précis et le rappel automatique.'
                  : 'Saves the session into your calendar with full briefing notes and automatic reminder.'}
              </p>
            </div>

            {/* Dismiss Link */}
            <div className="pt-4 hairline-t text-center">
              <button
                onClick={onClose}
                className="font-mono text-xs text-[#888] hover:text-white underline underline-offset-4 uppercase tracking-widest transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Fermer cette fenêtre' : 'Close this window'}
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
                    {language === 'fr' ? 'Date souhaitée *' : 'Preferred Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#131318] border border-white/10 focus:border-[#a45252] text-white font-mono text-xs px-2.5 py-2 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-wider uppercase text-[#B5B5B5] mb-1">
                    {language === 'fr' ? 'Heure précise (30 min) *' : 'Exact Time (30 min) *'}
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
