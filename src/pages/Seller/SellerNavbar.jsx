import React from 'react'
import logo from '../../assets/Images/greenplore.png'
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const SellerNavbar = () => {
      const {userId} = useContext(UserContext);
      const navigate = useNavigate();

  return (
    <div>
         <header className=" border-gray-200 bg-[#edf1f1] backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <img 
                       onClick={()=>{navigate('/seller-dashboard')}}
                       className=" h-10 w-28 md:h-13 md:w-44 cursor-pointer"   src={logo} alt="GreenPlore" width={50} height={50}  />
                     
                    </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">{userId?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm md:text-base font-medium text-gray-900">{userId}</p>
            {/* <p className="text-xs md:text-sm text-gray-500">Seller</p> */}
          </div>
         
        </div>
                  </div>
                </div>
              </header>
    </div>
  )
}

export default SellerNavbar