import React from 'react';
import { Code, Database, Globe, Layout, Server, Terminal, Cpu, Layers } from 'lucide-react';

export function AboutChannel() {
  const skills = [
    { name: 'Frontend', icon: <Layout size={32} />, color: 'var(--neon-cyan)' },
    { name: 'Backend', icon: <Server size={32} />, color: 'var(--neon-magenta)' },
    { name: 'Database', icon: <Database size={32} />, color: 'var(--phosphor-green)' },
    { name: 'API', icon: <Globe size={32} />, color: '#ffaa00' },
    { name: 'DevOps', icon: <Terminal size={32} />, color: '#ff0055' },
    { name: 'Architecture', icon: <Layers size={32} />, color: '#aa00ff' },
  ];

  return (
    <div className="flex-col" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <h1 className="text-cyan display-text" style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid var(--neon-magenta)', paddingBottom: '0.5rem' }}>ABOUT_ME</h1>
      
      <div style={{ marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
        <p>
          <span className="text-green">&gt; Initiating bio sequence...</span><br/><br/>
          I am a passionate software developer dedicated to crafting robust, scalable, and visually striking applications. 
          With a strong foundation in modern web technologies and a nostalgic love for retro aesthetics, I bridge the gap between 
          classic design and cutting-edge functionality.
        </p>
      </div>

      <h2 className="text-magenta display-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>CORE_MODULES</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '2rem',
        textAlign: 'center',
        paddingBottom: '2rem'
      }}>
        {skills.map((skill, idx) => (
          <div key={idx} className="flex-col flex-center" style={{
            padding: '1.5rem',
            border: `2px solid ${skill.color}`,
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            boxShadow: `0 0 10px ${skill.color}`,
            gap: '1rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ color: skill.color }}>{skill.icon}</div>
            <div className="display-text" style={{ color: skill.color, fontSize: '1.2rem' }}>{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
