
import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  
  const navigate = useNavigate();

  

  return (
    <div
      className="w-full md:w-[80%] lg:w-[60%] mx-auto pr-2 pt-6 flex justify-between items-start gap-4 sm:flex-nowrap border-t-[1px]  border-gray-200 relative cursor-pointer hover:scale-105 transition-all hover:bg-gray-100 p-3 rounded-lg "
      onClick={()=>{navigate(`/product/${product.id}`)}}
    >
      {/* Wishlist Icon in Top Right */}
      
      {/* Product Image */}
    <div className="flex-shrink-0 w-[30vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw] aspect-[4/3] overflow-hidden rounded-xl">
  <img
    src={product.imageUrl}
    alt={product.name}
    className="w-full h-full object-cover"
  />
</div>

      {/* Product Details */}
      <div className="flex flex-col gap-2 flex-grow w-[60vw]">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">
          {product.name}
        </h2>

        <div className="text-xl sm:text-2xl font-bold text-gray-900">
        ₹{product.price}
        </div>

        {/* Subcategory Name below Price in Left */}
        <p className="text-gray-500 text-sm">
          {product.subCategoryName}
        </p>
        
        {/* No. of Units Left (Symmetry Maintained) */}
        <div className="h-5"> {/* Fixed height to avoid shifting */}
          {product.noOfUnits < 10 ? (
            <p className="text-red-500 text-sm ">
              {product.noOfUnits} items left
            </p>
          ) : (
            <span className="invisible">Placeholder</span> // keeps height if not visible
          )}
        </div>

        <div className="text-gray-600 text-sm sm:text-md line-clamp-1 font-sans  ">{product.description}</div>

        
      </div>
    </div>
  );
};

export default ProductCard;