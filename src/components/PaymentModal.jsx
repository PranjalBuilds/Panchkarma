import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, therapyDetails, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', null

  // Indian pricing for different therapies
  const therapyPricing = {
    vamana: 2500,
    virechana: 2000,
    basti: 3000,
    nasya: 1500,
    raktamokshana: 4000
  };

  const basePrice = therapyPricing[therapyDetails?.type] || 2000;
  const gst = Math.round(basePrice * 0.18); // 18% GST
  const totalAmount = basePrice + gst;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Simulate 80% success rate
      const isSuccess = Math.random() > 0.2;
      setPaymentStatus(isSuccess ? 'success' : 'failed');
      setIsProcessing(false);
      
      if (isSuccess) {
        setTimeout(() => {
          onSuccess({
            ...therapyDetails,
            amount: totalAmount,
            paymentId: `PAY_${Date.now()}`,
            status: 'confirmed'
          });
          onClose();
        }, 2000);
      }
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-dark-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-gray-100">
                Payment
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {paymentStatus === null && (
              <>
                {/* Therapy Details */}
                <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {therapyDetails?.type?.charAt(0).toUpperCase() + therapyDetails?.type?.slice(1)} Therapy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {therapyDetails?.date} at {therapyDetails?.time}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {therapyDetails?.duration || 60} minutes
                  </p>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Base Price</span>
                    <span className="font-medium">{formatCurrency(basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                    <span className="font-medium">{formatCurrency(gst)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-dark-600 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Total Amount</span>
                      <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="label">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary-600"
                      />
                      <CreditCard className="text-gray-600 dark:text-gray-400" size={20} />
                      <span className="text-gray-900 dark:text-gray-100">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary-600"
                      />
                      <span className="text-gray-900 dark:text-gray-100">UPI</span>
                    </label>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(totalAmount)}`}
                </button>
              </>
            )}

            {/* Payment Success */}
            {paymentStatus === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your therapy session has been confirmed.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  You will receive a confirmation email shortly.
                </p>
              </div>
            )}

            {/* Payment Failed */}
            {paymentStatus === 'failed' && (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Payment Failed
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  There was an issue processing your payment. Please try again.
                </p>
                <button
                  onClick={() => setPaymentStatus(null)}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
