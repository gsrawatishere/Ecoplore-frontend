import React, { useState } from 'react';
import { 
  Headphones, 
  Mail, 
  Clock, 
  MessageSquare, 
  HelpCircle, 
  Package, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  Shield, 
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      id: 'orders',
      icon: Package,
      title: 'Order Support',
      description: 'Track orders, modify or cancel orders, order status updates',
      color: 'green'
    },
    {
      id: 'shipping',
      icon: Truck,
      title: 'Shipping & Delivery',
      description: 'Delivery issues, shipping charges, tracking problems',
      color: 'green'
    },
    {
      id: 'returns',
      icon: RotateCcw,
      title: 'Returns & Refunds',
      description: 'Return process, refund status, exchange requests',
      color: 'green'
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'Payment Issues',
      description: 'Payment failures, billing questions, refund queries',
      color: 'green'
    },
    {
      id: 'account',
      icon: Shield,
      title: 'Account & Security',
      description: 'Login issues, profile updates, privacy concerns',
      color: 'green'
    },
    {
      id: 'general',
      icon: HelpCircle,
      title: 'General Inquiries',
      description: 'Product questions, policies, feedback and suggestions',
      color: 'green'
    }
  ];

  const quickSolutions = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. Use this number on our tracking page or the courier's website."
    },
    {
      question: "Can I cancel my order?",
      answer: "You can cancel your order within 1 hour of placement if it hasn't been processed yet. Contact us immediately for assistance."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days after processing (2-3 days). Remote areas may take additional 1-2 days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, UPI, net banking, and digital wallets. COD will be available soon in select cities."
    },
    {
      question: "How do I return an item?",
      answer: "Email us at Contact@greenplore.com within 3 days of delivery with photos. We'll guide you through the return process."
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'Contact@greenplore.com',
      responseTime: 'Within 24 hours',
      action: 'mailto:Contact@greenplore.com',
      color: 'green',
      primary: true
    },
    {
      icon: MessageSquare,
      title: 'Help Center',
      description: 'Browse our comprehensive FAQ',
      contact: 'Self-service support',
      responseTime: 'Instant answers',
      action: '/faqs',
      color: 'green',
      primary: false
    }
  ];

  const filteredSolutions = quickSolutions.filter(solution =>
    solution.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    solution.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Headphones className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Customer Support</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Whether you have questions about orders, products, or need technical assistance, 
          our support team is ready to provide you with the best possible service.
        </p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
      </div>

      {/* Support Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">24hrs</div>
          <div className="text-sm text-gray-600">Average Response Time</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
          <div className="text-sm text-gray-600">Customer Satisfaction</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">Mon-Sat</div>
          <div className="text-sm text-gray-600">9 AM - 6 PM IST</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
        {['contact','categories','quick'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === tab
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'contact' ? 'Contact Us' : tab === 'categories' ? 'Support Categories' : 'Quick Solutions'}
          </button>
        ))}
      </div>

      {/* Contact Us Tab */}
      {activeTab === 'contact' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to contact us?</h2>
            <p className="text-gray-600">Choose the option that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 transition-all cursor-pointer bg-green-50 border-green-200 hover:bg-green-100 ${
                    method.primary ? 'ring-2 ring-green-300' : ''
                  }`}
                >
                  {method.primary && (
                    <div className="flex justify-end mb-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  <div className="flex items-center mb-4">
                    <IconComponent className={`w-8 h-8 mr-3 text-green-600`} />
                    <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg font-medium text-gray-900">{method.contact}</p>
                    <p className="text-sm text-gray-500">Response time: {method.responseTime}</p>
                  </div>
                  <a
                    href={method.action}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {method.icon === Mail ? (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Visit FAQ
                      </>
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Business Hours */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-center">
              <Clock className="mx-auto h-8 w-8 text-gray-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600 mb-2">Our customer support team is available:</p>
              <p className="font-medium text-gray-900">Monday to Saturday: 9:00 AM - 6:00 PM IST</p>
              <p className="text-sm text-gray-500 mt-2">We're closed on Sundays and public holidays</p>
            </div>
          </div>
        </div>
      )}

      {/* Support Categories Tab */}
      {activeTab === 'categories' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What can we help you with?</h2>
            <p className="text-gray-600">Select a category to get specific assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="p-6 rounded-lg border cursor-pointer transition-all bg-green-50 border-green-200 hover:bg-green-100 text-green-600"
                  onClick={() => window.location.href = `mailto:Contact@greenplore.com?subject=${encodeURIComponent(category.title + ' - Support Request')}`}
                >
                  <IconComponent className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Don't see your issue listed?</p>
            <a
              href="mailto:Contact@greenplore.com"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact General Support
            </a>
          </div>
        </div>
      )}

      {/* Quick Solutions Tab */}
      {activeTab === 'quick' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Solutions</h2>
            <p className="text-gray-600">Find instant answers to common questions</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for solutions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Solutions */}
          <div className="space-y-4">
            {filteredSolutions.map((solution, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                    {solution.question}
                  </h3>
                </div>
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{solution.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredSolutions.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No solutions found</h3>
              <p className="text-gray-500 mb-4">Try different keywords or contact our support team directly.</p>
              <a
                href="mailto:Contact@greenplore.com"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </a>
            </div>
          )}

          <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200 text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
            <p className="text-gray-600 mb-4">If you can't find the answer you're looking for, our support team is here to help.</p>
            <a
              href="mailto:Contact@greenplore.com"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get Personal Support
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-12 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">
          Need immediate assistance? Email us at <span className="font-medium text-green-600">Contact@greenplore.com</span>
        </p>
        <p className="text-sm text-gray-500">
          We're committed to providing excellent customer service for all your eco-friendly shopping needs.
        </p>
      </div>
    </div>
  );
};

export default CustomerSupport;