import React from 'react'
import { Navbar } from '../Components/Navbar'
import { useState,useEffect} from 'react'
import { CustomerCard } from '../Components/CustomerCard'
import axiosInstance from '../../api/axiosInstance'
import MyLoader from '../../utils/MyLoader';



const AllCustomers = () => {
 const [customers,setCustomers] = useState([]);
 const [isLoading , setIsLoading] = useState(false); 

const getCustomers = async ()=>{
    setIsLoading(true);
    try {
         const response = await axiosInstance.get("/public/admin/all-customers");
         if(response.status == 200 ){
            setCustomers(response.data);
            console.log(response.data);
         }
    } catch (error) {
         console.error("Failed to get sellers",error);
         setCustomers([]);
    }finally{
        setIsLoading(false);
    }
}

useEffect(()=>{
   getCustomers();
},[])

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
               <div className="bg-[#edf1f1] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
       
        
        {/* Responsive Grid for Customer Cards */}
        {customers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customers.map((customer) => (
              <CustomerCard key={customer.email} customer={customer} />
            ))}
          </div>
        ) : (
          // Message to show when there are no customers
           <div className="flex flex-col items-center justify-center p-12 mt-8 text-center bg-[#edf1f1] rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                No Customers Found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                When a new customer makes a purchase, they will appear here.
              </p>
            </div>
        )}
      </div>
    </div>
    </div>
   
  );
}

export default AllCustomers