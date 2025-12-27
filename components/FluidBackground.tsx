
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FluidBackground: React.FC = () => {
  // Valores de movimento do mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavização do movimento (Spring)
  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Mapeamento para efeito Parallax (Camadas diferentes movem em intensidades diferentes)
  const spotlightX = useTransform(smoothX, (val) => val);
  const spotlightY = useTransform(smoothY, (val) => val);
  
  const starsX = useTransform(smoothX, (val) => val * -0.05);
  const starsY = useTransform(smoothY, (val) => val * -0.05);
  
  const nebulaX = useTransform(smoothX, (val) => val * 0.02);
  const nebulaY = useTransform(smoothY, (val) => val * 0.02);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normaliza a posição para o centro da tela
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020202] overflow-hidden pointer-events-none">
      
      {/* Camada 1: Spotlight Interativo (Segue o mouse) */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(circle 600px at ${50 + (x as number / window.innerWidth * 100)}% ${50 + (y as number / window.innerHeight * 100)}%, rgba(0,210,193,0.12) 0%, transparent 100%)`
          )
        }}
      />

      {/* Camada 2: Nebulosas Fluídas (Parallax Suave) */}
      <motion.div 
        style={{ x: nebulaX, y: nebulaY }}
        className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] bg-[#00D2C1]/5 rounded-full blur-[180px]"
      />

      {/* Camada 3: Estrelas (Parallax Inverso - Brilho Aumentado) */}
      <motion.div 
        style={{ 
          x: starsX, 
          y: starsY,
          backgroundImage: `
            radial-gradient(1.8px 1.8px at 15% 15%, #fff, rgba(255,255,255,0)), 
            radial-gradient(1.2px 1.2px at 40% 30%, #fff, rgba(255,255,255,0)), 
            radial-gradient(2.5px 2.5px at 70% 20%, #00D2C1, rgba(0,210,193,0)), 
            radial-gradient(1.2px 1.2px at 85% 60%, #fff, rgba(255,255,255,0)), 
            radial-gradient(2px 2px at 25% 85%, #fff, rgba(255,255,255,0)), 
            radial-gradient(1.2px 1.2px at 55% 75%, #fff, rgba(255,255,255,0)),
            radial-gradient(1.5px 1.5px at 10% 80%, #00D2C1, rgba(0,210,193,0)),
            radial-gradient(1px 1px at 90% 10%, #fff, rgba(255,255,255,0))
          `,
          backgroundSize: '400px 400px',
        }} 
        className="absolute inset-[-10%] opacity-60" 
      />

      {/* Camada 4: Grão Cinematográfico (Estático para Textura) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Camada 5: Vinheta de Profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

export default FluidBackground;
