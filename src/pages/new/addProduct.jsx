import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  categoryApiRequests,
  productsApiRequests,
  usersApiRequests,
} from "../../api";
import { toast } from "react-toastify";

const AddProduct = ({ title }) => {
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]); // Assuming you have an array of categories
  const [subcategories, setSubcategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSellers = async () => {
    try {
      const response = await usersApiRequests.getUsers({ role: "seller" });
      const sellerData = response.data.data.map((seller) => ({
        id: seller._id,
        businessName: seller.businessName,
      }));

      // Clear the existing sellers before updating with the new ones
      setSellers([]);

      // Update with the new sellers
      setSellers(sellerData);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      // If there's an error, you might want to set sellers to an empty array or handle it accordingly
      setSellers([]);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    discount_price: "",
    stock: "",
    seller: "",
    variations: [],
    condition: "",
    brand: "",
    images: null,
  });

  const fetchCategories = async () => {
    try {
      const response = await categoryApiRequests.getCategories();

      const transformedData = response.data.map((category) => {
        const subcategoryData = category.subCategories.map((subcategory) => ({
          title: subcategory.title,
          imageUrl: subcategory.imageUrl,
        }));

        return {
          id: category._id,
          category: category.title,
          subcategories: subcategoryData,
        };
      });

      setCategories(transformedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSellers();
  }, []);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);
    setFormData({
      ...formData,
      images: newFiles.map((file) => URL.createObjectURL(file)),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      // When the category changes, filter the subcategories
      const selectedCategory = categories.find(
        (category) => category.category === value
      );

      if (selectedCategory) {
        // Update subcategories first
        setSubcategories(selectedCategory.subcategories || []);

        // Also update the subcategory in the form data
        setFormData({
          ...formData,
          category: value,
          subcategory: "", // Reset subcategory when category changes
        });
      }
    } else {
      // Update formData after updating subcategories
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleVariationChange = (index, key, value) => {
    const newVariations = [...formData.variations];
    newVariations[index][key] = value;
    setFormData({
      ...formData,
      variations: newVariations,
    });
  };

  const addVariation = () => {
    setFormData({
      ...formData,
      variations: [...formData.variations, { name: "", options: [] }],
    });
  };

  const removeVariation = (index) => {
    const newVariations = [...formData.variations];
    newVariations.splice(index, 1);
    setFormData({
      ...formData,
      variations: newVariations,
    });
  };

  const addOption = (variationIndex) => {
    const newVariations = [...formData.variations];
    newVariations[variationIndex].options.push("");
    setFormData({
      ...formData,
      variations: newVariations,
    });
  };

  const removeOption = (variationIndex, optionIndex) => {
    const newVariations = [...formData.variations];
    newVariations[variationIndex].options.splice(optionIndex, 1);
    setFormData({
      ...formData,
      variations: newVariations,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = new FormData();

      // Append files
      files.forEach((file, index) => {
        productData.append("images", file);
      });

      // Append image URLs
      formData.images.forEach((imageUrl, index) => {
        productData.append(`images[${index}]`, imageUrl);
      });

      // Append form data
      for (const key in formData) {
        if (key === "variations") {
          formData[key].forEach((variation, index) => {
            productData.append(`variations[${index}][name]`, variation.name);
            variation.options.forEach((option, optionIndex) => {
              productData.append(
                `variations[${index}][options][${optionIndex}]`,
                option
              );
            });
          });
        } else if (key !== "images") {
          productData.append(key, formData[key]);
        }
      }

      await productsApiRequests.addProduct(productData);

      // Reset form after submission
      setFiles([]);
      setFormData({
        name: "",
        description: "",
        category: "",
        subcategory: "",
        price: "",
        discount_price: "",
        stock: "",
        seller: "",
        variations: [],
        condition: "",
        brand: "",
      });

      // Handle the response, show success message, update UI, etc.
      toast.success("Product Added Successfully");
    } catch (error) {
      console.log("error.message log", error.message);
      // Handle errors, show error message, etc.
      console.error("Error adding new product:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
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
            {files.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded Product img ${index + 1}`}
              />
            ))}
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="files">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="files"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <div className="formRow">
                  <div className="formColumn">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="formColumn">
                    <label>Description:</label>
                    <textarea
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Category:</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="formColumn">
                    <label>Subcategory:</label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a subcategory
                      </option>
                      {subcategories.map((subcategory) => (
                        <option
                          key={subcategory.title}
                          value={subcategory.title}
                        >
                          {subcategory.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Variations:</label>
                    {formData.variations.map((variation, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          placeholder="Variation Name"
                          value={variation.name}
                          onChange={(e) =>
                            handleVariationChange(index, "name", e.target.value)
                          }
                        />
                        <div>
                          <input
                            type="text"
                            placeholder="Option"
                            value={variation.options.join(", ")}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "options",
                                e.target.value.split(", ")
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() => addOption(index)}
                          >
                            Add Option
                          </button>
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                          >
                            Remove Option
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVariation(index)}
                        >
                          Remove Variation
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={addVariation}>
                      Add Variation
                    </button>
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="formColumn">
                    <label>Discount Price:</label>
                    <input
                      type="number"
                      name="discount_price"
                      value={formData.discount_price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discount_price: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Store:</label>
                    <select
                      name="seller"
                      value={formData.seller}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a store
                      </option>
                      {sellers.map((seller) => (
                        <option key={seller.id} value={seller.businessName}>
                          {seller.businessName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Stock:</label>
                    <input
                      type="text"
                      name="stock"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Condition:</label>
                    <input
                      type="text"
                      name="condition"
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          condition: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Brand:</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button type="submit">
                  {loading ? "Uploading" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
