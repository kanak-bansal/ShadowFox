import React, { useState } from 'react';
import { Code, User, Mail } from 'lucide-react';

export function ContactChannel() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:kanak.bansal@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex-col" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <h1 className="text-cyan display-text" style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid var(--neon-magenta)', paddingBottom: '0.5rem' }}>TRANSMISSION</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginTop: '1rem', paddingBottom: '2rem' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 className="text-magenta display-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>SEND_MESSAGE</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="YOUR_NAME" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '2px solid var(--neon-cyan)',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                outline: 'none'
              }}
            />
            <input 
              type="email" 
              placeholder="YOUR_EMAIL" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '2px solid var(--neon-cyan)',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                outline: 'none'
              }}
            />
            <textarea 
              placeholder="YOUR_MESSAGE" 
              required
              rows={5}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '2px solid var(--neon-cyan)',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
            <button type="submit" className="display-text" style={{
              padding: '1rem',
              backgroundColor: 'var(--neon-cyan)',
              color: '#000',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 0 10px var(--neon-cyan)',
              transition: 'all 0.2s ease'
            }}>
              TRANSMIT
            </button>
          </form>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <h2 className="text-green display-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>FREQUENCIES</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="https://github.com/kanak-bansal" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.2rem' }}>
              <Code size={24} className="text-magenta" /> GITHUB
            </a>
            <a href="#" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.2rem' }}>
              <User size={24} className="text-magenta" /> LINKEDIN
            </a>
            <a href="mailto:kanak.bansal@example.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.2rem' }}>
              <Mail size={24} className="text-magenta" /> EMAIL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
