import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";

const EmptyState = ({ type }) => {
  const navigate = useNavigate();
  const isCart = type === "cart";

  const message = isCart
    ? "Your cart feels light 🌱. Time to add some green goodies!"
    : "Your wishlist is waiting 🌿. Save items you love for later!";

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-[#edf1f1] ">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
        {isCart ? (
          <ShoppingCart className="text-green-700 w-10 h-10" />
        ) : (
          <Heart className="text-green-700 w-10 h-10" />
        )}
      </div>

      <h2 className="text-2xl font-semibold text-[#1b4130] mb-3">
        {isCart ? "Your Cart is Empty" : "Your Wishlist is Empty"}
      </h2>
      <p className="text-gray-600 mb-6">{message}</p>

      <button
        onClick={() => navigate("/")}
        className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-full transition-colors cursor-pointer"
      >
        Explore Products
      </button>
    </div>
  );
};

// Usage:
export const CartEmpty = () => <EmptyState type="cart" />;
export const WishlistEmpty = () => <EmptyState type="wishlist" />;