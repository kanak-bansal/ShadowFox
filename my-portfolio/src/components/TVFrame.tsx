import React, { ReactNode } from 'react';

interface TVFrameProps {
  children: ReactNode;
  isOn: boolean;
}

export function TVFrame({ children, isOn }: TVFrameProps) {
  return (
    <div className="crt-container">
      <div className="scanlines"></div>
      <div className={`crt-screen ${!isOn ? 'screen-off' : ''}`}>
        {children}
      </div>
      {/* Channel Indicator Overlay */}
      {isOn && (
        <div className="channel-indicator display-text text-green" style={{
          position: 'absolute',
          top: '30px',
          right: '40px',
          fontSize: '2rem',
          zIndex: 20,
          pointerEvents: 'none',
          textShadow: '0 0 10px var(--phosphor-green)'
        }}>
          CH-0{/* We will pass channel number here, but let's do it cleanly by putting this in App or passing as prop */}
        </div>
      )}
    </div>
  );
}
