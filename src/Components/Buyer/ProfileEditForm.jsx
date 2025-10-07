import React, { useState } from "react";
import { X } from "lucide-react";

const ProfileEditForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-xl z-10 animate-fadeIn">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              minLength={10}
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => {
                // Allow only digits and limit to 10 characters
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData((prev) => ({ ...prev, mobile: value }));
              }}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter 10-digit mobile number"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
