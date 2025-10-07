import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';
import logo from "../../assets/Images/logo.png"
import { Link } from 'react-router-dom'


const SellerLogin = () => {
  return (
    <div>
         <LoginForm heading={"Login as Seller"}/>
    </div>
  )
}


export function LoginForm({heading}) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        {/* Back Arrow inside form */}
        {/* <div className="mb-4">
          <button
            className="text-green-600 hover:text-green-800 flex items-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6 mr-1" />
            <span className="text-sm"></span>
          </button>
        </div> */}

        {/* Logo and Heading */}
        <div className="flex items-center justify-center mb-6">
          <img src={logo} onClick={()=>{navigate('/')}} alt="Logo" className="w-10 h-10 mr-2 cursor-pointer " />
          <h1 className="text-2xl font-bold text-green-700">{heading}</h1>
        </div>

        {/* Input Fields */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer "
          >
            LOG IN
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between items-center text-sm text-green-600 mt-4">
          <Link to="#" className="hover:underline">Forgot your password?</Link>
          <Link to="/register-seller" className="hover:underline">Register as Seller</Link>
        </div>
      </div>
    </div>
  );
  }
  

export default SellerLogin