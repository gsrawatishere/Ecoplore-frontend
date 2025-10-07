
import App from "../App";

// import SellerRegister1 from '../pages/Seller/SellerRegister1'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import Home from "../pages/Home/Home";
// import SellerRegister2 from "../pages/Seller/SellerRegister2";
// import SellerRegister3 from "../pages/Seller/SellerRegister3";
import ProductsPage from "../pages/Products/ProducsPage";
import ProductView from "../Components/Product/ProductView";
import { LoginForm } from "../Components/Buyer/LoginForm";
import { RegisterForm } from "../Components/Buyer/RegisterForm";
import Profile from "../pages/Home/Profile";
import SubCategoryProducts from "../pages/Products/SubCategoryProducts";
import Cart from "../pages/Home/Cart";
import Wishlist from "../pages/Home/Wishlist";
import SellerLogin from "../Components/Seller/SellerSignin";
import SellerRegisterWizard from "../Components/Seller/SellerRegisterWizard"
import SellerProfile from "../pages/Seller/SellerProfile";
import ProductViewPage from "../pages/Products/ProductViewPage";
import AddProduct from "../pages/Products/AddProduct";
import ShippingPolicy from "../Components/Terms&Conditions/ShippingPolicy";
import PrivacyPolicy from "../Components/Terms&Conditions/PrivicyPolicy";
import FAQPage from "../Components/Terms&Conditions/FAQPage";
import ContactUs from "../Components/Terms&Conditions/ContactUs";
import ReturnsRefundPolicy from "../Components/Terms&Conditions/ReturnsRefundPolicy";
import TermsAndConditions from "../Components/Terms&Conditions/TermsAndConditions";
import CustomerSupport from "../Components/Terms&Conditions/CustomerSupport";
import AboutUs from "../Components/Terms&Conditions/AboutUs";
import Careers from "../Components/Terms&Conditions/Careers";
import VerifyOTP from "../Components/VerifyOTP";
import ResetPassword from "../Components/ResetPassword";
import SearchProducts from "../pages/Products/SearchProducts";
import ScrollToTop from "../Components/ScrollTop";
import Dashboard from "../pages/Seller/Dashboard";
import ProfileNew from "../pages/Seller/SellerProfileNew";
import ManageProducts from "../pages/Products/ManageProducts";
import EditProduct from "../pages/Products/EditProduct";
import SellerProductView from "../Components/Product/SellerProductView";
import SellerProductViewPage from "../pages/Products/SellerProductViewPage";
import ManageOrders from "../pages/Products/ManageOrders";
import BuyerOrders from "../pages/Home/BuyerOrders";
import AdminDashboard from "../Admin/Pages/AdminDashboard";
import AllSellers from "../Admin/Pages/AllSellers";
import AllOrders from "../Admin/Pages/AllOrders";
import AllCustomers from "../Admin/Pages/AllCustomers";
import SellerOrders from "../Admin/Pages/SellerOrders";


const myRoute = createBrowserRouter(
    createRoutesFromElements(
<>
      {/* Routes WITHOUT Header & Footer */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* <Route path="/seller-login" element={<SellerLogin />} /> */}
      <Route path="/register-seller" element={<SellerRegisterWizard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/addproduct" element={<AddProduct/>} />
      {/* <Route path="/seller-profile" element={<SellerProfile />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword/>} />

      {/* Seller Dashboard  */}
      <Route path="/seller-dashboard" element={<Dashboard/>} />
      <Route path="/seller-profile" element={<ProfileNew/>} />
      <Route path="/manage-products" element={<ManageProducts/>} />
      <Route path="/edit-product/:productId" element={<EditProduct/>} />
      <Route path="/seller-product-view/:id" element={<SellerProductViewPage/>} />
      <Route path="/manage-orders" element={<ManageOrders/>}/>
      <Route path="/my-orders" element={<BuyerOrders/>} />

        {/* Admin router */}
        <Route path="/123e4567-e89b-12d3-a456-426614174000" element={<AdminDashboard/>} />
        <Route path="/f81d4fae-7dec-11d0-a765-00a0c91e6bf6" element={<AllSellers/>} />
        <Route path="/c6a4a1a0-3818-4055-9a99-4a46a5f7f8a8" element={<AllOrders/>} />
        <Route path="/988c5a5c-6b39-4675-9a84-08a38343353b" element={<AllCustomers/>} />
        <Route path="/admin-seller-orders/:email" element={<SellerOrders/>} />
     

      {/* Routes WITH Header & Footer via App */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products/category/:id" element={<ProductsPage />} />
        <Route path="products/sub-category/:id" element={<SubCategoryProducts />} />
        <Route path="product/:id" element={<ProductViewPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/faqs" element={<FAQPage/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/return-and-refund-policy" element={<ReturnsRefundPolicy/>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
        <Route path="/support" element={<CustomerSupport/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/careers" element={<Careers/>} />
         <Route path="/search/:name" element={<SearchProducts />} />
        

      </Route>
    </>
    )
)

export default myRoute