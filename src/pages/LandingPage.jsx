import { Link } from 'react-router-dom';
import { UserPlus, Wallet, Hand } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section with Animated Hand */}
      <div className="landing-hero">
        <div className="hero-content">
          {/* Logo */}
          <div className="landing-logo">
            <Hand size={40} strokeWidth={1.5} />
          </div>

          <h1 className="landing-title">PalmPay</h1>
          <p className="landing-subtitle">Biometric payment authentication</p>

          {/* Animated Hand Visualization */}
          <div className="hero-hand-container">
            <svg viewBox="0 0 200 240" className="hero-hand-svg">
              {/* Target Rings */}
              <circle cx="100" cy="120" r="95" fill="none" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.3" />
              <circle cx="100" cy="120" r="75" fill="none" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.3" />
              <circle cx="100" cy="120" r="55" fill="none" stroke="var(--border-focus)" strokeWidth="1" strokeDasharray="3 6" className="rotate-slow" />

              {/* Hand Outline - Premium Minimal */}
              <path
                d="M75 220 L75 130 C75 120, 65 110, 55 100 C45 90, 45 80, 50 75 C55 70, 65 75, 75 90 L85 105 L85 40 C85 30, 95 25, 105 30 L105 100 L105 35 C105 25, 115 20, 125 25 L125 100 L125 45 C125 35, 135 30, 145 35 L145 110 C145 100, 155 95, 165 100 C175 105, 170 120, 160 130 L145 150 L145 220 Z"
                fill="none"
                stroke="var(--text-primary)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="breathing-element"
                opacity="0.8"
              />

              {/* Subtle Vein Network */}
              <g opacity="0.15" className="pulse-veins">
                <path d="M95 220 C95 180, 85 160, 60 115 M115 220 C115 180, 105 140, 95 70 M130 220 C130 180, 135 140, 150 115"
                  fill="none"
                  stroke="var(--accent-color)"
                  strokeWidth="1"
                />
                <path d="M100 170 C120 150, 120 130, 115 90 M85 150 C75 130, 80 110, 90 90 M115 150 C130 140, 130 120, 135 95"
                  fill="none"
                  stroke="var(--accent-color)"
                  strokeWidth="0.8"
                />
              </g>

              {/* Scan Line Animation */}
              <line x1="30" y1="60" x2="170" y2="60" stroke="var(--accent-color)" strokeWidth="1.5" opacity="0.6" className="scan-line">
                <animate attributeName="y1" values="40;200;40" dur="4s" repeatCount="indefinite" />
                <animate attributeName="y2" values="40;200;40" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>

          {/* Feature Highlights */}
          <div className="landing-features">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Secure biometric encryption</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Contactless authentication</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Instant payment verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="landing-actions">
        <Link to="/register" className="landing-btn landing-btn-primary">
          <UserPlus size={20} strokeWidth={2} />
          <span>Register</span>
        </Link>

        <Link to="/wallet" className="landing-btn landing-btn-secondary">
          <Wallet size={20} strokeWidth={2} />
          <span>Wallet</span>
        </Link>
      </div>
    </div>
  );
}
