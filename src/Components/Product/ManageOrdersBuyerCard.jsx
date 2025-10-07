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
 * This makes it easy to add or change statuses in the future.
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
 * A reusable card component for customers to view their order details.
 * It's structured to clearly present relevant information.
 * @param {{ order: object }} props - The component props, expecting an 'order' object.
 */
const CustomerOrderCard = ({ order }) => {
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
    shipmentStatus,
    deliveryDate,
    // shipmentId and shipmentLabelUrl are intentionally omitted as they are not for the customer
  } = order;

  const productImageUrl = product?.imageUrl || `https://placehold.co/100x100/EBF8F0/166534?text=Image`;
  const formattedDeliveryDate = formatDate(deliveryDate);

  // Icon for the "Track Order" button
  const TrackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                      <p className="text-gray-500">Tracking Number (AWB)</p>
                      <p className="font-semibold text-gray-800 font-mono tracking-wide">{awbNumber || 'Not Assigned'}</p>
                  </div>
                  {/* Shipment ID has been removed as it's not useful for the customer */}
              </div>
            </div>
          </div>

          {/* Right Side: Delivery & Actions */}
          <div className="lg:col-span-2 lg:border-l lg:pl-6 border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Delivery Address</h4>
              <div className="text-sm text-gray-800 bg-green-50 p-4 rounded-lg border border-green-200 space-y-1">
                  <p>{deliveryAddress?.street}</p>
                  <p>{deliveryAddress?.city}, {deliveryAddress?.state} - {deliveryAddress?.pinCode}</p>
              </div>
              
              {/* MODIFICATION: Replaced download button with a "Track Order" button */}
              {/* {awbNumber && (
                  <div className="mt-6">
                      <a
                        // In a real app, you would link to your tracking page or the courier's website
                        // Example: href={`https://www.shiprocket.in/tracking/${awbNumber}`}
                        href="#" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                      >
                        <TrackIcon />
                        Track Order
                      </a>
                  </div>
              )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderCard;
