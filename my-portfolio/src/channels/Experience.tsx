import React from 'react';

export function ExperienceChannel() {
  const experiences = [
    { time: '2023 - PRESENT', title: 'Senior Software Engineer', company: 'Tech Innovators Inc.', desc: 'Leading frontend development, migrating legacy apps to modern React stacks.' },
    { time: '2020 - 2023', title: 'Full Stack Developer', company: 'Creative Solutions', desc: 'Built and maintained RESTful APIs and interactive dashboards.' },
    { time: '2018 - 2020', title: 'Junior Web Developer', company: 'StartUp Alpha', desc: 'Developed responsive landing pages and internal tooling.' },
    { time: '2014 - 2018', title: 'B.S. Computer Science', company: 'University of Technology', desc: 'Graduated with honors, specialized in software engineering.' }
  ];

  return (
    <div className="flex-col" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <h1 className="text-cyan display-text" style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid var(--neon-cyan)', paddingBottom: '0.5rem' }}>PROGRAM_GUIDE</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', paddingBottom: '2rem' }}>
        {experiences.map((exp, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            borderBottom: '1px solid #333',
            backgroundColor: idx % 2 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.6)'
          }}>
            <div style={{ 
              width: '150px', 
              padding: '1.5rem 1rem', 
              borderRight: '2px solid var(--neon-magenta)',
              color: 'var(--phosphor-green)',
              fontWeight: 'bold',
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              {exp.time}
            </div>
            <div style={{ padding: '1.5rem 2rem', flex: 1 }}>
              <h3 className="text-magenta display-text" style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{exp.title}</h3>
              <h4 style={{ color: '#ddd', margin: '0 0 1rem 0', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>@ {exp.company}</h4>
              <p style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
