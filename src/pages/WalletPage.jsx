import { useState, useEffect } from 'react';
import { ChevronLeft, MoreVertical, Plus, CreditCard, Smartphone } from 'lucide-react';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) return alert('Razorpay SDK failed to load.');
    
    setIsProcessing(true);
    const amountToAdd = 2500; // Hardcoded recharge amount for demo

    try {
      const orderResponse = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountToAdd })
      });
      
      const orderData = await orderResponse.json();
      if (!orderData.success) throw new Error('Failed to create order.');

      const options = {
        key: 'rzp_test_TVN7cQAQunN0mM',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PalmPay',
        description: 'Wallet Recharge',
        order_id: orderData.orderId,
        handler: async function (response) {
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
              setBalance(prev => prev + amountToAdd);
            }
          } catch (err) {
            alert('Verification Error');
          }
        },
        theme: { color: '#1d1d1f' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Error initiating payment. Is the backend running?');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '24px 20px', backgroundColor: '#f5f5f7' }}>
      <div className="app-header">
        <div className="back-btn">
          <ChevronLeft size={24} color="var(--text-primary)" />
        </div>
        <div className="header-title">Payment Method</div>
        <div style={{ position: 'absolute', right: 0, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MoreVertical size={20} color="var(--text-primary)" />
        </div>
      </div>

      <div className="payment-list">
        <div className="payment-method" onClick={() => setSelectedMethod('razorpay')}>
          <div className="payment-icon" style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
            <CreditCard size={20} color="#ff522b" />
          </div>
          <div className="payment-info">
            <div className="payment-title">Credit Card</div>
            <div className="payment-subtitle">Via Razorpay Gateway</div>
          </div>
          <div className={`radio-circle ${selectedMethod === 'razorpay' ? 'selected' : ''}`}></div>
        </div>

        <div className="payment-method" onClick={() => setSelectedMethod('upi')}>
          <div className="payment-icon" style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
            <Smartphone size={20} color="#1d1d1f" />
          </div>
          <div className="payment-info">
            <div className="payment-title">UPI App</div>
            <div className="payment-subtitle">Direct Bank Transfer</div>
          </div>
          <div className={`radio-circle ${selectedMethod === 'upi' ? 'selected' : ''}`}></div>
        </div>
        
        <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-secondary" style={{ width: '80%', padding: '12px', fontSize: '13px' }}>
            <Plus size={16} style={{ marginRight: '8px' }} /> Add Payment Method
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: '14px', margin: '24px 0 16px', color: 'var(--text-primary)' }}>Wallet Balance</h3>
      
      <div className="order-summary">
        <div className="summary-row">
          <span>Current Balance</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{balance.toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-row">
          <span>Recharge Amount</span>
          <span>₹2,500.00</span>
        </div>
        <div className="summary-row">
          <span>Tax / Fee</span>
          <span>₹0.00</span>
        </div>
        
        <div className="summary-row total">
          <span>New Balance</span>
          <span className="total-price">
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginRight: '4px' }}>₹</span>
            {(balance + 2500).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handlePayment} style={{ marginTop: '32px' }}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}
