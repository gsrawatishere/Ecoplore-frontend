import { useState, useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import MyLoader from "../../utils/MyLoader";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, value, setValue, type = "text", placeholder }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
    />
  </div>
);

const AddProduct = () => {
  const navigate = useNavigate();

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
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
          const response = await axiosInstance.get(
            `public/category/${selectedCategory}/get`
          );
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          toast.error("Failed to load subcategories.");
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]); // Clear subcategories if no category is selected
    }
  }, [selectedCategory]);

  // Clean up generated URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedImages.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedImages]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];

    const validFiles = files.filter((file) => validTypes.includes(file.type));
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError("Only SVG, PNG, JPG, or GIF files are allowed.");
      toast.error("Invalid file type selected!");
      return;
    }

    // Append only up to 5 files
    const totalFiles = [...selectedImages, ...validFiles];
    if (totalFiles.length > 5) {
      toast.error("You can upload up to 5 images only.");
      return;
    }

    const filesWithPreview = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...filesWithPreview]);
    setError("");
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "greenplore");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlquj7lby/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(`Failed to upload image: ${file.name}`);
      return null;
    }
  };

  const handleUpload = async () => {
    if (
      !name ||
      !price ||
      !description ||
      !units ||
      !details ||
      !selectedCategory ||
      !selectedSubcategory ||
      !height ||
      !width ||
      !length ||
      !weight
    ) {
      toast.error("All fields are required!");
      return;
    }
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    setLoading(true);

    try {
      // Upload all images to Cloudinary
      const uploadPromises = selectedImages.map((imageObj) =>
        uploadImageToCloudinary(imageObj.file)
      );

      //modified
      const uploadedImageUrls = await Promise.allSettled(uploadPromises);
      
      const successfulUploads = uploadedImageUrls
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      //  successfulUploads = uploadedImageUrls.filter(url => url !== null);

      if (successfulUploads.length === 0) {
        toast.error("Failed to upload all images. Please try again.");
        setLoading(false); // Stop loading if image uploads fail
        return;
      }

      // Construct final product object
      const productData = {
        name,
        imageUrls: successfulUploads,
        price: parseFloat(price),
        description,
        noOfUnits: parseInt(units),
        details,
        categoryId: parseInt(selectedCategory),
        subCategoryId: parseInt(selectedSubcategory),
        height: parseFloat(height),
        length: parseFloat(length),
        width: parseFloat(width),
        weight: parseFloat(weight),
      };

      // Submit product data to your backend
      const response = await axiosInstance.post(
        "/private/product/add",
        productData
      );
      toast.success("Product added successfully!");

      // Reset Form
      setName("");
      setPrice("");
      setDescription("");
      setUnits("");
      setDetails("");
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedImages([]);
      setHeight("");
      setLength("");
      setWidth("");
      setWeight("");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const fileToRemove = selectedImages[index];
    URL.revokeObjectURL(fileToRemove.preview); // clean up
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative">
          <button
            type="button"
            onClick={() => navigate("/seller-dashboard")}
            className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center z-10"
            aria-label="Close"
          >
            &#10005;
          </button>

          <div className="text-center mb-8">
            <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
              Add a New Product
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the details below to list your item.
            </p>
          </div>

          {/* Form is now a grid for better layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              label="Product Name"
              value={name}
              setValue={setName}
              placeholder="e.g., Eco-Friendly Bamboo Pot"
            />
            <InputField
              label="Price (₹)"
              value={price}
              setValue={setPrice}
              type="number"
              placeholder="e.g., 499"
            />
            {/* Dimensions are grouped in a fieldset */}
            <fieldset className="md:col-span-2 border border-gray-200 p-4 rounded-lg">
              <legend className="text-sm font-medium text-gray-700 px-2">
                Product Dimensions & Weight
              </legend>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputField
                  label="Height (cm)"
                  value={height}
                  setValue={setHeight}
                  type="number"
                  placeholder="e.g., 15"
                />
                <InputField
                  label="Width (cm)"
                  value={width}
                  setValue={setWidth}
                  type="number"
                  placeholder="e.g., 10"
                />
                <InputField
                  label="Length (cm)"
                  value={length}
                  setValue={setLength}
                  type="number"
                  placeholder="e.g., 10"
                />
                <InputField
                  label="Weight (gm)"
                  value={weight}
                  setValue={setWeight}
                  type="number"
                  placeholder="e.g., 250"
                />
              </div>
            </fieldset>
            <InputField
              label="Number of Units"
              value={units}
              setValue={setUnits}
              type="number"
              placeholder="e.g., 50"
            />
            <div /> {/* Empty div for grid alignment */}
            {/* Textareas span full width on medium screens */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Provide a compelling description of your product..."
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Details
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Enter key features or specifications, e.g., Material: 100% Recycled Plastic"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              >
                <option value="">Select Category</option>
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mt-8">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Images
            </label>
            {/* {loading && <MyLoader />} */}
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-500 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <svg
                  className="w-8 h-8 mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 5 files)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            {selectedImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative w-28 h-28 group">
                    <img
                      src={file.preview}
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
            onClick={handleUpload}
            type="button"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 mt-8 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-0.5`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </div>
      </div>
      {loading && <MyLoader />}
    </div>
  );
};

export default AddProduct;
