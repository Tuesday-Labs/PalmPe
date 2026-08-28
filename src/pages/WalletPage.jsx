import { useState } from 'react';
import { CreditCard, Smartphone, ChevronRight, Plus, IndianRupee } from 'lucide-react';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);

  const handleAddMoney = (amount) => {
    // Mock functionality for now
    setBalance(prev => prev + amount);
    alert(`Successfully added ₹${amount} to your wallet! (Mock Sandbox)`);
  };

  return (
    <div className="page-container" style={{ padding: '24px 20px' }}>
      <h2 style={{ textAlign: 'left', width: '100%', marginBottom: '24px' }}>My Wallet</h2>
      
      <div className="wallet-card">
        <div className="wallet-balance-label">Available Balance</div>
        <div className="wallet-balance">
          <span style={{ fontSize: '28px', verticalAlign: 'top', marginRight: '4px' }}>₹</span>
          {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
      </div>
      
      <div className="section-title">Add Money</div>
      
      <div className="payment-method" onClick={() => handleAddMoney(1000)}>
        <div className="payment-icon">
          <Smartphone size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>PhonePe / UPI</h3>
          <p>Instant transfer via any UPI app</p>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </div>
      
      <div className="payment-method" onClick={() => handleAddMoney(2500)}>
        <div className="payment-icon">
          <CreditCard size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Razorpay Gateway</h3>
          <p>Credit/Debit Cards & Netbanking</p>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </div>
      
      <div style={{ marginTop: '32px' }}>
        <div className="section-title">Recent Transactions</div>
        
        {balance === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '32px 16px' }}>
            <p style={{ margin: 0 }}>No transactions yet. Add money to get started.</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(52, 199, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success-color)' }}>
                  <Plus size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '15px' }}>Money Added</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Just now</div>
                </div>
              </div>
              <div style={{ fontWeight: '600', color: 'var(--success-color)' }}>+ ₹{balance.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
