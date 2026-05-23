/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import {
  ArrowRight, MessageCircle, Menu, X, ExternalLink,
  Globe, Layers, Smartphone, BarChart3, Zap, Code2,
  CheckCircle2, Clock, Rocket, Star, TrendingUp, Bell, Users
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectStatus = 'Online' | 'Em desenvolvimento' | 'Em breve';
type ProjectCategory = 'App' | 'Sistema Web' | 'SaaS' | 'Landing Page';

interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  image: string;
  link: string;
  highlight: string;
  accentGreen: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const WA = "https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium.";
const EASE = [0.22, 1, 0.36, 1] as const;

const STATUS_CONFIG: Record<ProjectStatus, { icon: React.ReactNode; color: string; dot: string }> = {
  'Online':            { icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: 'text-purple-400', dot: 'bg-purple-400' },
  'Em desenvolvimento':{ icon: <Clock className="w-3.5 h-3.5" />,       color: 'text-fuchsia-400',  dot: 'bg-fuchsia-400'  },
  'Em breve':          { icon: <Rocket className="w-3.5 h-3.5" />,      color: 'text-zinc-400',    dot: 'bg-zinc-400'    },
};

// ─── Projects ────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'vellox',
    name: 'Vellox',
    category: 'App',
    status: 'Online',
    description: 'Sistema de gestão de entregas e motoboys em tempo real para restaurantes e lanchonetes.',
    image: '/VELLOX.png',
    link: 'https://www.appvellox.online',
    highlight: 'Automação logística completa',
    accentGreen: true,
  },
  {
    id: 'xpost',
    name: 'XPost',
    category: 'SaaS',
    status: 'Em breve',
    description: 'Plataforma inteligente para criação, agendamento e gestão de conteúdo nas redes sociais.',
    image: '/XPOST.png',
    link: 'https://www.xpostzone.online',
    highlight: 'Gestão de conteúdo automatizada',
    accentGreen: false,
  },
  {
    id: 'run-manager',
    name: 'Run Manager',
    category: 'Sistema Web',
    status: 'Online',
    description: 'Sistema completo de gestão de processos e tarefas com automações e controle em tempo real.',
    image: '/RUN%20MANAGER.png',
    link: 'https://www.runmanager.online',
    highlight: 'Gestão e automação de processos',
    accentGreen: true,
  },
  {
    id: 'facilita-ai',
    name: 'Facilita Aí',
    category: 'SaaS',
    status: 'Em breve',
    description: 'Marketplace de serviços locais que conecta prestadores a clientes com agilidade.',
    image: '/facilitaai.png',
    link: 'https://www.facilitai.online',
    highlight: 'Conexão entre oferta e demanda',
    accentGreen: false,
  },
  {
    id: 'pedyo',
    name: 'Pedyo',
    category: 'Sistema Web',
    status: 'Em desenvolvimento',
    description: 'Cardápio digital inteligente com gestão de pedidos em tempo real para restaurantes.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=75&w=800&auto=format&fit=crop&fm=webp',
    link: '#',
    highlight: 'Digitalização de operações',
    accentGreen: true,
  },
  {
    id: 'jp-producoes',
    name: 'JP Produções',
    category: 'Landing Page',
    status: 'Online',
    description: 'Presença digital profissional para estúdio de produção audiovisual.',
    image: '/JP%20PRODU%C3%87%C3%95ES.png',
    link: 'https://www.jpproducoes.online',
    highlight: 'Captação de leads qualificados',
    accentGreen: false,
  },
];

const SERVICES = [
  { icon: <Globe className="w-6 h-6" />,       label: 'Landing Pages',  desc: 'Alta conversão, design premium'       },
  { icon: <Layers className="w-6 h-6" />,      label: 'Sistemas Web',   desc: 'Dashboards e ferramentas internas'    },
  { icon: <Smartphone className="w-6 h-6" />,  label: 'Aplicativos',    desc: 'Mobile-first e intuitivo'             },
  { icon: <BarChart3 className="w-6 h-6" />,   label: 'Dashboards',     desc: 'Dados em tempo real e análises'       },
  { icon: <Zap className="w-6 h-6" />,         label: 'Automações',     desc: 'Processos e integrações inteligentes' },
  { icon: <Code2 className="w-6 h-6" />,       label: 'Micro SaaS',     desc: 'Produtos digitais escaláveis'         },
];

const PROOF_IMAGES = [
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=75&w=600&auto=format&fit=crop&fm=webp',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=75&w=600&auto=format&fit=crop&fm=webp',
];

// ─── Hero Particle Background ─────────────────────────────────────────────────

const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    green: Math.random() > 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.green ? 'bg-purple-400' : 'bg-fuchsia-400'}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Flowing lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={`${i * 20}%`} y1="0%" x2={`${i * 20 + 30}%`} y2="100%"
            stroke="url(#lineGrad)" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
};

// ─── Floating UI Cards ────────────────────────────────────────────────────────

const FloatingNotification: React.FC<{ delay: number; style?: React.CSSProperties }> = ({ delay, style }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
    transition={{ opacity: { duration: 0.6, delay }, x: { duration: 0.6, delay }, y: { duration: 4, delay: delay + 0.6, repeat: Infinity, ease: 'easeInOut' } }}
    className="absolute glass-green rounded-2xl px-4 py-3 min-w-[180px] shadow-xl"
    style={style}
  >
    <div className="flex items-center gap-2 mb-1">
      <Bell className="w-3.5 h-3.5 text-purple-400" />
      <span className="text-zinc-400 text-xs">Novo pedido</span>
    </div>
    <p className="text-white text-sm font-semibold">Vellox — #4821</p>
    <div className="flex items-center gap-1.5 mt-1">
      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      <span className="text-purple-400 text-xs font-medium">Em rota</span>
    </div>
  </motion.div>
);

const FloatingMetric: React.FC<{ delay: number; style?: React.CSSProperties; value: string; label: string; trend: string }> = ({ delay, style, value, label, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: [0, 8, 0] }}
    transition={{ opacity: { duration: 0.6, delay }, y: { duration: 5, delay: delay + 0.6, repeat: Infinity, ease: 'easeInOut' } }}
    className="absolute glass rounded-2xl px-5 py-4 min-w-[140px] shadow-xl border border-zinc-800"
    style={style}
  >
    <p className="text-zinc-500 text-xs mb-1">{label}</p>
    <p className="text-white text-2xl font-bold">{value}</p>
    <div className="flex items-center gap-1 mt-1 text-purple-400 text-xs font-semibold">
      <TrendingUp className="w-3 h-3" />
      {trend}
    </div>
  </motion.div>
);

const FloatingUsers: React.FC<{ delay: number; style?: React.CSSProperties }> = ({ delay, style }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
    transition={{ opacity: { duration: 0.6, delay }, x: { duration: 0.6, delay }, y: { duration: 4.5, delay: delay + 0.6, repeat: Infinity, ease: 'easeInOut' } }}
    className="absolute glass rounded-2xl px-4 py-3 shadow-xl border border-zinc-800"
    style={style}
  >
    <div className="flex items-center gap-2 mb-2">
      <Users className="w-3.5 h-3.5 text-fuchsia-400" />
      <span className="text-zinc-400 text-xs">Usuários ativos</span>
    </div>
    <div className="flex -space-x-2">
      {['bg-purple-500', 'bg-fuchsia-400', 'bg-purple-500', 'bg-blue-500'].map((c, i) => (
        <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-zinc-900`} />
      ))}
      <div className="w-7 h-7 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-[9px] text-zinc-300 font-bold">+9</div>
    </div>
  </motion.div>
);

// ─── Browser Mockup ───────────────────────────────────────────────────────────

const BrowserMockup: React.FC<{ src: string; url?: string; className?: string }> = ({ src, url = 'app.axionai.com', className = '' }) => (
  <div className={`rounded-xl overflow-hidden border border-zinc-700/80 shadow-2xl shadow-black/60 ${className}`}>
    <div className="flex items-center gap-2 bg-zinc-900 px-4 py-3 border-b border-zinc-800">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
      </div>
      <div className="flex-1 mx-3 px-3 py-1 rounded bg-zinc-950 text-zinc-500 text-xs truncate font-mono">{url}</div>
    </div>
    <img src={src} alt="UI Preview" className="w-full object-cover" fetchPriority="high" />
  </div>
);

const PhoneMockup: React.FC<{ src: string }> = ({ src }) => (
  <div className="relative w-40 rounded-[2.5rem] border-[3px] border-zinc-700 overflow-hidden shadow-2xl shadow-black/60 bg-zinc-950">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-2xl z-10 border-b border-x border-zinc-700" />
    <img src={src} alt="App Preview" className="w-full h-full object-cover" />
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-zinc-600 rounded-full" />
  </div>
);

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const status = STATUS_CONFIG[project.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col rounded-2xl border bg-zinc-900/50 backdrop-blur-sm overflow-hidden transition-all duration-400
        ${project.accentGreen ? 'border-zinc-800 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]' : 'border-zinc-800 hover:border-fuchsia-500/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.1)]'}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img src={project.image} alt={project.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm
            ${project.accentGreen ? 'bg-purple-500/15 border border-purple-500/30 text-purple-400' : 'bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-400'}`}>
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-black/60 border border-white/10 ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${project.status === 'Online' ? 'animate-pulse' : ''}`} />
            {project.status}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${project.accentGreen ? 'text-purple-400' : 'text-fuchsia-400'}`}>
          <Star className="w-3.5 h-3.5" />
          {project.highlight}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => project.link === '#' && e.preventDefault()}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all
            ${project.link === '#' ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : project.accentGreen
                ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-black hover:border-purple-500'
                : 'bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-black hover:border-fuchsia-500'}`}
        >
          {project.link === '#' ? 'Em breve' : (<>Ver detalhes <ExternalLink className="w-3.5 h-3.5" /></>)}
        </a>
      </div>
    </motion.div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2, cy = rect.height / 2;
    mouseX.set((e.clientX - rect.left - cx) / cx);
    mouseY.set((e.clientY - rect.top - cy) / cy);
  };

  const mockupX = useTransform(springX, [-1, 1], [-12, 12]);
  const mockupY = useTransform(springY, [-1, 1], [-8, 8]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-purple-500/30">

      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/12 blur-[150px] rounded-full" />
        <div className="absolute bottom-[0%] left-[-15%] w-[45%] h-[45%] bg-fuchsia-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-900/6 blur-[100px] rounded-full" />
      </div>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050505]/92 backdrop-blur-xl py-4 border-b border-zinc-900' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo_axion.svg" alt="Axion" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
              onError={e => { e.currentTarget.style.display = 'none'; }} />
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white leading-none">Axion</span>
              <span className="text-[9px] text-zinc-500 font-semibold tracking-[0.3em] uppercase leading-none mt-0.5">Intelligence</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
            <a href="#projects" className="hover:text-white transition-colors">Projetos</a>
            <a href="#services" className="hover:text-white transition-colors">Serviços</a>
            <a href="#about" className="hover:text-white transition-colors">Sobre</a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-bold transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Falar comigo
            </a>
          </div>
          <button className="md:hidden text-white p-1" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-center items-center">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-8 text-4xl font-bold tracking-tight text-center">
              {['#projects:Projetos', '#services:Serviços', '#about:Sobre'].map(item => {
                const [href, label] = item.split(':');
                return <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors">{label}</a>;
              })}
              <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-purple-400">Falar comigo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative min-h-screen flex items-center pt-20 pb-10 px-6 overflow-hidden"
        >
          {/* Animated background */}
          <ParticleField />

          {/* Radial hero glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Text ── */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-green text-purple-400 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                Software House Profissional
              </motion.div>

              {/* Headline — word by word */}
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.06] tracking-tighter"
                >
                  Sites, sistemas e experiências digitais criadas para{' '}
                  <span className="text-gradient">vender mais</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg"
              >
                Desenvolvo soluções digitais modernas com foco em conversão, performance e credibilidade.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 mb-14"
              >
                <a href="#projects"
                  className="group relative px-8 py-4 rounded-xl border border-purple-500/50 text-purple-400 font-bold flex items-center justify-center gap-2 transition-all hover:bg-purple-500/10 hover:border-purple-400 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Ver projetos
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex gap-8 pt-8 border-t border-zinc-900"
              >
                {[
                  { value: '45+', label: 'Projetos' },
                  { value: '100%', label: 'Satisfação' },
                  { value: '3+', label: 'Anos' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Visual Composition ── */}
            <motion.div
              style={{ x: mockupX, y: mockupY }}
              className="relative hidden lg:flex items-center justify-center h-[580px]"
            >
              {/* Main browser mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, rotateY: -8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="absolute left-0 top-10 w-[78%] z-10"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <BrowserMockup
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=900&auto=format&fit=crop&fm=webp"
                    url="app.vellox.com"
                  />
                  {/* Glow under browser */}
                  <div className="h-4 mx-8 bg-purple-500/20 blur-xl rounded-full mt-1" />
                </motion.div>
              </motion.div>

              {/* Phone mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                className="absolute right-0 bottom-10 z-20"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <PhoneMockup src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=400&auto=format&fit=crop&fm=webp" />
                </motion.div>
              </motion.div>

              {/* Floating: Notification */}
              <FloatingNotification delay={0.8} style={{ top: '8%', right: '-5%', zIndex: 30 }} />

              {/* Floating: Metric */}
              <FloatingMetric delay={1.0} style={{ bottom: '30%', left: '-8%', zIndex: 30 }} value="R$48k" label="Receita mês" trend="+18%" />

              {/* Floating: Users */}
              <FloatingUsers delay={1.2} style={{ bottom: '10%', right: '30%', zIndex: 30 }} />

              {/* Developer photo — integrated */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] z-20"
              >
                <img src="/regenerated_image_1777520554489.webp" alt="Lukas" className="w-full h-full object-cover object-top" />
              </motion.div>

              {/* Ambient glow */}
              <div className="absolute inset-0 bg-purple-500/4 blur-3xl rounded-full pointer-events-none" />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 bg-purple-500 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── PROOF OF LEVEL ───────────────────────────────────────────────── */}
        <section className="py-20 overflow-hidden border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-3">Interfaces reais</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Projetos com padrão profissional</h2>
            </motion.div>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex gap-4 animate-marquee shrink-0">
              {PROOF_IMAGES.map((src, i) => (
                <div key={i} className="relative w-72 h-44 shrink-0 rounded-xl overflow-hidden border border-zinc-800 group">
                  <img src={src} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        <section id="projects" className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }} className="mb-16">
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-4">Portfólio</p>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white max-w-xl">Cada projeto, um produto digital completo.</h2>
                <p className="text-zinc-400 max-w-sm lg:text-right">Desenvolvidos com foco em usabilidade, performance e resultado real.</p>
              </div>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section id="services" className="py-24 px-6 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }} className="mb-16 text-center">
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-4">O que eu faço</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Especialidades</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">Do conceito ao produto final — cada entrega com padrão de empresa grande.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }} whileHover={{ y: -4 }}
                  className="group flex items-start gap-5 p-6 rounded-2xl border border-zinc-800 hover:border-purple-500/30 bg-zinc-900/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] cursor-default">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">{s.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{s.label}</h3>
                    <p className="text-zinc-500 text-sm">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIAL ─────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}>
              <div className="inline-block px-5 py-2 rounded-full glass-green text-purple-400 text-xs font-bold uppercase tracking-widest mb-10">Diferencial</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Não entrego apenas sites.{' '}
                <br className="hidden md:block" />
                <span className="text-gradient">Desenvolvo produtos digitais</span>
                <br className="hidden md:block" />
                com padrão profissional.
              </h2>
              <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                Cada projeto é pensado estrategicamente — interface, performance e resultado são inegociáveis.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <section id="about" className="py-24 px-6 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <img src="/regenerated_image_1777520554489.webp" alt="Lukas — Axion" loading="lazy"
                  className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border border-purple-500/10 rounded-3xl" />
              </div>
              <div className="absolute bottom-6 left-6 glass-green rounded-2xl px-5 py-4">
                <p className="text-zinc-400 text-xs mb-0.5">Fundador</p>
                <p className="text-white font-bold text-lg">Lukas Alves</p>
                <p className="text-purple-400 text-xs font-semibold">Axion Intelligence</p>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/8 rounded-full blur-3xl" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}>
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-6">Sobre</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Criando a Axion para elevar o padrão digital.</h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>Sou Lukas, desenvolvedor full-stack e fundador da Axion Intelligence — um estúdio digital focado em criar produtos e sistemas com padrão de empresa grande.</p>
                <p>Trabalho com startups, negócios locais e empreendedores que querem mais do que um site: querem uma estrutura digital que vende, automatiza e escala.</p>
                <p>Cada projeto é desenvolvido com atenção ao detalhe, foco em resultado e visão de longo prazo.</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'Supabase', 'Tailwind CSS'].map(tech => (
                  <span key={tech} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-zinc-300 text-sm font-medium transition-colors cursor-default">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative rounded-3xl overflow-hidden p-12 lg:p-20 text-center border border-zinc-800"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.14) 0%, transparent 70%), #080808' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-purple-500/70 to-transparent" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-green text-purple-400 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                Disponível para novos projetos
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Se seu projeto precisa de nível,{' '}
                <span className="text-gradient">vamos construir isso.</span>
              </h2>
              <p className="text-zinc-400 text-xl mb-10 max-w-xl mx-auto">Análise estratégica gratuita. Resposta em até 24h.</p>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-purple-500 hover:bg-purple-400 text-black font-bold text-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                <MessageCircle className="w-6 h-6" />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-zinc-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo_axion.svg" alt="Axion" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg tracking-tight text-white">Axion <span className="text-zinc-500 font-normal text-sm">Intelligence</span></span>
          </div>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Axion Intelligence. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }} className="fixed bottom-8 right-8 z-[100]">
        <a href={WA} target="_blank" rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-purple-500 hover:bg-purple-400 flex items-center justify-center text-black shadow-xl hover:scale-110 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          <MessageCircle className="w-7 h-7" />
        </a>
      </motion.div>

    </div>
  );
}
