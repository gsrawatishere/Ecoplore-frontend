import React from 'react';
import { 
  Briefcase, 
  Heart, 
  Users, 
  Globe, 
  Target, 
  Award, 
  Leaf, 
  Mail,
  CheckCircle,
  Coffee,
  Zap,
  Shield,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Gift
} from 'lucide-react';

const Careers = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: " mental wellness support, and fitness allowances"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Perks",
      description: " green office spaces, and eco-product discounts"
    },
    {
      icon: BookOpen,
      title: "Learning & Growth",
      description: "Professional development budget, online courses, and conference attendance"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options"
    },
    {
      icon: Gift,
      title: "Financial Benefits",
      description: "Competitive salary, performance bonuses, and employee stock options"
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Inclusive environment, team outings, and collaborative workspaces"
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Every decision we make considers environmental impact and promotes sustainable practices."
    },
    {
      icon: Users,
      title: "People-Centric",
      description: "We prioritize our team's growth, well-being, and create an inclusive workplace for everyone."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative thinking and innovative solutions to make sustainability accessible."
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "Continuous learning and improvement are at the core of our personal and professional development."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Mission for a <span className="text-green-600">Sustainable Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Be part of a team that's revolutionizing e-commerce with sustainability at its core. 
              Help us make eco-friendly living accessible to millions across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@greenlore.com?subject=Career Interest - Join GreenPlore Team"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Your Resume
              </a>
              <button 
                onClick={() => document.getElementById('application-process').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Learn How to Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Why Work With Us */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a company where your work makes a real difference for the planet and people's lives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>

          {/* Company Stats */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-green-100">Employee Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2+</div>
                <div className="text-green-100">Years of Growth</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Perks */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and unique perks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <IconComponent className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Life at GreenPlore */}
        <div className="mb-16 bg-gray-50 -mx-6 px-6 py-12 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Life at GreenPlore</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience a workplace culture that celebrates diversity, innovation, and environmental consciousness.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborative Environment</h3>
              <p className="text-gray-600 text-sm">
                Work with passionate individuals who share your commitment to making the world more sustainable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast-Paced Growth</h3>
              <p className="text-gray-600 text-sm">
                Be part of a rapidly growing company where your contributions directly impact our success.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Meaningful Impact</h3>
              <p className="text-gray-600 text-sm">
                Every project you work on contributes to a more sustainable future for our planet.
              </p>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div id="application-process" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our application process is designed to be simple, transparent, and efficient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Send Resume</h3>
              <p className="text-gray-600 text-sm">Email your resume to contact@greenlore.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Initial Review</h3>
              <p className="text-gray-600 text-sm">Our HR team reviews your application</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interview Process</h3>
              <p className="text-gray-600 text-sm">Meet with our team through interviews</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Welcome Aboard</h3>
              <p className="text-gray-600 text-sm">Join our team and start your journey</p>
            </div>
          </div>

          {/* Application Tips */}
          <div className="mt-12 bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Application Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Include a compelling subject line in your email</li>
                <li>• Attach your resume in PDF format</li>
                <li>• Write a brief cover letter explaining your interest</li>
              </ul>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Highlight your passion for sustainability</li>
                <li>• Include relevant work experience and skills</li>
                <li>• Share any eco-friendly initiatives you've been part of</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for sustainability. 
            Even if we don't have specific openings right now, we'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@greenlore.com?subject=Career Interest - Future Opportunities&body=Dear GreenPlore Team,%0D%0A%0D%0AI am interested in joining your mission for a sustainable future. Please find my resume attached.%0D%0A%0D%0ABest regards"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Your Resume
            </a>
            <a
              href="mailto:contact@greenlore.com?subject=Career Questions"
              className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Ask Questions
            </a>
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About Careers?</h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help with any questions about opportunities at GreenPlore.
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

export default Careers;
