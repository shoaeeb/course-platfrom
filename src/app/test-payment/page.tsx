'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function TestPayment() {
  const { data: session } = useSession();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleTestPayment = async () => {
    if (!session) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    setProcessing(true);

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 100,
        currency: 'INR',
        name: 'Course Platform',
        description: 'Test Payment - ₹1',
        handler: function (response: any) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          setProcessing(false);
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert('Payment failed');
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Test Payment</h1>
      <p className="text-gray-600 mb-6 text-center">Test Razorpay integration with ₹1</p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Test Mode:</strong> This is a test payment of ₹1 to verify Razorpay integration.
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-blue-600 mb-2">₹1</div>
        <p className="text-gray-600">Test Amount</p>
      </div>

      <button
        onClick={handleTestPayment}
        disabled={processing}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {processing ? 'Processing...' : 'Pay ₹1 (Test)'}
      </button>

      {!session && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Please login to test payment
        </p>
      )}
    </div>
  );
}
