/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'span' }) => {
  return (
    <Component className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-[#00D2C1] opacity-70 mix-blend-screen"
        animate={{ 
          x: [-2, 2, -1, 0],
          clipPath: [
            'inset(0 0 0 0)',
            'inset(20% 0 80% 0)',
            'inset(40% 0 10% 0)',
            'inset(0 0 0 0)'
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          repeatDelay: 3,
          times: [0, 0.1, 0.2, 1]
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-purple-500 opacity-70 mix-blend-screen"
        animate={{ 
          x: [2, -2, 1, 0],
           clipPath: [
            'inset(0 0 0 0)',
            'inset(10% 0 60% 0)',
            'inset(80% 0 5% 0)',
            'inset(0 0 0 0)'
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          repeatDelay: 3,
          times: [0, 0.1, 0.2, 1]
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GlitchText;