import React, { useEffect, useState } from "react";
import IP from "../../assets/Images/Category Images/Indoor Plant/IP 3.jpeg";
import ProductCard from "../../Components/Product/ProductCard";
import MyLoader from "../../utils/MyLoader";
import {  useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ProductsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async() => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`public/product/category/${id}`);
      if (response.status == 200) {
        setData(response.data);
        console.log(data);
      }
    } catch (error) {
       console.error("Error fetching products:", error);
      return <div>No Product Found</div>;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <MyLoader />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        No Product Found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
