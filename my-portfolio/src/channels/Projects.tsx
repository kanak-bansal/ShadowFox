import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export function ProjectsChannel() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/kanak-bansal/repos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(search.toLowerCase()) || 
    (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-col" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 className="text-cyan display-text" style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid var(--neon-cyan)', paddingBottom: '0.5rem' }}>PROJECT_ARCHIVE</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="> SEARCH_ARCHIVE..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="display-text"
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'rgba(0, 243, 255, 0.1)',
            border: '2px solid var(--neon-cyan)',
            color: 'var(--neon-cyan)',
            fontSize: '1.5rem',
            outline: 'none',
            textShadow: '0 0 5px var(--neon-cyan)'
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', paddingBottom: '2rem' }}>
        {loading ? (
          <div className="flex-center" style={{ height: '100%', fontSize: '2rem' }}>
            <span className="text-green cursor-blink">&gt; TUNING IN TO SATELLITE...</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredRepos.map(repo => (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  border: '2px solid #333',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0,0,0,0.95)',
                  transition: 'all 0.2s ease',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--neon-magenta)';
                  e.currentTarget.style.boxShadow = '0 0 15px var(--neon-magenta)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--neon-cyan)', fontFamily: 'var(--font-body)', fontWeight: 'bold' }}>{repo.name}</h3>
                  <ExternalLink size={20} style={{ color: 'var(--neon-cyan)' }} />
                </div>
                <p style={{ marginBottom: '1.5rem', color: '#ffffff', minHeight: '3em', fontSize: '1.1rem', lineHeight: '1.6', letterSpacing: '0.5px' }}>{repo.description || 'No description provided.'}</p>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1rem', color: '#ddd', fontWeight: 'bold' }}>
                  {repo.language && <span className="text-green">[{repo.language}]</span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Star size={14} /> {repo.stargazers_count}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><GitFork size={14} /> {repo.forks_count}</span>
                </div>
              </a>
            ))}
            {filteredRepos.length === 0 && !loading && (
              <div className="text-magenta display-text" style={{ textAlign: 'center', fontSize: '2rem', marginTop: '2rem' }}>
                NO SIGNAL DETECTED.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
