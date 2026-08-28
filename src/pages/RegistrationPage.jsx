import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hand } from 'lucide-react';

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
        <div className="app-logo">
          <Hand size={28} color="var(--accent-color)" />
          <span style={{ background: 'linear-gradient(90deg, #00ffcc, #00b3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PalmPay</span>
        </div>
      </div>
      
      <div className="content-center">
        <h2>Create your Account</h2>
        <p>Enter your details to register for PalmPay biometrics.</p>
        
        <form style={{ width: '100%', marginTop: '16px' }} onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-field"
              placeholder="John"
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
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label className="input-label" htmlFor="phone">Phone Number</label>
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
          
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={!isFormValid}
            type="button"
          >
            <span className="btn-icon"><Hand size={18} /></span>
            Capture Palm Images
          </button>
        </form>
      </div>
    </div>
  );
}
