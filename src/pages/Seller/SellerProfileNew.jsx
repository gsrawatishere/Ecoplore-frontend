import React, { useState, useEffect } from "react";
import logo from "../../assets/Images/greenplore.png";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProfileNew = () => {
  // Initialize seller data from API response
  const [sellerData, setSellerData] = useState({
    companyName: "",
    email: "",
    mobile: "",
    gst: "",
    createdAt: "",
    address: {
      buildingNo: "",
      street: "",
      landmark: "",
      pinCode: "",
      city: "",
      state: "",
    },
    bankDetails: {
      fullName: "",
      accountNo: "",
      ifsccode: "",
    },
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState(sellerData);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const getSellerdata = async () => {
    try {
      const response = await axiosInstance.get('/private/profile');
      if (response.status === 200) {
        setSellerData(response.data);
      }
    } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data ||
        ' failed to get profile data';
      console.error(message);
    }
  };


  useEffect(() => {
    getSellerdata();
  }, []);

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        [nested]: { ...prev[nested], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const showToast = (title, description, variant) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  // MODIFICATION: The entire handleSave function is corrected.
  const handleSave = async () => {
    // Basic validation
    if (!formData.companyName.trim()) {
      showToast("Validation Error", "Company name is required", "destructive");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      showToast(
        "Validation Error",
        "Please enter a valid email address",
        "destructive"
      );
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      showToast(
        "Validation Error",
        "Please enter a valid mobile number",
        "destructive"
      );
      return;
    }
    if (!formData.gst.trim()) {
      showToast("Validation Error", "GST number is required", "destructive");
      return;
    }

    try {
      // 1. Corrected the payload to send formData directly
      const response = await axiosInstance.post('/private/profile/edit-seller', formData);

      if (response.status === 200) {
        // 2. Correctly handle success inside the 'if' block
        showToast("Profile Updated", "Your profile has been successfully updated.");
        getSellerdata(); // Refresh data from the server
        setIsEditDialogOpen(false); // Close the modal
      }
    } catch (error) {
      // 3. Correctly handle errors
      const errorMessage = error.response?.data?.msg || "Failed to update profile. Please try again.";
      showToast("Update Failed", errorMessage, "destructive");
      console.error("Error in update seller profile", error);
    }
  };


  const handleOpenEditDialog = () => {
    setFormData(sellerData);
    setIsEditDialogOpen(true);
  };

  const handleCancel = () => {
    setFormData(sellerData);
    setIsEditDialogOpen(false);
  };


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <header className=" bg-[#edf1f1] backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            
              <img
              onClick={()=>{navigate("/seller-dashboard")}}
                className=" h-10 w-28 md:h-13 md:w-44 cursor-pointer"
                src={logo}
                alt="GreenPlore"
                width={50}
                height={50}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">
                  {sellerData.companyName &&
                    sellerData.companyName
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0]?.toUpperCase())
                      .join("")}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm md:text-base font-medium text-gray-900">
                  {sellerData.companyName}
                </p>
                <p className="text-xs md:text-sm text-gray-500">Seller</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-[#edf1f1] p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Toast Notification */}
          {toast && (
            <div
              className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm animate-fade-in ${
                toast.variant === "destructive"
                  ? "bg-red-50 border border-red-200 text-red-800"
                  : "bg-green-50 border border-green-200 text-green-800"
              }`}
            >
              <div className="font-semibold">{toast.title}</div>
              <div className="text-sm mt-1">{toast.description}</div>
              <button
                onClick={() => setToast(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          )}

          {/* Header */}
          <div className="text-center space-y-2">
            <p className="text-gray-600 text-lg">
              Manage your business information and settings
            </p>
          </div>

          {/* Main Profile Card */}
          <div className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-lg p-8">
            {/* Card Header */}
            <div className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-4">
                <span className="text-3xl text-white">🏢</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {sellerData.companyName}
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
                Verified Seller
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-green-600">📧</span>
                    Contact Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                      <span className="text-green-600">📧</span>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{sellerData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                      <span className="text-green-600">📱</span>
                      <div>
                        <p className="text-sm text-gray-500">Mobile Number</p>
                        <p className="font-medium">{sellerData.mobile}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-green-600">📄</span>
                    Business Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                      <span className="text-green-600">📄</span>
                      <div>
                        <p className="text-sm text-gray-500">GST Number</p>
                        <p className="font-medium font-mono">{sellerData.gst}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                      <span className="text-green-600">📅</span>
                      <div>
                        <p className="text-sm text-gray-500">Account Created</p>
                        <p className="font-medium">
                          {formatDate(sellerData.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                  <span className="text-green-600">🏠</span> Address
                </h3>
                <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
                  {sellerData.address.buildingNo}, {sellerData.address.street},{" "}
                  {sellerData.address.landmark}, {sellerData.address.city},{" "}
                  {sellerData.address.state} - {sellerData.address.pinCode}
                </p>
              </div>

              {/* Bank Details section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                  <span className="text-green-600">🏦</span> Bank Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                    <span className="text-green-600">👤</span>
                    <div>
                      <p className="text-sm text-gray-500">
                        Account Holder Name
                      </p>
                      <p className="font-medium">
                        {sellerData.bankDetails.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                    <span className="text-green-600">#️⃣</span>
                    <div>
                      <p className="text-sm text-gray-500">Account No</p>
                      <p className="font-medium">
                        {sellerData.bankDetails.accountNo}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                    <span className="text-green-600">🏛️</span>
                    <div>
                      <p className="text-sm text-gray-500">IFSC</p>
                      <p className="font-medium">
                        {sellerData.bankDetails.ifsccode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={handleOpenEditDialog}
                  className="bg-green-600 cursor-pointer hover:shadow-lg transition-all duration-300 px-8 py-2 text-lg rounded-md text-white font-medium flex items-center gap-2"
                >
                  <span>✏️</span>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Edit Profile Dialog */}
          {isEditDialogOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
                onClick={handleCancel}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
                <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Edit Profile
                    </h2>
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2">
                    <div className="space-y-4">
                      {/* MODIFICATION: Added 'email' to the array of fields */}
                      {["companyName", "mobile", "gst"].map(
                        (field) => (
                          <div key={field} className="space-y-2">
                            <label className="text-sm font-medium block">
                              {field === "gst"
                                ? "GST Number"
                                : field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                              type={
                                field === "email"
                                  ? "email"
                                  : field === "mobile"
                                  ? "tel"
                                  : "text"
                              }
                              value={formData[field]}
                              onChange={(e) =>
                                handleInputChange(field, e.target.value)
                              }
                              // MODIFICATION: Added logic to disable the email field
                              disabled={field === 'email'}
                              className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${field === 'email' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                            />
                          </div>
                        )
                      )}

                      {Object.keys(formData.address).map((field) => (
                        <div key={field} className="space-y-2">
                          <label className="text-sm font-medium block">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type="text"
                            value={formData.address[field]}
                            onChange={(e) =>
                              handleInputChange(
                                field,
                                e.target.value,
                                "address"
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                          />
                        </div>
                      ))}

                      {Object.keys(formData.bankDetails).map((field) => (
                        <div key={field} className="space-y-2">
                          <label className="text-sm font-medium block">
                            {field === "fullName"
                              ? "Account Holder Name"
                              : field === "accountNo"
                              ? "Account Number"
                              : field === "ifsccode"
                              ? "IFSC Code"
                              : field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type="text"
                            value={formData.bankDetails[field]}
                            onChange={(e) =>
                              handleInputChange(
                                field,
                                e.target.value,
                                "bankDetails"
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={handleCancel}
                      className=" cursor-pointer flex-1 px-4 py-2 bg-slate-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 "
                    >
                      ✕ Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="cursor-pointer flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
                    >
                      💾 Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileNew;