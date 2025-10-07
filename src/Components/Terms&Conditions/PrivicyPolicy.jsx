import React from 'react';
import { Shield, User, Lock, Eye, Users, FileText, AlertTriangle, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to GreenPlore, your trusted e-commerce marketplace for eco-friendly and sustainable products. 
          This Privacy Policy explains how we collect, use, store, and protect your personal information when you access and use our platform.
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      {/* Your Consent */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Your Consent</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          By using the Platform, you agree to the collection and use of your information in accordance with this Privacy Policy. 
          If you do not agree with the terms, please refrain from using our services.
        </p>
      </div>

      {/* What Information Do We Collect */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <User className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">What Information Do We Collect?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <User className="w-4 h-4 mr-1" />
              Personal Information
            </h3>
            <p className="text-gray-700 text-sm">Name, email, phone number, shipping address, and more.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              Account Information
            </h3>
            <p className="text-gray-700 text-sm">Username, password, and preferences.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              Transaction Data
            </h3>
            <p className="text-gray-700 text-sm">Payment details and transaction history.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              Device and Usage Data
            </h3>
            <p className="text-gray-700 text-sm">Information about your device and browsing patterns.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Location Data
            </h3>
            <p className="text-gray-700 text-sm">For delivery and recommendations.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              Sensitive Data
            </h3>
            <p className="text-gray-700 text-sm">Securely processed financial data.</p>
          </div>
        </div>
      </div>

      {/* How Do We Use Your Information */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">How Do We Use Your Information?</h2>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-700 mr-2 mt-1">•</span>
              Process orders and provide customer support.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mr-2 mt-1">•</span>
              Personalize your shopping experience.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mr-2 mt-1">•</span>
              Securely process payments and manage transactions.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mr-2 mt-1">•</span>
              Send updates and promotional content (you can opt-out).
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mr-2 mt-1">•</span>
              Prevent fraud and unauthorized access.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mr-2 mt-1">•</span>
              Ensure legal compliance.
            </li>
          </ul>
        </div>
      </div>

      {/* Who Do We Share Your Information With */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Who Do We Share Your Information With?</h2>
        </div>
        
        <p className="text-gray-700 mb-4">We may share your data with:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">🛒 Third-Party Sellers</h3>
            <p className="text-gray-700 text-sm">To fulfill your orders.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">🔧 Service Providers</h3>
            <p className="text-gray-700 text-sm">For payment processing, delivery, and analytics.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">⚖️ Legal and Regulatory Authorities</h3>
            <p className="text-gray-700 text-sm">When required by law.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">🏢 Business Transfers</h3>
            <p className="text-gray-700 text-sm">During mergers or acquisitions.</p>
          </div>
        </div>
      </div>

      {/* Children's Privacy */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Children's Privacy</h2>
        </div>
        <p className="text-gray-700">
          GreenPlore is not intended for children under 18. If we inadvertently collect data from children, we will delete it promptly.
        </p>
      </div>

      {/* Your Rights */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-green-800 text-sm">👁️ Access</h3>
                <p className="text-gray-700 text-sm">Request a copy of your data.</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 text-sm">✏️ Rectification</h3>
                <p className="text-gray-700 text-sm">Correct inaccurate information.</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 text-sm">🗑️ Erasure</h3>
                <p className="text-gray-700 text-sm">Request data deletion.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-green-800 text-sm">🚫 Withdraw Consent</h3>
                <p className="text-gray-700 text-sm">Opt-out of marketing communications.</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 text-sm">📱 Data Portability</h3>
                <p className="text-gray-700 text-sm">Request your data in a portable format.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-100 p-3 rounded border border-green-300">
          <p className="text-green-800 text-sm">
            Contact us at <span className="font-semibold">Contact@greenplore.com</span> to exercise your rights.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Mail className="w-6 h-6 text-green-700 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
        </div>
        <p className="text-gray-700 mb-2">
          If you have any questions or concerns about this Privacy Policy, contact us at:
        </p>
        <div className="text-gray-600">
          <p className="font-medium">📧 Email: <span className="text-green-700">Contact@greenplore.com</span></p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          This Privacy Policy is effective as of August 2025 and may be updated from time to time.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Last updated: August 26, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;