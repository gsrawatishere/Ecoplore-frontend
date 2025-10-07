import React, { useState, useEffect } from 'react';
import CustomerOrderCard from '../../Components/Product/ManageOrdersBuyerCard';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Home/Header';



const BuyerOrders = () => {
  // MODIFICATION: The initial state data now perfectly matches the schema used by ManageOrdersCard.
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the orders from your API when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/private/order/get/customer'); 
        console.log("Order response",response.data)
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // In a real scenario, you might want to clear the sample data on error
        // setOrders([]);
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
         <Header
          heading="My Orders" />
        <div className="p-4 sm:p-6 md:p-8 bg-[#edf1f1] min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* <h1 className="text-3xl font-bold text-green-800 mb-6">Manage Your Orders</h1> */}
            
            {/* Handle the case where there are no orders to display */}
            {orders.length === 0 ? (
              <div className="text-center py-12 rounded-lg ">
               <div class="text-center py-16 px-6">
  
  <h2 class="text-2xl font-bold text-gray-800">Your order history is waiting for its first story.</h2>
  <p class="text-gray-600 mt-3 max-w-md mx-auto">Ready to find something you'll love? Your journey towards sustainable living starts with a single click.</p>
  <button 
   onClick={()=>{navigate("/")}}
  class="mt-6 px-6 py-3 bg-green-600 cursor-pointer text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
    Start Shopping
  </button>
</div>
              </div>
            ) : (
              // Use the .map() function to render the list of OrderCards
              orders.map((order) => (
                <CustomerOrderCard
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

export default BuyerOrders;