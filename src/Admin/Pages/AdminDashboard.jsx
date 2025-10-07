import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";

import { Button } from "../Components/Button";
import axiosInstance from "../../api/axiosInstance";

import {
  Users,
  ShoppingBag,
  Package,
  Store,
  Plus,
  Eye,
  TrendingUp,
  Activity,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
  Badge,
} from "../Components/UI";

import { Navbar } from "../Components/Navbar";
import AllSellers from "./AllSellers";
import toast from "react-hot-toast";
import MyLoader from "../../utils/MyLoader";

// --- Mock Select Component ---
const SelectContext = createContext();

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, onValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ className, children }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

const SelectContent = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg"
    >
      <div className="p-1">{children}</div>
    </div>
  );
};

const SelectItem = ({ value, children }) => {
  const { setIsOpen, onValueChange } = useContext(SelectContext);
  return (
    <div
      onClick={() => {
        onValueChange(value);
        setIsOpen(false);
      }}
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100"
    >
      {children}
    </div>
  );
};

// --- Dashboard Component ---

// Mock data

const Dashboard = () => {
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newSubcategoryImage, setNewSubcategoryImage] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // new
  const [isLoading, setIsLoading] = useState(false);
  const [sellerCount, setSellerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  const metrics = {
    totalProducts: productCount,
    totalCustomers: customerCount,
    totalOrders: orderCount,
    totalSellers: sellerCount,
  };

  //   removing items
  const [categoryToRemove, setCategoryToRemove] = useState("");
   const [parentForSubcategoryRemove, setParentForSubcategoryRemove] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryToRemove, setSubcategoryToRemove] = useState("");

  //add new category
  const addCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/public/admin/create-category/${newCategory}`
      );
      if (response.status == 200) {
        toast.success("Catogary added Successfully");
        setNewCategory("");
        getAllcategories();
      }
    } catch (error) {
      console.error("Failed to add category", error);
      toast.error("Failed to add Category");
    } finally {
      setIsLoading(false);
    }
  };

  //get category
  const getAllcategories = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/public/category/all");
      if (response.status == 200) {
        console.log(response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to get categories", error);
    }finally{
          setIsLoading(false);
    }
  };

  // add subcategory

  const addSubCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/public/admin/create-subcategory`,{
        name : newSubcategory,
        imageUrl : newSubcategoryImage ,
        categoryId : parentCategory 

      });
      if (response.status == 200) {
        toast.success("Subcatogary added Successfully");
        setNewSubcategory("");
        setParentCategory("");
        setNewSubcategoryImage("");
      }
    } catch (error) {
      console.error("Failed to add Subcategory", error);
      toast.error("Failed to add Subcategory");
    } finally {
      setIsLoading(false);
    }
  };

  //delete category
  const DeleteCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(`/public/admin/delete-category/${categoryToRemove}`);
      if (response.status == 200) {
        toast.success("Catogary Deleted Successfully");
         getAllcategories();
      }
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
     
    } finally {
      setIsLoading(false);
    }
  };

  //   get sellers
  const getSellers = async () => {
      setIsLoading(true);
    try {
      const response = await axiosInstance.get("/public/admin/all-sellers");
      if (response.status == 200) {
        setSellerCount(response.data.length);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Failed to get sellers", error);
      setSellerCount(0);
    }finally{
          setIsLoading(false);
    }
  };

  // get orders
  const getOrders = async () => {
      setIsLoading(true);
    try {
      const response = await axiosInstance.get("/public/admin/all-orders");
      setOrderCount(response.data.length);
      const firstTenOrders = response.data.slice(0, 10);
      setRecentOrders(firstTenOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrderCount(0);
    }finally{
          setIsLoading(false);
    }
  };

  // get customers
  const getCustomers = async () => {
      setIsLoading(true);
    try {
      const response = await axiosInstance.get("/public/admin/all-customers");
      setCustomerCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setCustomerCount(0);
    }finally{
          setIsLoading(false);
    }
  };

  //   get products
  const getProducts = async () => {
      setIsLoading(true);
    try {
      const response = await axiosInstance.get("/public/admin/products/count");
      console.log(response.data)
      setProductCount(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setProductCount(0);
    }finally{
          setIsLoading(false);
    }
  };

  useEffect(() => {
    getSellers();
    getOrders();
    getCustomers();
    getProducts();
    getAllcategories();
  }, []);
  const selectedCategory = categories.find(
    (category) => category.id === parentCategory
  );

  //get subcat by cat
   const getCategorybyCategory = async (categoryId) => {
    try {
      const res = await axiosInstance.get(`/public/category/${categoryId}/get`);
      setSubcategories(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch subcategories",error);
    }
  };

  //remove subcat
   const handleRemoveSubcategory = async () => {
      setIsLoading(true);
    try {
      await axiosInstance.delete(`/public/admin/delete-subcategory/${subcategoryToRemove}`);
      toast.success("Subcategory removed");
      // refresh subcategories
      getCategorybyCategory(parentForSubcategoryRemove);
      setSubcategoryToRemove("");
    } catch (error) {
      toast.error("Failed to remove subcategory",error);
    }finally{
          setIsLoading(false);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  
  return (
   <div>
     <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
              <Package className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.totalProducts.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600 mt-1"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Customers
              </CardTitle>
              <Users className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.totalCustomers.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600 mt-1"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.totalOrders.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600 mt-1"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Sellers
              </CardTitle>
              <Store className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.totalSellers}
              </div>
              <div className="flex items-center text-sm text-green-600 mt-1"></div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                Latest customer orders and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* --- Start of Change --- */}
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">
                            {order.id}
                          </span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.product.name} • {order.deliveryDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{order.amount}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 px-4   rounded-lg">
                    <p className="text-gray-500">
                      No recent orders to display.
                    </p>
                  </div>
                )}
                {/* --- End of Change --- */}
              </div>
            </CardContent>
          </Card>

          {/* Add Category/Subcategory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Manage Categories
              </CardTitle>
              <CardDescription>
                Add new categories and subcategories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Category */}
              <div className="space-y-3">
                <Label
                  htmlFor="category"
                  className="text-gray-800 font-semibold"
                >
                  New Category
                </Label>
                <Input
                  id="category"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="focus:border-green-500"
                />
                <Button
                  onClick={addCategory}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!newCategory.trim()}
                >
                  Add Category
                </Button>
              </div>

              {/* Add Subcategory */}
              <div className="space-y-3">
                <Label
                  htmlFor="subcategory"
                  className="text-gray-800 font-semibold"
                >
                  New Subcategory
                </Label>
                <Select
                  value={parentCategory}
                  onValueChange={setParentCategory}
                >
                  <SelectTrigger>
                    {/* --- Start of Change --- */}

                    {/* 2. Display the found category's name, or the placeholder if nothing is selected. */}
                    {selectedCategory ? (
                      <span>{selectedCategory.name}</span>
                    ) : (
                      <SelectValue placeholder="Select parent category" />
                    )}

                    {/* --- End of Change --- */}
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="subcategory"
                  placeholder="Enter subcategory name"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  className="focus:border-green-500"
                />
                <Input
                  id="subcategory-image"
                  placeholder="Enter subcategory image URL"
                  value={newSubcategoryImage}
                  onChange={(e) => setNewSubcategoryImage(e.target.value)}
                  className="focus:border-green-500"
                />
                <Button
                  onClick={addSubCategory}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!newSubcategory.trim() || !parentCategory || !newSubcategoryImage.trim()}
                >
                  Add Subcategory
                </Button>
              </div>

              {/* remove category */}
              <div className="space-y-3 p-4 border border-red-200 rounded-md">
                <Label className="text-gray-800 font-semibold flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-red-600" />
                  Remove Category
                </Label>
                <p className="text-xs text-gray-500">
                  Warning: Removing a category will also delete all its
                  subcategories.
                </p>
                <select
                  value={categoryToRemove}
                  onChange={(e) => setCategoryToRemove(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="">Select category to remove</option>
                  {/* --- Start of Change --- */}
                  {categories.map((category) => (
                    // The key and value should be the unique ID
                    <option key={category.id} value={category.id}>
                      {/* The text displayed to the user is the name */}
                      {category.name}
                    </option>
                  ))}
                  {/* --- End of Change --- */}
                </select>
                <Button
                  onClick={DeleteCategory}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!categoryToRemove}
                >
                  Remove Category
                </Button>
              </div>

              {/* Remove Subcategory */}
               <div className="space-y-3 p-4 border border-red-200 rounded-md">
      <Label className="text-gray-800 font-semibold flex items-center gap-2">
        <Trash2 className="h-4 w-4 text-red-600" />
        Remove Subcategory
      </Label>

      {/* Parent category select */}
      <select
        value={parentForSubcategoryRemove}
        onChange={(e) => {
          const categoryId = e.target.value;
          setParentForSubcategoryRemove(categoryId);
          getCategorybyCategory(categoryId);
          setSubcategoryToRemove("");
        }}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
      >
        <option value="">Select parent category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Subcategory select */}
      <select
        value={subcategoryToRemove}
        onChange={(e) => setSubcategoryToRemove(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
        disabled={!parentForSubcategoryRemove}
      >
        <option value="">Select subcategory to remove</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>

      {/* Remove button */}
      <Button
        onClick={handleRemoveSubcategory}
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={!parentForSubcategoryRemove || !subcategoryToRemove}
      >
        Remove Subcategory
      </Button>
    </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    {isLoading && (
        <MyLoader/>
    )}
   </div>
  );
};

// Main App component to render the Dashboard
const AdminDashboard = () => {
  return <Dashboard />;
};

export default AdminDashboard;
