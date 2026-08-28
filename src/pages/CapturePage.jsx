import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, Hand } from 'lucide-react';

export default function CapturePage() {
  const navigate = useNavigate();
  const [capturing, setCapturing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCapture = () => {
    setCapturing(true);
    
    // Simulate taking 5 pictures (1 per second)
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setProgress((count / 5) * 100);
      
      if (count >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/success');
        }, 500);
      }
    }, 1000);
  };

  return (
    <div className="page-container">
      <div className="content-center">
        <h2>Capture Palm</h2>
        <p>Follow the instructions to capture your palm.</p>
        
        <div className={`scanner-container ${capturing ? 'animate-pulse-btn' : ''}`} style={{ border: 'none', backgroundColor: 'transparent', height: '260px' }}>
          
          {/* Custom Vector Diagram of the PalmPay Device */}
          <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto' }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.1))' }}>
              {/* Main Body */}
              <path 
                d="M 40 170 L 160 170 C 175 170, 185 155, 185 140 L 175 80 C 165 40, 140 20, 100 20 C 60 20, 35 40, 25 80 L 15 140 C 15 155, 25 170, 40 170 Z" 
                fill="var(--surface-color)" 
                stroke="var(--border-color)" 
                strokeWidth="2"
              />
              
              {/* Pattern on top (subtle) */}
              <path d="M 40 60 Q 50 50 60 60 T 80 60 T 100 60 T 120 60 T 140 60 T 160 60" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeOpacity="0.5"/>
              <path d="M 35 70 Q 45 60 55 70 T 75 70 T 95 70 T 115 70 T 135 70 T 155 70" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeOpacity="0.5"/>
              
              {/* Cameras */}
              {/* Left Camera */}
              <circle cx="65" cy="50" r="12" fill="#2c2c2e" stroke="#8e8e93" strokeWidth="2"/>
              <circle cx="65" cy="50" r="5" fill="#1c1c1e"/>
              <circle cx="62" cy="47" r="2" fill="#ffffff" opacity="0.6"/>
              
              {/* Center IR/Camera */}
              <circle cx="100" cy="50" r="8" fill="#1c1c1e" stroke="#8e8e93" strokeWidth="1.5"/>
              
              {/* Right Camera */}
              <circle cx="135" cy="50" r="12" fill="#2c2c2e" stroke="#8e8e93" strokeWidth="2"/>
              <circle cx="135" cy="50" r="5" fill="#1c1c1e"/>
              <circle cx="132" cy="47" r="2" fill="#ffffff" opacity="0.6"/>

              {/* Screen */}
              <rect x="40" y="90" width="120" height="70" rx="6" fill="#000000" stroke="#38383a" strokeWidth="2"/>
              <rect x="42" y="92" width="116" height="66" rx="4" fill="#0a2a4a"/>
              
              {/* UI inside the screen */}
              <text x="100" y="115" fontSize="10" fill="#2997ff" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">PalmPay</text>
              <rect x="50" y="125" width="45" height="25" rx="3" fill="#004488" stroke="#2997ff" strokeWidth="1"/>
              <rect x="105" y="125" width="45" height="25" rx="3" fill="#004488" stroke="#2997ff" strokeWidth="1"/>
              
              {/* Hand Icon Overlaying */}
              <g transform="translate(76, 30)" opacity={capturing ? "1" : "0.5"} style={{ transition: 'all 0.5s ease', transform: capturing ? 'translate(76px, 10px) scale(1.1)' : 'translate(76px, -10px) scale(1)' }}>
                <circle cx="24" cy="24" r="30" fill="var(--accent-color)" opacity="0.1" />
                <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2 M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6 M10 10.5V5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8 M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" fill="none" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>

              {/* Scanline Animation */}
              {capturing && (
                <rect x="35" y="0" width="130" height="4" fill="var(--accent-color)" opacity="0.8">
                  <animate attributeName="y" values="0;80;0" dur="2s" repeatCount="indefinite" />
                </rect>
              )}
            </svg>
          </div>
        </div>
        
        <div className="glass-panel" style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} color="var(--accent-color)" />
            Instructions
          </h3>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <li>Hover your palm <strong>4-6 inches</strong> above the device sensors.</li>
            <li>Keep your fingers slightly spread apart.</li>
            <li>Hold steady while the scanner reads your palm.</li>
            <li>Wait for the confirmation on the device screen.</li>
          </ul>
        </div>
        
        {capturing && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              <span>Scanning...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--accent-color)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="spacer"></div>
      
      <button 
        className="btn btn-primary" 
        onClick={handleCapture}
        disabled={capturing}
      >
        <span className="btn-icon"><Camera size={20} /></span>
        {capturing ? 'Capturing...' : 'Start Capture'}
      </button>
    </div>
  );
}
