import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Step 1 → Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required!");
    setLoading(true);
   try {
    const response = await axiosInstance.post(`/auth/forgot-password/${email}`);
    if(response.status == 200){
        setStep(2);
    }
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error.response?.data || "Failed to send OTP";
  } finally {
      setLoading(false);
    }
  };

  // Step 2 → Reset Password
 const handleResetPassword = async (e) => {
  e.preventDefault();

  if (otp.length !== 6) {
    return toast.error("Enter a valid 6-digit OTP");
  }
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters");
  }

  setLoading(true);
  try {
    // Note: backend expects "newPassword" field
    const res = await axiosInstance.post("auth/reset-password", {
      email,
      otp,
      newPassword: password,
    });

    toast.success(res.data || "Password reset successfully!");
    onClose();
    setEmail("");
    setOtp("");
    setPassword("");
    
  } catch (error) {
    console.error("Reset password failed:", error);
    toast.error(error?.response?.data || "Failed to reset password");
  } finally {
    setLoading(false);
  }
};

onClose = () =>{
    navigate("/login")
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="relative bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-green-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-green-600 hover:text-green-800 text-sm font-medium cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-green-700 text-center mb-6 cursor-pointer">
          Reset Password
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition cursor-pointer"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="text"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 tracking-widest text-center"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;