import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function HomeChannel() {
  const tagline = "> SYSTEM.READY // INITIALIZING CREATIVE PROTOCOLS...";
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(tagline.slice(0, i));
      i++;
      if (i > tagline.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-col flex-center" style={{ height: '100%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Animated Background Grid */}
      <div className="synthwave-grid-container">
        <div className="synthwave-grid"></div>
      </div>

      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
      <motion.h1 
        className="text-cyan display-text glitch-hover" 
        style={{ fontSize: '5rem', margin: 0, textShadow: '0 0 10px var(--neon-cyan)', cursor: 'crosshair' }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        KANAK BANSAL
      </motion.h1>
      
      <motion.h2 
        className="text-magenta" 
        style={{ fontSize: '2.5rem', margin: 0 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        SOFTWARE DEVELOPER
      </motion.h2>

      <motion.div 
        style={{ 
          marginTop: '2rem', 
          fontSize: '1.4rem', 
          minHeight: '1.5em',
          backgroundColor: 'rgba(0, 243, 255, 0.05)',
          padding: '1rem 2rem',
          border: '1px solid rgba(0, 243, 255, 0.3)',
          borderRadius: '5px',
          boxShadow: 'inset 0 0 10px rgba(0, 243, 255, 0.1)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-green">{displayText}</span>
        <span className="text-green cursor-blink">_</span>
      </motion.div>
      </div>
    </div>
  );
}
