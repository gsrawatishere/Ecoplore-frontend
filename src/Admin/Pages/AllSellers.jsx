import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar'
import { SellerCard } from '../Components/SellerCard'
import axiosInstance from '../../api/axiosInstance'
import MyLoader from '../../utils/MyLoader';

const AllSellers = () => {
    const [sellerData,setSellerData] = useState([]);
     const [isLoading , setIsLoading] = useState(false); 

//api for fetching seller data -> todo
const getSellers = async ()=>{
    setIsLoading(true);
    try {
         const response = await axiosInstance.get("/public/admin/all-sellers");
         if(response.status == 200 ){
            setSellerData(response.data);
            console.log(response.data);
         }
    } catch (error) {
         console.error("Failed to get sellers",error);
         setSellerData([]);
    }finally{
        setIsLoading(false);
    }
}

useEffect(()=>{
    getSellers();
},[])

   if (sellerData.length === 0) {
  return (
    <div>
        <Navbar/>
         <div className="flex flex-col items-center justify-center p-12 mt-8 text-center  ">
      <h3 className="text-xl font-semibold text-gray-700">
        No Sellers Available
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Please check back again later.
      </p>
    </div>
    </div>
   
  );
}
   
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
             <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
               
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {sellerData.map((seller, index) => (
            <SellerCard key={index} seller={seller} />
          ))}
        </div>
      </div>
    </div>
        </div>
    
  );
}

export default AllSellers