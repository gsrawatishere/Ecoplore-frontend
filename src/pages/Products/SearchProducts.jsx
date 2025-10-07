import React, { useState, useEffect } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import MyLoader from "../../utils/MyLoader";
import axiosInstance from "../../api/axiosInstance";
import { useParams } from "react-router-dom";

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { name } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`public/product/search/${name}`);
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // ensures "No Product Found" message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  if (isLoading) {
    return <MyLoader />;
  }

  if (products.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        No Product Found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SearchProducts;