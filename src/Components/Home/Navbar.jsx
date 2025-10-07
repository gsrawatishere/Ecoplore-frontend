import { FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import logo from "../../assets/Images/greenplore.png"
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";



export default function Navbar(){
    const {userId , userRole } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");
    
const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim() !== "") {
    navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
  }
};
    const navigate = useNavigate();

    return (
        <div className=" fixed w-full z-50 py-4 mt-9 sm:py-6 px-4 bg-[#edf1f1] ">
          {/* Top Section */}
          <div className="flex justify-between items-center">
            {/* Left icons */}
            <div className="flex items-center ">
              {/* <div className="text-4xl block sm:hidden">
                <IoReorderThreeOutline />
              </div> */}
              <img className="cursor-pointer h-10 w-28 md:h-15 md:w-44"  onClick={()=> navigate("/")} src={logo} alt="GreenPlore" width={50} height={50}  />
              {/* <div className="font-semibold text-lg md:text-2xl lg:text-3xl cursor-pointer" onClick={()=> navigate("/")}>GreenPlore</div> */}
            </div>
    
            {/* Searchbar - show only on medium and above */}
            <div className="hidden md:flex flex-grow px-6">
              <form className="flex w-full max-w-2xl mx-auto" onSubmit={handleSearch}>
                <input
                  type="text"
                   onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md  outline-none "
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 cursor-pointer "
                >
                  <BsSearch/>
                </button>
              </form>
            </div>
    
            {/* Right icons */}
            <div className="flex items-center gap-5 text-xl md:text-2xl lg:text-3xl">
              {/* <VscAccount className="hover:text-green-700 cursor-pointer  "  onClick={()=>{navigate("/profile")}} /> */}
              <BsCart3  className="hover:text-green-700 cursor-pointer " onClick={()=>{userRole=="CUSTOMER" ? navigate("/cart") : navigate("/login")}}/>
              <IoMdHeartEmpty className="hover:text-green-700 cursor-pointer  lg:mx-2"  onClick={()=>{userRole=="CUSTOMER" ? navigate("/wishlist") : navigate("/login")}}/>
               
               {
                userId==null ?
                (
                  <button
                type="button"
                className="hidden md:block  lg:text-xl text-white bg-green-700 hover:bg-green-800 focus:outline-none cursor-pointer  font-medium rounded-full text-sm px-4 py-1.5"
                onClick={()=> navigate("/login")}
              >
                Login
              </button>
                ) : (
                  <VscAccount className="hover:text-green-700 cursor-pointer lg:mx-2 "  
                  onClick={()=>{
                    // if(userRole=="CUSTOMER")
                    //   navigate("/profile")
                    // else if(userRole=="SELLER")
                    //   navigate("/seller-profile");
                    navigate('/profile');
                  }} />
                )
               }
               
              
              <button
                type="button"
                className="hidden md:block lg:text-xl text-white bg-green-700 hover:bg-green-800 focus:outline-none  cursor-pointer font-medium rounded-full text-sm px-4 py-1.5"
                 onClick={()=>{navigate("/register-seller")}}
              >
                Be a Seller
              </button>

                 {
                userId==null ?
                (
                  <button
                type="button"
                className=" md:hidden  lg:text-xl text-white bg-green-700 hover:bg-green-800 focus:outline-none cursor-pointer  font-medium rounded-full text-sm px-4 py-1.5"
                onClick={()=> navigate("/login")}
              >
                Login
              </button>
                ) : null
               }
             
            </div>
          </div>
    
          {/* Searchbar on small screens (mobile) */}
          <div className="md:hidden mt-2 ">
            <form className="flex w-full " onSubmit={handleSearch}>
              <input
                type="text"
                 onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700"
              >
               <BsSearch/>
              </button>
            </form>
          </div>
        </div>
      );
}
