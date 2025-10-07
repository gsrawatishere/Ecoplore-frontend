import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartCard = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
  const navigate = useNavigate();

  const handleProductClick = (e) => {
    e.preventDefault();
    navigate(`/product/${product.productId}`);
  };

  return (
    <div

      key={product.productId}
      className="w-full  lg:w-[80%] xl:w-[70%] 2xl:w-[60%] mx-auto p-4 pt-6 flex justify-center items-start gap-4 sm:flex-nowrap border-t-[1px] border-gray-200 "
    >
      {/* Product Image */}
     <div 
  onClick={handleProductClick}
  className="flex w-[20vw] cursor-pointer"
>
  <div className="w-40 sm:w-40 md:w-45 aspect-[4/3] overflow-hidden rounded-xl">
    <img
      src={product.imageUrls}
      alt={product.productName}
      className="w-full h-full object-cover"
    />
  </div>
</div>
      {/* Product Details */}
      <div className="flex flex-col gap-2 flex-grow w-[60vw]">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">
          {product.productName}
        </h2>
        {/* <p className="text-gray-500">{product.category}</p> */}
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          ₹{product.price}
        </div>
        {/* <div className="line-clamp-4">{product.description}</div> */}

        {/* Quantity and Remove Buttons */}
        <div className="flex justify-between items-center mt-4">
          {/* Quantity Control */}
          <div className="flex items-center gap-2">
            <button
            type="button" 
              onClick={onDecrease}
              className="bg-gray-200 cursor-pointer text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
            type="button" 
              onClick={onIncrease}
              className="bg-gray-200 cursor-pointer text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
          type="button" 
            onClick={onRemove}
            className="bg-red-500 text-white px-4 py-1 cursor-pointer rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartCard;