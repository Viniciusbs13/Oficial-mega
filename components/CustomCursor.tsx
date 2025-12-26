
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth mouse movement
  const springConfig = { damping: 30, stiffness: 500, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Rotate based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('input') ||
                        target.closest('textarea') ||
                        target.closest('.group'); // Service items etc
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center mix-blend-difference"
      style={{ 
        x, 
        y, 
        translateX: '-50%', 
        translateY: '-50%' 
      }}
    >
      {/* Omega Symbol */}
      <motion.div
        className="font-heading font-bold text-white flex items-center justify-center relative"
        style={{ rotate }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="text-4xl select-none">Ω</span>
        
        {/* Optional glow or ring when hovering */}
        {isHovering && (
          <motion.div 
            layoutId="cursor-ring"
            className="absolute inset-[-12px] border border-white rounded-full opacity-50"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
