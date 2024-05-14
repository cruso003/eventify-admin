import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { categoryApiRequests, subcategoryApiRequests } from "../../api";
import { toast } from "react-toastify";

const AddSubcategory = ({ title }) => {
  const [file, setFile] = useState("");
  const [subcategoryData, setSubcategoryData] = useState({
    title: "",
    category: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApiRequests.getCategories(); // Replace with your actual API request
        setCategories(response.data); // Assuming your response has a data property containing the categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setSubcategoryData({
      ...subcategoryData,
      [e.target.name]: e.target.value,
    });

    // If the changed field is 'category', update the selected category state
    if (e.target.name === "category") {
      setSelectedCategory(e.target.value);
    }
  };

  const handleImageChange = (e) => {
    const inputElement = document.getElementById("fileInput");
    const selectedFile = inputElement?.files[0];

    setSubcategoryData({
      ...subcategoryData,
      image: selectedFile || null,
    });

    // Update the file state for displaying the selected image
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the selected category state value instead of subcategoryData.category
    const formData = new FormData();
    formData.append("title", subcategoryData.title);
    formData.append("category", selectedCategory);
    formData.append("image", subcategoryData.image);

    try {
      await subcategoryApiRequests.addSubcategory(formData);
      toast.success("Subcategory Added Successfully");

      // Reset the form by updating the state with initial values
      setSubcategoryData({
        title: "",
        category: "",
        image: null,
      });
      // Clear the file state to remove the uploaded image
      setFile(null);
      // Clear the file input
      const inputElement = document.getElementById("fileInput");
      if (inputElement) {
        inputElement.value = null;
      }
      // Clear the selected category state
      setSelectedCategory("");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="fileInput">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  name="image"
                  id="fileInput"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <div className="formRow">
                  <div className="formColumn">
                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={subcategoryData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Category:</label>
                    <select
                      name="category"
                      value={subcategoryData.category}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit">Add Subcategory</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategory;
