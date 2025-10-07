import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Package, CreditCard, Truck, Shield, Users, Leaf } from 'lucide-react';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'orders', name: 'Orders & Payment', icon: CreditCard },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck },
    { id: 'products', name: 'Products & Sustainability', icon: Leaf },
    { id: 'account', name: 'Account & Privacy', icon: Shield },
    { id: 'returns', name: 'Returns & Refunds', icon: Package }
  ];

  const faqs = {
    general: [
      {
        id: 1,
        question: "What is GreenPlore?",
        answer: "GreenPlore is your trusted e-commerce marketplace dedicated to eco-friendly and sustainable products. We connect conscious consumers with environmentally responsible sellers across India, offering everything from organic food to sustainable home goods."
      },
      {
        id: 2,
        question: "How does GreenPlore ensure products are eco-friendly?",
        answer: "We have a strict verification process for all our sellers. Products must meet our sustainability criteria including eco-friendly materials, ethical sourcing, minimal packaging, and environmental certifications. Our team regularly audits sellers to maintain these standards."
      },
      {
        id: 3,
        question: "Is GreenPlore available throughout India?",
        answer: "Yes, we deliver across India covering all metro cities and select non-metro locations. We're continuously expanding our reach to serve more eco-conscious customers nationwide."
      },
      {
        id: 4,
        question: "How can I become a seller on GreenPlore?",
        answer: "To become a seller, you need to apply through our seller registration process. Your products must meet our sustainability standards, and you'll need to provide necessary documentation including business registration, product certifications, and sustainability credentials."
      }
    ],
    orders: [
      {
        id: 5,
        question: "How do I place an order?",
        answer: "Simply browse our products, add items to your cart, proceed to checkout, fill in your shipping details, and choose your payment method. You'll receive an order confirmation email once your order is successfully placed."
      },
      {
        id: 6,
        question: "What payment methods do you accept?",
        answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted channels."
      },
      {
        id: 7,
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 1 hour of placement if it hasn't been processed. After processing begins, modifications aren't possible, but you can return items as per our return policy."
      },
      {
        id: 8,
        question: "Do you offer Cash on Delivery (COD)?",
        answer: "Currently, we don't offer Cash on Delivery service. However, we are working on implementing COD in select cities and will notify our customers once this service becomes available."
      }
    ],
    shipping: [
      {
        id: 9,
        question: "What are your shipping charges?",
        answer: "Shipping charges depend on the weight and destination of your order. Rates start from ₹75 for orders under 500g and vary by weight slabs. Exact charges are calculated and displayed at checkout."
      },
      {
        id: 10,
        question: "How long does delivery take?",
        answer: "Most products are made to order with vendor lead times of 5-7 business days. After processing (2-3 business days), standard delivery takes 5-7 business days depending on your location."
      },
      {
        id: 11,
        question: "What delivery options do you provide?",
        answer: "Currently, we offer standard delivery across India. We deliver between 8 AM and 9 PM, Monday through Saturday. We do not deliver on Sundays or public holidays."
      },
      {
        id: 12,
        question: "Can I track my order?",
        answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package from dispatch until 7 days after delivery through our website or the courier partner's tracking system."
      },
      {
        id: 13,
        question: "What if my package is damaged or lost?",
        answer: "If your package is damaged, refuse delivery and contact us immediately at contact@greenplore.in with photos. For lost shipments, we'll investigate with our logistics partners and arrange a replacement or refund as appropriate."
      }
    ],
    products: [
      {
        id: 14,
        question: "Are all products on GreenPlore organic?",
        answer: "While we specialize in eco-friendly products, not all items are certified organic. Each product listing clearly indicates certifications like organic, fair-trade, or sustainable sourcing. Look for certification badges on product pages."
      },
      {
        id: 15,
        question: "How do you ensure product quality?",
        answer: "We work only with verified sellers who meet our quality standards. Products undergo quality checks, and we maintain strict guidelines for packaging, storage, and shipping. Customer reviews also help maintain quality standards."
      },
      {
        id: 16,
        question: "Do you sell perishable items?",
        answer: "Yes, we offer fresh and perishable products through our dedicated logistics network. These items are hand-delivered directly from vendors in select cities with special handling to maintain freshness."
      },
      {
        id: 17,
        question: "What makes your packaging sustainable?",
        answer: "We use minimal, biodegradable, and recyclable packaging materials. Our sellers are required to use eco-friendly packaging, avoiding plastic where possible and using materials like recycled cardboard, paper, and biodegradable fillers."
      }
    ],
    account: [
      {
        id: 18,
        question: "How do I create an account?",
        answer: "Click 'Sign Up' on our homepage, provide your email and phone number, create a password, and verify your account through the OTP sent to your email/phone. You can also sign up using social media accounts."
      },
      {
        id: 19,
        question: "Is my personal information secure?",
        answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We comply with data protection regulations and never share your information with third parties without consent, except as outlined in our Privacy Policy."
      },
      {
        id: 20,
        question: "Can I delete my account?",
        answer: "Yes, you can request account deletion by contacting us at Contact@greenplore.com. We'll process your request within 7 business days and permanently delete your personal data as per our Privacy Policy."
      },
      {
        id: 21,
        question: "How do I update my profile information?",
        answer: "Log into your account, go to 'My Profile' or 'Account Settings', and update your information including name, email, phone number, and addresses. Changes are saved automatically."
      }
    ],
    returns: [
      {
        id: 22,
        question: "What is your return policy?",
        answer: "We offer returns within 7 days of delivery depending on the product category. Items must be unused, in original packaging, and accompanied by the original invoice. Perishable and personalized items cannot be returned."
      },
      {
        id: 23,
        question: "How do I initiate a return?",
        answer: "Go to 'My Orders', select the item you want to return, click 'Return Item', choose your reason, and schedule a pickup. Our team will arrange collection and process your refund once we receive and verify the item."
      },
      {
        id: 24,
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive and verify the returned item. The amount will be credited to your original payment method or GreenPlore wallet, depending on your preference."
      },
      {
        id: 25,
        question: "Are there any return charges?",
        answer: "Return pickup is free for defective or wrong items. For other returns, minimal pickup charges may apply depending on your location and the item category. This will be clearly mentioned during the return process."
      }
    ]
  };

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const filteredFAQs = searchTerm
    ? Object.values(faqs).flat().filter(
        faq =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs[activeCategory];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600">Find answers to common questions about GreenPlore</p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar */}
        {!searchTerm && (
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                        activeCategory === category.id
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* FAQ Content */}
        <div className={searchTerm ? 'w-full' : 'lg:w-3/4'}>
          {searchTerm && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Found {filteredFAQs.length} result(s) for "{searchTerm}"
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try searching with different keywords or browse categories.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 bg-green-50 rounded-lg p-6 border border-green-200">
        <div className="text-center">
          <Users className="mx-auto h-8 w-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:contact@greenplore.in"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Package className="w-4 h-4 mr-2" />
              Email Support
            </a>
            <a
              href="mailto:Contact@greenplore.com"
              className="inline-flex items-center px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              General Inquiries
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Last updated: August 26, 2025
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
