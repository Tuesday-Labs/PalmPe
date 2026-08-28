import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Wallet } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content-center">
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
          <div style={{ 
            position: 'absolute',
            inset: 0,
            borderRadius: '50%', 
            border: '2px solid var(--accent-color)',
            animation: 'breathe 2s ease-in-out infinite'
          }}></div>
          
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            backgroundColor: 'var(--surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            position: 'relative'
          }}>
            <Check size={48} style={{ animation: 'successPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} color="var(--accent-color)" />
          </div>
        </div>
        
        <h2>Identity Verified</h2>
        <p style={{ maxWidth: '300px', margin: '0 auto 32px' }}>
          Your palm biometric signature has been successfully registered and encrypted on the secure enclave.
        </p>
      </div>
      
      <div className="spacer"></div>
      
      <button 
        className="btn btn-primary" 
        onClick={() => navigate('/wallet')}
        style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-color)' }}
      >
        <span className="btn-icon"><Wallet size={20} /></span>
        Access Wallet
      </button>
    </div>
  );
}
