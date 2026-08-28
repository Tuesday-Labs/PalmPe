import { useState, useEffect } from 'react';
import { CreditCard, Smartphone, ChevronRight, Plus, Loader } from 'lucide-react';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load the Razorpay SDK script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async (amount) => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you offline?');
      return;
    }
    
    setIsProcessing(true);

    try {
      // 1. Create Order on our local backend
      // (Change localhost:5000 to your deployed backend URL in production)
      const orderResponse = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount })
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error('Failed to create order. Is your backend running?');
      }

      // 2. Open Razorpay Checkout overlay
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID_HERE', // WARNING: Replace with your actual Test Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PalmPay Wallet',
        description: 'Wallet Recharge',
        image: 'https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/hand.svg', // Simple hand icon
        order_id: orderData.orderId,
        handler: async function (response) {
          // 3. Verify Payment Signature on Backend
          try {
            const verifyResponse = await fetch('http://localhost:5000/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              setBalance(prev => prev + amount);
              alert(`Successfully added ₹${amount} to your wallet!`);
            } else {
              alert('Payment Verification Failed!');
            }
          } catch (err) {
            console.error(err);
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: 'PalmPay User',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#00ffcc' // Matches our neon accent color
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        alert(`Payment Failed: ${response.error.description}`);
      });
      razorpayInstance.open();
      
    } catch (error) {
      console.error(error);
      alert('Error initiating payment. Make sure the Node.js backend is running on port 5000!');
    } finally {
      setIsProcessing(false);
    }
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
      
      <div className="payment-method" onClick={() => handleRazorpayPayment(1000)}>
        <div className="payment-icon" style={{ color: '#00ffcc', borderColor: 'rgba(0,255,204,0.3)' }}>
          {isProcessing ? <Loader className="animate-spin" size={24} /> : <Smartphone size={24} />}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-primary)' }}>PhonePe / UPI</h3>
          <p>Instant digital transfer (₹1000)</p>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </div>
      
      <div className="payment-method" onClick={() => handleRazorpayPayment(2500)}>
        <div className="payment-icon" style={{ color: '#00b3ff', borderColor: 'rgba(0,179,255,0.3)' }}>
          {isProcessing ? <Loader className="animate-spin" size={24} /> : <CreditCard size={24} />}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-primary)' }}>Razorpay Gateway</h3>
          <p>Credit/Debit & Netbanking (₹2500)</p>
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
