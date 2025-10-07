import { useState, useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

// This InputField component can be shared or kept here
const InputField = ({ label, value, setValue, type = "text", placeholder }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
    />
  </div>
);

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get product ID from URL

  // Categories and Subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Product Form States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState("");
  const [details, setDetails] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [weight, setWeight] = useState("");

  // Image Upload States
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/private/product/edit/get-form/${productId}`);
        const product = response.data;
        
        // Pre-fill form states
        setName(product.name);
        setPrice(product.price.toString());
        setDescription(product.description);
        setUnits(product.noOfUnits.toString());
        setDetails(product.details);
        setHeight(product.height.toString());
        setLength(product.length.toString());
        setWidth(product.width.toString());
        setWeight(product.weight.toString());
        setSelectedCategory(product.categoryId.toString());
        setSelectedSubcategory(product.subCategoryId.toString());

        // Format existing images for the state
        const existingImages = product.imageUrls.map(url => ({
          type: 'url',
          preview: url,
        }));
        setSelectedImages(existingImages);

      } catch (err) {
        toast.error("Failed to fetch product details.");
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Fetch categories (runs independently)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("public/category/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await axiosInstance.get(`public/category/${selectedCategory}/get`);
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          toast.error("Failed to load subcategories.");
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // ... file validation logic remains the same ...
    const totalFiles = [...selectedImages, ...files];
    if (totalFiles.length > 5) {
      toast.error("You can have a maximum of 5 images.");
      return;
    }

    const filesWithPreview = files.map((file) => ({
      type: 'file', // Mark as a new file
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...filesWithPreview]);
  };
  
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "greenplore_unsigned");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbkbync4n/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error(`Failed to upload image: ${file.name}`);
      return null;
    }
  };

  const handleUpdate = async () => {
    // Validation
    if (!name || !price || !description || !units || !details || !selectedCategory || !selectedSubcategory || !height || !width || !length || !weight) {
      toast.error("All fields are required!");
      return;
    }
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    setLoading(true);

    try {
        // Separate existing image URLs from new files that need uploading
        const existingImageUrls = selectedImages
            .filter(img => img.type === 'url')
            .map(img => img.preview);

        const newImageFiles = selectedImages
            .filter(img => img.type === 'file')
            .map(img => img.file);

        // Upload ONLY the new files to Cloudinary
        const uploadPromises = newImageFiles.map(uploadImageToCloudinary);
        const newUploadedUrls = await Promise.all(uploadPromises);
        
        const successfulNewUrls = newUploadedUrls.filter(url => url !== null);

        // Combine the old and newly uploaded URLs
        const finalImageUrls = [...existingImageUrls, ...successfulNewUrls];

        if (finalImageUrls.length === 0) {
            toast.error("Image upload failed. Please try again.");
            setLoading(false);
            return;
        }

      const productData = {
        name,
        imageUrls: finalImageUrls,
        price: parseFloat(price),
        description,
        noOfUnits: parseInt(units),
        details,
        categoryId: parseInt(selectedCategory),
        subCategoryId: parseInt(selectedSubcategory),
        height: parseFloat(height),
        length: parseFloat(length),
        width: parseFloat(width),
        weight: parseFloat(weight)
      };

      // Submit updated data to your backend with PUT request
      await axiosInstance.post(`/private/product/edit/${productId}`, productData);
      toast.success("Product updated successfully!");
      navigate("/manage-products"); // Navigate back to the product list

    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product.");
    } finally {
      setLoading(false);
    }
  };
  
    const handleRemoveImage = (indexToRemove) => {
        const image = selectedImages[indexToRemove];
        if (image.type === 'file') {
            URL.revokeObjectURL(image.preview);
        }
        setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    if (initialLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-teal-100">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative">
        <button
          type="button"
          onClick={() => navigate("/manage-products")}
          className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center z-10"
          aria-label="Close"
        >
          &#10005;
        </button>

        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-2" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
            Edit Product
          </h1>
          <p className="text-gray-500 text-sm mt-1">Update the details for your product below.</p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InputField label="Product Name" value={name} setValue={setName} placeholder="e.g., Eco-Friendly Bamboo Pot" />
          <InputField label="Price (₹)" value={price} setValue={setPrice} type="number" placeholder="e.g., 499" />
          
          <fieldset className="md:col-span-2 border border-gray-200 p-4 rounded-lg">
            <legend className="text-sm font-medium text-gray-700 px-2">Product Dimensions & Weight</legend>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField label="Height (cm)" value={height} setValue={setHeight} type="number" placeholder="e.g., 15" />
              <InputField label="Width (cm)" value={width} setValue={setWidth} type="number" placeholder="e.g., 10" />
              <InputField label="Length (cm)" value={length} setValue={setLength} type="number" placeholder="e.g., 10" />
              <InputField label="Weight (gm)" value={weight} setValue={setWeight} type="number" placeholder="e.g., 250" />
            </div>
          </fieldset>

          <InputField label="Number of Units" value={units} setValue={setUnits} type="number" placeholder="e.g., 50" />
          <div/>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Provide a compelling description of your product..."
              className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              placeholder="Enter key features or specifications, e.g., Material: 100% Recycled Plastic"
              className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            >
              <option value="">Select Category</option>
              {categories.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Subcategory</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
              className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mt-8">
            <label className="block mb-2 text-sm font-medium text-gray-700">Product Images</label>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-500 transition-all duration-300">
                {/* ... SVG and text for uploader */}
                 <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <svg className="w-8 h-8 mb-4 text-gray-400" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 5 images total)</p>
            </div>
            <input id="dropzone-file" type="file" multiple className="hidden" onChange={handleFileChange} />
            </label>

            {selectedImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                {selectedImages.map((image, index) => (
                    <div key={index} className="relative w-28 h-28 group">
                    <img
                        src={image.preview}
                        alt={`preview ${index}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all duration-300 scale-75 group-hover:scale-100"
                    >
                        &times;
                    </button>
                    </div>
                ))}
                </div>
            )}
        </div>

        <button
          onClick={handleUpdate}
          type="button"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 mt-8 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-0.5`}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProduct;