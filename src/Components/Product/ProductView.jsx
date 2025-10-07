import React, { useState, useRef, useEffect, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import MyLoader from "../../utils/MyLoader";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

// NEW: Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductView = ({ product }) => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || null
  );
  
  // NEW: Add state to hold the Swiper instance for programmatic control
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product.noOfUnits <= 0) {
      setOutOfStock(true);
    } else {
      setOutOfStock(false);
    }
  }, [product]);

  // NEW: This effect syncs the swiper if the selectedImage changes 
  // from other sources (like thumbnail clicks on any screen size).
  useEffect(() => {
    if (swiperInstance && product.images) {
      const selectedIndex = product.images.indexOf(selectedImage);
      if (selectedIndex !== -1 && swiperInstance.activeIndex !== selectedIndex) {
        swiperInstance.slideTo(selectedIndex);
      }
    }
  }, [selectedImage, product.images, swiperInstance]);


  const cartExistanceCheck = async () => {
    try {
      const response = await axiosInstance.get(
        `/private/cart/product-exists/${id}`
      );
      if (response.status === 200) {
        setInCart(response.data);
      }
    } catch (error) {
      console.error("Error in fetching cartExistance", error);
    }
  };

  const addToCart = async (e) => {
    if (e) e.preventDefault();
    setCartLoading(true);
    try {
      const response = await axiosInstance.post(`/private/cart/add`, {
        id: id,
        quantity: 1
      });
      if (response.status === 200) {
        setInCart(true);
        toast.success("Product Added to Cart");
      }
    } catch (error) {
      console.log("Error in Adding to Cart", error);
      toast.error("Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  };

  const wishlistExistanceCheck = async () => {
    try {
      const response = await axiosInstance.get(
        `/private/wishlist/product-exists/${id}`
      );
      if (response.status === 200) {
        setInWishlist(response.data);
      }
    } catch (error) {
      console.error("Error in fetching wishlistExistance : ", error);
    }
  };

  const addToWishlist = async (e) => {
    if (e) e.preventDefault();
    setWishlistLoading(true);
    try {
      const response = await axiosInstance.get(`/private/wishlist/add/${id}`);
      if (response.status === 200) {
        setInWishlist(true);
        toast.success("Product Added to Wishlist");
      }
    } catch (error) {
      console.error("Error in Adding Wishlist : ", error);
      toast.error("Failed to Add in Wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (userId === null) {
      navigate("/login");
    } else {
      addToCart(e);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (userId === null) {
      navigate("/login");
    } else {
      addToWishlist(e);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (userId) {
        await Promise.all([wishlistExistanceCheck(), cartExistanceCheck()]);
      }
      setInitialLoading(false);
    };

    fetchInitialData();
  }, [product, userId]);

  if (!product || !product.images || product.images.length === 0) {
    return <p className="text-gray-500">No images available</p>;
  }

  if (initialLoading) {
    return <MyLoader />;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 relative ">
      {/* Thumbnails for large screens only */}
      <div className="hidden lg:flex flex-col gap-4 p-4">
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 object-cover rounded cursor-pointer border-2 p-1 ${
              selectedImage === img
                ? "border-green-500 shadow-md"
                : "border-slate-300"
            }`}
          />
        ))}
      </div>

      {/* Main Image + Buttons for large screens */}
      <div className="flex-1 flex flex-col items-center sticky top-0">
        {/* NEW: Replaced the static main image with the Swiper carousel */}
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            // Update the selectedImage state when the user swipes
            setSelectedImage(product.images[swiper.activeIndex]);
          }}
          className="w-full max-w-md"
          spaceBetween={10}
          slidesPerView={1}
        >
          {product.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Product image ${idx + 1}`}
                className="w-full h-[400px] object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails for mobile */}
        <div className="flex lg:hidden gap-2 mt-2 overflow-x-auto p-2">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Mobile Thumbnail ${idx + 1}`}
              onClick={() => setSelectedImage(img)} // This onClick now works with the swiper via the new useEffect
              className={`w-16 h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                selectedImage === img
                  ? "border-green-500 shadow-md"
                  : "border-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Buttons for large screens */}
        <div className="hidden lg:flex gap-4 mt-6">
         {outOfStock ? (
          <button
            type="button"
            disabled
            className="px-6 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : inCart ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/cart");
            }}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            View in Cart
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCartClick}
            disabled={cartLoading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer disabled:opacity-50"
          >
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
        )}
          
          {inWishlist ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/wishlist");
              }}
              className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer"
            >
              View in Wishlist
            </button>
          ) : (
            <button
              type="button"
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer disabled:opacity-50"
            >
              {wishlistLoading ? "Adding..." : "Add to Wishlist"}
            </button>
          )}
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

      {/* Fixed Buttons at bottom for mobile/small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around p-4 border-t border-gray-300 z-50">
        {outOfStock ? (
          <button
            type="button"
            disabled
            className="w-[45%] py-2 bg-gray-400 text-white rounded cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : inCart ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/cart");
            }}
            className="w-[45%] py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            View in Cart
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCartClick}
            disabled={cartLoading}
            className="w-[45%] py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer disabled:opacity-50"
          >
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
        ) }
        
        {inWishlist ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/wishlist");
            }}
            className="w-[45%] py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer"
          >
            View in Wishlist
          </button>
        ) : (
          <button
            type="button"
            onClick={handleWishlistClick}
            disabled={wishlistLoading}
            className="w-[45%] py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer disabled:opacity-50"
          >
            {wishlistLoading ? "Adding..." : "Add to Wishlist"}
          </button>
        )}
      </div>
    </div>
  );
};

// The ProductInfo component remains completely unchanged
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

    <div className="bg-green-50 py-2 px-3 rounded-md lg:my-2 text-green-700 font-semibold text-lg ">
      Details
    </div>
    <p className="text-gray-700 text-base lg:text-lg whitespace-pre-line">{product.details}</p>

    <div className="bg-green-50 py-2 px-3 rounded-md lg:my-2 text-green-700 font-semibold text-lg ">
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

export default ProductView;