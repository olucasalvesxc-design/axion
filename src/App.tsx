/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2, Rocket, Target, BarChart3, Layers, Cpu, Zap, ArrowRight,
  MessageCircle, Menu, X, MousePointer2, TrendingUp, Search,
  ExternalLink, Star
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectType = 'Site' | 'Landing Page' | 'App' | 'Micro SaaS' | 'Sistema Web';

interface Project {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  objective: string;
  technologies: string[];
  image: string;
  link: string;
  featured?: boolean;
  impact: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP = "https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium.";
const WHATSAPP_SIMILAR = "https://wa.me/5581973014080?text=Olá%20Lukas!%20Vi%20um%20projeto%20no%20seu%20portfólio%20e%20gostaria%20de%20algo%20parecido.";
const EASE = [0.22, 1, 0.36, 1] as const;

const FILTER_MAP: Record<string, ProjectType | null> = {
  'Todos': null,
  'Sites': 'Site',
  'Landing Pages': 'Landing Page',
  'Apps': 'App',
  'Micro SaaS': 'Micro SaaS',
  'Sistemas': 'Sistema Web',
};

// ─── Projects Data (edite aqui para adicionar/alterar projetos) ───────────────

const PROJECTS: Project[] = [
  {
    id: 'spot-tunner',
    name: 'Spot Tunner',
    type: 'Site',
    description: 'Plataforma de produção audiovisual especializada em jingles, spots e conteúdo sonoro de alto impacto para marcas.',
    objective: 'Captação de leads e vendas online',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=800&auto=format&fit=crop&fm=webp',
    link: 'https://www.spottunner.online',
    featured: true,
    impact: 'Vendas online',
  },
  {
    id: 'vellox',
    name: 'Vellox',
    type: 'App',
    description: 'Sistema completo de gestão de entregas e motoboys em tempo real para restaurantes e lanchonetes.',
    objective: 'Automação de processo logístico',
    technologies: ['React Native', 'Node.js', 'Supabase'],
    image: '/regenerated_image_1777520587756.webp',
    link: 'https://www.appvellox.online',
    featured: true,
    impact: 'Automação de processo',
  },
  {
    id: 'xpost',
    name: 'Xpost',
    type: 'Micro SaaS',
    description: 'Ferramenta de gestão e automação de postagens para criadores e agências com foco em produtividade.',
    objective: 'Otimização de fluxo de trabalho',
    technologies: ['React', 'TypeScript', 'API X'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=75&w=800&auto=format&fit=crop&fm=webp',
    link: 'https://xpostzone.online',
    featured: false,
    impact: 'Otimização de fluxo',
  },
  // ── Placeholders — troque image, name, link e description ──
  {
    id: 'placeholder-lp',
    name: 'Seu Projeto Aqui',
    type: 'Landing Page',
    description: 'Landing page de alta conversão para captação de leads e lançamento de produto digital.',
    objective: 'Captação de leads qualificados',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=75&w=800&auto=format&fit=crop&fm=webp',
    link: '#',
    featured: false,
    impact: 'Captação de leads',
  },
  {
    id: 'placeholder-sistema',
    name: 'Seu Projeto Aqui',
    type: 'Sistema Web',
    description: 'Dashboard e sistema interno com controle de operações, relatórios e gestão em tempo real.',
    objective: 'Gestão interna de operações',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=75&w=800&auto=format&fit=crop&fm=webp',
    link: '#',
    featured: false,
    impact: 'Gestão interna',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: EASE }}
    className="group p-8 rounded-2xl glass-card hover:border-purple-500/40"
  >
    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    className="relative p-[1px] rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative p-8 rounded-[15px] bg-zinc-950/90 backdrop-blur-md h-full flex flex-col">
      <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-zinc-400 mb-8 flex-grow">{description}</p>
      <div className="flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
        Saiba mais <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

const CatalogCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.5, ease: EASE }}
    className="group flex flex-col rounded-2xl glass-card overflow-hidden"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
      <div className="absolute top-3 left-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-black/70 backdrop-blur-sm border border-purple-500/30 text-purple-400">
          {project.type}
        </span>
      </div>
    </div>

    <div className="flex flex-col flex-1 p-6 gap-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
        <TrendingUp className="w-3.5 h-3.5" />
        {project.impact}
      </div>

      <p className="text-xs text-zinc-500">
        <span className="text-zinc-400 font-semibold">Objetivo:</span> {project.objective}
      </p>

      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span key={tech} className="px-2 py-1 rounded-md bg-white/5 border border-white/8 text-zinc-400 text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-auto pt-1">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
        >
          Ver projeto <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href={WHATSAPP_SIMILAR}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 font-bold text-sm transition-all"
        >
          Solicitar similar
        </a>
      </div>
    </div>
  </motion.div>
);

const FeaturedCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.6, ease: EASE }}
    className="group relative flex flex-col rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(147,51,234,0.18)]"
  >
    <div className="absolute top-4 right-4 z-10">
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-600 text-white shadow-lg shadow-purple-900/50">
        <Star className="w-3 h-3 fill-white" /> Projeto em destaque
      </span>
    </div>

    <div className="relative overflow-hidden" style={{ aspectRatio: '16/8' }}>
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-black/70 backdrop-blur-sm border border-purple-500/30 text-purple-400">
          {project.type}
        </span>
      </div>
    </div>

    <div className="flex flex-col flex-1 p-8 gap-5">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
        <p className="text-zinc-400 leading-relaxed">{project.description}</p>
      </div>

      <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-widest">
        <TrendingUp className="w-4 h-4" />
        {project.impact}
      </div>

      <p className="text-sm text-zinc-500">
        <span className="text-zinc-300 font-semibold">Objetivo:</span> {project.objective}
      </p>

      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-auto pt-1">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-bold transition-all"
        >
          Ver projeto <ExternalLink className="w-4 h-4" />
        </a>
        <a
          href={WHATSAPP_SIMILAR}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 hover:border-purple-500/40 text-zinc-300 hover:text-white font-bold transition-all"
        >
          Solicitar similar
        </a>
      </div>
    </div>
  </motion.div>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeFilter === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === FILTER_MAP[activeFilter]);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[50%] left-[55%] w-[25%] h-[25%] bg-purple-800/8 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/85 backdrop-blur-md py-4 border-b border-zinc-800/80' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm font-medium uppercase tracking-widest">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/logo_axion.svg"
              alt="Axion Ai Logo"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter normal-case text-white leading-none">Axion</span>
              <span className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase leading-none mt-1 group-hover:text-purple-500 transition-colors">Intelligence</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">Sobre</a>
            <a href="#catalog" className="hover:text-white transition-colors">Projetos</a>
            <a href="#services" className="hover:text-white transition-colors">Serviços</a>
            <a href="#process" className="hover:text-white transition-colors">Metodologia</a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-zinc-700 hover:border-purple-500 hover:text-white transition-all"
            >
              Solicitar Projeto
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-zinc-950 p-8 flex flex-col justify-center items-center text-center"
          >
            <div className="absolute top-8 right-8">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-10 text-4xl font-bold tracking-tighter">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#catalog" onClick={() => setIsMenuOpen(false)}>Projetos</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)}>Metodologia</a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-purple-500">
                Solicitar Projeto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="z-10 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Desenvolvimento Premium
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 tracking-tighter">
                Não é sobre ter um site. <br />
                <span className="text-gradient font-display">É sobre dominar.</span>
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                Seu negócio operando no digital com a infraestrutura das empresas que lideram o mercado. Projetado para{' '}
                <span className="text-white font-semibold">atrair, converter e escalar</span> todos os dias.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE }}
              className="relative aspect-square w-full max-w-[500px] mx-auto lg:max-w-none lg:h-[600px] group overflow-hidden rounded-3xl lg:order-2 lg:row-span-2 shadow-2xl shadow-purple-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
              <div className="absolute -inset-4 bg-purple-600/10 blur-3xl rounded-full opacity-30 z-0 animate-pulse" />
              <img
                src="/regenerated_image_1777520554489.webp"
                alt="Lukas - Axion Ai"
                fetchPriority="high"
                className="w-full h-full object-cover object-center transition-all duration-1000 scale-[1.02] group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 lg:order-3 lg:col-start-1"
            >
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2 group transition-all"
              >
                Solicitar projeto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-bold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── CATÁLOGO DE PROJETOS ──────────────────────────────────────────── */}
        <section id="catalog" className="py-28 px-6">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-14"
            >
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-4">Catálogo de projetos</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Projetos que não apenas existem.<br />
                <span className="text-gradient">Eles trabalham pelo negócio.</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Cada interface foi pensada para resolver um problema real: gerar leads, organizar operações, vender melhor ou transformar uma ideia em produto digital.
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide lg:justify-center"
            >
              {Object.keys(FILTER_MAP).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>

            {/* Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured */}
                {featuredProjects.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {featuredProjects.map(p => <FeaturedCard key={p.id} project={p} />)}
                  </div>
                )}

                {/* Regular */}
                {regularProjects.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularProjects.map(p => <CatalogCard key={p.id} project={p} />)}
                  </div>
                )}

                {filteredProjects.length === 0 && (
                  <div className="text-center py-20 text-zinc-500">
                    Nenhum projeto nessa categoria ainda.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Catalog CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-20 text-center"
            >
              <div className="inline-flex flex-col items-center gap-6 p-10 rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800">
                <p className="text-zinc-300 text-xl font-semibold max-w-md">Quer um projeto com esse nível para o seu negócio?</p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-bold text-lg transition-all hover:scale-[1.02]"
                >
                  Solicitar análise do projeto
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center border border-zinc-800 rounded-[40px] p-8 sm:p-12 lg:p-24 relative overflow-hidden bg-zinc-950">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-6">O Cenário Atual</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-12">Por que a maioria dos negócios falha no digital?</h2>

              <div className="grid md:grid-cols-2 gap-4 text-left mb-12">
                {[
                  "Sites que não geram clientes",
                  "Negócios invisíveis nos buscadores",
                  "Baixa conversão e alto bounce rate",
                  "Dependência total de indicações",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <X className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-zinc-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 inline-block">
                <p className="text-red-400 font-semibold text-lg">
                  "Enquanto isso não é resolvido, dinheiro está sendo perdido todos os dias."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Infraestrutura digital pensada para resultado</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Saímos do "layout bonito" para uma engenharia de vendas estruturada.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Target className="w-8 h-8" />, title: "Estratégia", description: "Análise profunda de mercado e persona antes da primeira linha de código." },
                { icon: <TrendingUp className="w-8 h-8" />, title: "Conversão", description: "Caminhos de venda validados e CTAs impossíveis de ignorar." },
                { icon: <Zap className="w-8 h-8" />, title: "Performance", description: "Velocidade extrema para que você nunca perca um prospect por lentidão." },
                { icon: <Rocket className="w-8 h-8" />, title: "Escalabilidade", description: "Código limpo e infra que cresce junto com seu faturamento." },
              ].map((item, i) => (
                <FeatureCard key={i} icon={item.icon} title={item.title} description={item.description} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section id="services" className="py-24 px-6 bg-zinc-950/80">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-4">Portfólio de Serviços</p>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">Soluções High-End para quem busca o topo.</h2>
              </div>
              <a href="#contact" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold shrink-0">
                Ver todos os serviços <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Layers className="w-10 h-10" />,
                  title: "Sistemas Web de Alta Complexidade",
                  description: "Dashboards personalizados, CRMs proprietários e ferramentas internas que otimizam sua operação em 10x.",
                },
                {
                  icon: <Cpu className="w-10 h-10" />,
                  title: "Aplicações Micro SaaS & MVP",
                  description: "Transformamos sua ideia em produto escalável com arquitetura robusta e pronto para o mercado.",
                },
                {
                  icon: <MousePointer2 className="w-10 h-10" />,
                  title: "Landing Pages de Performance",
                  description: "Design persuasivo focado exclusivamente em transformar visitantes curiosos em clientes pagantes.",
                },
                {
                  icon: <Zap className="w-10 h-10" />,
                  title: "Automação e Integração de IA",
                  description: "Implementação de inteligência artificial para automatizar processos repetitivos e escalar sua entrega.",
                },
              ].map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROOF ────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <h2 className="text-4xl font-bold text-white mb-6">Resultados que falam por si</h2>
                <p className="text-zinc-400 mb-8">Não apenas sites. Construímos máquinas de crescimento validadas por dados reais.</p>
                <div className="space-y-4">
                  {[
                    { label: "Conversão Média", value: "+37%" },
                    { label: "Projetos Entregues", value: "45+" },
                    { label: "Satisfação", value: "100%" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                      className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 transition-colors"
                    >
                      <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {[
                  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop&fm=webp", label: "Fintech SaaS", name: "NexLevel Dashboard", color: "text-purple-400" },
                  { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop&fm=webp", label: "E-commerce Engine", name: "Quantum Storefront", color: "text-blue-400" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-zinc-800 hover:border-purple-500/30 transition-colors"
                  >
                    <img src={item.img} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt={item.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-8">
                      <p className={`text-xs font-bold ${item.color} uppercase tracking-widest mb-2`}>{item.label}</p>
                      <p className="text-2xl font-bold text-white">{item.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section id="process" className="py-24 px-6 bg-zinc-950/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Nossa Metodologia</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">Um processo cirúrgico, do diagnóstico ao lançamento.</p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-8">
              <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 z-0" />
              {[
                { step: "01", title: "Diagnóstico", desc: "Imersão total no seu modelo de negócio.", icon: <Search className="w-5 h-5" /> },
                { step: "02", title: "Arquitetura", desc: "Mapeamento de jornada e UX estratégica.", icon: <Layers className="w-5 h-5" /> },
                { step: "03", title: "Desenvolvimento", desc: "Codificação com stack de elite mundial.", icon: <Code2 className="w-5 h-5" /> },
                { step: "04", title: "Otimização", desc: "Ajustes finos baseados em dados reais.", icon: <BarChart3 className="w-5 h-5" /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group hover:border-purple-500 transition-colors cursor-default">
                    <span className="text-zinc-600 group-hover:text-purple-500 font-mono text-xl transition-colors">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTHORITY ────────────────────────────────────────────────────── */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-zinc-800"
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop&fm=webp"
                alt="Workspace"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Foco em Resultados</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Construído para performance. <br />
                <span className="text-purple-500 italic">Não para aparência.</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: <Layers className="w-6 h-6" />, title: "Arquitetura estratégica", desc: "Cada decisão técnica é baseada no objetivo final do seu negócio." },
                  { icon: <Target className="w-6 h-6" />, title: "Foco em conversão", desc: "Uso de gatilhos psicológicos e UX otimizada para capturar cada lead." },
                  { icon: <Zap className="w-6 h-6" />, title: "Experiência otimizada", desc: "Tempo de carregamento e navegabilidade de alto nível global." },
                  { icon: <Cpu className="w-6 h-6" />, title: "Integrações inteligentes", desc: "Conectamos sua aplicação com as melhores ferramentas do mercado." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="text-purple-500 group-hover:scale-110 transition-transform shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DIFFERENTIAL ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Performance não é estética. É engenharia.",
                "Cada elemento tem um propósito: converter.",
                "Projetado para escalar, não apenas existir.",
              ].map((phrase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="p-12 rounded-[32px] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 hover:border-purple-500/30 flex items-center justify-center text-center hover:scale-[1.02] transition-all duration-500"
                >
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 italic">"{phrase}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-5xl mx-auto rounded-[40px] sm:rounded-[60px] bg-gradient-to-br from-purple-600 to-blue-700 p-8 sm:p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative z-10"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-8">
                Se o seu negócio exige mais do que um site comum, esse é o próximo passo.
              </h2>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white text-purple-600 font-bold text-lg sm:text-xl hover:scale-105 transition-transform"
              >
                Solicitar análise do projeto
                <ArrowRight className="w-6 h-6" />
              </a>
              <p className="mt-8 text-white/60 font-medium">Análise estratégica gratuita para projetos qualificados.</p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/logo_axion.svg" alt="Axion Ai Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter text-zinc-100 leading-none">Axion Ai</span>
              <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase leading-none mt-1">Premium Dev</span>
            </div>
          </div>

          <div className="flex gap-8 text-sm text-zinc-500 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Axion Ai. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}
