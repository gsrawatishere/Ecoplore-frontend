import { FaChevronDown } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// for Mobile
  export const CategorySlider = ({category}) => {
    const navigate = useNavigate();

    return (
       <div
      onClick={() => {
        navigate(`products/sub-category/${category.id}`);
      }}
      key={category.id}
      className="flex flex-col items-center justify-center min-w-[80px] max-w-[100px] text-center"
    >
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-12 h-12 object-contain rounded-full border border-gray-200 shadow-2xl shadow-slate-100"
      />
      <div className="text-sm mt-1 break-words line-clamp-2">
        {category.name}
      </div>
    </div>
    )
  }
  
  
// for large screens
  export const CategoryGrid = ({ category }) => {
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const response = await axiosInstance.get(`public/category/${category.id}/get`);
        if (response.status === 200) {
          setSubcategories(response.data);
        }
      } catch (error) {
        console.error("Subcategory fetch error:", error);
        
      }
    };
    getSubcategories();
  }, [category.id]);

  return (
    <div className="relative group text-center cursor-pointer">
      <div className="flex items-center justify-center text-sm font-medium text-black lg:text-lg">
        {category.name}
        <FaChevronDown className="text-xs mt-0.5 transition-transform duration-200 group-hover:rotate-180 ml-1" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-[#008335] rounded-sm shadow-lg z-10 min-w-[140px] ">
        {subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <button
            onClick={()=>{navigate(`products/sub-category/${sub.id}`)}}
              key={sub.id}
              className="px-4 py-2 text-left hover:bg-[#eef1f1] hover:text-[#008335] text-sm cursor-pointer text-white font-medium"
            >
              {sub.name || sub}
            </button>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-white hover:bg-[#eef1f1] hover:text-[#008335]">No subcategories</div>
        )}
      </div>
    </div>
  );
};