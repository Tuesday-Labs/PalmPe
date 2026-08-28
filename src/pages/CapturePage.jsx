import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ScanLine } from 'lucide-react';

export default function CapturePage() {
  const navigate = useNavigate();
  const [capturing, setCapturing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCapture = () => {
    setCapturing(true);
    setProgress(0);
    
    const totalDuration = 5000; // 5 seconds for a smoother, premium feel
    const intervalTime = 50;
    const totalSteps = totalDuration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / totalSteps) * 100;
      setProgress(currentProgress);
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/success');
        }, 400);
      }
    }, intervalTime);
  };

  return (
    <div className="page-container" style={{ backgroundColor: '#ffffff' }}>
      <div className="app-header">
        <div className="back-btn" onClick={() => navigate('/register')}>
          <ChevronLeft size={24} color="var(--text-primary)" />
        </div>
        <div className="header-title">Add Palm</div>
        <div style={{ position: 'absolute', right: 0, width: '40px', height: '40px' }}></div>
      </div>
      
      <div className="content-center">
        
        {/* Elegant Minimalist Hand Vector */}
        <div style={{ position: 'relative', width: '240px', height: '300px', margin: '40px auto' }}>
          <svg viewBox="0 0 200 240" width="100%" height="100%">
            
            {/* Soft background target circle */}
            <circle cx="100" cy="120" r="90" fill="var(--surface-input)" />
            
            {/* Elegant Hand Outline (SF Symbol style) */}
            <path 
              d="M75 220 L75 130 C75 120, 65 110, 55 100 C45 90, 45 80, 50 75 C55 70, 65 75, 75 90 L85 105 L85 40 C85 30, 95 25, 105 30 L105 100 L105 35 C105 25, 115 20, 125 25 L125 100 L125 45 C125 35, 135 30, 145 35 L145 110 C145 100, 155 95, 165 100 C175 105, 170 120, 160 130 L145 150 L145 220 Z" 
              fill={capturing ? "var(--accent-light)" : "#ffffff"} 
              stroke="var(--text-primary)" 
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ transition: 'all 0.5s ease' }}
            />
            
            {/* Premium scanning line */}
            {capturing && (
              <line x1="20" y1="0" x2="180" y2="0" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round">
                <animate attributeName="y1" values="30;210;30" dur="2s" repeatCount="indefinite" ease="ease-in-out"/>
                <animate attributeName="y2" values="30;210;30" dur="2s" repeatCount="indefinite" ease="ease-in-out"/>
              </line>
            )}
          </svg>
        </div>
        
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
          {capturing ? 'Hold Steady' : 'Align Palm'}
        </h2>
        <p style={{ maxWidth: '280px', margin: '0 auto 32px' }}>
          {capturing 
            ? 'We are capturing your biometric signature. Please do not move.' 
            : 'Position your hand 4 inches above the scanner with fingers spread.'}
        </p>
        
        <div className="spacer"></div>
        
        {capturing ? (
          <div style={{ width: '100%', padding: '0 20px', marginBottom: '20px' }}>
             <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--surface-input)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--accent-color)', borderRadius: '3px', transition: 'width 0.1s linear' }}></div>
            </div>
          </div>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={handleCapture}
            style={{ backgroundColor: 'var(--text-primary)' }}
          >
            Start Capture
          </button>
        )}
      </div>
    </div>
  );
}
