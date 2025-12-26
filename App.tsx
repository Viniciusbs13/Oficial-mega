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
  Filter,
  Sparkles,
  Cpu,
  Briefcase,
  Quote
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Service, TeamMember } from './types';

// --- Config ---
const WHATSAPP_NUMBER = "5519999592852";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

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

// --- ÁREA PARA EDITAR A EQUIPE (FOTOS) ---
// COLOQUE AS FOTOS DA EQUIPE AQUI EMBAIXO 👇
const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Vinicius',
    role: 'CEO',
    description: 'Visão Estratégica',
    // 👇 1. TROQUE O LINK ABAIXO PELA FOTO DO VINICIUS
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPSsz7UTZA4P6hYo4gjLZsY2fLqSm0U54x92eNwEKEf13FcP5uB71F47N0lTJy1b1kaKzzYgYShdQAEpqEONsB03Zk7gNR7xDYr9xZHdT5bT00w8sdULfTAMhDALcxoO-D91q9L2msuH3tjmq45Up0=w482-h765-s-no-gm?authuser=0'
  },
  {
    id: '2',
    name: 'Mateus',
    role: 'COO',
    description: 'Direção Criativa',
    // 👇 2. TROQUE O LINK ABAIXO PELA FOTO DO MATEUS
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Gustavo',
    role: 'CCO',
    description: 'Novos Negócios',
    // 👇 3. TROQUE O LINK ABAIXO PELA FOTO DO GUSTAVO
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
  }
];

// Extra details for the "Card" effect
const MEMBER_DETAILS: Record<string, { aka: string; power: string; item: string; icon: any }> = {
  '1': { 
    aka: "The Visionary",
    power: "Estratégia de Escala Global",
    item: "Dados & ROI",
    icon: Target
  },
  '2': { 
    aka: "Pixel Perfect",
    power: "Transformar ideias em Ouro",
    item: "Creative Suite",
    icon: Sparkles
  },
  '3': { 
    aka: "The Deal Maker",
    power: "Conexões de Alto Nível",
    item: "Networking 24/7",
    icon: Briefcase
  }
};

// --- ÁREA PARA EDITAR O PORTFÓLIO (HOME) ---
// COMO ADICIONAR IMAGENS NO PORTFÓLIO:
// 1. Se você quiser mostrar um VÍDEO: Coloque o link no campo 'video'.
// 2. Se você quiser mostrar uma IMAGEM: Deixe o campo 'video' vazio ("") e coloque o link da imagem no campo 'image'.

const PROJECTS = [
  {
    id: 1,
    title: "Campanha Destaque",
    category: "Audiovisual",
    // 👇 Link do vídeo atualizado (screenapp)
    video: "https://screenapp.io/app/v/qc5xRmvJxy",
    // 👇 Link da imagem
    image: "" 
  },
  {
    id: 2,
    title: "Fashion Brand",
    category: "Filmmaking & Social",
    // 👇 Link do vídeo
    video: "https://cdn.coverr.co/videos/coverr-walking-in-a-fashion-show-2728/1080p.mp4",
    // 👇 Link da imagem
    image: ""
  },
  {
    id: 3,
    title: "Alpha Construtora",
    category: "Gestão de Tráfego",
    // 👇 Exemplo: Para usar IMAGEM aqui, apague o link do vídeo abaixo e coloque o link da foto em 'image'
    video: "https://cdn.coverr.co/videos/coverr-modern-office-buildings-5477/1080p.mp4",
    image: ""
  },
  {
    id: 4,
    title: "E-Commerce Growth",
    category: "Estratégia de Vendas",
    video: "https://cdn.coverr.co/videos/coverr-people-working-in-office-4668/1080p.mp4",
    image: ""
  }
];

// --- ÁREA PARA EDITAR O PORTFÓLIO COMPLETO ---
// Adicione mais projetos aqui seguindo o mesmo padrão.
const FULL_PORTFOLIO = [
  ...PROJECTS,
  {
    id: 5,
    title: "Urban Style",
    category: "Filmmaking",
    video: "https://cdn.coverr.co/videos/coverr-skateboarding-in-the-city-2362/1080p.mp4",
    image: ""
  },
  {
    id: 6,
    title: "Coffee Roasters",
    category: "Social Media",
    video: "https://cdn.coverr.co/videos/coverr-pouring-latte-art-5022/1080p.mp4",
    image: ""
  },
  {
    id: 7,
    title: "Luxury Estate",
    category: "Drone & Video",
    // Exemplo de item que seria uma IMAGEM (video vazio):
    video: "https://cdn.coverr.co/videos/coverr-drone-shot-of-a-luxury-hotel-5357/1080p.mp4",
    image: ""
  },
  {
    id: 8,
    title: "Fitness Pro",
    category: "Performance Ads",
    video: "https://cdn.coverr.co/videos/coverr-crossfit-ropes-exercise-149/1080p.mp4",
    image: ""
  },
  {
    id: 9,
    title: "Neon Night",
    category: "Event Coverage",
    video: "https://cdn.coverr.co/videos/coverr-dj-playing-music-at-a-club-5371/1080p.mp4",
    image: ""
  }
];

// --- ÁREA PARA EDITAR FEEDBACKS (DEPOIMENTOS) ---
// Adicione aqui os vídeos ou prints de conversas/resultados.
// Escolha 'type': 'video' para vídeos ou 'image' para fotos/prints.
const FEEDBACKS = [
  {
    id: 1,
    type: 'video', // 'video' ou 'image'
    // 👇 Link do vídeo de depoimento
    url: 'https://cdn.coverr.co/videos/coverr-talking-to-camera-in-office-4682/1080p.mp4',
    client: 'Ricardo Silva',
    company: 'CEO @ TechStart',
    text: 'Aumentamos nosso faturamento em 300% com a estratégia da Ômega.'
  },
  {
    id: 2,
    type: 'image',
    // 👇 Link da imagem (Ex: Print de WhatsApp ou foto do cliente)
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    client: 'Ana Beatriz',
    company: 'Fundadora @ Glow Beauty',
    text: 'Profissionalismo impecável. A identidade visual mudou o jogo para nós.'
  },
  {
    id: 3,
    type: 'video',
    url: 'https://cdn.coverr.co/videos/coverr-woman-talking-on-video-call-5367/1080p.mp4',
    client: 'Marcos Oliveira',
    company: 'Diretor @ Alpha Real Estate',
    text: 'A captação de leads qualificados nunca foi tão eficiente.'
  }
];

// --- Componentes ---

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
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    instagram: '',
    nicho: '',
    objetivo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Nova Solicitação via Site Ômega*%0A%0A👤 *Nome:* ${formData.nome}%0A📱 *WhatsApp:* ${formData.whatsapp}%0A📸 *Instagram:* ${formData.instagram}%0A🎯 *Nicho:* ${formData.nicho}%0A🚀 *Objetivo:* ${formData.objetivo}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Disable scroll when overlay is open
  useEffect(() => {
    if (showPortfolio || selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showPortfolio, selectedMember]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#00D2C1] selection:text-black cursor-none">
      <CustomCursor />
      <FluidBackground />
      <AIChat />

      {/* Botão Flutuante Whatsapp - Fixed Position (Bottom Right now) */}
       <a 
         href={WHATSAPP_LINK}
         target="_blank"
         rel="noopener noreferrer"
         className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-14 h-14 bg-[#00D2C1] text-black rounded-full hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00D2C1]/30"
      >
         <ArrowUpRight className="w-7 h-7" />
      </a>

      {/* Navegação - Estilo KOTA */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference">
        <div className="flex items-center gap-6">
           {/* Boxed Logo */}
           <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter border-[3px] border-white px-3 py-1 md:px-4 md:py-2">
             ÔMEGA<span className="text-[#00D2C1]">.</span>
           </div>
           <span className="hidden md:block font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-300 mt-1">
             Est. 2024 : Brasil
           </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Pill Button CTA */}
          <a 
             href={WHATSAPP_LINK}
             target="_blank"
             rel="noopener noreferrer"
             className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold uppercase text-xs tracking-wide hover:bg-[#00D2C1] transition-colors duration-300"
           >
             Falar com a gente <ArrowRight className="w-4 h-4" />
           </a>

           {/* Circle Menu Button */}
           <button 
             onClick={() => setMenuOpen(true)}
             className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group bg-black/20 backdrop-blur-sm"
           >
             <div className="flex flex-col gap-1.5 group-hover:gap-0 transition-all">
               <span className="w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
               <span className="w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
             </div>
           </button>
        </div>
      </nav>

      {/* MENU ESTILO CARD BRANCO */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-0"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white text-black w-full max-w-sm rounded-[1.5rem] p-8 relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar */}
              <button 
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Links */}
              <div className="flex flex-col gap-4 mt-8 mb-8">
                {['Trabalhos', 'Metodologia', 'A Agência', 'Serviços', 'Contato'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-').replace('ê', 'e')}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="text-2xl md:text-3xl font-heading font-bold hover:text-[#00D2C1] transition-colors w-fit bg-transparent text-black"
                  >
                    {item}
                  </motion.a>
                ))}
                {/* Link direto para abrir o portfolio */}
                <motion.button
                    onClick={() => {
                        setMenuOpen(false);
                        setShowPortfolio(true);
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-2xl md:text-3xl font-heading font-bold hover:text-[#00D2C1] transition-colors w-fit bg-transparent text-black text-left"
                  >
                    Portfólio Completo
                  </motion.button>
              </div>

              {/* Botão CTA Estilo Pílula */}
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between w-full px-6 py-4 border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 group bg-transparent text-black"
              >
                <span className="font-medium text-lg">Iniciar Projeto</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.a>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
         
         <div className="flex flex-col justify-center z-10 w-full max-w-[90vw] mx-auto">
            <motion.div 
              style={{ y: heroTextY, opacity: heroOpacity }}
              className="w-full"
            >
               {/* Hierarquia Visual Limpa */}
               <h1 className="flex flex-col items-start">
                  <div className="flex items-center gap-4 mb-2 ml-1 overflow-hidden">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '3rem' }}
                         transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                         className="h-[1px] bg-[#00D2C1]"
                      />
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block text-sm md:text-base font-mono font-bold uppercase tracking-[0.5em] text-[#00D2C1]"
                      >
                        Assessoria
                      </motion.span>
                  </div>
                  <span className="block text-[12vw] md:text-[11vw] font-black uppercase tracking-tighter text-white leading-none -ml-2 mix-blend-exclusion">
                    ÔMEGA<span className="text-[#00D2C1]">.</span>
                  </span>
               </h1>
            </motion.div>
         </div>

         {/* Bottom Info Bar - Border REMOVED */}
         <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            
            {/* Badges */}
            <div className="flex gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00D2C1] rounded-full"></div>
                  <span className="font-mono text-xs md:text-sm font-bold">GOOGLE PARTNER</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00D2C1] rounded-full"></div>
                  <span className="font-mono text-xs md:text-sm font-bold">META ADS</span>
               </div>
            </div>

            {/* Descrição */}
            <div className="flex justify-end">
               <p className="text-lg md:text-xl text-gray-400 leading-tight max-w-md text-left md:text-right">
                 Estratégias de performance para marcas que <span className="text-white font-bold border-b border-[#00D2C1]">lideram o mercado</span>.
               </p>
            </div>
         </div>

      </header>

      {/* SERVICES LIST */}
      <section id="servicos" className="pb-32 relative z-10">
        <div className="relative px-6 md:px-12 mb-12 md:mb-20 pt-24 md:pt-0">
            {/* Título Reduzido e Ajustado */}
            <h2 className="text-[6vw] leading-[0.95] font-heading font-black uppercase tracking-tighter text-white py-4">
                Nossos <br/> 
                <span className="text-[#00D2C1]">Serviços</span>
            </h2>
            
            <div className="absolute right-6 top-1/3 md:right-24 md:top-1/2 -translate-y-1/2 opacity-30">
               <ArrowRight className="w-16 h-16 md:w-24 md:h-24 text-white -rotate-45" />
            </div>
        </div>
        
        <div>
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
          <div className="border-t border-white/20" />
        </div>
      </section>

      {/* WORK GRID (VÍDEOS E IMAGENS) */}
      <section id="trabalhos" className="py-24 md:py-32 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-16 md:mb-20">
          <h2 className="text-[6vw] font-heading font-bold leading-[0.95] uppercase">
            Projetos <br/> <span className="text-[#00D2C1]">Selecionados</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="overflow-hidden rounded-lg mb-6 aspect-[4/5] relative bg-gray-900">
                {project.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  >
                     <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-3xl font-heading font-bold">{project.title}</h3>
              <p className="text-gray-400 mt-2 uppercase text-sm tracking-wider">{project.category}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
            <button 
                onClick={() => setShowPortfolio(true)}
                className="group relative px-8 py-4 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3"
            >
                <span className="font-heading font-bold uppercase tracking-widest text-sm">Ver Portfólio Completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </section>

      {/* SEÇÃO: METODOLOGIA */}
      <section id="metodologia" className="py-24 md:py-32 bg-white text-black relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 items-start">
               <div>
                 <h2 className="text-sm font-mono uppercase tracking-widest mb-6 text-gray-500">Por que a Ômega?</h2>
                 <h3 className="text-4xl md:text-7xl font-heading font-bold leading-[1.1] mb-8">
                   Não somos apenas <br/> uma agência.
                 </h3>
                 <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                   Somos um ecossistema de crescimento. Enquanto o mercado foca em "likes", nós focamos em receita, previsibilidade e construção de autoridade sólida.
                 </p>
               </div>

               <div className="flex flex-col gap-12 mt-8 md:mt-0">
                  {/* Card 1 */}
                  <div className="border-l-2 border-black pl-8 py-2 group hover:pl-12 transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4">
                       <Target className="w-8 h-8 text-[#00D2C1]" />
                       <h4 className="text-2xl font-heading font-bold">Estratégia 360º</h4>
                     </div>
                     <p className="text-gray-600">
                       Integramos tráfego, conteúdo e branding. Não adianta atrair clientes se a sua casa não está pronta para recebê-los.
                     </p>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="border-l-2 border-gray-200 hover:border-black pl-8 py-2 group hover:pl-12 transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4">
                       <BarChart3 className="w-8 h-8 text-[#00D2C1]" />
                       <h4 className="text-2xl font-heading font-bold">Foco em ROI</h4>
                     </div>
                     <p className="text-gray-600">
                       Criatividade sem venda é arte. Nosso foco é performance e retorno sobre o investimento do seu negócio.
                     </p>
                  </div>

                  {/* Card 3 */}
                  <div className="border-l-2 border-gray-200 hover:border-black pl-8 py-2 group hover:pl-12 transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4">
                       <Zap className="w-8 h-8 text-[#00D2C1]" />
                       <h4 className="text-2xl font-heading font-bold">Escala Previsível</h4>
                     </div>
                     <p className="text-gray-600">
                       Implementamos processos validados para que o crescimento da sua empresa não seja uma questão de sorte.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FEEDBACKS / DEPOIMENTOS */}
      <section id="feedbacks" className="py-24 md:py-32 px-6 md:px-12 relative bg-[#050505]">
          <div className="max-w-7xl mx-auto">
              <div className="mb-16 md:mb-24">
                  <h2 className="text-[6vw] leading-[0.95] font-heading font-black uppercase tracking-tighter text-white">
                      Quem confia <br/> <span className="text-[#00D2C1]">Recomenda</span>
                  </h2>
              </div>

              {/* Grid de Feedbacks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {FEEDBACKS.map((item, i) => (
                      <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="relative group"
                      >
                          {/* Media Container (Aspect Ratio Vertical para Mobile/Stories) */}
                          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 mb-6 group-hover:border-[#00D2C1]/30 transition-colors">
                              {item.type === 'video' ? (
                                  <video
                                      controls
                                      className="w-full h-full object-cover"
                                  >
                                      <source src={item.url} type="video/mp4" />
                                  </video>
                              ) : (
                                  <img
                                      src={item.url}
                                      alt={`Feedback de ${item.client}`}
                                      className="w-full h-full object-cover" 
                                  />
                              )}
                              
                              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl"></div>
                          </div>

                          {/* Info */}
                          <div className="pl-2">
                              <div className="mb-4 relative">
                                   <Quote className="absolute -top-2 -left-3 w-4 h-4 text-[#00D2C1]/50 rotate-180" />
                                   <p className="text-lg text-white font-medium italic leading-relaxed opacity-90 pl-3">"{item.text}"</p>
                              </div>
                              <div className="flex flex-col border-l-2 border-[#00D2C1] pl-3">
                                  <span className="text-white font-heading font-bold uppercase tracking-wide text-sm">{item.client}</span>
                                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{item.company}</span>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* TEAM */}
      <section id="a-agencia" className="py-24 md:py-32 bg-[#050505] text-white border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight">As Mentes</h2>
                <p className="mt-4 md:mt-0 max-w-md text-gray-400">
                    Por trás de cada estratégia existe um time obcecado por resultados. <br/>
                    <span className="text-[#00D2C1] text-sm font-bold mt-2 block">CLIQUE NOS CARDS PARA SABER MAIS</span>
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM.map((member) => (
                <motion.div 
                  key={member.id}
                  layoutId={`card-${member.id}`}
                  onClick={() => setSelectedMember(member)}
                  className="relative group cursor-pointer border border-white/10 hover:border-[#00D2C1]/50 bg-white/5 hover:bg-white/10 transition-colors duration-500 p-8 flex flex-col justify-between h-[400px] overflow-hidden rounded-2xl"
                >
                  <div className="z-10 relative h-full flex flex-col">
                    <motion.div layoutId={`role-${member.id}`} className="text-xs font-mono uppercase mb-4 text-[#00D2C1] w-fit">{member.role}</motion.div>
                    <motion.h3 layoutId={`name-${member.id}`} className="text-3xl font-heading font-bold">{member.name}</motion.h3>
                    
                    <div className="mt-auto z-10 relative">
                       <p className="text-sm text-gray-400 border-t border-white/20 pt-4">{member.description}</p>
                    </div>
                  </div>

                  {/* Imagem da Equipe */}
                  <motion.img 
                    layoutId={`image-${member.id}`}
                    src={member.image}
                    className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 object-cover object-top opacity-30 group-hover:opacity-100 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                    style={{ clipPath: 'circle(70% at 80% 80%)' }}
                    alt={member.name}
                  />
                  
                  {/* Tap hint */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* FOOTER / CONTACT FORM */}
      <footer id="contato" className="bg-black text-white py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
           
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Left Side - Title */}
              <div className="lg:w-1/2">
                <h2 className="text-[8vw] lg:text-[5vw] leading-[0.95] font-heading font-black uppercase tracking-tighter mb-8">
                  Vamos<br/>Conversar?
                </h2>
                <p className="text-gray-400 text-lg max-w-md mb-8">
                  Preencha o formulário para iniciarmos um diagnóstico da sua operação. Nossa equipe entrará em contato em breve.
                </p>
                <a href="mailto:assessoriaomega1@gmail.com" className="text-xl border-b border-white/30 pb-2 hover:border-[#00D2C1] hover:text-[#00D2C1] transition-colors">
                   assessoriaomega1@gmail.com
                 </a>
              </div>

              {/* Right Side - Form */}
              <div className="lg:w-1/2 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-[#00D2C1]">Seu Nome</label>
                    <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Como podemos te chamar?" 
                      className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                      required
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="font-mono text-xs uppercase text-[#00D2C1]">WhatsApp</label>
                      <input 
                        type="tel" 
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="(00) 99999-9999" 
                        className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="font-mono text-xs uppercase text-[#00D2C1]">Instagram</label>
                      <input 
                        type="text" 
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="@suaempresa" 
                        className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-[#00D2C1]">Nicho de Atuação</label>
                    <input 
                      type="text" 
                      name="nicho"
                      value={formData.nicho}
                      onChange={handleInputChange}
                      placeholder="Ex: E-commerce, Imobiliária, Infoproduto..." 
                      className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-[#00D2C1]">Objetivo Principal</label>
                    <textarea 
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleInputChange}
                      placeholder="O que você busca com a assessoria?" 
                      rows={3}
                      className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 resize-none transition-colors w-full"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="mt-8 w-full bg-white text-black py-5 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-[#00D2C1] transition-colors duration-300 flex items-center justify-center gap-3 group"
                  >
                    Enviar Proposta
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </button>

                </form>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-mono uppercase mt-24 pt-8 border-t border-white/10">
              <div>
                © 2025 Assessoria Ômega.
              </div>
              <div className="flex gap-6">
                 <a href="#" className="hover:text-white flex items-center gap-2"><Instagram className="w-4 h-4"/> Instagram</a>
                 <a href="#" className="hover:text-white flex items-center gap-2"><Linkedin className="w-4 h-4"/> LinkedIn</a>
              </div>
           </div>
        </div>
      </footer>

      {/* TEAM MEMBER DETAIL MODAL (CARD STYLE) */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setSelectedMember(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <motion.div
                layoutId={`card-${selectedMember.id}`}
                className="relative w-full max-w-md bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
             >
                {/* Decorative Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0a0a0a] to-[#00D2C1]/20 opacity-50" />
                
                {/* Close Button */}
                <button 
                   onClick={() => setSelectedMember(null)}
                   className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                >
                   <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 p-8 flex flex-col items-center text-center h-full">
                    
                    {/* Role Label */}
                    <motion.div 
                        layoutId={`role-${selectedMember.id}`}
                        className="px-4 py-1 rounded-full border border-white/20 bg-white/5 text-[#00D2C1] text-xs font-mono uppercase tracking-widest mb-8 w-fit"
                    >
                       {selectedMember.role}
                    </motion.div>

                    {/* Image */}
                    <motion.img 
                        layoutId={`image-${selectedMember.id}`}
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-48 h-48 rounded-full border-4 border-white/10 overflow-hidden mb-8 relative shadow-[0_0_40px_rgba(0,210,193,0.2)] object-cover object-top"
                    />
                    
                    {/* Name */}
                    <motion.h3 
                       layoutId={`name-${selectedMember.id}`}
                       className="text-4xl font-heading font-bold text-white mb-2"
                    >
                       {selectedMember.name}
                    </motion.h3>

                    {/* AKA */}
                    <motion.p 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.3 }}
                       className="text-purple-400 font-mono text-sm uppercase tracking-wider mb-8"
                    >
                       AKA: {MEMBER_DETAILS[selectedMember.id]?.aka || "The Expert"}
                    </motion.p>
                    
                    {/* Stats / Details */}
                    <div className="w-full bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                         <div className="space-y-6">
                            <motion.div 
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.4 }}
                               className="flex items-start gap-4 text-left"
                            >
                                <div className="p-2 bg-[#00D2C1]/10 rounded-lg text-[#00D2C1]">
                                   {MEMBER_DETAILS[selectedMember.id] ? React.createElement(MEMBER_DETAILS[selectedMember.id].icon, { className: "w-5 h-5" }) : <Target className="w-5 h-5" />}
                                </div>
                                <div>
                                   <span className="block text-xs text-gray-500 font-mono uppercase">Unique Power</span>
                                   <span className="text-white font-medium">{MEMBER_DETAILS[selectedMember.id]?.power || selectedMember.description}</span>
                                </div>
                            </motion.div>

                             <motion.div 
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.5 }}
                               className="flex items-start gap-4 text-left"
                            >
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                   <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                   <span className="block text-xs text-gray-500 font-mono uppercase">Item of Choice</span>
                                   <span className="text-white font-medium">{MEMBER_DETAILS[selectedMember.id]?.item || "MacBook Pro"}</span>
                                </div>
                            </motion.div>
                         </div>
                    </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PORTFOLIO OVERLAY */}
      <AnimatePresence>
        {showPortfolio && (
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                         <div className="font-heading text-xl font-bold tracking-tighter">
                            PORTFÓLIO<span className="text-[#00D2C1]">.</span>
                         </div>
                    </div>
                    <button 
                        onClick={() => setShowPortfolio(false)}
                        className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 md:px-12 py-16 md:py-24 max-w-[90vw] mx-auto">
                    <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter mb-16">
                        Obras <span className="text-[#00D2C1]">Criadas</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {FULL_PORTFOLIO.map((project, i) => (
                             <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group cursor-pointer"
                              >
                                <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-gray-900">
                                    {project.video ? (
                                      <>
                                        <video
                                          autoPlay
                                          muted
                                          loop
                                          playsInline
                                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        >
                                           <source src={project.video} type="video/mp4" />
                                        </video>
                                        {/* Play Icon Overlay only for video */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Play className="w-6 h-6 fill-white text-white ml-1" />
                                            </div>
                                        </div>
                                      </>
                                    ) : (
                                       <img 
                                          src={project.image}
                                          alt={project.title}
                                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                       />
                                    )}

                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-white/10">
                                        {project.category.split(' ')[0]}
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-heading font-bold group-hover:text-[#00D2C1] transition-colors">{project.title}</h3>
                                <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">{project.category}</p>
                             </motion.div>
                        ))}
                    </div>

                     <div className="mt-24 p-12 bg-white/5 rounded-2xl border border-white/10 text-center">
                        <h3 className="text-3xl font-heading font-bold mb-4">Pronto para escalar sua marca?</h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Junte-se ao grupo de empresas que dominam seus nichos através de estratégias validadas.</p>
                        <a 
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00D2C1] text-black rounded-full font-bold uppercase tracking-wide hover:bg-white transition-colors duration-300"
                        >
                            Agendar Reunião <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;