import React, { useState } from "react";
import logo from "../../assets/Images/logo.png";
import { ArrowLeft } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import MyLoader from "../../utils/MyLoader";
import VerifyOTP from "../VerifyOTP";

const SellerRegisterWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  // Added state to hold validation errors
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    GSTNumber: "",
    mobileNo: "",
    buildingNo: "",
    street: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
    fullName: "",
    accountNo: "",
    IFSCCode: ""
  });

  //verify otp
  const handleVerifyOTP = async (otp) => {
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        otp: otp,
      });
      console.log(response);

      if (response.status === 200) {
        console.log("OTP Verification Response:", response.data);
        toast.success(response.data);
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
        email: formData.email
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

  // Modified handleChange to clear errors when the user starts typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/seller/signup",
        formData
      );
      if (response.status === 200) {
        toast.success(
          "Seller registered successfully. Please check your email for OTP verification."
        );
        setShowOTP(true);
      }
      console.log("✅ Registered successfully:", response.data);

    } catch (error) {
      console.error("❌ Registration failed:", error);

      const backendMsg =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.msg;

      toast.error(backendMsg || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
        setStep(step - 1);
        setErrors({}); // Clear errors when going back
    }
  };

  // Enhanced validation function for all fields
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid.";

        if (!formData.password) newErrors.password = "Password is required.";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
        
        if (!formData.companyName) newErrors.companyName = "Company name is required.";

        if (!formData.GSTNumber) newErrors.GSTNumber = "GST Number is required.";
        // Regex for Indian GST Number validation
        else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/i.test(formData.GSTNumber)) newErrors.GSTNumber = "Invalid GST Number format.";
        
        if (!formData.mobileNo) newErrors.mobileNo = "Phone number is required.";
        else if (formData.mobileNo.length !== 10) newErrors.mobileNo = "Phone number must be 10 digits.";

    } else if (step === 2) {
        if (!formData.buildingNo) newErrors.buildingNo = "Building number is required.";
        if (!formData.street) newErrors.street = "Street is required.";
        if (!formData.landmark) newErrors.landmark = "Landmark is required.";
        if (!formData.city) newErrors.city = "City is required.";

        if (!formData.pinCode) newErrors.pinCode = "Pin code is required.";
        else if (formData.pinCode.length !== 6) newErrors.pinCode = "Pin code must be 6 digits.";

        if (!formData.state) newErrors.state = "Please select a state.";

    } else if (step === 3) {
        if (!formData.fullName) newErrors.fullName = "Full name is required.";
        
        if (!formData.accountNo) newErrors.accountNo = "Account number is required.";
        else if (!/^\d+$/.test(formData.accountNo)) newErrors.accountNo = "Account number must contain only digits.";
        
        if (!formData.IFSCCode) newErrors.IFSCCode = "IFSC code is required.";
        // Regex for Indian IFSC code validation
        else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSCCode)) newErrors.IFSCCode = "Invalid IFSC Code format.";
    }

    setErrors(newErrors);
    // Returns true if the newErrors object is empty, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    // validateStep now returns true or false
    if (!validateStep()) {
      toast.error("Please fix the errors before proceeding.")
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  // Helper function to create input class names with error styling
  const getInputClass = (fieldName) => 
    `w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
      errors[fieldName] ? 'border-red-500' : 'border-slate-300'
    }`;
  
  // Helper function to render error messages
  const renderError = (fieldName) =>
    errors[fieldName] && <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>;


  const steps = {
    1: (
      <>
        <div>
            <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className={getInputClass("email")}
            />
            {renderError("email")}
        </div>

        <div>
            <input
            name="mobileNo"
            value={formData.mobileNo}
            onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                handleChange({ target: { name: "mobileNo", value: val } });
            }}
            placeholder="Phone Number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            required
            className={getInputClass("mobileNo")}
            />
            {renderError("mobileNo")}
        </div>

        <div>
            <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            type="text"
            required
            className={getInputClass("companyName")}
            />
            {renderError("companyName")}
        </div>
        
        <div>
            <input
            name="GSTNumber"
            value={formData.GSTNumber}
            onChange={handleChange}
            placeholder="GST Number"
            type="text"
            required
            className={getInputClass("GSTNumber")}
            />
            {renderError("GSTNumber")}
        </div>

        <div>
            <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            className={getInputClass("password")}
            />
            {renderError("password")}
        </div>
      </>
    ),
    2: (
      <>
        <div>
            <input
            name="buildingNo"
            value={formData.buildingNo}
            onChange={handleChange}
            placeholder="Building No"
            type="text"
            required
            className={getInputClass("buildingNo")}
            />
            {renderError("buildingNo")}
        </div>

        <div>
            <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            type="text"
            required
            className={getInputClass("street")}
            />
            {renderError("street")}
        </div>

        <div>
            <input
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Landmark"
            type="text"
            required
            className={getInputClass("landmark")}
            />
            {renderError("landmark")}
        </div>

        <div>
            <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            type="text"
            required
            className={getInputClass("city")}
            />
            {renderError("city")}
        </div>

        <div>
            <input
            name="pinCode"
            value={formData.pinCode}
            onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                handleChange({ target: { name: "pinCode", value: val } });
            }}
            placeholder="Pin Code"
            type="tel"
            inputMode="numeric"
            maxLength={6}
            required
            className={getInputClass("pinCode")}
            />
            {renderError("pinCode")}
        </div>

        <div>
            <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className={getInputClass("state")}
            >
                <option value="" disabled>Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
            </select>
            {renderError("state")}
        </div>
      </>
    ),
    3: (
      <>
        <div>
            <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your Full Name"
            type="text"
            required
            className={getInputClass("fullName")}
            />
            {renderError("fullName")}
        </div>

        <div>
            <input
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            placeholder="Account Number"
            type="text"
            required
            className={getInputClass("accountNo")}
            />
            {renderError("accountNo")}
        </div>
        
        <div>
            <input
            name="IFSCCode"
            value={formData.IFSCCode}
            onChange={handleChange}
            placeholder="IFSC Code"
            type="text"
            required
            className={getInputClass("IFSCCode")}
            />
            {renderError("IFSCCode")}
        </div>
      </>
    )
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg relative">
          {/* Logo and Back */}
          <div className="absolute top-4 left-4">
            {step > 1 && (
              <button onClick={goBack} className="text-green-600 hover:text-green-800 cursor-pointer">
                <ArrowLeft />
              </button>
            )}
          </div>

          <div className="flex items-center justify-center mb-6">
            <img onClick={() => { navigate("/") }} src={logo} alt="Logo" className="w-10 h-10 mr-2 cursor-pointer" />
            <h1 className="text-2xl font-bold text-green-700">
              {step === 1 ? "Register as Seller" : step === 2 ? "Pickup Address" : "Bank Details"}
            </h1>
          </div>

          {/* Dynamic Form Section */}
          <form className="space-y-4">
            {steps[step]}

            <button
              type="button"
              onClick={goNext}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>

            {step === 1 && (
              <>
                {/* Divider */}
                <div className="flex items-center my-4">
                  <hr className="flex-grow border-green-300" />
                  <span className="mx-2 text-green-500">or</span>
                  <hr className="flex-grow border-green-300" />
                </div>

                {/* Seller Login */}
                <button
                  onClick={() => navigate("/login")}
                  type="button"
                  className="w-full flex items-center justify-center border cursor-pointer border-slate-300 text-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-300"
                >
                  Login as Seller
                </button>
              </>
            )}
          </form>

        </div>
      </div>
      {showOTP && (
        <VerifyOTP
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onClose={() => setShowOTP(false)}
        />
      )}
      {loading && (
        <MyLoader />
      )}
    </div>
  );
};

export default SellerRegisterWizard;