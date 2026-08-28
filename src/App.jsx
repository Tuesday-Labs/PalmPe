import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import CapturePage from './pages/CapturePage';
import SuccessPage from './pages/SuccessPage';
import WalletPage from './pages/WalletPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/capture" element={<CapturePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
