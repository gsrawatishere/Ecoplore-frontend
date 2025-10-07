import React from 'react';

/**
 * A helper function to format the date string for display.
 * @param {string} dateString - The date string from the API.
 * @returns {string} A formatted date (e.g., "27 Sep 2025").
 */
const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

/**
 * A helper function to determine the color of the status badge.
 * @param {string} status - The shipment status from the API.
 * @returns {string} Tailwind CSS classes for the badge.
 */
const getStatusBadgeColor = (status) => {
  if (!status) return 'bg-gray-200 text-gray-800';
  const lowerCaseStatus = status.toLowerCase();

  switch (lowerCaseStatus) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border border-green-300';
    case 'shipped':
    case 'in transit':
      return 'bg-blue-100 text-blue-800 border border-blue-300';
    case 'out for delivery':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
    case 'cancelled':
    case 'rto': // Return to Origin
      return 'bg-red-100 text-red-800 border border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-300';
  }
};

/**
 * A reusable card component to display order details for a seller.
 * @param {{ order: object }} props - The component props, expecting an 'order' object.
 */
const ManageOrdersCard = ({ order }) => {
  // A guard clause to prevent errors if the order data is not yet loaded.
  if (!order) {
    return null;
  }

  const {
    id,
    product,
    quantity,
    amount,
    deliveryAddress,
    awbNumber,
    courierName,
    shipmentLabelUrl,
    shipmentStatus,
    shipmentId,
    deliveryDate, // New field from the updated schema
  } = order;

  
  // MODIFICATION: Switched from an array (imageUrl[0]) to a single string (imageUrl).
  const productImageUrl = product?.imageUrl || `https://placehold.co/100x100/EBF8F0/166534?text=Image`;

  const formattedDeliveryDate = formatDate(deliveryDate);

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-green-200 shadow-lg transition-shadow duration-300 hover:shadow-xl mb-8 font-sans">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-green-50 rounded-t-xl border-b border-green-200">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <h2 className="text-xl font-bold text-green-900">#{id}</h2>
        </div>
        <div className="text-center mt-2 sm:mt-0">
            <div className={`px-4 py-1.5 text-sm font-semibold rounded-full ${getStatusBadgeColor(shipmentStatus)}`}>
                {shipmentStatus || 'Pending'}
            </div>
            {/* MODIFICATION: Added Delivery Date display */}
            {formattedDeliveryDate && (
                <p className="text-xs text-green-700 mt-1">
                    Delivered on: {formattedDeliveryDate}
                </p>
            )}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side: Product & Shipment Details */}
          <div className="lg:col-span-3">
            <div className="flex items-start gap-4">
              <img
                src={productImageUrl}
                alt={product?.name || 'Product'}
                className="w-24 h-24 rounded-lg object-cover border-2 border-green-100"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{product?.name || 'N/A'}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity: <span className="font-bold text-gray-900">{quantity}</span>
                </p>
                <p className="text-xl font-bold text-green-700 mt-2">
                  ₹{amount?.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Shipment Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                      <p className="text-gray-500">Courier</p>
                      <p className="font-semibold text-gray-800">{courierName || 'Not Assigned'}</p>
                  </div>
                  <div>
                      <p className="text-gray-500">AWB Number</p>
                      <p className="font-semibold text-gray-800 font-mono tracking-wide">{awbNumber || 'Not Assigned'}</p>
                  </div>
                  <div>
                      <p className="text-gray-500">Shipment ID</p>
                      <p className="font-semibold text-gray-800">{shipmentId || 'N/A'}</p>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Side: Delivery & Actions */}
          <div className="lg:col-span-2 lg:border-l lg:pl-6 border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Delivery Address</h4>
              {/* MODIFICATION: Removed fullName and mobile as they are not in the new schema */}
              
              <div className="text-sm text-gray-800 bg-green-50 p-4 rounded-lg border border-green-200 space-y-1">
                  <p>{deliveryAddress?.street}</p>
                  <p>{deliveryAddress?.city}, {deliveryAddress?.state} - {deliveryAddress?.pinCode}</p>
              </div>
              
              {shipmentLabelUrl && (
                  <div className="mt-6">
                      <a
                        href={shipmentLabelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                      >
                        <DownloadIcon />
                        Download Shipping Label
                      </a>
                  </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrdersCard;
