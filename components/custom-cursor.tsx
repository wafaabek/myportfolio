'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      <style>{`
        *{
          cursor: none;
        }
          
      `}</style>
      {isVisible && (
        <>
          <motion.div
            className="fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-50"
            animate={{
              x: mousePosition.x - 6,
              y: mousePosition.y - 6,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 28,
            }}
          />
          <motion.div
            className="fixed w-8 h-8 border-2 border-cyan-400/40 rounded-full pointer-events-none z-[200]"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
          />
        </>
      )}
    </>
  );
}
