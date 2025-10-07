import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarCard from '../../Components/Profile/AvatarCard'
import OptionsCard from '../../Components/Profile/OptionsCard'
import BoxCard from '../../Components/Profile/BoxCard'
import { Package,Heart } from 'lucide-react';
import Cart from '../Home/Cart'
import Wishlist from '../Home/Wishlist'
import MyLoader from '../../utils/MyLoader'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'
import axiosInstance from '../../api/axiosInstance'
import ProfileEditForm from '../../Components/Buyer/ProfileEditForm'
import BuyerOrders from './BuyerOrders'


// Dummy components for right-side content

const OrdersPage = () => <div><BuyerOrders/></div>;
const WishlistPage = () => <div><Wishlist/></div>;
const CartPage = () => <div><Cart/></div>;



const Profile = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('my-orders');
  const { setIsLoggedIn, setUserId,setUserRole} = useContext(UserContext);
  const [isLoading , setIsLoading] = useState(false);
  const [editMoode, setEditMode] = useState(false);
  const [profile,setProfile] = useState({firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  createdAt: "",});
    


  const renderPage = () => {
    switch (selectedPage) {
      case 'my-orders': return <OrdersPage />;
      case 'wishlist': return <WishlistPage />;
      case 'cart': return <CartPage />;
      case 'address': return <AddressPage />;
      default: return <div>Select an option</div>;
    }
  };

const getProfile = async ()=>{
  try {
     const response = await axiosInstance.get('/private/profile');

     if(response.status === 200){
      setProfile(response.data);
     }
  } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data ||
        ' failed to get profile data'
      console.error(message);
    }
}

  const handleNavigation = (page) => {
    if (window.innerWidth < 1024) { // mobile device
      navigate(`/${page}`);
    } else { // large screen
      setSelectedPage(page);
    }
  };

  const handleLogout = async ()=> {
    setIsLoading(true);
    try {
        const response = await axiosInstance.post('/auth/logout');
        if(response.status === 200){
          setIsLoggedIn(false);
          setUserId(null);
          setUserRole(null);
          toast.success("Logged out Successfully!")
          navigate('/login')
          
        }
    } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data ||
        'Login failed';
      toast.error(message);
    }finally{
      setIsLoading(false);
    }
  }
const handleEditProfile = async (updatedData)=>{
  setIsLoading(true);
     try {
        const response = await axiosInstance.post('/private/profile/edit-customer',updatedData);
        if(response.status === 200){
          toast.success("Profile Updated Successfully");
          getProfile();
        }
     } catch (error) {
        const message =
        error?.response?.data?.msg ||
        error?.response?.data ||
        'Failed to edit profile';
      toast.error(message);
     }finally{
      setIsLoading(false);
     }
}
  

  useEffect(()=>{
   getProfile();
  },[])

  if(isLoading){
    return(
      <MyLoader/>
    )
  }
  
  return (
    <div className='flex h-screen bg-[#edf1f1] overflow-hidden'>

      

      {/* Left Sidebar */}
      <div className='bg-white h-full w-full lg:w-1/3 pb-4 overflow-hidden'>
     
        <AvatarCard
          
          firstName={profile.firstName}
          lastName={profile.lastName}
          mobile={profile.mobile}
          email={profile.email}
          createdAt={
    profile.createdAt
      ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      : ""
  }
        />

        <div className="flex items-center justify-center p-4 px-2 gap-2">
          <BoxCard icon={Package} label="Orders" onClick={() => handleNavigation('my-orders')} />
          <BoxCard icon={Heart} label="Wishlist" onClick={() => handleNavigation('wishlist')} />
        </div>
         <OptionsCard label="Edit Profile" onClick={()=>{setEditMode(true)}} />
        <OptionsCard label="Cart" onClick={() => handleNavigation('cart')} />
        <OptionsCard label="Logout" onClick={handleLogout} />
      </div>

      {/* Right Content Area - only visible on large screens */}
      <div className='hidden lg:block w-2/3 p-4 overflow-y-auto h-full'>
        {renderPage()}
      </div>
      
      { editMoode && (
         <ProfileEditForm
     initialData={profile}
      onClose={()=>{setEditMode(false)}}
      onSubmit={handleEditProfile}
    />
      )

      }

    </div>
  );
};

export default Profile