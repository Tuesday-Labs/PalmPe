import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { UserPlus, Wallet } from 'lucide-react';
import RegistrationPage from './pages/RegistrationPage';
import CapturePage from './pages/CapturePage';
import SuccessPage from './pages/SuccessPage';
import WalletPage from './pages/WalletPage';

// A component to manage the bottom navigation based on the current route
function NavigationBar() {
  const location = useLocation();
  
  // Hide nav bar on capture and success pages to maintain immersion
  if (location.pathname === '/capture' || location.pathname === '/success') {
    return null;
  }

  return (
    <div className="bottom-nav">
      <Link 
        to="/register" 
        className={`nav-item ${location.pathname === '/register' ? 'active' : ''}`}
      >
        <UserPlus size={24} />
        <span>Register</span>
      </Link>
      
      <Link 
        to="/wallet" 
        className={`nav-item ${location.pathname === '/wallet' ? 'active' : ''}`}
      >
        <Wallet size={24} />
        <span>Wallet</span>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/capture" element={<CapturePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;
