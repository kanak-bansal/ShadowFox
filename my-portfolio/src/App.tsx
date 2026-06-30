import React, { useState } from 'react';
import { TVFrame } from './components/TVFrame';
import { RemoteControl } from './components/RemoteControl';
import { StaticNoise } from './components/StaticNoise';
import './App.css';

import { HomeChannel } from './channels/Home';
import { AboutChannel } from './channels/About';
import { ProjectsChannel } from './channels/Projects';
import { ExperienceChannel } from './channels/Experience';
import { ContactChannel } from './channels/Contact';

function App() {
  const [isOn, setIsOn] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  const handleTogglePower = () => {
    setIsOn(prev => !prev);
    if (!isOn) {
      triggerStatic();
    }
  };

  const triggerStatic = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // 500ms transition
  };

  const handleChannelChange = (ch: number) => {
    if (!isOn || ch === currentChannel) return;
    triggerStatic();
    setTimeout(() => {
      setCurrentChannel(ch);
      setShowGuide(false);
    }, 250); // switch channel halfway through static
  };

  return (
    <div className="flex-center" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <TVFrame isOn={isOn}>
        <StaticNoise isTransitioning={isTransitioning} />
        {isOn && !isTransitioning && (
          <div className="channel-content" style={{ height: '100%' }}>
            {currentChannel === 1 && <HomeChannel />}
            {currentChannel === 2 && <AboutChannel />}
            {currentChannel === 3 && <ProjectsChannel />}
            {currentChannel === 4 && <ExperienceChannel />}
            {currentChannel === 5 && <ContactChannel />}
          </div>
        )}
      </TVFrame>
      <RemoteControl 
        isOn={isOn}
        onTogglePower={handleTogglePower}
        currentChannel={currentChannel}
        onChannelChange={handleChannelChange}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onGuideToggle={() => setShowGuide(!showGuide)}
      />
    </div>
  );
}

export default App;
