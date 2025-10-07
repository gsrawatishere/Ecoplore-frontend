import React from 'react';
import { FileText, Users, Shield, ShoppingCart, Leaf, Mail, AlertCircle, CheckCircle, User, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const definitions = [
    {
      term: "Marketplace",
      definition: "Refers to the platform, services, and website offered by GreenPlore."
    },
    {
      term: "User",
      definition: "Refers to any individual or entity accessing or using the Marketplace, either as a buyer, seller, or any other participant."
    },
    {
      term: "Product",
      definition: "Refers to the goods sold on the Marketplace, which are eco-friendly, sustainable, or otherwise aligned with environmentally responsible practices."
    },
    {
      term: "Seller",
      definition: "Refers to individuals or businesses offering products on the Marketplace."
    },
    {
      term: "Buyer",
      definition: "Refers to individuals purchasing products from the Marketplace."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to GreenPlore! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. 
          Please read them carefully before using our platform.
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      {/* Introduction */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Introduction</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          These Terms and Conditions ("Terms") govern your use of GreenPlore, an online marketplace dedicated to offering eco-friendly and sustainable products in India. 
          By using our website, you agree to be bound by these Terms, our Privacy Policy, and any additional guidelines or rules posted on the platform.
        </p>
      </div>

      {/* Definitions */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Definitions</h2>
        </div>
        
        <div className="space-y-4">
          {definitions.map((item, index) => (
            <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-700" />
                {item.term}
              </h3>
              <p className="text-gray-700 text-sm">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
        <div className="flex items-center mb-4">
          <User className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Eligibility</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          You must be at least <span className="font-semibold">18 years old</span> to use our platform, create an account, or make purchases. 
          By using our Marketplace, you represent and warrant that you are 18 years or older.
        </p>
      </div>

      {/* Account Registration */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Account Registration</h2>
        </div>
        
        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" />
                <span>You must provide accurate, complete, and current information.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" />
                <span>You are responsible for maintaining the confidentiality of your account information and for all activities under your account.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" />
                <span>You agree to notify us immediately if you suspect unauthorized use of your account.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Products and Listings */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Leaf className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Products and Listings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Store className="w-5 h-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Seller Responsibilities</h3>
                <p className="text-gray-700 text-sm">
                  Sellers are responsible for accurately representing their products and ensuring they align with our eco-friendly and sustainable standards.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Platform Rights</h3>
                <p className="text-gray-700 text-sm">
                  We reserve the right to remove any listing that does not meet our sustainability criteria or violates any laws or regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Terms Sections */}
      <div className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* User Conduct */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-700" />
              User Conduct
            </h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Use the platform responsibly and legally</li>
              <li>• Respect other users and their rights</li>
              <li>• Provide accurate information</li>
              <li>• Follow community guidelines</li>
            </ul>
          </div>

          {/* Platform Usage */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-green-700" />
              Platform Usage
            </h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Browse and purchase eco-friendly products</li>
              <li>• Create and manage your account</li>
              <li>• Leave reviews and ratings</li>
              <li>• Contact sellers and support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Become a Seller CTA */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
        <div className="text-center">
          <Store className="mx-auto h-8 w-8 text-green-700 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in Selling on GreenPlore?</h3>
          <p className="text-gray-600 mb-4">
            Join our marketplace and reach customers who care about sustainability and eco-friendly products.
          </p>
          <button
            onClick={() => { navigate("/register-seller") }}
            className="inline-flex items-center px-6 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Store className="w-4 h-4 mr-2" />
            Become a Seller
          </button>
        </div>
      </div>

      {/* Important Notice */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-800 mb-1">Important Notice</h3>
            <p className="text-gray-700 text-sm">
              These Terms and Conditions may be updated from time to time. Continued use of the platform after any changes constitutes acceptance of the new terms. 
              We recommend reviewing these terms periodically to stay informed of any updates.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Mail className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
        </div>
        <p className="text-gray-700 mb-2">
          If you have any questions or concerns regarding these Terms, please contact us at:
        </p>
        <div className="text-gray-700">
          <p className="font-medium">📧 Email: <span className="text-green-800">Contact@greenplore.com</span></p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          These Terms and Conditions are effective as of August 2025 and may be updated from time to time.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Last updated: August 26, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;