import { useState } from 'react';
import { CreditCard, Smartphone, ChevronRight, Plus } from 'lucide-react';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);

  const handleAddMoney = (amount) => {
    // Mock functionality for now
    setBalance(prev => prev + amount);
    alert(`Successfully added ₹${amount} to your wallet! (Mock Sandbox)`);
  };

  return (
    <div className="page-container" style={{ padding: '32px 24px' }}>
      <h2 style={{ textAlign: 'left', width: '100%', marginBottom: '24px', color: 'var(--text-primary)' }}>Wallet</h2>
      
      <div className="wallet-card">
        <div className="wallet-balance-label">Digital Balance</div>
        <div className="wallet-balance">
          <span style={{ fontSize: '24px', verticalAlign: 'top', marginRight: '4px', color: 'var(--accent-color)' }}>₹</span>
          {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
      </div>
      
      <div className="section-title">Recharge Nodes</div>
      
      <div className="payment-method" onClick={() => handleAddMoney(1000)}>
        <div className="payment-icon" style={{ color: '#00ffcc', borderColor: 'rgba(0,255,204,0.3)' }}>
          <Smartphone size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-primary)' }}>PhonePe / UPI</h3>
          <p>Instant digital transfer</p>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </div>
      
      <div className="payment-method" onClick={() => handleAddMoney(2500)}>
        <div className="payment-icon" style={{ color: '#00b3ff', borderColor: 'rgba(0,179,255,0.3)' }}>
          <CreditCard size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-primary)' }}>Razorpay Gateway</h3>
          <p>Credit/Debit & Netbanking</p>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </div>
      
      <div style={{ marginTop: '32px' }}>
        <div className="section-title">Ledger</div>
        
        {balance === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '32px 16px', background: 'transparent' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No transactions yet.</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '0', background: 'transparent', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>
                  <Plus size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '15px', color: 'var(--text-primary)' }}>Fund Injection</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Verified Protocol</div>
                </div>
              </div>
              <div style={{ fontWeight: '400', color: 'var(--accent-color)', fontSize: '16px', letterSpacing: '1px' }}>+ ₹{balance.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
