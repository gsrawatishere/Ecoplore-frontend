import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import MyLoader from '../../utils/MyLoader';
import { useState } from 'react';
import SellerProductCard from '../../Components/Product/SellerProductCard';
import SellerNavbar from '../Seller/SellerNavbar';

const ManageProducts = () => {
    const [sellerProducts,setSellerProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    const getSellerProducts = async ()=>{
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/private/product/get-by-seller');
            if(response.status === 200){
                setSellerProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to get Seller products",error);
            toast.error("Failed to get products");
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
   getSellerProducts();
}, [])


     if (isLoading) {
    return <MyLoader />;
     }
     if (sellerProducts.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        No Product Found
      </div>
    );
  }
  return (
    <div>
         <SellerNavbar/>
           <div className="flex flex-col gap-4 pt-4">
       
      {sellerProducts.map((product) => (
        <SellerProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
   
  )
}

export default ManageProducts