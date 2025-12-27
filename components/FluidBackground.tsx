
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020202] overflow-hidden pointer-events-none">
       {/* Camada 1: Profundidade e Cor de Marca */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,210,193,0.06)_0%,_rgba(0,0,0,1)_100%)]" />

       {/* Camada 2: Nebulosas Fluídas (CSS Animado para não travar) */}
       <motion.div 
         animate={{ 
           scale: [1, 1.1, 1],
           opacity: [0.3, 0.4, 0.3],
           x: [-20, 20, -20],
           y: [-10, 10, -10]
         }}
         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
         className="absolute top-[-20%] left-[-10%] w-[120vw] h-[120vw] bg-[#00D2C1]/10 rounded-full blur-[180px]"
       />

       <motion.div 
         animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.3, 0.2],
            x: [20, -20, 20],
            y: [10, -10, 10]
         }}
         transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
         className="absolute bottom-[-20%] right-[-10%] w-[100vw] h-[100vw] bg-[#00D2C1]/5 rounded-full blur-[150px]"
       />

       {/* Camada 3: Estrelas "Elite" (Única camada de background para performance extrema) */}
       <div className="absolute inset-[-10%] opacity-40" style={{ 
         backgroundImage: `radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), 
                          radial-gradient(1.2px 1.2px at 40px 70px, #fff, rgba(0,0,0,0)), 
                          radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)), 
                          radial-gradient(1.5px 1.5px at 90px 40px, #fff, rgba(0,0,0,0)), 
                          radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)), 
                          radial-gradient(1.2px 1.2px at 160px 120px, #ddd, rgba(0,0,0,0))`,
         backgroundSize: '350px 350px',
         animation: 'bg-parallax 120s linear infinite'
       }} />

       {/* Camada 4: Grão Cinematográfico Premium */}
       <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
       />

       <style>{`
         @keyframes bg-parallax {
           from { transform: translateY(0); }
           to { transform: translateY(-350px); }
         }
       `}</style>
    </div>
  );
};

export default FluidBackground;