import React from "react";
import { Leaf, Recycle, Footprints } from "lucide-react";

const AboveFooter = () => {
  return (
    <section className="w-full bg-[#edf1f1] py-8 px-3 sm:py-10 sm:px-4">
      {/* Heading */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-green-900 mb-6 sm:mb-8">
        Shop Only Sustainable Products
      </h2>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-center">
        
        {/* Card 1 */}
        <div className="p-4 sm:p-6 bg-green-100 rounded-xl shadow-sm hover:shadow-md transition">
          <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
          <h3 className="font-bold text-base sm:text-lg text-green-900 mb-1 sm:mb-2">
            India’s Ethical Sustainable Brand
          </h3>
          <p className="text-sm sm:text-base text-green-800">
            Discover Eco-Friendly Gifts
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 sm:p-6 bg-green-100 rounded-xl shadow-sm hover:shadow-md transition">
          <Recycle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
          <h3 className="font-bold text-base sm:text-lg text-green-900 mb-1 sm:mb-2">
            Cruelty Free & Plastic Free
          </h3>
          <p className="text-sm sm:text-base text-green-800">
            Ethically Made in India
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-4 sm:p-6 bg-green-100 rounded-xl shadow-sm hover:shadow-md transition">
          <Footprints className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
          <h3 className="font-bold text-base sm:text-lg text-green-900 mb-1 sm:mb-2">
            GreenPlore Climate Commitment
          </h3>
          <p className="text-sm sm:text-base text-green-800">
            Reduce Carbon Footprint
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboveFooter;