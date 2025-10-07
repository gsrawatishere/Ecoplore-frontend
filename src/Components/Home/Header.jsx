import { ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";
import logo from "../../assets/Images/logo.png"; // Adjust path as per your project
import { useNavigate } from "react-router-dom";

const Header = ({ heading }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <header className="fixed top-0 w-full flex items-center  bg-[#edf1f1] px-2 sm:px-4 md:px-6 lg-px-12 py-1.5 z-50 ">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="p-1 cursor-pointer rounded-full hover:bg-green-200 transition duration-200"
      >
        <ArrowLeft className="w-6 h-6 text-green-700" />
      </button>

      {/* Logo */}
      <img
        onClick={()=>{navigate("/")}}
        src={logo}
        alt="Logo"
        className="w-10 h-10 sm:mx-3 md:w-12 md:h-12 cursor-pointer"
      />

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-green-800">{heading}</h1>
    </header>
  );
};

Header.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Header;