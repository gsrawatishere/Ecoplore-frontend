import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import cart from "../../assets/Images/logo.png";

function Footer() {
  
  return (
    <footer className="bg-[#1d1f1e] text-white py-10 px-4 sm:px-8 ">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          
          {/* Get to Know Us */}
          <section>
            <h2 className="font-bold text-lg text-green-600 mb-2">Get to Know Us</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/faqs" className="hover:text-green-600 transition duration-300">FAQs</Link>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://forms.gle/ee79A8PexkcYUnCB9", "_blank")}
                  className="hover:text-green-600 transition duration-300"
                >
                  Bulk & Corporate Req
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://forms.gle/FzjdnznktYmVmHJF6", "_blank")}
                  className="hover:text-green-600 transition duration-300"
                >
                  Affiliate Program
                </button>
              </li>
              <li>
                <Link to="/register-seller" className="hover:text-green-600 transition duration-300">
                  Register as a Seller
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-600 transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </section>

          {/* Policies */}
          <section>
            <h2 className="font-bold text-lg text-green-600 mb-2">Policies</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-green-300 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link to="/track-order" className="hover:text-green-300 transition duration-300">
                  Track My Order
                </Link>
              </li> */}
              <li>
                <Link to="/return-and-refund-policy" className="hover:text-green-300 transition duration-300">
                  Return and Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-green-300 transition duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-green-300 transition duration-300">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </section>

          {/* Support */}
          <section>
            <h2 className="font-bold text-lg text-green-600 mb-2">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="hover:text-green-300 transition duration-300">
                  Get Customer Support
                </Link>
              </li>
              <li>
                {/* <Link to="/wishlist" className="hover:text-green-600 transition duration-300">
                  Wishlist
                </Link> */}
              </li>
            </ul>
          </section>

          {/* Company Info */}
          <section>
            <h2 className="font-bold text-lg text-green-600 mb-2">Company Info</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-green-300 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-green-300 transition duration-300">
                  Careers
                </Link>
              </li>
            </ul>
          </section>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="https://www.facebook.com/61566546863902/photos/?_rdr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/greenplore_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://in.linkedin.com/company/greenplore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
            <FaYoutube className="w-6 h-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
            <FaPinterest className="w-6 h-6" />
          </a>
        </div>

        {/* Cart Icon */}
        <div className="mt-6">
          <img src={cart} alt="cart" className="h-[6vh] cursor-pointer" />
        </div>

        {/* Footer Bottom Text */}
        <p className="mt-6 text-xs sm:text-sm text-gray-400 text-center">
          © 2024 GreenPlore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;