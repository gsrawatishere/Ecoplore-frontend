import React from "react";
import { Button } from "../../Components/SellerDashboard/buttonVariants";
import { Card, CardContent } from "../../Components/SellerDashboard/Card";
import { Leaf, BarChart3, Package, Shield,LayoutDashboard,Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Home, Plus, User } from "lucide-react";
import logo from "../../assets/Images/greenplore.png";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import MyLoader from "../../utils/MyLoader";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Home/Footer";

const Dashboard = () => {
  const { userId, setIsLoggedIn, setUserId, setUserRole } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserId(null);
        setUserRole(null);
        toast.success("Logged out Successfully!");
        navigate("/login");
      }
    } catch (error) {
      const message =
        error?.response?.data?.msg || error?.response?.data || "Login failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
  icon: Truck, 
  title: "Manage Orders",
  description: "Track, process, and update the status of all incoming customer orders.",
  link: "/manage-orders",
  color: "bg-green-400", 
},
    {
      icon: Package,
      title: "Manage Products",
      description: "View and edit your entire product catalog",
      link: "/manage-products",
      color: "bg-green-400",
    },
    {
      icon: Plus,
      title: "Add New Product",
      description: "Create new eco-friendly product listings",
      link: "/addproduct",
      color: "bg-green-400",
    },
    {
      icon: User,
      title: "Profile Management",
      description: "Update your seller profile and store settings",
      link: "/seller-profile",
      color: "bg-green-400",
    },
  ];

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="min-h-screen bg-[#edf1f1] from-green-100 to-green-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                className=" h-10 w-28 md:h-13 md:w-44"
                src={logo}
                alt="GreenPlore"
                width={50}
                height={50}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">
                  {userId?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm md:text-base font-medium text-gray-900">
                  {userId}
                </p>
                {/* <p className="text-xs md:text-sm text-gray-500">Seller</p> */}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 sm:ml-2 md:ml-4 lg:ml-6 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Sustainable Ecommerce
            <span className="text-green-600 block">Made Simple</span>
          </h1>
          <p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Join Greenlore's marketplace for eco-friendly products. Manage your
            sustainable business with our powerful seller dashboard.
          </p>
          <div
            className="flex gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <Link to="/addproduct">
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700 cursor-pointer "
              >
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Dashboard Navigation */}
      <section className="py-16 bg-gradient-to-br from-green-100 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Seller Dashboard Features
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Access all the tools you need to manage your sustainable business
            from one powerful dashboard
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((item, index) => (
              <Link key={index} to={item.link} className="group">
                <Card
                  className="h-full shadow hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 text-center">
                    {" "}
                    {/* Reduced padding */}
                    <div
                      className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <item.icon className="h-6 w-6 text-white" />{" "}
                      {/* Smaller icon */}
                    </div>
                    <h3 className="text-md font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            Everything You Need to Sell Sustainably
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: "Product Management",
                description:
                  "Add, edit, and manage your eco-friendly product catalog easily.",
              },
              {
                icon: LayoutDashboard,
                title: "Centralized Dashboard",
                description:
                  "Manage all your sales, products, and insights from one unified control panel.",
              },
              {
                icon: Shield,
                title: "Verified Eco-Friendly",
                description:
                  "Products verified for sustainability standards, ensuring trust.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#008236] from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to Make a Difference?
          </h2>
          <p
            className="text-xl mb-8 opacity-90 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Join thousands of sellers making the world more sustainable, one
            product at a time.
          </p>
          <Link to="/addproduct">
            <Button
              size="lg"
              className="bg-white text-green-800 hover:bg-gray-100 animate-fade-in cursor-pointer"
              style={{ animationDelay: "400ms" }}
            >
             Start Selling
            </Button>
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Dashboard;
