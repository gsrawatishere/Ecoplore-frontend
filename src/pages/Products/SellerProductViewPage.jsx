import React, { useEffect, useState } from "react";
import ProductView from "../../Components/Product/ProductView";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import SimilarProducts from "../../Components/Home/SimilarProducts";
import MyLoader from "../../utils/MyLoader";
import SellerProductPreview from "../../Components/Product/SellerProductView";

const SellerProductViewPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/public/product/${id}`);
      if (response.status == 200) {
        setProductData(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return <div>No Product Found</div>;
    } finally {
      setIsLoading(false);
    }
  };

  console.log(productData);

  useEffect(() => {
    fetchProductData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <MyLoader />
      </div>
    );
  }

  return (
    <div className="p-4 pb-3 lg:pb-12">
      <SellerProductPreview product={productData} />
    </div>
  );
};

export default SellerProductViewPage;
