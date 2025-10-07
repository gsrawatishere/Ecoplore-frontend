import React from 'react'
import { Navbar } from '../Components/Navbar'
import ManageOrdersCard from '../../Components/Product/ManageOrdersCard'
import axiosInstance from '../../api/axiosInstance'
import { useEffect,useState } from 'react'
import MyLoader from '../../utils/MyLoader';

const AllOrders = () => {
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        //change api
        const response = await axiosInstance.get('/public/admin/all-orders'); 
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
         setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  
  if(isLoading){
    return(
        <div>
            <MyLoader/>
        </div>
    )
   }

  return (
    <div>
       <Navbar/>
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

export default AllOrders;