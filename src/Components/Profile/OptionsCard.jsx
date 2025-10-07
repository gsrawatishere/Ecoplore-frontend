import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

const OptionsCard = ({label, onClick}) => {
    return (
      <div onClick={onClick} className='w-full flex justify-between cursor-pointer bg-white font-semibold text-black px-6 py-3 rounded-xl text-l sm:px-8   sm:py-4 hover:bg-green-50'>  
        <button className=' '>
      {label}
  </button>
   <button>
   <MdKeyboardArrowRight />
   </button>
  </div>
      );
}

export default OptionsCard




