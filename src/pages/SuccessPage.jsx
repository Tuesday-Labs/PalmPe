import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}>
      
      <div className="modal-content">
        <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 24px' }}>
          {/* 3D Checkmark container mimicking the reference */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
            boxShadow: '10px 10px 20px rgba(0,0,0,0.1), -10px -10px 20px #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '8px solid #333'
          }}>
            <Check size={40} color="#333" strokeWidth={3} />
          </div>
          
          {/* Confetti dots (simple CSS representation) */}
          <div style={{ position: 'absolute', width: '4px', height: '4px', borderRadius: '50%', background: '#ccc', top: '10px', left: '-10px' }}></div>
          <div style={{ position: 'absolute', width: '3px', height: '3px', borderRadius: '50%', background: '#ccc', top: '-5px', right: '10px' }}></div>
          <div style={{ position: 'absolute', width: '5px', height: '5px', borderRadius: '50%', background: '#ccc', bottom: '10px', right: '-20px' }}></div>
        </div>
        
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Biometrics Added<br/>Successfully!</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
          Your palm has been saved. We're getting everything ready for your secure payments.
        </p>
        
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/wallet')}
          style={{ marginBottom: '12px', marginTop: 0 }}
        >
          Go to Wallet
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/register')}
          style={{ marginTop: 0, backgroundColor: '#f2f2f7' }}
        >
          Add Another Palm
        </button>
      </div>
      
    </div>
  );
}
