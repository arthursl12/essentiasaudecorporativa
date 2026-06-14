import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Calendar,
  Building,
  Users,
  Check,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  TrendingUp,
  Smile,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  FileText,
  MapPin,
  Phone,
  Activity,
  Brain,
  ThumbsUp,
  CheckCircle2,
  Trash2,
  BookmarkCheck,
  ExternalLink,
  X,
  TrendingDown
} from 'lucide-react';

import { ServiceFormat, LeadFormInput, LeadSubmission } from './types';
import {
  HERO_METRICS,
  PAIN_CARDS,
  COMPARATIVE_ITEMS,
  SERVICES_AVULSO,
  SERVICES_PERIODICO,
  PARTNERS_LOGOS,
  TESTIMONIALS,
  STEPS
} from './data';

// Import local photos generated for highest fidelity representation
const HERO_MASSAGE_IMAGE = '/src/assets/images/essentia_hero_massage_1781380271397.jpg';
const LOGISTICS_SETUP_IMAGE = '/src/assets/images/essentia_logistics_setup_1781380286897.jpg';

export default function App() {
  // Toggle for Seção 4 (Services) - Avulso vs Periódico
  const [activeFormat, setActiveFormat] = useState<ServiceFormat>(ServiceFormat.PERIODICO);

  // Carousel status for Testimonials
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  // Form submission handling / Leads management (Demo persistence in localStorage)
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [formInput, setFormInput] = useState<LeadFormInput>({
    name: '',
    company: '',
    role: '',
    numCollaborators: '1-50',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAdminLeads, setShowAdminLeads] = useState(false);

  // Reference for intersection observer to hide float WhatsApp button when footer is visible
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Loading existing leads from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('essentia_leads');
      if (saved) {
        setLeads(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
  }, []);

  // Intersection observer to track footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.name || !formInput.company || !formInput.contact) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newLead: LeadSubmission = {
        ...formInput,
        id: 'lead_' + Date.now(),
        timestamp: new Date().toLocaleString('pt-BR')
      };

      const updatedLeads = [newLead, ...leads];
      setLeads(updatedLeads);
      localStorage.setItem('essentia_leads', JSON.stringify(updatedLeads));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormInput({
        name: '',
        company: '',
        role: '',
        numCollaborators: '1-50',
        contact: ''
      });

      // Show temporary Toast
      setTimeout(() => setSubmitSuccess(false), 9000);
    }, 1200);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem('essentia_leads', JSON.stringify(updated));
  };

  const handleTestimonialNext = () => {
    setCurrentTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handleTestimonialPrev = () => {
    setCurrentTestimonialIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Generate localized WhatsApp URL with custom pre-filled message
  const getWhatsAppUrl = (pilarName?: string) => {
    const phone = '5531991422212'; // Base Contact provided in layout guide (31) 9 9142-2212
    let message = 'Olá, vi a landing page da Essentia Saúde Corporativa e gostaria de solicitar uma proposta personalizada para minha empresa.';
    if (pilarName) {
      message = `Olá! Gostaria de mais informações e um orçamento para o serviço específico de: ${pilarName} corporativo para minha empresa.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-primary selection:text-white" id="main-container">
      
      {/* SECTION 0 - HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-grey-light/50 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Group */}
            <a href="#" className="flex flex-col focus:outline-none" aria-label="Essentia Home">
              <span className="font-display font-extrabold text-2xl tracking-tight text-brand-primary flex items-center gap-1.5">
                ESSENTIA <span className="text-xs bg-brand-sage/15 text-brand-primary px-2 py-0.5 rounded-full font-sans font-semibold">SAÚDE</span>
              </span>
              <span className="text-[10px] tracking-widest text-brand-sage font-sans uppercase font-bold -mt-1">
                CORPORATIVA
              </span>
            </a>

            {/* Desktop CTA - Single WhatsApp Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                id="header-cta-whatsapp"
                className="inline-flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary-dark font-sans font-bold text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm group"
              >
                Solicitar Proposta
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile CTA - Single WhatsApp Button */}
            <div className="lg:hidden">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary-dark font-sans font-bold text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm group"
              >
                Solicitar Proposta
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ADMIN LEADS DRAWER DEMOPLATES (Interactive visual showing captured leads locally) */}
      <AnimatePresence>
        {showAdminLeads && leads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="bg-brand-primary-light text-white px-4 py-8 relative z-40 border-b border-white/20"
            id="leads-dashboard-panel"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-semibold text-xl tracking-tight flex items-center gap-2">
                    <BookmarkCheck className="w-5 h-5 text-brand-green-accent" />
                    Gerenciador de Leads Capturados Localmente (Apenas Visível no Demo)
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5 font-sans">
                    Estes cadastros foram gravados no seu navegador via <code className="bg-brand-primary/40 px-1 py-0.5 rounded text-[10px]">localStorage</code>. Perfeito para fins de avaliação rápida de dados B2B.
                  </p>
                </div>
                <button
                  onClick={() => setShowAdminLeads(false)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full focus:outline-none transition-all"
                  aria-label="Minimizar Painel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2" id="leads-list">
                {leads.map((l) => (
                  <div key={l.id} className="bg-brand-primary-dark/80 p-4 rounded-xl border border-white/10 flex flex-col justify-between" id={`lead-card-${l.id}`}>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs bg-brand-green-accent/20 text-brand-green-accent font-semibold px-2 py-0.5 rounded-md font-mono">
                          {l.numCollaborators} Colaboradores
                        </span>
                        <span className="text-[10px] text-white/50">{l.timestamp}</span>
                      </div>
                      <h4 className="font-sans font-bold text-base mt-2.5">{l.name}</h4>
                      <p className="text-sm text-white/85 mt-1 font-semibold">{l.company} — <span className="font-normal text-white/70 italic text-xs">{l.role}</span></p>
                      <p className="text-xs text-white/60 mt-3 font-mono break-all flex items-center gap-1.5 bg-brand-primary/20 p-2 rounded">
                        <Phone className="w-3.5 h-3.5 text-brand-secondary text-brand-green-accent" /> {l.contact}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
                      <a
                        href={`https://wa.me/${l.contact.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-brand-green-accent text-xs flex items-center gap-1 font-semibold"
                      >
                        Chamar Whats <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => deleteLead(l.id)}
                        className="text-white/40 hover:text-red-400 p-1 rounded transition-colors"
                        title="Deletar este lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        
        {/* SECTION 1 — HERO SECTION (Split-Screen Assimétrico 55/45) */}
        <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:py-24" id="hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* LADO ESQUERDO (55% / 7 cols) */}
              <div className="lg:col-span-7 flex flex-col pr-0 lg:pr-4" id="hero-left-content">
                <div className="inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Saúde Corporativa em BH e região
                </div>
                
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6" id="hero-title">
                  Sua equipe mais saudável,{' '}
                  <span className="text-brand-primary relative inline-block">
                    sua empresa mais produtiva.
                    <span className="absolute left-0 bottom-1 w-full h-[6px] bg-brand-sage/20 rounded"></span>
                  </span>
                </h1>

                <p className="text-slate-600 text-lg sm:text-xl font-sans font-normal leading-relaxed mb-8 max-w-2xl" id="hero-subtext">
                  Levamos programas transversais de <span className="font-semibold text-slate-800">saúde corporativa</span> direto para dentro da sua empresa.<br/>
                  Sem interrupção na operação. Com resultado mensurável nos seus indicadores.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8" id="hero-actions">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    id="hero-whatsapp-btn"
                    className="inline-flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary-dark font-sans font-bold text-base px-8 py-4.5 rounded-xl transition-all shadow-md group border border-transparent"
                  >
                    <MessageSquare className="w-5 h-5 mr-2.5 text-brand-green-accent fill-brand-green-accent" />
                    Solicitar proposta personalizada
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#servicos"
                    id="hero-services-btn"
                    className="inline-flex items-center justify-center bg-white text-slate-800 hover:text-brand-primary hover:bg-slate-50 font-sans font-bold text-base px-8 py-4.5 rounded-xl transition-all border border-slate-200 shadow-sm"
                  >
                    Conhecer nossos serviços ↓
                  </a>
                </div>

                {/* Trust label in BH */}
                <p className="text-xs text-brand-grey-mid flex items-center gap-1.5" id="hero-local-trust">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-green-accent animate-ping"></span>
                  Idealizado para empresas de Belo Horizonte e região metropolitana.
                </p>
              </div>

              {/* LADO DIREITO (45% / 5 cols) */}
              <div className="lg:col-span-5 relative" id="hero-right-content">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative Brand Accent Background Frame */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-brand-primary/10 to-brand-sage/30 rounded-3xl blur-2xl opacity-60"></div>
                  
                  {/* Anchoring Foto Hero Custom Loaded with referrerPolicy */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white bg-slate-100 aspect-[4/3] lg:aspect-[1/1] xl:aspect-[4/3]">
                    <img
                      src={HERO_MASSAGE_IMAGE}
                      alt="Colaboradora sorrindo em Belo Horizonte durante relaxamento em cadeira de quick massage Essentia no escritório"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      id="hero-main-image"
                    />
                    
                    {/* Seamless Brazilian Corporate Context Frame Overlay Text on Mobile */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-5 lg:hidden flex flex-col justify-end">
                      <span className="text-white text-xs font-semibold flex items-center gap-1"><Smile className="w-3.5 h-3.5 text-brand-green-accent" /> Alívio imediato in loco</span>
                    </div>
                  </div>

                  {/* Micro validation tag for security */}
                  <div className="absolute top-4 right-4 bg-brand-primary/95 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono tracking-wider shadow-md backdrop-blur-sm uppercase flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green-accent inline-block"></span>
                    Estrutura Completa
                  </div>
                </div>
              </div>

            </div>

            {/* Strip of 3 micro-metrics (Desktop position: nested. Mobile placement handled gracefully below) */}
            <div className="mt-16 lg:mt-20 border-t border-brand-grey-light/70 pt-8" id="metrics-strip">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {HERO_METRICS.map((metric, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-brand-grey-light/40" id={`hero-metric-${i}`}>
                    <div className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight whitespace-nowrap">
                      {metric.value}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-sm text-slate-900">{metric.label}</span>
                      <span className="text-xs text-brand-grey-mid leading-tight mt-0.5">{metric.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2 — IDENTIFICAÇÃO (DORES DO RH) */}
        <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100" id="dores">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header copy */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-sage uppercase tracking-wider text-xs font-bold block mb-3 font-display">
                Soa familiar?
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4" id="dores-main-title">
                Se você cuida de pessoas na sua empresa, estes desafios provavelmente já tiraram seu sono
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans">
                Gerenciar pessoas exige foco estratégico. Entretanto, problemas cotidianos de ergonomia, saúde mental e conformidade legal sugam toda a energia do setor.
              </p>
            </div>

            {/* Grade 2x2 Pain cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="pain-grid">
              {PAIN_CARDS.map((card, i) => (
                <div
                  key={card.id}
                  id={`pain-card-${card.id}`}
                  className="bg-white p-6 sm:p-8 rounded-2xl border-l-4 border-brand-primary shadow-sm hover:shadow-md hover:border-l-brand-green-accent hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon outline 28px + Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-brand-primary" id={`pain-icon-${card.id}`}>
                        {i === 0 && <Activity className="w-7 h-7" />}
                        {i === 1 && <Brain className="w-7 h-7" />}
                        {i === 2 && <TrendingDown className="w-7 h-7" />}
                        {i === 3 && <Briefcase className="w-7 h-7" />}
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm font-sans leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  {/* Factoid citation box: 13px italic light block */}
                  <div className="bg-brand-sage-light/50 border border-brand-sage/10 rounded-xl p-3 sm:p-4 text-xs font-sans text-brand-slate-dark leading-relaxed">
                    {/* <span className="font-semibold block text-brand-primary text-[10px] uppercase tracking-wider mb-1 font-mono">
                      Evidência Científica / Relatório
                    </span> */}
                    <p className="italic">“{card.statistic}”</p>
                    <span className="text-[10px] text-brand-grey-mid mt-1.5 block font-medium">
                      Fonte: {card.statSource}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Transition line of Section 2 */}
            <div className="mt-16 text-center" id="pain-transition">
              <span className="inline-block text-base font-semibold text-slate-800 bg-brand-primary/5 px-6 py-3 rounded-full border border-brand-primary/10">
                Esses problemas têm solução. E ela cabe perfeitamente no orçamento da sua empresa.
              </span>
              <div className="mt-4">
                <a
                  href="#servicos"
                  className="text-brand-primary hover:text-brand-primary-dark font-sans font-bold text-sm inline-flex items-center gap-1 group"
                >
                  Conhecer nossa solução integrada 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3 — LOGÍSTICA ZERO (Checklist Comparativo Problema x Solução) */}
        <section className="py-16 lg:py-24 bg-white" id="logistica">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header info */}
            <div className="max-w-3xl mb-12 lg:mb-16">
              <span className="text-brand-sage uppercase tracking-wider text-xs font-bold block mb-3 font-display">
                O Ecossistema Essentia
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-5" id="logistica-header">
                Nós levamos tudo até você. Sua equipe e seu RH em paz.
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-sans leading-relaxed" id="logistica-intro">
                A equipe da <span className="font-semibold text-brand-primary">Essentia Saúde Corporativa</span> chega na sua sede com estrutura física total: cadeiras ergonômicas certificadas por fisioterapeutas, materiais de higienização de ponta e especialistas qualificados. Sem burocracia, sem termos ocultos e sem atrapalhar o andamento operacional.
              </p>
            </div>

            {/* Comparative grid & photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="logistica-comparison">
              
              {/* Comparative checklists (Column spanning 8) */}
              <div className="lg:col-span-8 flex flex-col gap-6" id="comparison-lists">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  
                  {/* Traditional side: Red, crossed, low opacity */}
                  <div className="bg-slate-50/70 border border-slate-200/60 p-6 sm:p-8 rounded-2xl flex flex-col transition-all" id="traditional-trouble-side">
                    <span className="text-[11px] font-mono font-bold text-red-500 uppercase tracking-widest bg-red-50 py-1 px-2.5 rounded-md inline-block self-start mb-4">
                      Sem a Essentia
                    </span>
                    <h3 className="font-display font-black text-base text-slate-700 mb-6">
                      {COMPARATIVE_ITEMS.problemTitle}
                    </h3>

                    <ul className="space-y-4 text-xs sm:text-sm text-slate-400">
                      {COMPARATIVE_ITEMS.troubles.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5 line-through decoration-red-300 opacity-75">
                          <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Essentia side: High focus brand colors, positive checks */}
                  <div className="bg-brand-primary text-white p-6 sm:p-8 rounded-2xl flex flex-col shadow-lg border border-brand-primary-dark/40 relative overflow-hidden" id="essentia-solution-side">
                    {/* Visual pattern ornament */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                    
                    <span className="text-[11px] font-mono font-bold text-brand-green-accent uppercase tracking-widest bg-white/10 py-1 px-2.5 rounded-md inline-block self-start mb-4">
                      COM A ESSENTIA
                    </span>
                    <h3 className="font-display font-black text-base text-white mb-6">
                      {COMPARATIVE_ITEMS.solutionTitle}
                    </h3>

                    <ul className="space-y-4 text-xs sm:text-sm text-white/95">
                      {COMPARATIVE_ITEMS.solutions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5 font-medium">
                          <Check className="w-5 h-5 text-brand-green-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Local Scope tags info */}
                <div className="bg-brand-sage-light border border-brand-sage/20 rounded-2xl p-4 sm:p-6 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary text-white rounded-lg shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-sans font-bold text-slate-900">Atendimento Presencial em Belo Horizonte e região</p>
                      <p className="text-xs text-brand-slate-dark">Atendimento à distância em outras localidads.</p>
                    </div>
                  </div>
                  {/* <span className="text-xs bg-brand-primary/10 text-brand-primary font-bold px-3 py-1.5 rounded-lg border border-brand-primary/10 font-sans whitespace-nowrap">
                    Sem taxas e logística de frete extras
                  </span> */}
                </div>

              </div>

              {/* Photos of Professional installation (Column spanning 4) */}
              <div className="lg:col-span-4 flex flex-col justify-between" id="comparison-photo-side">
                <div className="bg-white border border-slate-200 p-4 rounded-3xl h-full flex flex-col justify-between">
                  <div className="overflow-hidden rounded-2xl relative aspect-[3/4] md:aspect-[16/10] lg:aspect-[3/4] bg-slate-100 flex items-center">
                    <img
                      src={LOGISTICS_SETUP_IMAGE}
                      alt="Terapeuta experiente da Essentia fardado montando uma cadeira ergonômica sem interromper a equipe no escritório"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      id="logistics-image"
                    />
                    
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-sans font-medium p-2 rounded-lg">
                      Logística de montagem silenciosa e focada.
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-sans text-brand-grey-mid leading-relaxed text-center">
                    Nossos profissionais chegam pontualmente, uniformizados, higienizam os pertences e já estão prontos para a ação, agregando facilidade para o setor de RH.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 4 — GRADE DE SERVIÇOS E MODELOS DE CONTRATAÇÃO */}
        <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100" id="servicos">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Direct Título */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-brand-sage uppercase tracking-wider text-xs font-bold block mb-3 font-display">
                Três pilares de saúde corporativa
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4" id="services-main-heading">
                O que a Essentia entrega para a sua empresa
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans">
                Selecione o formato ideal abaixo de acordo com o momento do RH e receba orçamento correspondente em 24h úteis.
              </p>
            </div>

            {/* Toggle format: Smooth visual button */}
            <div className="flex justify-center mb-12" id="format-toggle-control">
              <div className="inline-flex bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300/40">
                <button
                  onClick={() => setActiveFormat(ServiceFormat.PERIODICO)}
                  className={`px-5 py-3 sm:px-6 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all focus:outline-none flex items-center gap-1.5 ${
                    activeFormat === ServiceFormat.PERIODICO
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  id="tab-periodico-btn"
                >
                  <Activity className="w-4 h-4" />
                  PERIÓDICO / RECORRENTE
                  <span className="text-[9px] bg-brand-green-accent text-white px-2 py-0.5 rounded-full font-mono uppercase font-bold animate-pulse text-[8px]">
                    Recomendado
                  </span>
                </button>
                <button
                  onClick={() => setActiveFormat(ServiceFormat.AVULSO)}
                  className={`px-5 py-3 sm:px-6 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all focus:outline-none flex items-center gap-1.5 ${
                    activeFormat === ServiceFormat.AVULSO
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  id="tab-avulso-btn"
                >
                  <Calendar className="w-4 h-4" />
                  AVULSO / EVENTOS / SIPAT
                </button>
              </div>
            </div>

            {/* Services Cards (Changes based on active format tab selected) */}
            <div className="relative" id="services-cards-transition">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFormat}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  id="services-cards-wrapper"
                >
                  {(activeFormat === ServiceFormat.PERIODICO ? SERVICES_PERIODICO : SERVICES_AVULSO).map((serv, index) => {
                    const isQuickMassageRecurring = activeFormat === ServiceFormat.PERIODICO && index === 0;

                    return (
                      <div
                        key={`${activeFormat}-${index}`}
                        id={`service-card-${activeFormat}-${index}`}
                        className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 relative flex flex-col justify-between hover:shadow-lg hover:border-brand-primary/20 transition-all duration-300"
                      >
                        {/* Highlights tag */}
                        {isQuickMassageRecurring && (
                          <span className="absolute top-4 right-4 bg-brand-green-accent text-white text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase" id="badge-popular">
                            Mais contratado
                          </span>
                        )}

                        <div>
                          {/* Pilar Number tag & top border-top variation */}
                          <div className={`h-1.5 w-full rounded-t-lg -mt-8 sm:-mt-8 mb-6 ${
                            index === 0 ? 'bg-brand-primary' : index === 1 ? 'bg-brand-primary-light' : 'bg-brand-sage'
                          }`}></div>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono font-bold text-brand-sage uppercase tracking-wider">
                              {serv.pilar}
                            </span>
                            <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-brand-primary" id={`service-icon-${index}`}>
                              {index === 0 && <Smile className="w-5 h-5 text-brand-primary" />}
                              {index === 1 && <Brain className="w-5 h-5 text-brand-primary-light" />}
                              {index === 2 && <GraduationCap className="w-5 h-5 text-brand-sage" />}
                            </div>
                          </div>

                          <h3 className="font-display font-extrabold text-xl text-slate-900 leading-snug mb-3">
                            {serv.title}
                          </h3>

                          <p className="text-slate-600 text-sm font-sans mb-6 leading-relaxed">
                            {serv.description}
                          </p>

                          {/* Ideal For Bullet Points */}
                          <div className="border-t border-slate-100 pt-4 mb-6">
                            <span className="text-[10px] font-mono font-semibold text-brand-primary uppercase tracking-widest mb-2.5 block">
                              Ideal para:
                            </span>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                              {serv.idealFor.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-slate-600 font-sans">
                                  <Check className="w-3.5 h-3.5 text-brand-green-accent shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Card bottom details */}
                        <div className="border-t border-slate-100 pt-5 mt-auto">
                          <div className="flex justify-between items-center text-xs text-brand-slate-dark mb-4 bg-slate-50 p-2.5 rounded-lg">
                            <span className="font-semibold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Duração aprox.:</span>
                            <span className="font-mono">{serv.duration}</span>
                          </div>
                          
                          {/* Ghost Button action to request service */}
                          <a
                            href={getWhatsAppUrl(serv.title)}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full text-center py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-brand-primary hover:text-white text-slate-800 text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 focus:outline-none select-none"
                          >
                            Solicitar este serviço
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </a>
                        </div>

                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-xs text-brand-grey-mid mt-8 italic lg:hidden block">
              💡 Deslize acima para ver os outros serviços de saúde corporativa.
            </p>

          </div>
        </section>

        {/* SECTION 5 — PROVA SOCIAL E MÉTRICAS DE ROI */}
        <section className="py-16 lg:py-24 bg-white" id="roi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Bloco A - Logos de Empresas Atendidas */}
            <div className="text-center mb-16" id="partners-logos-zone">
              <span className="text-xs uppercase font-mono tracking-widest text-brand-slate-dark block mb-4">
                Empresas que já contam com a Essentia nos seus bastidores ocupacionais
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 mt-6">
                {PARTNERS_LOGOS.map((partner, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 cursor-help transition-all duration-300 border border-transparent hover:border-slate-100 hover:bg-slate-50 rounded-xl"
                    title={`${partner.name} (${partner.location})`}
                    id={`partner-logo-${index}`}
                  >
                    <span className="font-display font-extrabold text-sm sm:text-base text-slate-800 tracking-wider">
                      {partner.logoText}
                    </span>
                    <span className="text-[9px] font-sans font-medium text-brand-primary-light tracking-wide italic mt-1">
                      {partner.location}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco B - Depoimentos com aspas gigantes ornamentadas */}
            <div className="max-w-4xl mx-auto mb-20 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 relative overflow-hidden" id="testimonial-carousel">
              {/* Giant quote mark decoration */}
              <div className="absolute top-2 left-4 text-brand-primary/10 select-none font-display font-bold text-8xl md:text-9xl leading-none">
                “
              </div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="min-h-[220px] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-primary tracking-widest uppercase bg-brand-primary/10 px-2.5 py-1 rounded mb-4 inline-block">
                        Opinião Real de Parceiro
                      </span>
                      <blockquote className="text-slate-700 text-sm sm:text-base md:text-lg font-sans font-medium leading-relaxed italic pr-4">
                        “{TESTIMONIALS[currentTestimonialIdx].quote}”
                      </blockquote>
                    </div>

                    <div className="flex items-center gap-3.5 mt-6 pt-6 border-t border-slate-200">
                      {/* Avatar decoration based on initials */}
                      <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-bold text-sm tracking-tight border border-brand-primary">
                        {TESTIMONIALS[currentTestimonialIdx].authorName.charAt(0)}
                        {TESTIMONIALS[currentTestimonialIdx].authorName.split(' ')[1]?.charAt(0)}
                      </div>
                      <div>
                        <cite className="not-italic font-sans font-bold text-slate-900 text-sm block">
                          {TESTIMONIALS[currentTestimonialIdx].authorName}
                        </cite>
                        <span className="text-xs text-brand-grey-mid">
                          {TESTIMONIALS[currentTestimonialIdx].authorRole} na{' '}
                          <strong className="text-slate-800 font-medium">
                            {TESTIMONIALS[currentTestimonialIdx].authorCompany}
                          </strong>{' '}
                          ({TESTIMONIALS[currentTestimonialIdx].authorLocation})
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider pagination indicators & buttons */}
                <div className="flex items-center justify-between mt-8 border-t border-slate-200/50 pt-4 z-10 relative">
                  <div className="flex gap-1.5">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentTestimonialIdx(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === currentTestimonialIdx ? 'bg-brand-primary px-3' : 'bg-slate-300'
                        }`}
                        aria-label={`Ir para depoimento ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleTestimonialPrev}
                      className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-brand-primary transition-all shadow-sm focus:outline-none"
                      aria-label="Depoimento Anterior"
                      id="prev-testimonial-btn"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleTestimonialNext}
                      className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-brand-primary transition-all shadow-sm focus:outline-none"
                      aria-label="Próximo Depoimento"
                      id="next-testimonial-btn"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Bloco C — Métricas de ROI (FUNDO ESCURO - DELIBERADO) */}
            <div className="bg-brand-primary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-brand-primary-dark" id="roi-dark-block">
              {/* Backdrops patterns */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary-light/50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40"></div>
              
              <div className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-[11px] font-mono font-bold text-brand-green-accent uppercase tracking-widest bg-white/10 px-3 py-1 rounded inline-block mb-3">
                    Estatísticas Corporativas Reais
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
                    Bem-estar corporativo é investimento com retorno financeiro mensurável.
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm font-sans">
                    Cada real investido em saúde e ergonomia corporativa atua ativamente na redução de processos trabalhistas, redução de sinistralidade de planos e aumento de performance global.
                  </p>
                </div>

                {/* 3 Metric cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  
                  {/* Metric 1 */}
                  <div className="text-center p-5 rounded-2xl bg-white/5 border border-white/5 shadow-sm" id="roi-metric-1">
                    <div className="text-brand-green-accent font-display font-extrabold text-4xl sm:text-5xl tracking-normal mb-2.5">
                      ↓ 35%
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
                      Controle do Absenteísmo
                    </h4>
                    <p className="text-white/75 text-xs font-sans mt-2 leading-relaxed">
                      Redução média de faltas motivadas por estresse, dores posturais ou adoecimentos psicossociais nos primeiros 90 dias de programa.
                    </p>
                  </div>

                  {/* Metric 2 */}
                  <div className="text-center p-5 rounded-2xl bg-white/5 border border-white/5 shadow-sm" id="roi-metric-2">
                    <div className="text-brand-green-accent font-display font-extrabold text-4xl sm:text-5xl tracking-normal mb-2.5">
                      3× ROI
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
                      Retorno Mensurável
                    </h4>
                    <p className="text-white/75 text-xs font-sans mt-2 leading-relaxed">
                      Cada real injetado em programas integrados de qualidade de vida retorna poupando custos de substituição operacional de pessoal.
                    </p>
                  </div>

                  {/* Metric 3 */}
                  <div className="text-center p-5 rounded-2xl bg-white/5 border border-white/5 shadow-sm" id="roi-metric-3">
                    <div className="text-brand-green-accent font-display font-extrabold text-4xl sm:text-5xl tracking-normal mb-2.5">
                      +40% eNPS
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
                      Fidelização e Clima
                    </h4>
                    <p className="text-white/75 text-xs font-sans mt-2 leading-relaxed">
                      Aumento real no índice de recomendação interna dos colaboradores que consideram a empresa um excelente espaço profissional para crescer.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6 — FLUXO DE CONTRATAÇÃO (Timeline com 4 Passos) */}
        <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-100" id="passos">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-sage uppercase tracking-wider text-xs font-bold block mb-3 font-display">
                Simples do primeiro contato à execução
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4" id="steps-heading">
                Seu programa de saúde in company no ar em menos de 7 dias
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans">
                Nós mitigamos toda a burocracia comercial. O processo comercial da Essentia é consultivo, veloz e sem atritos operacionais.
              </p>
            </div>

            {/* Desktop timeline view: Horizontal connecting line */}
            <div className="hidden lg:block relative mb-12" id="desktop-timeline">
              {/* Stepping dashed gray road */}
              <div className="absolute top-[34px] left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-300 pointer-events-none"></div>

              <div className="grid grid-cols-4 gap-8 relative z-10" id="desktop-steps-grid">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center" id={`desktop-step-${i}`}>
                    {/* Circle badge of step */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-extrabold text-lg shadow-sm border-2 ${
                      i === 3
                        ? 'bg-brand-green-accent text-white border-brand-green-accent animate-pulse'
                        : 'bg-white text-brand-primary border-slate-200'
                    }`}>
                      {i === 3 ? '✓' : step.num}
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/50 mt-5 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Time tag inside step */}
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 ${
                          step.timeTagColor === 'positive'
                            ? 'bg-brand-green-accent/15 text-brand-primary'
                            : 'bg-slate-100 text-brand-slate-dark border border-slate-200/40'
                        }`}>
                          <Clock className="w-3 h-3 text-brand-sage" />
                          {step.time}
                        </span>

                        <h3 className="font-display font-bold text-sm text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-[12px] font-sans leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-sans font-medium text-brand-sage italic">
                        {step.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline view: Vertical path */}
            <div className="block lg:hidden space-y-8 relative pl-6 border-l-2 border-dashed border-slate-300 ml-4 mb-12" id="mobile-timeline">
              {STEPS.map((step, i) => (
                <div key={i} className="relative" id={`mobile-step-${i}`}>
                  {/* Floating Circle Anchor */}
                  <div className={`absolute -left-[35px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs shadow-sm border-2 ${
                    i === 3
                      ? 'bg-brand-green-accent text-white border-brand-green-accent'
                      : 'bg-white text-brand-primary border-slate-200'
                  }`}>
                    {i === 3 ? '✓' : step.num}
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/50">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-display font-bold text-sm text-slate-900">
                        {step.title}
                      </h3>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-brand-slate-dark border border-slate-200/30 px-2 py-0.5 rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs font-sans leading-relaxed">
                      {step.description}
                    </p>
                    <span className="text-[10px] text-brand-primary font-bold italic mt-2 block">
                      {step.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Timely commercial CTA underneath */}
            <div className="text-center mt-8">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                id="steps-whatsapp-cta"
                className="inline-flex items-center gap-1 text-slate-800 hover:text-brand-primary bg-slate-100 hover:bg-slate-200/60 font-sans font-bold text-sm px-6 py-3 rounded-full transition-all"
              >
                Solicitar contato assistido comercial via Whatsapp
                <ArrowRight className="w-4 h-4 text-brand-primary ml-1" />
              </a>
            </div>

          </div>
        </section>

        {/* SECTION 7 — CTA FINAL (Duas Colunas: Argumento + Formulário) */}
        <section className="py-16 lg:py-24 bg-white border-t border-slate-100" id="contato">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" ref={formRef}>
              
              {/* COLUNA ESQ (50% / 6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between" id="contato-info-side">
                <div>
                  <span className="text-brand-sage uppercase tracking-wider text-xs font-bold block mb-3 font-display">
                    Empresas de BH e Região Metropolitana
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-5" id="contato-title">
                    Pronto para transformar o bem-estar da sua equipe em resultado concreto?
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed mb-6">
                    Fale com a <strong>Essentia Saúde Corporativa</strong> e receba uma proposta personalizada para o tamanho e perfil da sua empresa. Orçamento sem compromisso.
                  </p>
                </div>

                <div>
                  {/* Checklist of confidence bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" id="trust-checkmarks">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 font-sans">
                      <Check className="w-5 h-5 text-brand-green-accent" />
                      <span>Retorno em até 24h</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 font-sans">
                      <Check className="w-5 h-5 text-brand-green-accent" />
                      <span>Proposta sem compromisso</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 font-sans">
                      <Check className="w-5 h-5 text-brand-green-accent" />
                      <span>Atendimento em BH e RMBH</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 font-sans">
                      <Check className="w-5 h-5 text-brand-green-accent" />
                      <span>Profissionais qualificados</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-8" id="wa-direct-alternative">
                    <span className="text-xs text-brand-slate-dark uppercase tracking-widest font-mono font-bold block mb-3">
                      Ou fale conosco agora e ganhe tempo:
                    </span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      id="contato-whatsapp-shortcut"
                      className="inline-flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary-dark font-sans font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all shadow-md group border border-transparent"
                    >
                      <MessageSquare className="w-5 h-5 mr-2.5 text-brand-green-accent fill-brand-green-accent animate-bounce" />
                      Falar com a Essentia no WhatsApp agora
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>

              {/* COLUNA DIR (50% / 6 cols) - FORMULÁRIO */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200/75 p-6 sm:p-10 rounded-2xl shadow-inner flex flex-col justify-between" id="contato-form-side">
                
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900 mb-6">
                    Preencher o formulário de contato
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-4" id="lead-capture-form">
                    
                    {/* Field 1: Name */}
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Nome Completo <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name-input"
                        required
                        value={formInput.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Amanda Silveira"
                        className="w-full bg-white border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-lg text-sm p-3 font-sans"
                      />
                    </div>

                    {/* Grid of Company & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Field 2: Company */}
                      <div>
                        <label htmlFor="company-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Empresa <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company-input"
                          required
                          value={formInput.company}
                          onChange={handleInputChange}
                          placeholder="Ex: Localiza"
                          className="w-full bg-white border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-lg text-sm p-3 font-sans"
                        />
                      </div>

                      {/* Field 3: Job Role */}
                      <div>
                        <label htmlFor="role-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Cargo / Área
                        </label>
                        <input
                          type="text"
                          name="role"
                          id="role-input"
                          value={formInput.role}
                          onChange={handleInputChange}
                          placeholder="Ex: Gerente de RH"
                          className="w-full bg-white border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-lg text-sm p-3"
                        />
                      </div>
                    </div>

                    {/* Field 4: Dropdown range of colaboradores */}
                    <div>
                      <label htmlFor="numCollaborators-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Nº de colaboradores da Empresa
                      </label>
                      <select
                        name="numCollaborators"
                        id="numCollaborators-select"
                        value={formInput.numCollaborators}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-lg text-sm p-3"
                      >
                        <option value="1-50">1 a 50 colaboradores</option>
                        <option value="51-200">51 a 200 colaboradores</option>
                        <option value="201-500">201 a 500 colaboradores</option>
                        <option value="500+">Mais de 500 colaboradores</option>
                      </select>
                    </div>

                    {/* Field 5: Contact option (Phone or Email) */}
                    <div>
                      <label htmlFor="contact-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp (com DDD) ou E-mail <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="contact"
                        id="contact-input"
                        required
                        value={formInput.contact}
                        onChange={handleInputChange}
                        placeholder="Ex: (31) 99142-2212 ou rh@suaempresa.com.br"
                        className="w-full bg-white border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-lg text-sm p-3 font-mono"
                      />
                    </div>

                    {/* Visual Button Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="form-submit-btn"
                      className="w-full bg-brand-primary hover:bg-brand-primary-dark disabled:bg-brand-primary/50 text-white font-sans font-bold text-base py-3 rounded-lg shadow transition-all focus:outline-none flex justify-center items-center gap-2 cursor-pointer h-[52px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processando solicitação...
                        </>
                      ) : (
                        <>
                          Enviar Formulário de Contato
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                  </form>

                  {/* Submission Toast and leads reminder */}
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-4 p-4 rounded-xl bg-brand-green-accent/10 border border-brand-green-accent/20 text-brand-primary text-xs font-sans font-medium flex items-start gap-2.5"
                        id="submit-success-toast"
                      >
                        <Check className="w-5 h-5 text-brand-green-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-slate-900">Proposta recebida com sucesso!</p>
                          <p className="text-slate-600 mt-1">Salvamos seus dados localmente. Em até 24h nossa equipe comercial consultiva da Essentia Saúde retornará no seu contato.</p>
                          <button
                            onClick={() => setShowAdminLeads(true)}
                            className="text-brand-primary hover:underline font-bold mt-2.5 flex items-center gap-1"
                          >
                            Visualizar leads no cabeçalho ↑
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* LGPD security warning note block */}
                <div className="mt-6 border-t border-slate-200 pt-4 text-[11px] text-brand-grey-mid text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-sage shrink-0" />
                  <span>Dados protegidos em conformidade com as diretrizes da LGPD (Lei 13.709/18). Sem spam.</span>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800" ref={footerRef} id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Left col - Brand footer (4 cols) */}
            <div className="lg:col-span-4" id="footer-brand-info">
              <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                ESSENTIA <span className="text-[10px] bg-white/10 text-brand-green-accent px-2 py-0.5 rounded-full font-sans font-bold">SAÚDE</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#63918b] font-sans uppercase font-bold block -mt-1 mb-4">
                CORPORATIVA
              </span>
              <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                Programas especializados de saúde corporativa em BH e região. Liderados em estreita colaboração técnica com as diretrizes de medicina integrativa, fisioterapia laboral e segurança no trabalho.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Phone className="w-4 h-4 text-brand-sage" /><span>WhatsApp: <strong>(31) 9 9142-2212</strong></span>
              </div>
            </div>

            {/* Middle col - Links 1 (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4" id="footer-links-grid">
              <div>
                <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider mb-4">
                  Soluções Integradas
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li><a href="#servicos" className="hover:text-white transition-colors">Quick Massage</a></li>
                  <li><a href="#servicos" className="hover:text-white transition-colors">Psicologia do Trabalho</a></li>
                  <li><a href="#servicos" className="hover:text-white transition-colors">Palestras SIPAT</a></li>
                  <li><a href="#servicos" className="hover:text-white transition-colors">NR-1 e Saúde Mental</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider mb-4">
                  Atendemos
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li><span className="text-slate-400">Belo Horizonte</span></li>
                  <li><span className="text-slate-400">Região Metropolitana</span></li>
                  <li><span className="text-slate-400">Outras regiões (remotamente)</span></li>
                </ul>
              </div>
            </div>

            

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500" id="copyright">
            <p>© {new Date().getFullYear()} Essentia Saúde Corporativa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* FLOAT WHATSAPP BUTTON (Sticky footer mobile helper) - Hides when form footer is in view to avoid redundancy */}
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            className="fixed bottom-5 right-5 z-40"
            id="sticky-whatsapp-bubble"
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#1d5e6e] text-white hover:bg-brand-primary-dark font-sans font-bold text-xs sm:text-sm px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all border border-white/20 select-none group"
              aria-label="Falar com atendente no Whatsapp"
            >
              {/* WhatsApp custom green pulse badge */}
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-green-accent"></span>
              </span>
              <span>Solicitar proposta WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
