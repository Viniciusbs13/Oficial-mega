
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  X, 
  Instagram,
  Linkedin,
  ArrowUpRight,
  Target,
  Zap,
  BarChart3,
  Play,
  Sparkles,
  Briefcase,
  Quote,
  Menu
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
  
  // YouTube Detection (incluindo Shorts)
  const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=0&loop=1&playlist=${ytMatch[1]}&controls=0&modestbranding=1&rel=0`;
  
  // Vimeo Detection
  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\bit\d+|\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=0&loop=1`;

  // Instagram Detection
  const igMatch = url.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (igMatch) return `https://www.instagram.com/reel/${igMatch[1]}/embed/`;

  return null;
};

// --- Dados ---

const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Tráfego Pago',
    description: 'Google Ads, Meta Ads & TikTok Ads.',
    icon: ArrowRight 
  },
  {
    id: '2',
    title: 'Social Media',
    description: 'Direção de arte & Estratégia de conteúdo.',
    icon: ArrowRight
  },
  {
    id: '3',
    title: 'Filmmaking',
    description: 'Produção audiovisual cinematográfica.',
    icon: ArrowRight
  },
  {
    id: '4',
    title: 'Branding',
    description: 'Posicionamento & Identidade Visual.',
    icon: ArrowRight
  }
];

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Vinicius',
    role: 'CEO',
    description: 'Visão Estratégica & Performance',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPSsz7UTZA4P6hYo4gjLZsY2fLqSm0U54x92eNwEKEf13FcP5uB71F47N0lTJy1b1kaKzzYgYShdQAEpqEONsB03Zk7gNR7xDYr9xZHdT5bT00w8sdULfTAMhDALcxoO-D91q9L2msuH3tjmq45Up0=w482-h765-s-no-gm?authuser=0'
  },
  {
    id: '2',
    name: 'Mateus',
    role: 'COO',
    description: 'Direção Criativa & Audiovisual',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczO-L8qYIff8oU0VXI5rPsIuZ2cy_WTdOaqOzgJmXuyPAYw7cfCSnMtnJMeZh3tNeoYjbEQzpqUuhbcLegx5DtzGBAnX6WeGmrVf0ONzTGqndJ0Cj-SrrR3N1J7c21-KL6QtGRs0N6Bd8WpbnflLMT6_Qg=w697-h731-s-no-gm?authuser=0'
  },
  {
    id: '3',
    name: 'Gustavo',
    role: 'CCO',
    description: 'Novos Negócios & Estratégia',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOFmonk3G_fBkOh2F7DZMSkywOqocKZzbLIA0EhSR64K83olJryrnoTMxH_uWhSGney9wNcbj2VyDNMpl1LNnYkHpMatVtTD2UcpK86qK06KFH3vdu7aMUR-PhQLNpPrQPp9HWWqKablYv5G4qKqma8dA=w640-h641-s-no-gm?authuser=0'
  }
];

const MEMBER_DETAILS: Record<string, { aka: string; power: string; item: string; icon: any }> = {
  '1': { aka: "The Visionary", power: "Estratégia de Escala Global", item: "Dados & ROI", icon: Target },
  '2': { aka: "Pixel Perfect", power: "Narrativa Audiovisual", item: "Creative Suite", icon: Sparkles },
  '3': { aka: "The Deal Maker", power: "Conexões de Alto Nível", item: "Networking 24/7", icon: Briefcase }
};

const PROJECTS = [
  { 
    id: 1, 
    title: "Performance Criativa", 
    category: "Audiovisual", 
    video: "https://youtube.com/shorts/Ok_daXiL2TQ", 
    image: "https://img.youtube.com/vi/Ok_daXiL2TQ/maxresdefault.jpg" 
  },
  { 
    id: 2, 
    title: "Fashion Brand", 
    category: "Filmmaking & Social", 
    video: "https://cdn.coverr.co/videos/coverr-walking-in-a-fashion-show-2728/1080p.mp4", 
    image: "https://images.unsplash.com/photo-1539109132382-361bd57057e9?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 3, 
    title: "Alpha Construtora", 
    category: "Gestão de Tráfego", 
    video: "https://cdn.coverr.co/videos/coverr-modern-office-buildings-5477/1080p.mp4", 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 4, 
    title: "E-Commerce Growth", 
    category: "Estratégia de Vendas", 
    video: "https://cdn.coverr.co/videos/coverr-people-working-in-office-4668/1080p.mp4", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
  }
];

const ServiceItem: React.FC<{ service: Service, index: number }> = ({ service, index }) => {
  return (
    <motion.div 
      className="group relative border-t border-white/20 py-12 md:py-16 cursor-pointer z-20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-baseline z-10 relative pointer-events-none">
        <h3 className="text-4xl md:text-6xl font-heading font-bold text-white group-hover:text-[#00D2C1] transition-colors duration-500 uppercase leading-none break-words">
          {service.title}
        </h3>
        <p className="text-gray-400 mt-4 md:mt-0 font-mono text-sm md:text-lg group-hover:text-white transition-colors duration-300">
          0{index + 1} — {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [formData, setFormData] = useState({ nome: '', whatsapp: '', instagram: '', nicho: '', objetivo: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Nova Solicitação*%0A👤 *Nome:* ${formData.nome}%0A📱 *WhatsApp:* ${formData.whatsapp}%0A📸 *Instagram:* ${formData.instagram}%0A🎯 *Nicho:* ${formData.nicho}%0A🚀 *Objetivo:* ${formData.objetivo}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
  };

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMember]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#00D2C1] selection:text-black cursor-none">
      <CustomCursor />
      <FluidBackground />
      <AIChat />

      {/* Navegação Principal */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
           <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter border-[3px] border-white px-4 py-2">
             ÔMEGA<span className="text-[#00D2C1]">.</span>
           </div>
           <span className="hidden md:block font-mono text-xs uppercase tracking-[0.2em] text-gray-300 mt-1">
             EST. 2024 : BRASIL
           </span>
        </div>
        
        <div className="flex items-center gap-6">
          <a 
             href={WHATSAPP_LINK}
             target="_blank"
             rel="noopener noreferrer"
             className="hidden md:flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#00D2C1] transition-all duration-300 shadow-xl"
           >
             FALAR COM A GENTE <ArrowRight className="w-4 h-4" />
           </a>

           <button 
             onClick={() => setMenuOpen(true)}
             className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex flex-col gap-1.5 items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group bg-black/40 backdrop-blur-md"
           >
             <span className="w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
             <span className="w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
           </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-black w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 p-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-6 mt-10 mb-12">
                {['Trabalhos', 'Time', 'Contato'].map((item, i) => (
                  <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                    className="text-4xl font-heading font-black hover:text-[#00D2C1] transition-colors bg-transparent text-black uppercase tracking-tighter"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <a href={WHATSAPP_LINK} className="flex items-center justify-between w-full px-8 py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#00D2C1] hover:text-black transition-all group">
                <span>INICIAR PROJETO</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12">
         <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="z-10 w-full max-w-[95vw] mx-auto">
            <h1 className="flex flex-col items-start">
               <div className="flex items-center gap-4 mb-4">
                  <motion.div initial={{ width: 0 }} animate={{ width: 48 }} className="h-[2px] bg-[#00D2C1]" />
                  <span className="text-sm md:text-base font-mono font-black uppercase tracking-[0.5em] text-[#00D2C1]">Assessoria</span>
               </div>
               <span className="block text-[14vw] md:text-[12vw] font-black uppercase tracking-tighter text-white leading-[0.85] -ml-2">
                 ÔMEGA<span className="text-[#00D2C1]">.</span>
               </span>
            </h1>
         </motion.div>

         <div className="absolute bottom-16 left-6 right-6 md:left-12 md:right-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="flex gap-10 opacity-70">
               <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-[#00D2C1] rounded-full"></div>
                  <span className="font-mono text-xs md:text-sm font-black tracking-widest">GOOGLE PARTNER</span>
               </div>
               <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-[#00D2C1] rounded-full"></div>
                  <span className="font-mono text-xs md:text-sm font-black tracking-widest">META ADS</span>
               </div>
            </div>
            <div className="flex justify-end">
               <p className="text-xl md:text-2xl text-gray-400 leading-snug max-w-md text-left md:text-right font-medium">
                 Estratégias de performance para marcas que <br/>
                 <span className="text-white font-bold border-b-2 border-[#00D2C1] pb-1">lideram o mercado</span>.
               </p>
            </div>
         </div>
      </header>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-32 border-t border-white/5">
        <div className="px-6 md:px-12 mb-20">
            <h2 className="text-[7vw] leading-none font-heading font-black uppercase tracking-tighter text-white">
                NOSSOS <br/> <span className="text-[#00D2C1]">SERVIÇOS</span>
            </h2>
        </div>
        <div>
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
          <div className="border-t border-white/20" />
        </div>
      </section>

      {/* PORTFÓLIO - FORMATO 1080x1920 (9:16) */}
      <section id="trabalhos" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="flex flex-col md:flex-row justify-between mb-24">
          <h2 className="text-[7vw] font-heading font-black leading-none uppercase tracking-tighter">
            PROJETOS <br/> <span className="text-[#00D2C1]">DE IMPACTO</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-7xl mx-auto">
          {PROJECTS.map((project, i) => {
            const embedUrl = getEmbedUrl(project.video);
            const isActive = activeProjectId === project.id;
            
            return (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
                onClick={() => setActiveProjectId(project.id)}
              >
                <div className="overflow-hidden rounded-2xl mb-8 aspect-[9/16] relative bg-gray-900 shadow-2xl">
                  {/* Overlay de Play */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors"
                      >
                         <div className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-[#00D2C1] transition-all duration-500">
                           <Play className="w-8 h-8 text-white fill-white group-hover:text-[#00D2C1] group-hover:fill-[#00D2C1] transition-colors translate-x-0.5" />
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Capa do Vídeo */}
                  {!isActive && (
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 z-10"
                    />
                  )}

                  {/* Vídeo / Iframe */}
                  {isActive && (
                    <div className="absolute inset-0 z-30 bg-black">
                      {embedUrl ? (
                        <iframe 
                          src={embedUrl}
                          className="w-full h-full pointer-events-auto"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video 
                          autoPlay 
                          controls 
                          playsInline 
                          className="w-full h-full object-cover"
                        >
                           <source src={project.video} type="video/mp4" />
                        </video>
                      )}
                      {/* Botão para fechar o vídeo e voltar para a capa */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProjectId(null);
                        }}
                        className="absolute top-4 right-4 z-40 bg-black/60 p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="text-4xl font-heading font-bold uppercase tracking-tight">{project.title}</h3>
                <p className="text-[#00D2C1] mt-3 uppercase text-xs font-mono font-bold tracking-[0.3em]">{project.category}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TIME */}
      <section id="time" className="py-32 bg-[#050505] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                <h2 className="text-[7vw] font-heading font-black uppercase leading-[0.85] tracking-tighter">
                  AS <br/> <span className="text-[#00D2C1]">MENTES</span>
                </h2>
                <p className="max-w-xs text-gray-400 font-medium text-lg leading-relaxed">
                  Time obcecado por dados, estética e resultados exponenciais.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM.map((member) => (
                <motion.div 
                  key={member.id} layoutId={`card-${member.id}`} onClick={() => setSelectedMember(member)}
                  className="relative group cursor-pointer bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#00D2C1]/30 transition-all duration-500 aspect-[4/5] flex flex-col shadow-2xl"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img 
                      layoutId={`image-${member.id}`}
                      src={member.image}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                      alt={member.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent opacity-100" />
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                    <motion.div layoutId={`role-${member.id}`} className="text-[10px] font-mono font-black uppercase mb-2 text-[#00D2C1] tracking-[0.4em]">{member.role}</motion.div>
                    <motion.h3 layoutId={`name-${member.id}`} className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight">{member.name}</motion.h3>
                    <p className="text-gray-400 mt-3 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      {member.description}
                    </p>
                  </div>

                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <div className="w-12 h-12 rounded-full bg-[#00D2C1] flex items-center justify-center text-black">
                          <ArrowUpRight className="w-6 h-6" />
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* CONTATO */}
      <footer id="contato" className="bg-black py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-[8vw] lg:text-[6vw] leading-[0.85] font-heading font-black uppercase tracking-tighter mb-12">
                  PRONTO PARA <br/> <span className="text-[#00D2C1]">ESCALAR?</span>
                </h2>
                <div className="flex flex-col gap-4">
                  <a href="mailto:assessoriaomega1@gmail.com" className="text-2xl font-heading font-bold hover:text-[#00D2C1] transition-colors w-fit">
                    assessoriaomega1@gmail.com
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2 bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Seu Nome" className="bg-transparent border-b border-white/10 py-3 focus:border-[#00D2C1] outline-none text-lg transition-all" required />
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="WhatsApp" className="bg-transparent border-b border-white/10 py-3 focus:border-[#00D2C1] outline-none text-lg transition-all" required />
                  </div>
                  <textarea name="objetivo" value={formData.objetivo} onChange={handleInputChange} placeholder="Qual seu objetivo?" rows={2} className="bg-transparent border-b border-white/10 py-3 focus:border-[#00D2C1] outline-none text-lg resize-none transition-all" />
                  <button type="submit" className="w-full bg-[#00D2C1] text-black py-5 rounded-full font-heading font-black uppercase tracking-widest hover:bg-white transition-all text-sm">
                    SOLICITAR CONSULTORIA
                  </button>
                </form>
              </div>
           </div>
        </div>
      </footer>

      {/* MODAL DO TIME */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
             <motion.div layoutId={`card-${selectedMember.id}`} onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-[#080808] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row h-auto max-h-[85vh]"
             >
                <button onClick={() => setSelectedMember(null)} className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#00D2C1] hover:text-black transition-all">
                   <X className="w-4 h-4" />
                </button>

                <div className="md:w-[45%] aspect-[4/5] md:aspect-auto md:h-auto relative bg-black">
                    <motion.img 
                        layoutId={`image-${selectedMember.id}`}
                        src={selectedMember.image}
                        className="w-full h-full object-cover object-top"
                        alt={selectedMember.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent md:hidden" />
                </div>

                <div className="md:w-[55%] p-8 md:p-10 flex flex-col justify-center bg-[#080808]">
                    <motion.div layoutId={`role-${selectedMember.id}`} className="text-[#00D2C1] text-[8px] font-mono font-black uppercase tracking-[0.4em] mb-3">
                       {selectedMember.role}
                    </motion.div>
                    
                    <motion.h3 layoutId={`name-${selectedMember.id}`} className="text-3xl md:text-4xl font-heading font-black text-white mb-1 uppercase tracking-tighter">
                       {selectedMember.name}
                    </motion.h3>

                    <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-6 font-bold">
                       {MEMBER_DETAILS[selectedMember.id]?.aka || "Strategist"}
                    </p>
                    
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#00D2C1]/10 rounded-lg text-[#00D2C1]">
                               {MEMBER_DETAILS[selectedMember.id] ? React.createElement(MEMBER_DETAILS[selectedMember.id].icon, { className: "w-4 h-4" }) : <Target className="w-4 h-4" />}
                            </div>
                            <div>
                               <span className="block text-[7px] text-gray-600 font-mono uppercase tracking-widest mb-0.5">Especialidade</span>
                               <span className="text-white text-sm font-bold uppercase tracking-tight leading-tight">{MEMBER_DETAILS[selectedMember.id]?.power || selectedMember.description}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-white/30">
                               <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                               <span className="block text-[7px] text-gray-600 font-mono uppercase tracking-widest mb-0.5">Foco Principal</span>
                               <span className="text-white text-sm font-bold uppercase tracking-tight leading-tight">{MEMBER_DETAILS[selectedMember.id]?.item || "Data Analysis"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                      onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                      className="mt-8 w-full border border-[#00D2C1]/30 text-[#00D2C1] py-3.5 rounded-full font-mono text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#00D2C1] hover:text-black transition-all"
                    >
                      SOLICITAR AGENDA
                    </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
