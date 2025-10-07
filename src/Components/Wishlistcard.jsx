import React from "react";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ product, onRemove }) => {
  const navigate = useNavigate();
  return (
    <div
      key={product.id}
      className="w-full  lg:w-[80%] xl:w-[70%] 2xl:w-[60%] mx-auto p-4 pt-6 flex justify-center items-start gap-4 sm:flex-nowrap border-t-[1px] border-gray-200"
    >
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="flex w-[20vw] cursor-pointer"
      >
        <div className="w-40 sm:w-40 md:w-60 aspect-[4/3] overflow-hidden rounded-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-grow w-[60vw]">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">
          {product.name}
        </h2>
        <p className="text-gray-500">{product.subCategoryName}</p>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          ₹{product.price}
        </div>
        <div className="line-clamp-2">{product.description}</div>

        {/* Remove Button - bottom right */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onRemove}
            className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
