import { motion } from "framer-motion";
import savenature from "../../assets/Images/savenature.png";
import marquee2 from "../../assets/Images/marquee2.png";
import marquee3 from "../../assets/Images/marquee3.png";
import marquee4 from "../../assets/Images/marquee4.png";
import nature from "../../assets/Images/nature.png";
import biodegradable from "../../assets/Images/biodegradable.png";
import natural from "../../assets/Images/natural.png";
import leaff from "../../assets/Images/leaff.png";
import crueltyfree from "../../assets/Images/crueltyfree.png";
import heart from "../../assets/Images/heart.png";
import pure from "../../assets/Images/pure.png";
import organic from "../../assets/Images/organic.png";
import organic2 from "../../assets/Images/organic2.png";
import earth from "../../assets/Images/earth.png";
import eco from "../../assets/Images/eco.png";
import recycle from "../../assets/Images/recycle.png";

const images = [
  savenature,
  earth,
  marquee2,
  nature,
  organic2,
  natural,
  biodegradable,
  eco,
  marquee3,
  marquee4,
  recycle,
  leaff,
  crueltyfree,
  heart,
  pure,
  organic,
];

const Marquee = () => {
  return (
    <div>
      <Header title="Why GreenPlore?" />
      <MarqueeContainer>
        <MarqueeContent images={images} />
      </MarqueeContainer>
    </div>
  );
};

const Header = ({ title }) => (
  <div className="flex flex-col justify-center items-center bg-[#edf1f1] pt-4 pb-4">
    {/* Mobile Header */}
    <h1
      className="text-3xl md:hidden flex justify-center items-center text-[#1b4130] -mb-[5px]"
      style={{ fontFamily: "Jacques Francois, serif" }}
    >
      {title}
    </h1>
    {/* Web Header */}
    <h1
      className="hidden md:flex text-[50px] justify-center items-center text-[#1b4130] -mb-[5px]"
      style={{ fontFamily: "Jacques Francois, serif" }}
    >
      {title}
    </h1>
  </div>
);

const MarqueeContainer = ({ children }) => (
  <div className="w-full py-10 bg-[#1b4130] overflow-hidden">
    <div className="flex whitespace-nowrap relative items-center">
      {children}
    </div>
  </div>
);

const MarqueeContent = ({ images }) => (
  <motion.div
    className="flex items-center"
    animate={{ x: ["0%", "-50%"] }} // keyframes animation
    transition={{
      ease: "linear",
      repeat: Infinity,
      duration: 20,
    }}
  >
    {[...images, ...images].map((src, index) => (
      <MarqueeImage key={index} src={src} alt={`Marquee Image ${index + 1}`} />
    ))}
  </motion.div>
);

const MarqueeImage = ({ src, alt }) => (
  <img
    className="mx-3 w-[50px] h-[40px] md:mx-5 md:w-[80px] md:h-[80px]"
    src={src}
    alt={alt}
  />
);

export default Marquee;