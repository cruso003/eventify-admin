import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { eventsApiRequests } from "../../api";
import Modal from "../../components/modal/modal";
import { toast } from "react-toastify";

const EditEvent = ({ title }) => {
  const { eventId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    description: "",
    price: 0,
    discount_price: 0,
    condition: "",
    featured: false,
    stock: 0,
    brandName: "",
    variations: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsApiRequests.getEvents(eventId);
        const fetchedEvent = response.data.find((item) => item._id === eventId);
        setEvent(fetchedEvent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleReadMoreClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is "featured" and update accordingly
    if (name === "featured") {
      const isFeatured = value === "yes";
      setEvent((prevProduct) => ({
        ...prevProduct,
        featured: isFeatured,
      }));
    } else {
      // For other fields, update normally
      setEvent((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleVariationChange = (index, updatedVariation) => {
    setEvent((prevProduct) => {
      const updatedVariations = [...prevProduct.variations];
      updatedVariations[index] = updatedVariation;
      return { ...prevProduct, variations: updatedVariations };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an updateProduct API endpoint
      await eventsApiRequests.updateEvent(eventId, event);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="item">
              <img
                src={event.images ? event.images[0] : ""}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{event.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description: </span>
                  <span className="itemValue">
                    {event.description.length > 200 ? (
                      <>
                        {event.description.substring(0, 200)}...
                        <span
                          className="readMore"
                          onClick={handleReadMoreClick}
                        >
                          Read more
                        </span>
                        {showModal && (
                          <Modal
                            onClose={handleCloseModal}
                            content={event.description}
                          />
                        )}
                      </>
                    ) : (
                      event.description
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Discount Price: $</span>
                  <span className="itemValue">
                    {event.discount_price
                      ? event.discount_price
                      : "No discount available."}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price: $</span>
                  <span className="itemValue">{event.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Seller: </span>
                  <span className="itemValue">{event.storeName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category: </span>
                  <span className="itemValue">{event.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Stock: </span>
                  <span className="itemValue">{event.stock}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Condition: </span>
                  <span className="itemValue">{event.condition}</span>
                </div>
                <div className="detailItem">
                  {
                    <label className="itemKey">
                      Featured Product:
                      <select
                        name="featured"
                        value={event.featured ? "yes" : "no"}
                        onChange={handleInputChange}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </label>
                  }
                </div>
                {/* Variation */}
                <div className="detailItem">
                  <span className="itemKey">Variation:</span>
                  <span className="itemValue">
                    {event.variations && event.variations.length > 0 ? (
                      <ul>
                        {event.variations.map((variation, index) => (
                          <li key={index}>
                            <strong>{variation.name}:</strong>{" "}
                            {variation.options.join(", ")}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No variations available"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleFormSubmit}>
              {/* Form inputs for each editable field */}
              <div className="formInput">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={event.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    name="price"
                    value={event.price}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Discount:
                  <input
                    name="discount_price"
                    value={event.discount_price}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Condition:
                  <input
                    name="condition"
                    value={event.condition}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Stock:
                  <input
                    name="stock"
                    value={event.stock}
                    onChange={handleInputChange}
                  />
                </label>
                {/* Add similar input fields for other editable fields */}
                {/* Variations */}

                {event.variations.map((variation, index) => (
                  <div key={index}>
                    <label>
                      Variation {index + 1} Name:
                      <input
                        type="text"
                        value={variation.name}
                        onChange={(e) =>
                          handleVariationChange(index, {
                            ...variation,
                            name: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Variation {index + 1} Options:
                      <input
                        type="text"
                        value={variation.options.join(", ")}
                        onChange={(e) =>
                          handleVariationChange(index, {
                            ...variation,
                            options: e.target.value.split(", "),
                          })
                        }
                      />
                    </label>
                  </div>
                ))}

                {/* Button to add a new variation */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setEvent((prevProduct) => ({
                        ...prevProduct,
                        variations: [
                          ...prevProduct.variations,
                          { name: "", options: [] },
                        ],
                      }))
                    }
                  >
                    Add Variation
                  </button>
                </div>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
