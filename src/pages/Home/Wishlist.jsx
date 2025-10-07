import React, { useEffect, useState } from 'react';
import WishlistCard from '../../Components/Wishlistcard';
import Header from '../../Components/Home/Header';
import MyLoader from '../../utils/MyLoader';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { WishlistEmpty } from '../../Components/Home/EmptyState';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const handleRemove = async (id) => {
    // setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
    setIsLoading(true);
    try {
          const response = await axiosInstance.get(`/private/wishlist/remove/${id}`);
          if(response.status == 200){
            toast.success("Item Removed Successfully");
            getWishlist();
          }
    } catch (error) {
         console.error("Failed to remove item from Wishlist",error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const getWishlist = async ()=>{
    setIsLoading(true);
     try {
           const response = await axiosInstance.get(`/private/wishlist/get`);
           if(response.status == 200){
            setWishlistItems(response.data);
           }
     } catch (error) {
         console.error("Error in fetching Wishlist ",error);
     }
     finally{
      setIsLoading(false);
     }
  }

 useEffect(()=>{
    getWishlist();
 },[])

 if(isLoading){
  return(
    <MyLoader/>
  )
 }
if(wishlistItems.length == 0){
  return (
      <div className="w-full text-center py-10 text-gray-500">
        <div className='mb-12'>
                <Header  heading="Wishlist"/>
                </div>
       <div >
        <WishlistEmpty/>
       </div>
       
      </div>
    );
}

  return (
    <div>
      <div className='mb-12'>
                <Header  heading="Wishlist"/>
                </div>
       <div >
       {wishlistItems.map((item) => (
        <WishlistCard
          key={item.id}
          product={item}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
       </div>
    </div>
  );
};

export default Wishlist;