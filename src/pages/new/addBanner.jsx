import "./banner.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  bannerApiRequests,
  eventsApiRequests as productsApiRequests,
} from "../../api";

const AddBanner = ({ title }) => {
  const [file, setFile] = useState("");
  const [bannerData, setBannerData] = useState({
    name: "",
    linkedProducts: [], // Change to an array to store multiple product IDs
    image: null,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of products when the component mounts
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsApiRequests.getEvents();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    setLoading(false);
  }, []); // Empty dependency array to fetch products only once

  const handleImageChange = (e) => {
    const inputElement = document.getElementById("fileInput");
    const selectedFile = inputElement?.files[0];

    setBannerData({
      ...bannerData,
      image: selectedFile || null,
    });

    // Update the file state for displaying the selected image
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", bannerData.name);
    formData.append("image", bannerData.image);

    // Append each selected product ID to the form data
    bannerData.linkedProducts.forEach((productId) => {
      formData.append("linkedProducts", productId);
    });

    try {
      await bannerApiRequests.addBanner(formData);
      toast.success("Banner Added Successfully");

      // Reset the form by updating the state with initial values
      setBannerData({
        name: "",
        linkedProducts: [],
        image: null,
      });
      // Clear the file state to remove the uploaded image
      setFile(null);
      // Clear the file input
      const inputElement = document.getElementById("fileInput");
      if (inputElement) {
        inputElement.value = null;
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="banner">
      <Sidebar />
      <div className="bannerContainer">
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
                    <label>Name:</label>
                    <input
                      type="text"
                      name="title"
                      value={bannerData.name}
                      onChange={(e) =>
                        setBannerData({ ...bannerData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="formRow">
                  <div className="formColumn">
                    <label>Link to Products:</label>
                    <select
                      className="select"
                      multiple
                      name="linkedProducts"
                      value={bannerData.linkedProducts}
                      onChange={(e) => {
                        const selectedProducts = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        setBannerData({
                          ...bannerData,
                          linkedProducts: selectedProducts,
                        });
                      }}
                    >
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit">
                  {loading ? "Uploading" : "Add Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
