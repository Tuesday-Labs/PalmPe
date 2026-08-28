import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Wallet } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content-center">
        <div className="scanner-container success" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(52, 199, 89, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Check size={64} className="success-icon" />
          </div>
        </div>
        
        <h2>Registration Complete</h2>
        <p style={{ maxWidth: '300px', margin: '0 auto 32px' }}>
          Your palm biometric data has been successfully registered and securely stored on the device.
        </p>
        
        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Ready to use PalmPay!</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
            You can now make payments effortlessly just by hovering your palm over our scanners.
          </p>
        </div>
      </div>
      
      <div className="spacer"></div>
      
      <button 
        className="btn btn-primary" 
        onClick={() => navigate('/wallet')}
      >
        <span className="btn-icon"><Wallet size={20} /></span>
        Go to Wallet
      </button>
    </div>
  );
}
