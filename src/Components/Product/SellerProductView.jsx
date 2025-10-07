import React, { useState, useRef } from "react";

const SellerProductPreview = ({ product }) => {
  // State is now only for managing the selected image
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || null
  );

  // Directly check if the product is out of stock from props
  const isOutOfStock = product.noOfUnits === 0;

  // Render a message if no images are available
  if (!product.images || product.images.length === 0) {
    return <p className="text-gray-500">No images available for this product.</p>;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 relative">
      {/* Thumbnails for large screens */}
      <div className="hidden lg:flex flex-col gap-4 p-4">
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            // MODIFICATION: Replaced '-' with ':' in the ternary operator
            className={`w-20 h-20 object-cover rounded cursor-pointer border-2 p-1 ${
              selectedImage === img
                ? "border-green-500 shadow-md"
                : "border-slate-300"
            }`}
          />
        ))}
      </div>

      {/* Main Image + Demo Buttons */}
      <div className="flex-1 flex flex-col items-center sticky top-0">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full max-w-md h-[400px] object-contain"
        />

        {/* Thumbnails for mobile */}
        <div className="flex lg:hidden gap-2 mt-2 overflow-x-auto">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Mobile Thumbnail ${idx + 1}`}
              onClick={() => setSelectedImage(img)}
              // MODIFICATION: Replaced '-' with ':' in the ternary operator
              className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                selectedImage === img
                  ? "border-green-500 shadow-md"
                  : "border-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Demo Buttons for large screens */}
        <div className="hidden lg:flex gap-4 mt-6">
          <button
            type="button"
            disabled
            title="This is a preview and is disabled"
            className="px-6 py-2 bg-green-600 text-white rounded cursor-not-allowed opacity-60"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
          
          <button
            type="button"
            disabled
            title="This is a preview and is disabled"
            className="px-6 py-2 bg-pink-500 text-white rounded cursor-not-allowed opacity-60"
          >
            Add to Wishlist
          </button>
        </div>

        {/* Product Info for mobile */}
        <div className="lg:hidden mt-6 w-full">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Product Info for large screen */}
      <div className="hidden lg:block w-1/2 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <ProductInfo product={product} />
      </div>

      {/* Fixed Demo Buttons at bottom for mobile/small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around p-4 border-t border-gray-300 z-50">
        <button
          type="button"
          disabled
          title="This is a preview and is disabled"
          className="w-[45%] py-2 bg-green-600 text-white rounded cursor-not-allowed opacity-60"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>

        <button
          type="button"
          disabled
          title="This is a preview and is disabled"
          className="w-[45%] py-2 bg-pink-500 text-white rounded cursor-not-allowed opacity-60"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

// The ProductInfo sub-component remains unchanged as it's purely for display
const ProductInfo = ({ product }) => {
  const descRef = useRef(null);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6 min-h-fit border border-green-100">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-green-800 tracking-tight">
        {product.name}
      </h2>
      <p className="text-2xl lg:text-3xl text-green-600 font-bold py-1">
        ₹{product.price}
      </p>
      {product.noOfUnits > 0 && product.noOfUnits < 10 && (
        <p className="text-red-600 font-semibold">{product.noOfUnits} items left!</p>
      )}
      <div className="bg-green-50 py-2 px-3 rounded-md lg:my-2 text-green-700 font-semibold text-lg">
        Details
      </div>
      <p className="text-gray-700 text-base lg:text-lg whitespace-pre-line">{product.details}</p>
      <div className="bg-green-50 py-2 px-3 rounded-md lg:my-2 text-green-700 font-semibold text-lg">
        Description
      </div>
      <p ref={descRef} className="text-gray-600 text-base lg:text-lg leading-relaxed whitespace-pre-line">
        {product.description}
      </p>
      <p className="text-gray-700 text-sm lg:text-base mt-3 py-2">
        <strong className="text-green-800">Sold By:</strong> {product.sellerCompany}
      </p>
    </div>
  );
};

export default SellerProductPreview;