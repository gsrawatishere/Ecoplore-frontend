import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiEdit,
  FiPlus,
  FiX,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

const AddressSelector = ({ selectedAddress, setSelectedAddress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Sample addresses data
  const [addresses, setAddresses] = useState([]);
  // const [selectedAddress, setSelectedAddress] = useState(null);

  const getAddress = async () => {
    try {
      const response = await axiosInstance.get("/private/address/get");
      console.log(response.data);
      if (response.status == 200) {
        setAddresses(response.data);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error in Fetching Addresses :", error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    const defaultAddress = addresses.find(
      (address) => address.isDefault === true
    );

    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    } else if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    } else {
      setSelectedAddress(null);
    }
  }, [addresses, setSelectedAddress]);

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update existing address
      // const updatedAddresses = addresses.map((address) =>
      //   address.id === editId ? { ...formData, id: editId } : address
      // );
      const resposne = await axiosInstance.post(
        `/private/address/edit/${editId}`,
        {
          ...formData, // Send the form data directly
        }
      );

      if (resposne.status == 200) {
        toast.success("Address updated successfully");
        getAddress();
      }

      if (formData.isDefault) {
        setSelectedAddress({ ...formData, id: editId });
      }
    } else {
      // Add new address
      const newAddress = {
        ...formData,
      };

      const response = await axiosInstance.post("/private/address/add", {
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        pinCode: newAddress.pinCode,
      });
      if (response.status == 200) {
        toast.success("Address added successfully");
        getAddress();
      } else {
        toast.error("Failed to add new address");
      }
    }

    // Reset form
    setFormData({
      street: "",
      city: "",
      state: "",
      pinCode: "",
    });

    setShowForm(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleEditAddress = (address) => {
    console.log("Edit version", address.pinCode);
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
    });
    setEditMode(true);
    setEditId(address.id);
    setShowForm(true);
  };

  const handleDeleteAddress = async (id) => {
    if (addresses.length <= 1) return;

    try {
      const response = await axiosInstance.post(
        `/private/address/delete/${id}`
      );
      if (response.status == 200) {
        toast.success("Address deleted successfully");
        getAddress();
      }
    } catch (error) {
      console.error("failed to delete address", error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefaultAddress = async (id) => {
    console.log("Defauld address id", id);
    try {
      const resposne = await axiosInstance.post(
        `/private/address/make-default/${id}`
      );
      if (resposne.status == 200) {
        console.log(resposne.data);
        toast.success("Address set as Default Successfully");
        getAddress();
      }
    } catch (error) {
      console.error("Failed to set address as default", error);
      toast.error("Failed to set address as default");
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.street}, ${address.city}, ${address.state} ${address.pinCode}`;
  };

  return (
    <div className="w-full">
      {/* Top Address Bar */}
      <div className="bg-[#edf1f1]  py-3 px-4 flex items-center justify-between sticky top-0 z-10 md:px-12">
        <div className="flex items-center gap-3 min-w-0 ">
          <div className="bg-blue-50 p-2 rounded-full shrink-0">
            <FiMapPin className="text-green-600 text-xl" />
          </div>
          {/* Make this a flex column and allow it to shrink, with min-w-0 so truncate works */}
          <div className="flex flex-col min-w-0">
            <p className="text-xs text-gray-500">Delivery to</p>
            <p className="font-medium text-gray-900 truncate max-w-full sm:max-w-xs">
              {selectedAddress ? formatAddress(selectedAddress) : "Add Address"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center  text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors shrink-0 ml-2 "
        >
          <FiEdit className="text-sm" />
          <span className="font-medium">Change</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col  shadow-md border-slate-50 ">
            {/* Modal Header */}
            <div className="border-b p-4 flex justify-between items-center ">
              <h2 className="text-xl font-bold text-gray-800">
                Select Delivery Address
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setShowForm(false);
                  setEditMode(false);
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Address List */}
            <div className="overflow-y-auto flex-grow p-4">
              {!showForm ? (
                <>
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`shadow-sm rounded-lg p-4 mb-4 transition-all`}
                      >
                        <div className="flex justify-between ">
                          <div className="min-w-0 max-w-[60%] sm:max-w-[60%]">
                            <p className="text-gray-700 break-words">
                              {address.street}
                            </p>
                            <p className="text-gray-700 break-words">
                              {address.city}, {address.state} -{" "}
                              {address.pinCode}
                            </p>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAddress(address)}
                                className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
                              >
                                <FiEdit />
                              </button>

                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="p-1.5 rounded hover:bg-red-50 text-red-600"
                              >
                                <FiTrash2 />
                              </button>
                            </div>

                            <button
                              onClick={async () => {
                                if (!address.isDefault) {
                                  await handleSetDefaultAddress(address.id);
                                }

                                setIsModalOpen(false);
                              }}
                              className={`text-sm text-white px-3 py-1 rounded font-medium cursor-pointer ${
                                address.isDefault
                                  ? "bg-gray-400" // class if true
                                  : "bg-green-600 hover:bg-green-700" // class if false
                              }`}
                            >
                             {address.isDefault ? 'Selected Address' : 'Deliver Here'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">
                      No addresses found.
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setShowForm(true);
                      setFormData({
                        street: "",
                        city: "",
                        state: "Rajasthan",
                        pinCode: "",
                      });
                    }}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-green-600 hover:bg-blue-50 transition-colors"
                  >
                    <FiPlus className="mr-2" />
                    <span className="font-medium">Add New Address</span>
                  </button>
                </>
              ) : (
                // Address Form
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {editMode ? "Edit Address" : "Add New Address"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <textarea
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
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

                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        maxLength="6"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        pattern="[0-9]{6}"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditMode(false);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      {editMode ? "Update Address" : "Save Address"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
