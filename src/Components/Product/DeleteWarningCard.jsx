import React from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // Icons for close and delete

const DeleteWarningCard = ({ productName, onCancel, onDelete }) => {
  return (
    // Overlay - covers the entire screen
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      {/* Warning Card */}
      <div className="relative p-6 sm:p-8 bg-white rounded-lg shadow-2xl max-w-sm w-full mx-4 ">
        
        {/* Close Button */}
       

        {/* Warning Icon and Title */}
        <div className="text-center mb-6">
          <FaTrashAlt size={48} className="mx-auto mb-4 text-red-500" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Product</h3>
          <p className="text-gray-600">Are you sure you want to delete <span className="font-semibold text-red-600">"{productName}"</span>?</p>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-5 py-2 bg-red-600 cursor-pointer text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaTrashAlt size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningCard;