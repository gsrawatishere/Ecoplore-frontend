import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import MyLoader from "../../utils/MyLoader";
import VerifyOTP from "../VerifyOTP";

export function RegisterForm() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleVerifyOTP = async (otp) => {
  
  try {
    const response = await axiosInstance.post("/auth/verify-otp", {
      email: email, 
      otp: otp,
    });
console.log(response);
    
    if (response.status === 200) {
      console.log("OTP Verification Response:", response.data);
      toast.success(response.data);
      setemail("");
      navigate("/login");
    }
  } catch (error) {
    
    if (error.response) {
      
      console.error("Server Error:", error.response.data);
      toast.error(error.response.data || "Failed to verify OTP");
    } else if (error.request) {
      
      console.error("No response from server:", error.request);
      toast.error("No response from server. Please try again.");
    } else {
      
      console.error("Error:", error.message);
      toast.error("Failed to verify OTP: " + error.message);
    }
  }
};

  const handleResendOTP = async () => {
  try {
    const response = await axiosInstance.post("/auth/resend-otp", {
      email: email
    });

    if (response.status === 200) {
      toast.success(response.data);
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data || "Failed to resend OTP");
    } else if (error.request) {
      toast.error("No response from server. Please try again.");
    } else {
      toast.error("Failed to resend OTP: " + error.message);
    }
  }
};

  const handleregister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Field validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmpassword
    ) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }
    if(password.length < 6){
       toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    
    // Password match check
    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/customer/signup", {
        firstName,
        lastName,
        email,
        mobile,
        password,
      });

      if (response.status == 200) {
        toast.success(
          "Customer registered successfully. Please check your email for OTP verification."
        );
        setShowOTP(true);
      }

      // Reset form fields
      setfirstName("");
      setlastName("");
      setmobile("");
      setpassword("");
      setconfirmpassword("");
      setIsLoading(false);
     
    } catch (error) {
  console.log(error);
  
  if (error.response) {
   
    if (error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } 
    
    else if (typeof error.response.data === 'string') {
      toast.error(error.response.data);
    } 
    else {
      toast.error("Something went wrong. Please try again.");
    }
  } else {
    toast.error("Something went wrong. Please try again.");
  }
} finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {/* Logo and Heading */}
          <div className="flex items-center justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              onClick={() => {
                navigate("/");
              }}
              className="w-10 h-10 mr-2 cursor-pointer"
            />
            <h1 className="text-2xl font-bold text-green-700">
              Register as Buyer
            </h1>
          </div>

          {/* Input Fields */}
          <form onSubmit={handleregister} className="space-y-4">
            <input
              required
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              required
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              required
              type="text"
              inputMode="numeric" 
              pattern="[0-9]*" 
              minLength={10}
              maxLength={10}
              value={mobile}
              onChange={(e) => {
                // keep only digits and max 10 chars
                const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                setmobile(val);
              }}
              placeholder="Phone Number"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
            />
            <input
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              required
              onChange={(e) => {
                setconfirmpassword(e.target.value);
              }}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
            >
              Register
            </button>
          </form>

          <div className="text-center text-md  mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              {" "}
              Login
            </Link>
          </div>

          {/* Divider */}
          {/* <div className="flex items-center my-4">
          <hr className="flex-grow border-green-300" />
          <span className="mx-2 text-green-500">or</span>
          <hr className="flex-grow border-green-300" />
        </div> */}

          {/* Google Button */}
          {/* <button
          className="w-full flex items-center justify-center border border-slate-300 text-green-700 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300"
        >
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google"
            className="mr-2"
          />
          Continue with Google
        </button> */}

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-green-300" />
            <span className="mx-2 text-green-500">or</span>
            <hr className="flex-grow border-green-300" />
          </div>

          {/* Become a Greenplore seller */}
          <button
            onClick={() => {
              navigate("/register-seller");
            }}
            type="button"
            className="w-full flex cursor-pointer items-center justify-center border border-slate-300 text-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-300"
          >
            Become a Seller
          </button>
        </div>
        {isLoading && <MyLoader />}
      </div>
      {showOTP && (
        <VerifyOTP
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onClose={() => setShowOTP(false)}
        />
      )}
    </div>
  );
}
