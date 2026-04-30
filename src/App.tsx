/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Rocket, 
  Target, 
  BarChart3, 
  Layers, 
  Cpu, 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  Menu, 
  X, 
  MousePointer2,
  TrendingUp,
  Search
} from 'lucide-react';

// Types
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

interface ProjectCardProps {
  image: string;
  name: string;
  description: string;
  result: string;
  link?: string;
  delay?: number;
}

// Components
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
  >
    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="relative p-1 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative p-8 rounded-[15px] bg-zinc-950/90 backdrop-blur-md h-full flex flex-col glass">
      <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-zinc-400 mb-8 flex-grow">{description}</p>
      <div className="flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
        Saiba mais <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ image, name, description, result, link = "#", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative rounded-[32px] overflow-hidden glass hover:border-purple-500/50 transition-all duration-500"
  >
    <div className="aspect-video overflow-hidden">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
      />
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-zinc-400 text-sm mb-4 line-clamp-1">{description}</p>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-purple-400 text-xs font-bold uppercase tracking-widest w-fit mb-6">
        <TrendingUp className="w-4 h-4" />
        {result}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-purple-600/90 text-white font-bold transition-all relative z-10"
      >
        Ver projeto
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-3xl -z-10" />
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-zinc-800' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm font-medium uppercase tracking-widest">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="/logo_axion.svg"
              alt="Axion Ai Logo"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                // Fallback to text if image not found
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter normal-case text-white leading-none">Axion</span>
              <span className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase leading-none mt-1 group-hover:text-purple-500 transition-colors">Intelligence</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">Sobre</a>
            <a href="#services" className="hover:text-white transition-colors">Serviços</a>
            <a href="#process" className="hover:text-white transition-colors">Metodologia</a>
            <a 
              href="https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium." 
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-zinc-950 p-8 flex flex-col justify-center items-center text-center"
          >
            <div className="absolute top-8 right-8">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-white"><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-10 text-4xl font-bold tracking-tighter">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)}>Metodologia</a>
              <a 
                href="https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium." 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)} 
                className="text-purple-500"
              >
                Solicitar Projeto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
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
                Seu negócio operando no digital com a infraestrutura das empresas que lideram o mercado. Projetado para <span className="text-white font-semibold">atrair, converter e escalar</span> todos os dias.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square w-full max-w-[500px] mx-auto lg:max-w-none lg:h-[600px] group overflow-hidden rounded-3xl lg:order-2 lg:row-span-2 shadow-2xl shadow-purple-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
              <div className="absolute -inset-4 bg-purple-600/10 blur-3xl rounded-full opacity-30 z-0 animate-pulse" />
              
              {/* Hero Image - User Photo */}
              <img
                src="/regenerated_image_1777520554489.webp"
                alt="Lukas - Axion Ai"
                fetchPriority="high"
                className="w-full h-full object-cover object-center transition-all duration-1000 scale-[1.02] group-hover:scale-105"
              />
              

            </motion.div>

            {/* CTA Buttons - Moves below image on mobile, stays below text on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 lg:order-3 lg:col-start-1"
            >
              <a 
                href="https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium." 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2 group transition-all"
                id="cta-hero-main"
              >
                Solicitar projeto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium." 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                id="cta-hero-whatsapp"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: AUTHORITY */}
        <section id="about" className="py-24 px-6 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Construído para performance. <br />
                <span className="text-purple-500 italic">Não para aparência.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <Layers className="w-6 h-6" />, title: "Arquitetura estratégica", desc: "Cada decisão técnica é baseada no objetivo final do seu negócio." },
                  { icon: <Target className="w-6 h-6" />, title: "Foco em conversão", desc: "Uso de gatilhos psicológicos e UX otimizada para capturar cada lead." },
                  { icon: <Zap className="w-6 h-6" />, title: "Experiência otimizada", desc: "Tempo de carregamento e navegabilidade de alto nível global." },
                  { icon: <Cpu className="w-6 h-6" />, title: "Integrações inteligentes", desc: "Conectamos sua aplicação com as melhores ferramentas do mercado." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="text-purple-500 group-hover:scale-110 transition-transform">{item.icon}</div>
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

        {/* SECTION 3: PROBLEM */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center border border-zinc-800 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-24 relative overflow-hidden bg-zinc-950">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-6">O Cenário Atual</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-12">Por que a maioria dos negócios falha no digital?</h2>
              
              <div className="grid md:grid-cols-2 gap-4 text-left mb-12">
                {[
                  "Sites que não geram clientes",
                  "Negócios invisíveis nos buscadores",
                  "Baixa conversão e alto bounce rate",
                  "Dependência total de indicações"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <X className="w-5 h-5 text-red-500" />
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

        {/* SECTION 4: SOLUTION */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Infraestrutura digital pensada para resultado</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Saimos do "layout bonito" para uma engenharia de vendas estruturada.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Target className="w-8 h-8" />, title: "Estratégia", description: "Análise profunda de mercado e persona antes da primeira linha de código." },
                { icon: <TrendingUp className="w-8 h-8" />, title: "Conversão", description: "Caminhos de venda validados e CTAs impossíveis de ignorar." },
                { icon: <Zap className="w-8 h-8" />, title: "Performance", description: "Velocidade extrema para que você nunca perca um prospect por lentidão." },
                { icon: <Rocket className="w-8 h-8" />, title: "Escalabilidade", description: "Código limpo e infra que cresce junto com seu faturamento." },
              ].map((item, i) => (
                <FeatureCard key={i} icon={item.icon} title={item.title} description={item.description} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: SERVICES */}
        <section id="services" className="py-24 px-6 bg-zinc-950/80">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-4">Portfólio de Serviços</p>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">Soluções High-End para quem busca o topo.</h2>
              </div>
              <a href="#contact" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
                Ver todos os serviços <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  icon: <Layers className="w-10 h-10" />, 
                  title: "Sistemas Web de Alta Complexidade", 
                  description: "Dashboard personalizados, CRMs proprietários e ferramentas internas que otimizam sua operação em 10x."
                },
                { 
                  icon: <Cpu className="w-10 h-10" />, 
                  title: "Aplicações Micro SaaS & MVP", 
                  description: "Transformamos sua idéia em produto escalável com arquitetura robusta e pronto para o mercado."
                },
                { 
                  icon: <MousePointer2 className="w-10 h-10" />, 
                  title: "Landing Pages de Performance", 
                  description: "Design persuasivo focado exclusivamente em transformar visitantes curiosos em clientes pagantes."
                },
                { 
                  icon: <Zap className="w-10 h-10" />, 
                  title: "Automação e Integração de IA", 
                  description: "Implementação de inteligência artificial para automatizar processos repetitivos e escalar sua entrega."
                }
              ].map((service, i) => (
                <ServiceCard key={i} icon={service.icon} title={service.title} description={service.description} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: PROOF */}
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
                    { label: "Satisfação", value: "100%" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-zinc-800"
                >
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop&fm=webp" loading="lazy" className="w-full h-full object-cover transition-all duration-700" alt="Project 1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Fintech SaaS</p>
                    <p className="text-2xl font-bold text-white">NexLevel Dashboard</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-zinc-800"
                >
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop&fm=webp" loading="lazy" className="w-full h-full object-cover transition-all duration-700" alt="Project 2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">E-commerce Engine</p>
                    <p className="text-2xl font-bold text-white">Quantum Storefront</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: PROCESS */}
        <section id="process" className="py-24 px-6 bg-zinc-950/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Nossa Metodologia</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">Um processo cirúrgico, do diagnóstico ao lançamento.</p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-8">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 z-0" />
              
              {[
                { step: "01", title: "Diagnóstico", desc: "Imersão total no seu modelo de negócio.", icon: <Search className="w-5 h-5" /> },
                { step: "02", title: "Arquitetura", desc: "Mapeamento de jornada e UX estratégica.", icon: <Layers className="w-5 h-5" /> },
                { step: "03", title: "Desenvolvimento", desc: "Codificação com stack de elite mundial.", icon: <Code2 className="w-5 h-5" /> },
                { step: "04", title: "Otimização", desc: "Ajustes finos baseados em dados reais.", icon: <BarChart3 className="w-5 h-5" /> },
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group hover:border-purple-500 transition-colors">
                    <span className="text-zinc-600 group-hover:text-purple-500 font-mono text-xl transition-colors">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: PROJECTS */}
        <section id="portfolio" className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-4">Portfólio</p>
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">Projetos selecionados</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-8">Alguns dos projetos desenvolvidos com foco em performance, conversão e experiência.</p>
              
              <div className="p-4 rounded-full bg-white/5 border border-white/5 inline-block mx-auto mb-12">
                <p className="text-zinc-300 text-sm font-medium italic">"Cada projeto é desenvolvido com foco em resultado — não apenas estética."</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Spot Tunner",
                  description: "Produção audiovisual, jingles e spots publicitários de alto impacto.",
                  result: "Qualidade de estúdio profissional",
                  image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=800&auto=format&fit=crop&fm=webp",
                  link: "https://www.spottunner.online"
                },
                {
                  name: "Xpost",
                  description: "Ferramenta estratégica para gestão e automação de postagens em redes sociais.",
                  result: "Otimização de fluxo de trabalho",
                  image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=75&w=800&auto=format&fit=crop&fm=webp",
                  link: "https://xpostzone.online"
                },
                {
                  name: "Vellox",
                  description: "Gestão completa de entregas e motoboys para restaurantes e lanchonetes.",
                  result: "Eficiência logística real-time",
                  image: "/regenerated_image_1777520587756.webp",
                  link: "https://www.appvellox.online"
                }
              ].map((project, i) => (
                <ProjectCard key={i} {...project} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: DIFFERENTIAL */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Performance não é estética. É engenharia.",
                "Cada elemento tem um propósito: converter.",
                "Projetado para escalar, não apenas existir."
              ].map((phrase, i) => (
                <div key={i} className="p-12 rounded-[32px] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex items-center justify-center text-center hover:scale-[1.02] transition-transform duration-500">
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 italic">"{phrase}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[60px] bg-gradient-to-br from-purple-600 to-blue-700 p-8 sm:p-12 lg:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-8">
                Se o seu negócio exige mais do que um site comum, esse é o próximo passo.
              </h2>
              <a 
                href="https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium."
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

      {/* FOOTER */}
      <footer className="py-12 border-t border-zinc-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img 
              src="/logo_axion.svg"
              alt="Axion Ai Logo"
              className="w-10 h-10 object-contain"
            />
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

      {/* Floating Chat Widget */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <a 
          href="https://wa.me/5581973014080?text=Olá%20Lukas!%20Gostaria%20de%20fazer%20uma%20análise%20do%20meu%20projeto%20para%20um%20site%20premium."
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}
