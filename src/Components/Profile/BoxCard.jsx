import React from 'react';

const BoxCard = ({ icon: Icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 w-screen bg-white rounded-lg  border border-gray-100 cursor-pointer  transition-all duration-300 "
    >
      {/* Icon on Left */}
      <Icon className="text-green-500 w-6 h-6" />

      {/* Label Text */}
      <span className="text-base font-semibold text-gray-800">{label}</span>
    </div>
  );
};

export default BoxCard;