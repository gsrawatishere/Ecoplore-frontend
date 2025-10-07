import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, HelpCircle, Package, Shield, Leaf } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'Contact@greenplore.com',
      action: 'mailto:Contact@greenplore.com',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'We\'re available during these times',
      contact: 'Monday - Saturday: 9:00 AM - 6:00 PM IST',
      action: null,
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      description: 'We deliver across India',
      contact: 'Pan India Delivery Available',
      action: null,
      color: 'purple'
    }
  ];

  const inquiryTypes = [
    { icon: Package, title: 'Order Support', description: 'Questions about your orders, shipping, or returns' },
    { icon: Leaf, title: 'Product Inquiry', description: 'Information about our eco-friendly products' },
    { icon: Shield, title: 'Account Help', description: 'Account management and privacy concerns' },
    { icon: HelpCircle, title: 'General Support', description: 'Any other questions or feedback' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600">We're here to help! Get in touch with our friendly customer support team.</p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          
          return (
            <div key={index} className={`p-6 rounded-lg border bg-green-50 border-green-200 text-green-600`}>
              <div className="flex items-center mb-4">
                <IconComponent className="w-8 h-8 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">{method.description}</p>
              {method.action ? (
                <a 
                  href={method.action}
                  className="font-medium text-gray-900 hover:underline"
                >
                  {method.contact}
                </a>
              ) : (
                <p className="font-medium text-gray-900">{method.contact}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Send us a Message</h2>
          <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Thank you! Your message has been sent successfully. We'll respond within 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Phone & Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Inquiry Type *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="order">Order Support</option>
                  <option value="product">Product Inquiry</option>
                  <option value="account">Account Help</option>
                  <option value="general">General Support</option>
                  <option value="partnership">Partnership/Business</option>
                  <option value="feedback">Feedback/Suggestions</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description of your inquiry"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Please provide details about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Help & FAQs */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Help</h2>
            <p className="text-gray-600 mb-6">
              Looking for immediate assistance? Check out these common inquiry types or visit our FAQ section.
            </p>
          </div>

          <div className="space-y-4">
            {inquiryTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-green-600 mt-1" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{type.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{type.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Link */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Need Quick Answers?</h3>
            <p className="text-green-700 text-sm mb-3">
              Visit our FAQ section for instant answers to common questions about orders, shipping, returns, and more.
            </p>
            <a 
              href="/faqs" 
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Browse FAQs
            </a>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Other Ways to Reach Us</h3>
          <p className="text-gray-600 mb-4">
            We're committed to providing excellent customer service and support for all your eco-friendly shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:Contact@greenplore.com"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us Directly
            </a>
            <span className="text-gray-500 text-sm">
              Average response time: 24 hours
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          GreenPlore Customer Support • Available Monday to Saturday, 9:00 AM - 6:00 PM IST
        </p>
      </div>
    </div>
  );
};

export default ContactUs;