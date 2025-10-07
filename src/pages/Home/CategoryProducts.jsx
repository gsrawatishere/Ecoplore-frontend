import Products from "../../Components/Home/Products";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";


const CategoryProducts = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetching categories
        const response = await axiosInstance.get("public/category/all");
        if (response.status == 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
       
      }
    };

    fetchCategories();

  }, []);

  return (
    <div>
      {categories.map((cat)=>(
        <Products key={cat.id} cat={cat}/>
      ))}
    </div>
  );
};

export default CategoryProducts;
