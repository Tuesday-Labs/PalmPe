import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, ScanLine } from 'lucide-react';

export default function CapturePage() {
  const navigate = useNavigate();
  const [capturing, setCapturing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Ready to scan");

  const handleCapture = () => {
    setCapturing(true);
    setProgress(0);
    
    // Simulate 15-second capture process for 5 photos
    // 15 seconds total -> 3 seconds per photo
    const totalDuration = 15000;
    const intervalTime = 100; // Update progress every 100ms
    const totalSteps = totalDuration / intervalTime;
    let currentStep = 0;
    
    const statusMessages = [
      "Initializing depth map...",
      "Capturing photo 1/5: Infrared layer",
      "Capturing photo 2/5: Vein topology mapping",
      "Capturing photo 3/5: Liveness detection",
      "Capturing photo 4/5: Thermal calibration",
      "Capturing photo 5/5: Finalizing biometric template",
      "Processing complete."
    ];

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / totalSteps) * 100;
      setProgress(currentProgress);
      
      // Update status message based on progress
      const messageIndex = Math.min(
        Math.floor((currentProgress / 100) * statusMessages.length),
        statusMessages.length - 1
      );
      setStatusText(statusMessages[messageIndex]);
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/success');
        }, 800);
      }
    }, intervalTime);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '24px' }}>
      <div className="content-center">
        <h2 style={{ color: 'var(--text-primary)' }}>Biometric Capture</h2>
        <p style={{ color: 'var(--accent-color)', fontFamily: 'monospace', letterSpacing: '1px', fontSize: '13px' }}>
          {statusText}
        </p>
        
        {/* Futuristic Neuralink/SpaceX inspired Hand Animation */}
        <div style={{ position: 'relative', width: '280px', height: '320px', margin: '20px auto 40px' }}>
          <svg viewBox="0 0 200 240" width="100%" height="100%" style={{ filter: 'drop-shadow(0px 0px 20px rgba(0,255,204,0.1))' }}>
            {/* Outer Target Circle */}
            <circle cx="100" cy="120" r="90" fill="none" stroke="var(--border-focus)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="100" cy="120" r="70" fill="none" stroke="var(--border-color)" strokeWidth="1" />
            
            {/* Hand Outline */}
            <path 
              d="M75 220 L75 130 C75 120, 65 110, 55 100 C45 90, 45 80, 50 75 C55 70, 65 75, 75 90 L85 105 L85 40 C85 30, 95 25, 105 30 L105 100 L105 35 C105 25, 115 20, 125 25 L125 100 L125 45 C125 35, 135 30, 145 35 L145 110 C145 100, 155 95, 165 100 C175 105, 170 120, 160 130 L145 150 L145 220 Z" 
              fill="none" 
              stroke="var(--text-secondary)" 
              strokeWidth="2"
              strokeLinejoin="round"
              className={capturing ? "breathing-element" : ""}
            />
            
            {/* Vein Topology (Only visible/glowing when capturing) */}
            <g opacity={capturing ? "1" : "0.1"} style={{ transition: 'opacity 1s ease' }}>
              <path 
                d="M95 220 C95 180, 85 160, 60 115 M115 220 C115 180, 105 140, 95 70 M130 220 C130 180, 135 140, 150 115" 
                fill="none" 
                stroke="var(--accent-color)" 
                strokeWidth="1.5"
                style={capturing ? { animation: 'dataStream 2s linear infinite', strokeDasharray: '20 10' } : {}}
                filter="drop-shadow(0 0 5px var(--accent-color))"
              />
              <path 
                d="M100 170 C120 150, 120 130, 115 90 M85 150 C75 130, 80 110, 90 90 M115 150 C130 140, 130 120, 135 95" 
                fill="none" 
                stroke="var(--accent-color)" 
                strokeWidth="1"
                style={capturing ? { animation: 'dataStream 3s linear infinite reverse', strokeDasharray: '15 15' } : {}}
              />
            </g>

            {/* Scanning Laser */}
            {capturing && (
              <line x1="10" y1="0" x2="190" y2="0" stroke="var(--accent-color)" strokeWidth="2" filter="drop-shadow(0 0 8px var(--accent-color))">
                <animate attributeName="y1" values="20;220;20" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="20;220;20" dur="3s" repeatCount="indefinite" />
              </line>
            )}
          </svg>
          
          {/* Progress Overlay */}
          {capturing && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.7)', padding: '12px 24px', borderRadius: '30px', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', fontWeight: 'bold', letterSpacing: '2px', backdropFilter: 'blur(5px)' }}>
              {Math.round(progress)}%
            </div>
          )}
        </div>
        
        <div className="glass-panel" style={{ textAlign: 'left', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Biometric Calibration
          </h3>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <li>Hover your palm exactly <span style={{color: 'var(--text-primary)'}}>4-6 inches</span> above the sensor.</li>
            <li>Keep fingers spread naturally.</li>
            <li>Do not move for 15 seconds during the deep scan.</li>
          </ul>
        </div>
        
        {capturing ? (
          <div style={{ width: '100%', marginBottom: '20px' }}>
             <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--surface-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }}></div>
            </div>
          </div>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={handleCapture}
            style={{ backgroundColor: 'var(--accent-color)', color: '#000', fontWeight: '600' }}
          >
            <span className="btn-icon"><ScanLine size={20} /></span>
            Initiate Deep Scan
          </button>
        )}
      </div>
    </div>
  );
}
