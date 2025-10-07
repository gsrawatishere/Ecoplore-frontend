import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SellerAvatarCard from '../../Components/Profile/SellerAvatarCard'
import OptionsCard from '../../Components/Profile/OptionsCard'
import BoxCard from '../../Components/Profile/BoxCard'
import { UserPen, ChartColumn  } from 'lucide-react';
import AddProduct from '../Products/AddProduct'




// components for right-side content

const ProfilePage = () => <div>Profile Page Content</div>;
const AnalyticsPage = () => <div>Analytics Page Content</div>;
const ManageOrdersPage = () => <div>Manage Orders Page Content</div>;
const ManageProductsPage = () => <div>Manage Products Page Content</div>;
const ManageProfilePage = () => <div>Manage Profile Page Content</div>;


const SellerProfile = () => {
    const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('manageOrders');
  
  const renderPage = () => {
    switch (selectedPage) {
      case 'profile': return <ProfilePage />;
      case 'analytics': return <AnalyticsPage />;
      case 'manageOrders': return <ManageOrdersPage />;
      case 'manageProducts': return <ManageProductsPage />;
      case 'manageProfile': return <ManageProfilePage />;
      case 'addproduct' : return <AddProduct/>
      default: return <div>Select an option</div>;
    }
  };

  const handleNavigation = (page) => {
    if (window.innerWidth < 1024) { // mobile device
      navigate(`/${page}`);
    } else { // large screen
      setSelectedPage(page);
    }
  };

  return (
    <div className='flex h-screen bg-slate-50'>
  
      {/* Left Sidebar */}
      <div className='bg-white h-full w-full lg:w-1/3 pb-4 overflow-hidden'>
        <SellerAvatarCard
          companyName="EcoPlore Pvt Ltd"
          gst="27AAACB1234C1Z5"
          email="support@ecoplore.com"
          mobile="7898957389"
          createdAt="2024-06-16"
        />
  
        <div className="flex items-center justify-center p-4 px-2 gap-2">
          <BoxCard icon={UserPen} label="Profile" onClick={() => handleNavigation('profile')} />
          <BoxCard icon={ChartColumn} label="Analytics" onClick={() => handleNavigation('analytics')} />
        </div>
  
        <OptionsCard label="Manage Orders" onClick={() => handleNavigation('manageOrders')} />
        <OptionsCard label="Add Product" onClick={() => handleNavigation('addproduct')} />
        <OptionsCard label="Manage Products" onClick={() => handleNavigation('manageProducts')} />
        <OptionsCard label="Manage Profile" onClick={() => handleNavigation('manageProfile')} />
        <OptionsCard label="Logout" onClick={() => handleNavigation('logout')} />
      </div> {/* End of Left Sidebar */}
  
      {/* Right Content Area - only visible on large screens */}
      <div className='hidden lg:block w-2/3 p-4 overflow-y-auto h-full'>
        {renderPage()}
      </div>
  
    </div>  // Main flex container end
  );
}

export default SellerProfile