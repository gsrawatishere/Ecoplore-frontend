import React, { useEffect, useState } from 'react'
import ProductView from '../../Components/Product/ProductView'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import SimilarProducts from '../../Components/Home/SimilarProducts';
import MyLoader from '../../utils/MyLoader';


const ProductViewPage = () => {
  const {id} = useParams();
  const [productData , setProductData] = useState({});
  const [similarProducts , setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async()=>{
    try{
      setIsLoading(true);
      const response = await axiosInstance.get(`/public/product/${id}`);
      if(response.status==200){
        setProductData(response.data);
        fetchSimilarProducstData(response.data.subCategoryId);
      }

    }catch(error){
        console.error("Error fetching products:", error);
      return <div>No Product Found</div>;

    }finally{
      setIsLoading(false);
    }
  }

  console.log(productData)
  const fetchSimilarProducstData = async(subCategoryId)=>{
    try {
      const response = await axiosInstance.get(`public/product/sub_category/${subCategoryId}`);
      if (response.status == 200) {

        const filtered = response.data.filter(item => item.id !== id);
        setSimilarProducts(filtered);
      }
    } catch (error) {
      console.log(error);
      return <div>No Product Found</div>;
    }
  }
  
 useEffect(()=>{
  fetchProductData();
 },[id])

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <MyLoader />
      </div>
    );
  }
   

   
  return (
    
        <div className="p-4 pt-6 pb-3 lg:pb-12">
      <ProductView product={productData} />

     {similarProducts.length > 0 && (
       <SimilarProducts products={similarProducts} />
     )}
      </div>
        
  )
}

export default ProductViewPage




