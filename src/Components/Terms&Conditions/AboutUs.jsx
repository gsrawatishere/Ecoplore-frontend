import React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Leaf, 
  Heart, 
  Users, 
  Globe, 
  Target, 
  Award, 
  Recycle, 
  TreePine, 
  Shield, 
  Truck,
  Store,
  Mail,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AboutUs = () => {
    const navigate = useNavigate();

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "We prioritize products that minimize environmental impact and promote sustainable living practices.",
      color: "green"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product is carefully vetted to ensure it meets our high standards for quality and authenticity.",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Community Care",
      description: "We support local artisans, small businesses, and communities committed to eco-friendly practices.",
      color: "red"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making sustainable choices accessible to everyone, creating positive change one purchase at a time.",
      color: "purple"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Eco-Friendly Products", icon: Leaf },
    { number: "5,000+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Verified Sellers", icon: Store },
    { number: "50+", label: "Cities Served", icon: Truck }
  ];

  const features = [
    {
      icon: Recycle,
      title: "Sustainable Products",
      description: "Curated collection of eco-friendly, sustainable, and ethically sourced products."
    },
    {
      icon: TreePine,
      title: "Environmental Impact",
      description: "Every purchase contributes to reducing carbon footprint and supporting green initiatives."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Supporting local artisans, small businesses, and environmentally conscious sellers."
    },
    {
      icon: Award,
      title: "Quality Verified",
      description: "Rigorous quality checks and sustainability verification for all our products."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "GreenPlore Founded",
      description: "Started with a vision to make sustainable shopping accessible to everyone in India."
    },
    {
      year: "2024",
      title: "Nationwide Expansion",
      description: "Expanded delivery services to cover all major cities and select rural areas across India."
    },
    {
      year: "2024",
      title: "Seller Network Growth",
      description: "Built a network of 500+ verified eco-friendly sellers and sustainable brands."
    },
    {
      year: "2025",
      title: "Innovation Continues",
      description: "Continuously improving our platform and adding new sustainable product categories."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-green-600">GreenPlore</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your trusted marketplace for eco-friendly and sustainable products. We're on a mission to make 
              sustainable living accessible, affordable, and enjoyable for everyone across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
               onClick={()=>(navigate("/"))}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Store className="w-4 h-4 mr-2" />
                Start Shopping
              </button>
              <button 
              onClick={()=>(navigate("/register-seller"))}
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                <Users className="w-4 h-4 mr-2" />
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Born from a Vision for a Sustainable Future
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                GreenPlore was founded with a simple yet powerful belief: sustainable living shouldn't be a luxury, 
                but a choice available to everyone. We saw a gap in the market where eco-conscious consumers 
                struggled to find authentic, sustainable products that were both affordable and accessible.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, we're proud to be India's leading marketplace for eco-friendly products, connecting 
                conscious consumers with verified sustainable sellers across the country. Every product on our 
                platform is carefully curated to ensure it meets our strict sustainability and quality standards.
              </p>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Making sustainability accessible since 2023</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16 bg-gray-50 -mx-6 px-6 py-12 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Empowering Sustainable Choices for a Better Tomorrow
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                To create a comprehensive ecosystem where sustainable living is not just possible, but preferred. 
                We strive to connect eco-conscious consumers with authentic sustainable products while supporting 
                environmentally responsible businesses and artisans across India.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to sustainable commerce.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colorClasses = {
                green: 'bg-green-50 border-green-200 text-green-600',
                blue: 'bg-blue-50 border-blue-200 text-blue-600',
                red: 'bg-red-50 border-red-200 text-red-600',
                purple: 'bg-purple-50 border-purple-200 text-purple-600'
              };
              
              return (
                <div key={index} className={`p-6 rounded-lg border ${colorClasses[value.color]}`}>
                  <IconComponent className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of services designed to make sustainable shopping easy and enjoyable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-green-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a simple idea to India's trusted sustainable marketplace - here's how we've grown.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                  <span className="text-green-600 font-bold text-sm">{milestone.year}</span>
                </div>
                <div className="flex-grow">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Green Revolution</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Be part of our growing community of eco-conscious individuals making a positive impact on the planet. 
            Together, we can create a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
             onClick={()=>(navigate("/"))}
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer">
              <Store className="w-4 h-4 mr-2" />
              Start Shopping Now
            </button>
            <a
              href="mailto:contact@greenlore.com"
              className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Reach out to us for any questions, suggestions, or partnerships.
          </p>
          <a
            href="mailto:contact@greenlore.com"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Email: contact@greenlore.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
