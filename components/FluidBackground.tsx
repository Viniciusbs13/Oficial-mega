/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-teal-900/20 opacity-40" />
       {/* Animated Orbs */}
       <motion.div 
         className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[100px]"
         animate={{ 
           scale: [1, 1.2, 1],
           opacity: [0.3, 0.5, 0.3],
           x: [0, 50, 0]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
       />
       <motion.div 
         className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-teal-600/10 rounded-full blur-[80px]"
         animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -30, 0]
         }}
         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
       />
    </div>
  );
};

export default FluidBackground;