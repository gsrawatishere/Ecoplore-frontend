import React, { useEffect, useState } from "react";
import CartCard from "../../Components/CartCard";
import Header from "../../Components/Home/Header";
import MyLoader from "../../utils/MyLoader";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import AddressSelector from "./Address";
import { CartEmpty } from "../../Components/Home/EmptyState";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [total, setTotal] = useState(0);
  const [noOfItems,setNoOfItems] = useState(0);
  const [profile,setProfile] = useState({firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    createdAt: "",});


 const navigate = useNavigate();

 //get customer data
  const getProfile = async ()=>{
  try {
     const response = await axiosInstance.get('/private/profile');

     if(response.status === 200){
      setProfile(response.data);
     }
  } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data ||
        ' failed to get profile data'
      console.error(message);
    }
}



  // Increase Quantity
  const handleIncrease = async (id, itemQuantity) => {
    try {
      const productData = await axiosInstance.get(`/public/product/${id}`);
      const unitsLeft = productData.data.noOfUnits;
      console.log(itemQuantity);
      console.log(unitsLeft);

      if (unitsLeft - itemQuantity > 0) {
        const response = await axiosInstance.post(`/private/cart/edit`, {
          id: id,
          quantity: itemQuantity + 1,
        });
        if (response.status == 200) {
          toast.success(`Item Quantity Updated Successfully`);
          getCartItems();
        }
      } else {
        toast.error("Max limit reached");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Failed to increase item quantity"
      );
      console.error("Error in Increasing Cart Item Quantity", error);
    }
  };

  // Decrease Quantity (minimum 1)
  const handleDecrease = async (id, itemQuantity, cartId) => {
    if (itemQuantity <= 1) {
      return handleRemove(cartId);
    }
    try {
      const response = await axiosInstance.post(`/private/cart/edit`, {
        id: id,
        quantity: itemQuantity - 1,
      });
      if (response.status == 200) {
        toast.success(`Item Quantity Updated Successfully`);
        getCartItems();
      }
    } catch (error) {
      console.error("Error in Decreasing Cart Item Quantity", error);
    }
  };

  // Remove Item
  const handleRemove = async (cartid) => {
    try {
      const response = await axiosInstance.delete(
        `/private/cart/remove/${cartid}`
      );
      if (response.status == 200) {
        toast.success("Item Removed Successfully");
        getCartItems();
      }
    } catch (error) {
      console.error("Error in Removing Cart Item", error);
    }
  };

  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/private/cart/get`);
      if (response.status == 200) {
        setCartItems(response.data);
        setNoOfItems(response.data.length);
      }
    } catch (error) {
      console.error("Error in Fetching Cart Items ", error);
    } finally {
      setIsLoading(false);
    }
  };

   
   
  // const handleCheckout = async () => {
  //   try {
  //     // Fetch orderId from your backend
  //     const response = await axiosInstance.get(`/private/order/payment/${total*100}`);
  //     const order_id = response.data;
  //     console.log(response.data);
  //     // Razorpay options
  //     const options = {
  //       key: "rzp_test_R6Jk7RQhk9fG4F",
  //       amount: total * 100, // in paise
  //       currency: "INR",
  //       name: "Greenplore",
  //       description: "Order Payment",
  //       order_id: order_id,
  //       handler: function (response) {
  //         // This function handles successful payment
  //         alert("Payment Successful!");
  //         console.log("Payment Details:", response);
  //       },
  //       prefill: {
  //         name: "Greenplore",
  //         email: "infogreenplore@gmail.com",
  //         // contact: "9999999999"
  //       },
  //       theme: {
  //         color: "#3399cc"
  //       }
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();

  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     alert("Failed to initiate payment.");
  //   }
  // };

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true); // Already loaded
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  const handlepreCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/private/order/check",
        cartItems
      );
      console.log(response.data);
      const { msg, status } = response.data;
      const isSuccess = status === "true";

      if (!isSuccess) {
        toast.error(msg);
      } else {
         if (selectedAddress === null) {
        toast.error("Please select Delivery address");
      } else {
        handleCheckout();
      }
      }

    } catch (error) {
      console.error("Failed to place order", error);
      toast.error("Failed to place order");
    }finally{
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsLoading(false);
        return;
      }

      // Get order ID from backend
      const response = await axiosInstance.get(
        `/private/order/payment/${(total*100 + (noOfItems * 50))}`
      );
      const order_id = response.data;

      const options = {
        key: "rzp_live_RCemjVt0zfY8v2",
        amount: (total*100 + (noOfItems * 50)),
        currency: "INR",
        name: "Greenplore",
        description: "Order Payment",
        order_id: order_id,
        handler: async function (response) {
          toast.success("Payment Successful!");
          setIsLoading(true);
          console.log("Payment Details:", response);
          const verifyResponse = await axiosInstance.post(
            "/private/order/payment/verify",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }
          );
          if (verifyResponse.status == 200) {
            //send bacend the item detaisl and create order and shipment
            const response = await axiosInstance.post(`/private/order/create`, {
              items: cartItems,
              addressId: selectedAddress.id,
            });
            if (response.status == 200) {
              toast.success("Order placed successfully");
              setIsLoading(false);
              navigate("/");
              
            } else {
              toast.error("Something went wrong. Please try again.");
            }
          }
        },
         prefill: {
            name: profile.firstName,       
            email: profile.email,     
            contact: profile.mobile 
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to initiate payment.");
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
    getProfile();
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(totalAmount);
  }, [cartItems]);

  if (isLoading) {
    return <MyLoader />;
  }

  if (cartItems.length == 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        <div className="mb-12">
          <Header heading="Cart" />
        </div>
        <div>
          <CartEmpty />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <Header heading="Cart" />
      </div>
      <div>
        <div>
          <AddressSelector
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </div>
        {/* {cartItems.map((product) => (
        <CartCard
          key={product.productId}
          product={product}
          quantity={product.quantity}
          onIncrease={() => handleIncrease(product.productId,product.quantity)}
          onDecrease={() => handleDecrease(product.productId,product.quantity,product.cartItemId)}
          onRemove={() => handleRemove(product.cartItemId)}
        />
      ))} */}
        {cartItems.map((product) => (
          <CartCard
            key={product.productId}
            product={product}
            quantity={product.quantity}
            onIncrease={() =>
              handleIncrease(product.productId, product.quantity)
            }
            onDecrease={() =>
              handleDecrease(
                product.productId,
                product.quantity,
                product.cartItemId
              )
            }
            onRemove={() => handleRemove(product.cartItemId)}
          />
        ))}

        {/* Total Price and Checkout Button */}
       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-4 md:py-5 w-full">
      
      {/* Price Breakdown */}
      <div className="text-sm sm:text-base text-gray-700">
        <div className="font-medium">Subtotal: {total}</div>
        <div className="font-medium">Shipping: 50x{noOfItems} = {noOfItems * 50}</div>
        <div className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
          Total: ₹{total + (noOfItems * 50)}
        </div>
      </div>

      {/* Checkout button */}
      <button
        type="button"
        className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
        onClick={(e) => {
          e.preventDefault();
          handlepreCheckout();
        }}
      >
        Checkout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Cart;
