import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function Products({ cat }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/public/product/category/${cat.id}`
        );
        if (response.status == 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  if (products.length == 0) {
    return <div></div>;
  }

  return (
    <div className="px-2 md:px-10 py-6 bg-[#edf1f1] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[22px]  font-semibold">{cat.name}</h2>
        <button
          onClick={() => {
            navigate(`products/category/${cat.id}`);
          }}
          className="text-green-600 text-sm sm:text-base md:text-lg font-medium hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 cursor-pointer w-36 sm:w-44 md:w-52 bg-white rounded-lg text-center pb-6 relative  hover:shadow-lg  duration-300 p-2 hover:scale-105 transition-all "
            onClick={() => {
              navigate(`/product/${product.id}`);
            }}
          >
            {/* w-[30vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw] */}
            <div className="relative">
              {/* Product Image */}
              <div className=" aspect-[1/1] overflow-hidden rounded-lg m-auto w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* "Items left" or placeholder to maintain symmetry */}
              <div className="h-4 mt-1 flex items-center justify-center">
                {product.noOfUnits < 11 ? (
                  <p className="text-red-500 text-xs">
                    {product.noOfUnits} items left
                  </p>
                ) : (
                  <p className="text-transparent text-xs">placeholder</p>
                )}
              </div>
            </div>
            {/* Subcategory Name below image */}
            {/* <p className="text-slate-500 text-xs text-left mt-2 px-1">
              {product.subCategoryName}
            </p> */}

            {/* Product Name */}
            <p className="text-xs sm:text-sm font-medium mt-1 px-1 truncate line-clamp-1 ">
              {product.name}
            </p>

            {/* Product Price */}
            <p className="text-black font-bold text-xs sm:text-sm mt-0.5">
              ₹{product.price}
            </p>

            {/* Product Description */}
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-1 mt-1 px-1">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
