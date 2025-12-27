
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  X, 
  Play,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Service, TeamMember } from './types';

// --- Config ---
const WHATSAPP_NUMBER = "5519999592852";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// --- Helper para Vídeos ---
const getEmbedUrl = (url: string) => {
  if (!url) return null;
  const ytMatch = url.match(/(?:https?:\/\/)?map(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=1&modestbranding=1&rel=0&showinfo=0`;
  }
  const igMatch = url.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (igMatch) return `https://www.instagram.com/reel/${igMatch[1]}/embed/`;
  return null;
};

// --- Dados ---

const SERVICES: Service[] = [
  { id: '1', title: 'Tráfego Pago', description: 'Google Ads, Meta Ads & CRM.', icon: ArrowRight },
  { id: '2', title: 'Social Media', description: 'Direção de arte & Estratégia de conteúdo.', icon: ArrowRight },
  { id: '3', title: 'Filmmaking', description: 'Produção audiovisual cinematográfica & Drones.', icon: ArrowRight },
  { id: '4', title: 'Branding', description: 'Posicionamento & Identidade Visual.', icon: ArrowRight },
  { id: '5', title: 'Consultoria Comercial', description: 'Profissionalização de times & Processos de vendas.', icon: ArrowRight }
];

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Vinicius',
    role: 'CEO & FOUNDER',
    description: 'Domínio total em escala de faturamento e ROI estrategicamente focado em resultados.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPSsz7UTZA4P6hYo4gjLZsY2fLqSm0U54x92eNwEKEf13FcP5uB71F47N0lTJy1b1kaKzzYgYShdQAEpqEONsB03Zk7gNR7xDYr9xZHdT5bT00w8sdULfTAMhDALcxoO-D91q9L2msuH3tjmq45Up0=w482-h765-s-no-gm?authuser=0'
  },
  {
    id: '2',
    name: 'Mateus',
    role: 'COO & FOUNDER',
    description: 'Excelência técnica em produções cinematográficas de alto impacto visual.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczO-L8qYIff8oU0VXI5rPsIuZ2cy_WTdOaqOzgJmXuyPAYw7cfCSnMtnJMeZh3tNeoYjbEQzpqUuhbcLegx5DtzGBAnX6WeGmrVf0ONzTGqndJ0Cj-SrrR3N1J7c21-KL6QtGRs0N6Bd8WpbnflLMT6_Qg=w697-h731-s-no-gm?authuser=0'
  },
  {
    id: '3',
    name: 'Gustavo',
    role: 'CCO',
    description: 'Expertise em conexões estratégicas e expansão comercial acelerada.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOFmonk3G_fBkOh2F7DZMSkywOqocKZzbLIA0EhSR64K83olJryrnoTMxH_uWhSGney9wNcbj2VyDNMpl1LNnYkHpMatVtTD2UcpK86qK06KFH3vdu7aMUR-PhQLNpPrQPp9HWWqKablYv5G4qKqma8dA=w640-h641-s-no-gm?authuser=0'
  }
];

const CLIENTS = [
  "JM Odontologia", "Imobiliaria de Santi", "Loft marcenaria", "Studio life", 
  "Coxinharia bem feito", "Montreal", "RE/MAX", "VIRA LATA"
];

const MEMBER_DETAILS: Record<string, { aka: string; specialism: string }> = {
  '1': { aka: "ESTRATEGISTA SÊNIOR", specialism: "Escalabilidade & Performance" },
  '2': { aka: "DIRETOR CRIATIVO", specialism: "Estética & Audiovisual" },
  '3': { aka: "BUSINESS DEVELOPER", specialism: "Networking & Novos Negócios" }
};

const PROJECTS = [
  { id: 1, title: "Social Performance", category: "Audiovisual", video: "https://youtube.com/shorts/6UqZKnCIu40?feature=share", image: "https://img.youtube.com/vi/6UqZKnCIu40/maxresdefault.jpg" },
  { id: 5, title: "Estratégia Viral", category: "Conteúdo impactante", video: "https://youtube.com/shorts/0rJo08oq1Jw", image: "https://img.youtube.com/vi/0rJo08oq1Jw/maxresdefault.jpg" },
  { id: 2, title: "Cobertura de evento", category: "Energia solar", video: "https://youtube.com/shorts/jmu-psaVNko", image: "https://img.youtube.com/vi/jmu-psaVNko/maxresdefault.jpg" },
  { id: 3, title: "Social Media", category: "Conteúdos que geram desejo", video: "https://youtube.com/shorts/Sz9Mix58h2I", image: "https://img.youtube.com/vi/Sz9Mix58h2I/maxresdefault.jpg" }
];

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [consultancyOpen, setConsultancyOpen] = useState(false);
  const [consultancyStep, setConsultancyStep] = useState(1);
  const [isDone, setIsDone] = useState(false);

  const { scrollYProgress } = useScroll();
  
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [formData, setFormData] = useState({ 
    nome: '', 
    whatsapp: '', 
    nicho: '', 
    instagram: '' 
  });

  const [consultancyData, setConsultancyData] = useState({
    nome: '',
    whatsapp: '',
    instagram: '',
    empresa: '',
    localizacao: '',
    oQueVende: '',
    clienteIdeal: '',
    origemClientes: '',
    maiorProblema: '',
    tentativaAnterior: '',
    impedimentoVenda: '',
    meta3Meses: '',
    faturamentoDesejado: '',
    dispostoInvestir: '',
    valorInvestimento: '',
    porqueCrescer: '',
    urgencia: '',
    abertoConsultoria: ''
  });

  const handleSubmitFooter = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Nova Solicitação de Consultoria*\n\n👤 *Nome:* ${formData.nome}\n📱 *WhatsApp:* ${formData.whatsapp}\n🎯 *Nicho:* ${formData.nicho}\n📸 *Instagram:* ${formData.instagram}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleConsultancySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*DIAGNÓSTICO ESTRATÉGICO ÔMEGA*\n\n` +
      `👤 *NOME:* ${consultancyData.nome}\n` +
      `📱 *WHATSAPP:* ${consultancyData.whatsapp}\n` +
      `📸 *INSTAGRAM/SITE:* ${consultancyData.instagram}\n` +
      `🏢 *EMPRESA:* ${consultancyData.empresa}\n` +
      `📍 *LOCAL:* ${consultancyData.localizacao}\n\n` +
      `🔍 *PRODUTO:* ${consultancyData.oQueVende}\n` +
      `🎯 *CLIENTE IDEAL:* ${consultancyData.clienteIdeal}\n` +
      `🌐 *ORIGEM:* ${consultancyData.origemClientes}\n\n` +
      `⚠️ *PROBLEMA:* ${consultancyData.maiorProblema}\n` +
      `🛠️ *JÁ TENTOU:* ${consultancyData.tentativaAnterior}\n` +
      `🛑 *IMPEDIMENTOS:* ${consultancyData.impedimentoVenda}\n\n` +
      `🚀 *METAS (3 meses):* ${consultancyData.meta3Meses}\n` +
      `💰 *FATURAMENTO DESEJADO:* ${consultancyData.faturamentoDesejado}\n\n` +
      `💳 *INVESTIMENTO:* ${consultancyData.dispostoInvestir} (${consultancyData.valorInvestimento})\n\n` +
      `💎 *POR QUE CRESCER:* ${consultancyData.porqueCrescer}\n` +
      `🔥 *URGÊNCIA:* ${consultancyData.urgencia}\n` +
      `✅ *ABERTO A CONSULTORIA:* ${consultancyData.abertoConsultoria}`;

    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
    setIsDone(true);
  };

  useEffect(() => {
    document.body.style.overflow = (selectedMember || menuOpen || consultancyOpen) ? 'hidden' : 'unset';
  }, [selectedMember, menuOpen, consultancyOpen]);

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-[#00D2C1] selection:text-black cursor-none">
      <CustomCursor />
      <FluidBackground />
      <AIChat />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 p-4 md:px-12 md:py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-4 md:gap-6">
           <div className="font-heading text-lg md:text-2xl font-bold tracking-tighter border-[2px] md:border-[3px] border-white px-3 md:px-4 py-1.5 md:py-2">
             ÔMEGA<span className="text-[#00D2C1]">.</span>
           </div>
           <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 mt-1">EST. 2024 : BRASIL</span>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          <button 
            onClick={() => setConsultancyOpen(true)}
            className="flex items-center gap-2 px-3.5 md:px-8 py-2 md:py-3.5 bg-white text-black rounded-full font-bold uppercase text-[8px] md:text-[11px] tracking-[0.1em] hover:bg-[#00D2C1] transition-all duration-300"
          >
             <span className="hidden md:inline">FALAR COM A GENTE</span>
             <span className="md:hidden">CONTATO</span>
             <ArrowRight className="w-2.5 h-2.5 md:w-4 md:h-4 ml-0.5" />
          </button>
          <button onClick={() => setMenuOpen(true)} className="w-9 h-9 md:w-16 md:h-16 rounded-full border border-white/20 flex flex-col gap-1 md:gap-1.5 items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group bg-black/40 backdrop-blur-md">
             <span className="w-4 md:w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
             <span className="w-4 md:w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-14 md:pt-20">
         <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="z-10 w-full max-w-[95vw] mx-auto">
            <div className="flex flex-col items-start">
               <div className="flex items-center gap-3 mb-2 md:mb-4 -translate-y-2 md:-translate-y-5">
                  <motion.div initial={{ width: 0 }} animate={{ width: 30 }} className="md:w-[60px] h-[1px] bg-[#00D2C1]" />
                  <span className="text-[10px] md:text-[14px] font-heading font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-[#00D2C1]">Assessoria</span>
               </div>
               <h1 className="block text-[18vw] md:text-[16vw] font-heading font-black uppercase tracking-tighter text-white leading-[0.8] -ml-1 md:-ml-4 select-none relative">
                 ÔMEGA<span className="inline-block w-[3.5vw] h-[3.5vw] md:w-[3vw] md:h-[3vw] bg-[#00D2C1] ml-[0.5vw] -mb-[0.4vw]"></span>
               </h1>
            </div>
         </motion.div>
         <div className="absolute bottom-10 md:bottom-20 left-6 right-6 md:left-12 md:right-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-end">
            <div className="flex gap-4 md:gap-14 opacity-70">
               <div className="flex items-center gap-2 md:gap-4"><div className="w-2 h-2 md:w-4 md:h-4 bg-[#00D2C1] rounded-full"></div><span className="font-mono text-[8px] md:text-lg font-black tracking-widest uppercase">Expertise Google</span></div>
               <div className="flex items-center gap-2 md:gap-4"><div className="w-2 h-2 md:w-4 md:h-4 bg-[#00D2C1] rounded-full"></div><span className="font-mono text-[8px] md:text-lg font-black tracking-widest uppercase">Estratégia Meta</span></div>
            </div>
            <div className="flex justify-start md:justify-end"><p className="text-base md:text-3xl text-gray-400 leading-snug max-w-[280px] md:max-w-xl text-left md:text-right font-medium">Arquitetura de performance para marcas que <br className="hidden md:block" /><span className="text-white font-bold border-b-2 border-[#00D2C1] pb-1">dominam seu nicho</span>.</p></div>
         </div>
      </header>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-16 md:py-48 border-t border-white/5">
        <div className="px-6 md:px-12 mb-10 md:mb-32">
            <h2 className="text-4xl md:text-[9vw] leading-none font-heading font-black uppercase tracking-tighter text-white">
                NOSSOS <br/> <span className="text-[#00D2C1]">SERVIÇOS</span>
            </h2>
        </div>
        <div>
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id} 
              className="group relative border-t border-white/20 py-8 md:py-24 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between md:items-baseline z-10 relative pointer-events-none">
                <h3 className="text-3xl md:text-8xl font-heading font-bold text-white group-hover:text-[#00D2C1] transition-colors duration-500 uppercase leading-none break-words">
                  {service.title}
                </h3>
                <p className="text-gray-400 mt-2 md:mt-0 font-mono text-[10px] md:text-2xl group-hover:text-white transition-colors duration-300">
                  0{i + 1} — {service.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/20" />
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="trabalhos" className="py-16 md:py-48 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-12 md:mb-32">
          <h2 className="text-4xl md:text-[9vw] font-heading font-black leading-none uppercase tracking-tighter">CASES <br/> <span className="text-[#00D2C1]">DE PERFORMANCE</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 max-w-7xl mx-auto">
          {PROJECTS.map((project, i) => {
            const embedUrl = getEmbedUrl(project.video);
            const isActive = activeProjectId === project.id;
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-48' : ''}`} onClick={() => setActiveProjectId(project.id)}>
                <div className="overflow-hidden rounded-2xl md:rounded-[3rem] mb-6 md:mb-12 aspect-[9/16] relative bg-gray-900 shadow-3xl">
                  {!isActive && (
                    <>
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                         <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-[#00D2C1] transition-all duration-500">
                           <Play className="w-6 h-6 md:w-14 md:h-14 text-white fill-white group-hover:text-[#00D2C1] group-hover:fill-[#00D2C1] translate-x-0.5" />
                         </div>
                      </div>
                      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 z-30 bg-black">
                      <iframe src={embedUrl || ''} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
                      <button onClick={(e) => { e.stopPropagation(); setActiveProjectId(null); }} className="absolute top-4 right-4 z-40 bg-black/60 p-2 rounded-full hover:bg-red-500 transition-colors"><X className="w-6 h-6 text-white" /></button>
                    </div>
                  )}
                </div>
                <h3 className="text-3xl md:text-6xl font-heading font-bold uppercase tracking-tight">{project.title}</h3>
                <p className="text-[#00D2C1] mt-1 md:mt-5 uppercase text-[10px] md:text-lg font-mono font-bold tracking-[0.2em] md:tracking-[0.4em]">{project.category}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CLIENTS MARQUEE SECTION */}
      <section className="py-12 md:py-32 overflow-hidden bg-black/50 border-y border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-16 px-6 md:px-12"
        >
          <span className="text-[#00D2C1] font-mono text-[10px] md:text-xl uppercase tracking-[0.4em] md:tracking-[0.6em] block mb-4 md:mb-8">Marcas que Confiam</span>
        </motion.div>
        
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            className="flex whitespace-nowrap py-3 md:py-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div key={i} className="flex items-center mx-10 md:mx-24">
                <span className="text-3xl md:text-9xl font-heading font-black uppercase text-white/30 hover:text-white transition-colors duration-500 select-none">
                  {client}
                </span>
                <div className="w-2 h-2 md:w-6 md:h-6 bg-[#00D2C1] rounded-full mx-10 md:mx-24 shadow-[0_0_20px_rgba(0,210,193,0.6)]" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TIME SECTION */}
      <section id="time" className="py-16 md:py-48 bg-transparent border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-32 gap-6 md:gap-20">
                <h2 className="text-4xl md:text-[9vw] font-heading font-black uppercase leading-[0.85] tracking-tighter">TIME <br/> <span className="text-[#00D2C1]">ESPECIALISTA</span></h2>
                <p className="max-w-[240px] md:max-w-xl text-gray-400 font-medium text-sm md:text-3xl leading-relaxed">Profissionais de elite focados em resultados exponenciais.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              {TEAM.map((member) => (
                <motion.div key={member.id} layoutId={`card-${member.id}`} onClick={() => setSelectedMember(member)} className="relative group cursor-pointer bg-white/5 rounded-2xl md:rounded-[4rem] overflow-hidden border border-white/10 hover:border-[#00D2C1]/30 transition-all duration-500 aspect-[4/5] flex flex-col">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img layoutId={`image-${member.id}`} src={member.image} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" alt={member.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-14 w-full z-10">
                    <motion.div layoutId={`role-${member.id}`} className="text-[8px] md:text-[14px] font-mono font-black uppercase text-[#00D2C1] tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-4">{member.role}</motion.div>
                    <motion.h3 layoutId={`name-${member.id}`} className="text-2xl md:text-5xl font-heading font-bold uppercase tracking-tight">{member.name}</motion.h3>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contato" className="py-16 md:py-48 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-32">
              <div className="w-full lg:w-[55%]">
                <h2 className="text-4xl md:text-7xl lg:text-[6.5vw] font-heading font-black uppercase tracking-tighter leading-[0.85] mb-6 md:mb-12">
                  PRONTO <br/> PARA <br/> <span className="text-[#00D2C1]">ESCALAR?</span>
                </h2>
                <a href="mailto:assessoriaomega1@gmail.com" className="text-sm md:text-3xl font-bold hover:text-[#00D2C1] transition-colors border-b-2 border-transparent hover:border-[#00D2C1] pb-1 break-all">
                  assessoriaomega1@gmail.com
                </a>
              </div>
              
              <div className="w-full lg:w-[45%] bg-[#0A0A0A]/80 backdrop-blur-md p-8 md:p-20 rounded-2xl md:rounded-[4rem] border border-white/5 shadow-3xl">
                <form onSubmit={handleSubmitFooter} className="flex flex-col gap-6 md:gap-14">
                  <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-14">
                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="Nome Completo" 
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-3 md:py-5 focus:border-[#00D2C1] outline-none text-base md:text-2xl transition-colors placeholder:text-gray-600 font-medium" 
                        required 
                      />
                    </div>
                    <div className="relative group">
                      <input 
                        type="tel" 
                        placeholder="WhatsApp" 
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-3 md:py-5 focus:border-[#00D2C1] outline-none text-base md:text-2xl transition-colors placeholder:text-gray-600 font-medium" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Nicho que trabalha" 
                      value={formData.nicho}
                      onChange={(e) => setFormData({...formData, nicho: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-5 focus:border-[#00D2C1] outline-none text-base md:text-2xl transition-colors placeholder:text-gray-600 font-medium" 
                      required 
                    />
                  </div>

                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Instagram da empresa" 
                      value={formData.instagram}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-3 md:py-5 focus:border-[#00D2C1] outline-none text-base md:text-2xl transition-colors placeholder:text-gray-600 font-medium" 
                      required 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#00D2C1] text-black py-4 md:py-8 rounded-full font-heading font-black uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-white transition-all duration-500 text-xs md:text-xl mt-2 md:mt-8 shadow-[0_0_20px_rgba(0,210,193,0.4)]"
                  >
                    SOLICITAR CONSULTORIA
                  </button>
                </form>
              </div>
           </div>
        </div>
      </footer>

      {/* MEMBER MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedMember(null)}>
             <motion.div layoutId={`card-${selectedMember.id}`} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl bg-[#080808] rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/5 shadow-3xl flex flex-col md:flex-row h-auto max-h-[90vh]">
                
                <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 md:p-4 rounded-full bg-black/40 text-white/50 hover:text-white transition-colors">
                   <X className="w-5 h-5 md:w-8 md:h-8" />
                </button>

                <div className="w-full md:w-[45%] h-48 md:h-full relative bg-black overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                    <motion.img 
                      layoutId={`image-${selectedMember.id}`} 
                      src={selectedMember.image} 
                      className="w-full h-full object-cover object-top" 
                      alt={selectedMember.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
                </div>

                <div className="w-full md:w-[55%] p-8 md:p-20 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-6 md:mb-14">
                      <motion.div layoutId={`role-${selectedMember.id}`} className="text-[#00D2C1] font-mono text-[8px] md:text-xl font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-6">
                        {selectedMember.role}
                      </motion.div>
                      <motion.h3 layoutId={`name-${selectedMember.id}`} className="text-3xl md:text-7xl font-heading font-black text-white mb-2 md:mb-5 uppercase tracking-tighter leading-none">
                        {selectedMember.name}
                      </motion.h3>
                      <p className="text-gray-500 font-mono text-[8px] md:text-xl uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold mb-4 md:mb-12">
                        {MEMBER_DETAILS[selectedMember.id]?.aka}
                      </p>
                      <p className="text-gray-400 text-xs md:text-2xl leading-relaxed max-w-xl mb-6 md:mb-14">
                        {selectedMember.description}
                      </p>
                    </div>
                    <button 
                      onClick={() => window.open(WHATSAPP_LINK, '_blank')} 
                      className="group flex items-center justify-center w-full bg-[#00D2C1] hover:bg-white text-black py-4 md:py-8 rounded-full transition-all duration-500 relative overflow-hidden"
                    >
                      <span className="font-heading font-black uppercase tracking-widest text-xs md:text-xl relative z-10">AGENDAR CONSULTORIA</span>
                      <ChevronRight className="w-4 h-4 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STRATEGIC CONSULTANCY FORM */}
      <AnimatePresence>
        {consultancyOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-3xl overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#080808] rounded-xl md:rounded-[4rem] p-8 md:p-24 border border-white/5 shadow-3xl my-auto"
            >
              <button 
                onClick={() => { setConsultancyOpen(false); setConsultancyStep(1); setIsDone(false); }} 
                className="absolute top-6 right-6 md:top-12 md:right-12 p-3 md:p-6 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
              >
                <X className="w-5 h-5 md:w-10 md:h-10" />
              </button>

              {!isDone ? (
                <form onSubmit={handleConsultancySubmit} className="flex flex-col">
                  {/* Step Indicators */}
                  <div className="flex gap-2 mb-8 md:mb-16">
                    {[1, 2, 3, 4, 5].map(s => (
                      <div key={s} className={`h-1 md:h-2 flex-1 rounded-full transition-all duration-500 ${consultancyStep >= s ? 'bg-[#00D2C1]' : 'bg-white/10'}`} />
                    ))}
                  </div>

                  {/* STEP 1: DADOS BÁSICOS */}
                  {consultancyStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <h2 className="text-3xl md:text-7xl font-heading font-black uppercase mb-8 md:mb-16 text-[#00D2C1]">DADOS BÁSICOS</h2>
                      <div className="grid gap-6 md:gap-10">
                        <input type="text" placeholder="Nome completo" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-lg md:text-3xl" value={consultancyData.nome} onChange={e => setConsultancyData({...consultancyData, nome: e.target.value})} />
                        <input type="tel" placeholder="WhatsApp (com DDD)" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-lg md:text-3xl" value={consultancyData.whatsapp} onChange={e => setConsultancyData({...consultancyData, whatsapp: e.target.value})} />
                        <input type="text" placeholder="Instagram / Site da empresa" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-lg md:text-3xl" value={consultancyData.instagram} onChange={e => setConsultancyData({...consultancyData, instagram: e.target.value})} />
                        <input type="text" placeholder="Nome da empresa" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-lg md:text-3xl" value={consultancyData.empresa} onChange={e => setConsultancyData({...consultancyData, empresa: e.target.value})} />
                        <input type="text" placeholder="Cidade e estado" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-lg md:text-3xl" value={consultancyData.localizacao} onChange={e => setConsultancyData({...consultancyData, localizacao: e.target.value})} />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: DIAGNÓSTICO */}
                  {consultancyStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <h2 className="text-3xl md:text-7xl font-heading font-black uppercase mb-8 md:mb-16 text-[#00D2C1]">DIAGNÓSTICO</h2>
                      <div className="grid gap-6 md:gap-10">
                        <input type="text" placeholder="O que sua empresa vende hoje?" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-base md:text-2xl" value={consultancyData.oQueVende} onChange={e => setConsultancyData({...consultancyData, oQueVende: e.target.value})} />
                        <input type="text" placeholder="Quem é o seu cliente ideal?" required className="bg-transparent border-b border-white/10 py-3 md:py-6 focus:border-[#00D2C1] outline-none text-base md:text-2xl" value={consultancyData.clienteIdeal} onChange={e => setConsultancyData({...consultancyData, clienteIdeal: e.target.value})} />
                        <div className="flex flex-col gap-3">
                           <span className="text-xs md:text-xl uppercase font-bold text-gray-500">De onde vêm seus clientes?</span>
                           <select className="bg-white/5 border border-white/10 p-3 md:p-6 rounded-xl outline-none text-sm md:text-xl" value={consultancyData.origemClientes} onChange={e => setConsultancyData({...consultancyData, origemClientes: e.target.value})}>
                              <option value="">Selecione uma opção...</option>
                              <option value="Indicação">Indicação</option>
                              <option value="Instagram">Instagram</option>
                              <option value="Tráfego pago">Tráfego pago</option>
                              <option value="Google">Google</option>
                              <option value="Outros">Outros / Não sei dizer</option>
                           </select>
                        </div>
                        <textarea placeholder="Qual é o MAIOR problema do seu marketing hoje?" required className="bg-transparent border border-white/10 p-4 md:p-8 rounded-2xl min-h-[100px] md:min-h-[160px] text-sm md:text-xl" value={consultancyData.maiorProblema} onChange={e => setConsultancyData({...consultancyData, maiorProblema: e.target.value})} />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: HISTÓRICO */}
                  {consultancyStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <h2 className="text-3xl md:text-7xl font-heading font-black uppercase mb-8 md:mb-16 text-[#00D2C1]">HISTÓRICO</h2>
                      <div className="grid gap-6 md:gap-10">
                        <textarea placeholder="O que você já tentou fazer para resolver isso?" required className="bg-transparent border border-white/10 p-4 md:p-8 rounded-2xl min-h-[120px] md:min-h-[200px] text-sm md:text-xl" value={consultancyData.tentativaAnterior} onChange={e => setConsultancyData({...consultancyData, tentativaAnterior: e.target.value})} />
                        <textarea placeholder="O que está te impedindo de vender mais hoje?" required className="bg-transparent border border-white/10 p-4 md:p-8 rounded-2xl min-h-[120px] md:min-h-[200px] text-sm md:text-xl" value={consultancyData.impedimentoVenda} onChange={e => setConsultancyData({...consultancyData, impedimentoVenda: e.target.value})} />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: METAS */}
                  {consultancyStep === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <h2 className="text-3xl md:text-7xl font-heading font-black uppercase mb-8 md:mb-16 text-[#00D2C1]">METAS</h2>
                      <div className="grid gap-6 md:gap-10">
                        <input type="text" placeholder="Onde quer chegar em 3 meses?" required className="bg-transparent border-b border-white/10 py-3 md:py-6 outline-none text-base md:text-2xl" value={consultancyData.meta3Meses} onChange={e => setConsultancyData({...consultancyData, meta3Meses: e.target.value})} />
                        <input type="text" placeholder="Média de faturamento desejado/mês?" required className="bg-transparent border-b border-white/10 py-3 md:py-6 outline-none text-base md:text-2xl" value={consultancyData.faturamentoDesejado} onChange={e => setConsultancyData({...consultancyData, faturamentoDesejado: e.target.value})} />
                        <div className="flex flex-col gap-3">
                           <span className="text-xs md:text-xl uppercase font-bold text-gray-500">Disposto a investir em marketing?</span>
                           <select className="bg-white/5 border border-white/10 p-3 md:p-6 rounded-xl outline-none text-sm md:text-xl" value={consultancyData.dispostoInvestir} onChange={e => setConsultancyData({...consultancyData, dispostoInvestir: e.target.value})}>
                              <option value="">Selecione...</option>
                              <option value="Sim">Sim, quero crescer de verdade</option>
                              <option value="Depende">Depende da estratégia</option>
                              <option value="Ainda não">Ainda não tenho orçamento</option>
                           </select>
                        </div>
                        <div className="flex flex-col gap-3">
                           <span className="text-xs md:text-xl uppercase font-bold text-gray-500">Quanto conseguiria investir por mês?</span>
                           <select className="bg-white/5 border border-white/10 p-3 md:p-6 rounded-xl outline-none text-sm md:text-xl" value={consultancyData.valorInvestimento} onChange={e => setConsultancyData({...consultancyData, valorInvestimento: e.target.value})}>
                              <option value="">Selecione...</option>
                              <option value="Até R$500">Até R$500</option>
                              <option value="R$500 a R$1.000">R$500 a R$1.000</option>
                              <option value="R$1.000 a R$2.000">R$1.000 a R$2.000</option>
                              <option value="Acima de R$2.000">Acima de R$2.000</option>
                           </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: DECISÃO */}
                  {consultancyStep === 5 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <h2 className="text-3xl md:text-7xl font-heading font-black uppercase mb-8 md:mb-16 text-[#00D2C1]">FILTRO FINAL</h2>
                      <div className="grid gap-6 md:gap-10">
                        <textarea placeholder="Por que sua empresa merece crescer agora?" required className="bg-transparent border border-white/10 p-4 md:p-8 rounded-2xl min-h-[100px] md:min-h-[160px] text-sm md:text-xl" value={consultancyData.porqueCrescer} onChange={e => setConsultancyData({...consultancyData, porqueCrescer: e.target.value})} />
                        <input type="text" placeholder="Existe urgência? Por quê?" required className="bg-transparent border-b border-white/10 py-3 md:py-6 outline-none text-base md:text-2xl" value={consultancyData.urgencia} onChange={e => setConsultancyData({...consultancyData, urgencia: e.target.value})} />
                        <div className="flex flex-col gap-3">
                           <span className="text-xs md:text-xl uppercase font-bold text-gray-500">Aberto a consultoria estratégica?</span>
                           <div className="flex gap-4 md:gap-8">
                              {["Sim", "Talvez", "Não"].map(opt => (
                                <button key={opt} type="button" onClick={() => setConsultancyData({...consultancyData, abertoConsultoria: opt})} className={`flex-1 p-4 md:p-8 font-bold rounded-xl border transition-all text-xs md:text-2xl ${consultancyData.abertoConsultoria === opt ? 'bg-[#00D2C1] border-[#00D2C1] text-black' : 'border-white/10 hover:border-[#00D2C1]'}`}>{opt}</button>
                              ))}
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* NAV BUTTONS */}
                  <div className="flex justify-between items-center mt-8 md:mt-16">
                    {consultancyStep > 1 && (
                      <button type="button" onClick={() => setConsultancyStep(s => s - 1)} className="flex items-center gap-2 text-white/50 hover:text-white uppercase font-bold text-xs md:text-2xl tracking-widest"><ChevronLeft className="w-5 h-5 md:w-8 md:h-8"/> Voltar</button>
                    )}
                    <div className="flex-1"/>
                    {consultancyStep < 5 ? (
                      <button type="button" onClick={() => setConsultancyStep(s => s + 1)} className="bg-white text-black px-8 md:px-16 py-4 md:py-8 rounded-full font-heading font-black uppercase tracking-widest text-xs md:text-2xl hover:bg-[#00D2C1] transition-all">Próximo</button>
                    ) : (
                      <button type="submit" className="bg-[#00D2C1] text-black px-12 md:px-24 py-4 md:py-10 rounded-full font-heading font-black uppercase tracking-widest text-xs md:text-2xl hover:bg-white transition-all shadow-3xl">Finalizar</button>
                    )}
                  </div>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 md:py-20 flex flex-col items-center">
                   <div className="w-16 h-16 md:w-32 md:h-32 bg-[#00D2C1] rounded-full flex items-center justify-center mb-8 md:mb-16"><CheckCircle2 className="w-10 h-10 md:w-20 md:h-20 text-black" /></div>
                   <h2 className="text-3xl md:text-7xl font-heading font-black uppercase mb-6 md:mb-12 leading-none">DADOS <br/><span className="text-[#00D2C1]">ENVIADOS</span></h2>
                   <p className="text-base md:text-3xl text-gray-400 max-w-2xl mb-12 md:mb-24 italic">“Analisamos pessoalmente cada resposta. Entraremos em contato em breve.”</p>
                   <button onClick={() => { setConsultancyOpen(false); setIsDone(false); setConsultancyStep(1); }} className="border border-white/20 px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-xs md:text-xl">Fechar</button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENU MODAL - Refined spacing for mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[60] flex items-center justify-center p-4" onClick={() => setMenuOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white text-black w-full max-w-lg md:max-w-xl rounded-xl md:rounded-[3rem] p-8 md:p-20 relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 md:top-12 md:right-12 p-3 md:p-6 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all"><X className="w-5 h-5 md:w-10 md:h-10" /></button>
              <div className="flex flex-col gap-3 md:gap-8 mt-6 md:mt-12 mb-10 md:mb-24">
                {['TRABALHOS', 'TIME', 'CONSULTORIA', 'CONTATO'].map((item) => (
                  <motion.button 
                    key={item} 
                    onClick={() => {
                      setMenuOpen(false);
                      if (item === 'CONSULTORIA') { setConsultancyOpen(true); } 
                      else {
                        const id = item.toLowerCase();
                        const el = document.getElementById(id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} 
                    className="text-lg md:text-4xl font-heading font-bold hover:tracking-[0.1em] transition-all uppercase tracking-[0.2em] md:tracking-[0.5em] text-left group flex items-center gap-4 md:gap-8 py-2 md:py-4"
                  >
                    <span>{item}</span>
                    <span className="hidden md:block w-0 h-0.5 bg-black group-hover:w-12 transition-all duration-500" />
                  </motion.button>
                ))}
              </div>
              <a href={WHATSAPP_LINK} target="_blank" className="flex items-center justify-between w-full p-6 md:p-10 bg-black text-white rounded-full font-heading font-black uppercase tracking-widest hover:bg-[#00D2C1] hover:text-black transition-all text-xs md:text-2xl">
                <span>INICIAR PROJETO</span><ArrowRight className="w-5 h-5 md:w-8 md:h-8" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
