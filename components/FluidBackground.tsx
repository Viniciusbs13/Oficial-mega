
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FluidBackground: React.FC = () => {
  // Mouse tracking para o efeito de profundidade (parallax)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Molas suaves para o movimento não ser "travado"
  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  // Transformações para criar as camadas de profundidade
  const layer1X = useTransform(springX, (v) => v * 15); // Camada mais próxima
  const layer1Y = useTransform(springY, (v) => v * 15);
  const layer2X = useTransform(springX, (v) => v * 10); // Camada média
  const layer2Y = useTransform(springY, (v) => v * 10);
  const layer3X = useTransform(springX, (v) => v * 5);  // Camada de fundo
  const layer3Y = useTransform(springY, (v) => v * 5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normaliza a posição do mouse de -1 a 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Gera 400 estrelas com propriedades aleatórias
  const stars = useMemo(() => {
    return [...Array(400)].map((_, i) => ({
      id: i,
      size: Math.random() * 1.8 + 0.5, // Estrelas bem pequenas
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      layer: Math.floor(Math.random() * 3) // 0, 1 ou 2
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#010101] overflow-hidden pointer-events-none">
       {/* Gradiente de profundidade central com a cor da marca */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,210,193,0.06)_0%,_rgba(0,0,0,1)_100%)]" />

       {/* Nebulosas interativas (Verde Água) */}
       <motion.div 
         style={{ x: layer3X, y: layer3Y }}
         className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] bg-[#00D2C1]/10 rounded-full blur-[160px]"
         animate={{ 
           scale: [1, 1.1, 1],
           opacity: [0.3, 0.5, 0.3],
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
       />

       <motion.div 
         style={{ x: layer2X, y: layer2Y }}
         className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#00D2C1]/5 rounded-full blur-[140px]"
         animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
         }}
         transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
       />

       {/* Camadas de Estrelas Parallax */}
       {[layer1X, layer2X, layer3X].map((lx, idx) => (
         <motion.div 
           key={idx}
           style={{ 
             x: lx, 
             y: idx === 0 ? layer1Y : idx === 1 ? layer2Y : layer3Y,
             scale: 1.1 // Um pouco maior que a tela para não ver a borda ao mover
           }}
           className="absolute inset-[-5%]"
         >
           {stars.filter(s => s.layer === idx).map((star) => (
             <motion.div
               key={star.id}
               className="absolute bg-white rounded-full"
               style={{
                 width: star.size,
                 height: star.size,
                 top: star.top,
                 left: star.left,
                 opacity: star.opacity,
                 boxShadow: star.size > 1.2 ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
               }}
               animate={{
                 opacity: [star.opacity, star.opacity * 0.2, star.opacity],
                 scale: [1, 1.3, 1]
               }}
               transition={{
                 duration: star.duration,
                 repeat: Infinity,
                 delay: star.delay,
                 ease: "easeInOut"
               }}
             />
           ))}
         </motion.div>
       ))}

       {/* Textura de Grão Cinematográfica */}
       <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
       />
    </div>
  );
};

export default FluidBackground;
