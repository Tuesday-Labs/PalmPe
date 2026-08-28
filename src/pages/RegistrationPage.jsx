import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hand, ChevronLeft } from 'lucide-react';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.firstName && formData.lastName && formData.phone.length >= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/capture');
    }
  };

  return (
    <div className="page-container">
      <div className="app-header">
        <div className="back-btn" style={{ visibility: 'hidden' }}>
          <ChevronLeft size={24} />
        </div>
        <div className="header-title" style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Hand size={20} /> PalmPay
        </div>
      </div>
      
      <div className="content-center">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Add Biometrics</h2>
        <p style={{ marginBottom: '32px' }}>Enter your details to register for PalmPay.</p>
        
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          
          <div className="surface-panel" style={{ padding: '24px 20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '20px' }}>User Info</h3>
            
            <div className="input-group">
              <label className="input-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label" htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input-field"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={!isFormValid}
            type="button"
            style={{ opacity: isFormValid ? 1 : 0.5 }}
          >
            Capture Palm Images
          </button>
        </form>
      </div>
    </div>
  );
}
