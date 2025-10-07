
import React, { useState, useEffect, useRef } from 'react';

const VerifyOTP = ({ onVerify, onResend, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus on the next empty field or last field
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle verify
  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6 && !isExpired) {
      setIsLoading(true);
      try {
        await onVerify?.(otpValue);
      } catch (error) {
        console.error('Verification failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle resend
  const handleResend = async () => {
    setIsLoading(true);
    setTimeLeft(10 * 60);
    setIsExpired(false);
    setOtp(['', '', '', '', '', '']);
    try {
      await onResend?.();
    } catch (error) {
      console.error('Resend failed:', error);
    } finally {
      setIsLoading(false);
    }
    inputRefs.current[0]?.focus();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl  p-8 w-full max-w-md border border-green-200/50">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-gray-600">Enter the 6-digit code sent to your Mail</p>
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isExpired 
              ? 'bg-red-100 text-red-600 border border-red-200' 
              : timeLeft <= 60
                ? 'bg-orange-100 text-orange-600 border border-orange-200'
                : 'bg-green-100 text-green-600 border border-green-200'
          }`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isExpired ? 'OTP Expired' : formatTime(timeLeft)}
          </div>
        </div>

        {/* OTP Input */}
        <div className="flex gap-3 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isExpired || isLoading}
              className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg transition-all duration-200 ${
                isExpired
                  ? 'border-gray-300 bg-gray-100 text-gray-400'
                  : digit
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                    : 'border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200'
              } focus:outline-none`}
            />
          ))}
        </div>

        {/* Error message for expired OTP */}
        {isExpired && (
          <div className="text-center mb-4">
            <p className="text-red-600 text-sm">OTP has expired. Please request a new one.</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={!isOtpComplete || isExpired || isLoading}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              !isOtpComplete || isExpired
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : isLoading
                  ? 'bg-green-400 text-white cursor-wait'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </div>
            ) : (
              'Verify OTP'
            )}
          </button>

          {/* Resend button */}
          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={!isExpired && timeLeft > 0 || isLoading}
              className={`text-sm font-medium transition-colors ${
                !isExpired && timeLeft > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : isLoading
                    ? 'text-green-400'
                    : 'text-green-600 hover:text-green-700 hover:underline'
              }`}
            >
              {isLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>
        </div>

        {/* Help text */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Didn't receive the code? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
