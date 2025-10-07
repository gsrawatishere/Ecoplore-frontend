import React from 'react';
import { RotateCcw, CheckCircle, XCircle, Clock, Mail, Package, AlertTriangle, Shield, Info } from 'lucide-react';

const ReturnsRefundPolicy = () => {
  const eligibleReturns = [
    {
      title: "Faulty or Defective Products",
      description: "If you receive a product that is damaged, defective, or has a manufacturing fault, we will be happy to accept the return and provide you with a replacement or refund."
    },
    {
      title: "Incorrect Items Received",
      description: "If the item you received is not what you ordered, please reach out to us for a resolution."
    },
    {
      title: "Size Issues",
      description: "If you ordered the wrong size or would like to exchange an item for a different size (subject to availability), we are happy to help."
    }
  ];

  const nonReturnableItems = [
    {
      title: "Worn, Washed, or Soiled Items",
      description: "Items that have been used, washed, or damaged cannot be returned. Please ensure that the items are in brand-new condition when returning."
    },
    {
      title: "Beauty Products",
      description: "Due to health and safety regulations, beauty products cannot be returned once opened or used."
    },
    {
      title: "Foods & Beverages",
      description: "We cannot accept returns on perishable goods such as food and beverages."
    },
    {
      title: "Large Items",
      description: "Furniture, statues, or other large items cannot be returned due to logistical constraints."
    },
    {
      title: "Custom-made or Handmade Items",
      description: "Personalized or custom-made products are final sale and cannot be returned unless faulty."
    }
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Email us at Contact@greenplore.com within 7 days of receiving your order",
      details: "Please include clear photos of the product, especially if it's damaged, to assist us in processing your request."
    },
    {
      step: 2,
      title: "Ship Back",
      description: "Ship the item back within 7 days of receiving approval",
      details: "Return shipping costs are the customer's responsibility unless the return is due to a fault on our side."
    },
    {
      step: 3,
      title: "Receive Refund",
      description: "Refunds will be processed within 7 days after we receive the returned product",
      details: "The refund will be credited to the original payment method once processed."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-2">GreenPlore Returns & Exchange Policy</h1>
        <p className="text-gray-600 leading-relaxed">
          We value customer satisfaction and are committed to ensuring that your shopping experience with GreenPlore.com is seamless. 
          We offer returns and exchanges for items purchased directly from verified brands and designers on GreenPlore.com, 
          subject to the following conditions.
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      {/* Eligible Returns */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">Eligible Returns</h2>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
          <p className="text-gray-700">
            We are happy to accept returns for the following situations:
          </p>
        </div>
        
        <div className="space-y-4">
          {eligibleReturns.map((item, index) => (
            <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Returnable Products */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <XCircle className="w-6 h-6 text-red-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">Non-Returnable Products</h2>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
          <p className="text-gray-700">
            For hygiene and safety reasons, we do not accept returns on the following items:
          </p>
        </div>
        
        <div className="space-y-4">
          {nonReturnableItems.map((item, index) => (
            <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Return & Exchange Conditions */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">Return & Exchange Conditions</h2>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
          <p className="text-gray-700">
            To ensure a smooth return or exchange process, please keep the following conditions in mind:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Time Limit</h3>
                <p className="text-gray-700 text-sm">
                  Returns must be initiated within <span className="font-medium">7 days</span> of receiving your order. 
                  After this period, we unfortunately will not be able to process the return.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Package className="w-5 h-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Item Condition</h3>
                <p className="text-gray-700 text-sm">
                  Items must be unused, unwashed, and in their original packaging, unless the product was damaged during delivery. 
                  Please keep the tags intact and the packaging in good condition.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg border border-green-300 md:col-span-2">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-green-700 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Shipping Costs</h3>
                <p className="text-gray-700 text-sm">
                  Logistics charges for delivery are non-refundable. The cost of shipping the item back to us will be the customer's responsibility 
                  unless the return is due to an error on our part.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Return Information */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
        <div className="flex items-center mb-4">
          <Info className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">Product Return or Exchange Information</h2>
        </div>
        <p className="text-gray-700">
          To help you make informed purchasing decisions, you will be able to see whether a product is eligible for return before you complete your purchase. 
          This information is displayed clearly on the product page, so you can easily check if the item you're interested in can be returned or exchanged.
        </p>
      </div>

      {/* How to Return or Exchange */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <RotateCcw className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">How to Return or Exchange</h2>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
          <p className="text-gray-700">
            If you are eligible for a return or exchange, please follow the steps outlined below:
          </p>
        </div>

        <div className="space-y-6">
          {returnSteps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                {step.step}
              </div>
              <div className="flex-grow">
                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">{step.title}</h3>
                  <p className="text-gray-700 mb-2">{step.description}</p>
                  <p className="text-gray-600 text-sm italic">{step.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Timeline */}
      <div className="mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Return Timeline Summary
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700 mb-1">7 Days</div>
              <div className="text-sm text-gray-600">Contact us after delivery</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700 mb-1">7 Days</div>
              <div className="text-sm text-gray-600">Ship item back after approval</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700 mb-1">7 Days</div>
              <div className="text-sm text-gray-600">Refund processed after receipt</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-100 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Mail className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">Need Help with Returns?</h2>
        </div>
        <p className="text-gray-700 mb-2">
          For any questions about returns, exchanges, or refunds, please contact our customer support team:
        </p>
        <div className="text-gray-600">
          <p className="font-medium">📧 Email: <span className="text-green-700">Contact@greenplore.com</span></p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          This Returns & Exchange Policy is effective as of August 2025 and may be updated from time to time.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Last updated: August 26, 2025
        </p>
      </div>
    </div>
  );
};

export default ReturnsRefundPolicy;