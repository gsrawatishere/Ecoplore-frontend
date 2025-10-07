import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import toast from 'react-hot-toast';
import { useState } from 'react';
import DeleteWarningCard from './DeleteWarningCard';
import axiosInstance from '../../api/axiosInstance';

const SellerProductCard = ({ product }) => {
const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const navigate = useNavigate();

  // Placeholder functions for edit and delete actions
  const handleEdit = (event) => {
    event.stopPropagation(); // Prevent parent card navigation
    navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = async (event) => {
    event.stopPropagation(); // Prevent parent card navigation
    try {
        const response = await axiosInstance.delete(`/private/product/delete/${product.id}`)
    if(response.status === 200){
        toast.success("Product Deleted Successfully");
        setShowDeleteWarning(false);
    }
    } catch (error) {
         console.error("Failed to delete product",error);
         toast.error("Failed to delete Product");
         setShowDeleteWarning(false);
    }
  };

  return (
    <div>
        {showDeleteWarning && (
                <DeleteWarningCard
                    productName={product.name}
                    onCancel={()=>{setShowDeleteWarning(false)}}
                    onDelete={handleDelete}
                />
            )}
    <div
      className="w-full md:w-[80%] lg:w-[60%] mx-auto pr-2 pt-6 flex justify-between items-start gap-4 sm:flex-nowrap border-t-[1px] border-gray-200 relative hover:scale-105 transition-all hover:bg-gray-100 p-3 rounded-lg "
      
    >
      {/* Product Image */}
      <div className="flex-shrink-0 w-[30vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-xl object-cover"
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
          {product.noOfUnits < 10 && product.noOfUnits > 0 ? ( // Added check for > 0
            <p className="text-red-500 text-sm ">
              {product.noOfUnits} items left
            </p>
          ) : product.noOfUnits <= 0 ? ( // Display "Out of stock" if 0 or less
            <p className="text-red-600 text-sm font-medium">Out of stock</p>
          ) : (
            <span className="invisible text-sm">Placeholder</span> // keeps height if not visible
          )}
        </div>

        <div className="text-gray-600 text-sm sm:text-md line-clamp-2 font-sans">{product.description}</div>
      </div>

      {/* Action Buttons on the Right */}
      <div className="flex flex-col items-end gap-2 p-2">
        {/* View Button */}
        <button
          onClick={(event) => {
            event.stopPropagation(); // Prevent parent card navigation
            navigate(`/seller-product-view/${product.id}`);
          }}
          className="p-2 rounded-full cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none transition-colors duration-200"
          title="View Product"
        >
          <FaEye size={18} />
        </button>

        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="p-2 rounded-full bg-green-200 cursor-pointer hover:bg-green-300 focus:outline-none  transition-colors duration-200"
          title="Edit Product"
        >
          <FaEdit size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={()=>{setShowDeleteWarning(true)}}
          className="p-2 rounded-full bg-red-500 cursor-pointer text-white hover:bg-red-600 focus:outline-none  transition-colors duration-200"
          title="Delete Product"
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default SellerProductCard;