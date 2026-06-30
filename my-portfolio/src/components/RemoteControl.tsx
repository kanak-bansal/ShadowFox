import React from 'react';
import { Power, Volume2, VolumeX, Menu } from 'lucide-react';
import './RemoteControl.css';

interface RemoteProps {
  isOn: boolean;
  onTogglePower: () => void;
  currentChannel: number;
  onChannelChange: (ch: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onGuideToggle: () => void;
}

export function RemoteControl({ 
  isOn, 
  onTogglePower, 
  currentChannel, 
  onChannelChange, 
  isMuted, 
  onToggleMute,
  onGuideToggle
}: RemoteProps) {
  return (
    <div className="remote-wrapper">
      <div className="remote-control">
        <div className="remote-brand display-text">R-TRONIC</div>
        
        <div className="remote-section top">
          <button 
            className={`remote-btn power-btn ${isOn ? 'power-on' : ''}`} 
            onClick={onTogglePower}
            aria-label="Power"
          >
            <Power size={24} />
          </button>
        </div>

        <div className="remote-section numpad">
          {[
            { id: 1, label: 'HOME' },
            { id: 2, label: 'ABOUT ME' },
            { id: 3, label: 'PROJECTS' },
            { id: 4, label: 'EXPERIENCE' },
            { id: 5, label: 'CONTACT' }
          ].map((channel) => (
            <button 
              key={channel.id} 
              className={`remote-btn num-btn ${currentChannel === channel.id && isOn ? 'active' : ''}`}
              onClick={() => onChannelChange(channel.id)}
              disabled={!isOn}
            >
              {channel.label}
            </button>
          ))}
        </div>

        <div className="remote-section bottom">
          <button 
            className="remote-btn action-btn" 
            onClick={onToggleMute} 
            disabled={!isOn}
            title="Mute"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button 
            className="remote-btn action-btn" 
            disabled={!isOn} 
            onClick={onGuideToggle}
            title="Guide"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
