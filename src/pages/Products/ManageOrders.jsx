import React, { useState, useEffect } from 'react';
import ManageOrdersCard from '../../Components/Product/ManageOrdersCard';
import axiosInstance from '../../api/axiosInstance';
import SellerNavbar from '../Seller/SellerNavbar';


const ManageOrders = () => {
  // MODIFICATION: The initial state data now perfectly matches the schema used by ManageOrdersCard.
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the orders from your API when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/private/order/get/seller'); 
        console.log("Order response",response.data)
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // In a real scenario, you might want to clear the sample data on error
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // The empty array ensures this runs only once on mount

  // Handle the loading state while data is being fetched
  if (isLoading) {
    // A simple loader, you can replace with your MyLoader component
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <div>
        <SellerNavbar/>
        <div className="p-4 sm:p-6 md:p-8 bg-[#edf1f1] min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* <h1 className="text-3xl font-bold text-green-800 mb-6">Manage Your Orders</h1> */}
            
            {/* Handle the case where there are no orders to display */}
            {orders.length === 0 ? (
              <div className="text-center py-12 rounded-lg ">
                <h2 className="text-xl font-semibold text-gray-700">No Orders Found</h2>
                <p className="text-gray-500 mt-2">New orders from your listings will appear here.</p>
              </div>
            ) : (
              // Use the .map() function to render the list of OrderCards
              orders.map((order) => (
                <ManageOrdersCard
                  key={order.id}
                  order={order}
                />
              ))
            )}
          </div>
        </div>
    </div>
  );
};

export default ManageOrders;