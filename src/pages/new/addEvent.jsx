import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  eventTypeApiRequests,
  usersApiRequests,
  eventsApiRequests,
} from "../../api";
import { toast } from "react-toastify";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const AddEvent = ({ title }) => {
  const [file, setFile] = useState("");
  const [eventTypes, setEventTypes] = useState([]); // Assuming you have an array of categories
  const [categories, setCategories] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  const fetchOrganizers = async () => {
    try {
      const response = await usersApiRequests.getUsers({ role: "organizer" });
      const organizerData = response.data.data.map((organizer) => ({
        id: organizer._id,
        businessName: organizer.businessName,
      }));

      // Clear the existing sellers before updating with the new ones
      setOrganizer([]);

      // Update with the new sellers
      setOrganizer(organizerData);
    } catch (error) {
      console.error("Error fetching organizer:", error);
      // If there's an error, you might want to set sellers to an empty array or handle it accordingly
      setOrganizer([]);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventType: "",
    category: "",
    location: "",
    startingTime: dayjs("2024-05-05T15:30"),
    organizer: "",
    image: null,
  });

  const fetchEventTypes = async () => {
    try {
      const response = await eventTypeApiRequests.getEventTypes();

      const transformedData = response.data.map((eventType) => {
        const categoryData = eventType.categories.map((category) => ({
          title: category.name,
        }));

        return {
          id: eventType._id,
          eventType: eventType.name,
          categories: categoryData,
        };
      });

      setEventTypes(transformedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchEventTypes();
    fetchOrganizers();
  }, []);

  const handleFileChange = (e) => {
    const inputElement = document.getElementById("fileInput");
    const selectedFile = inputElement?.files[0];
    setFormData({
      ...formData,
      image: selectedFile || null,
    });
    // Update the file state for displaying the selected image
    setFile(selectedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "eventType") {
      // When the category changes, filter the subcategories
      const selectedEventType = eventTypes.find(
        (eventType) => eventType.eventType === value
      );

      if (selectedEventType) {
        // Update subcategories first
        setCategories(selectedEventType.categories || []);

        // Also update the subcategory in the form data
        setFormData({
          ...formData,
          eventType: value,
          category: "", // Reset category when category changes
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

  const handleAddTicket = () => {
    setTickets([...tickets, { name: "", price: 0 }]);
  };

  const handleRemoveTicket = (index) => {
    setTickets(tickets.filter((ticket, i) => i !== index));
  };

  const handleTicketChange = (index, key, value) => {
    setTickets(
      tickets.map((ticket, i) =>
        i === index ? { ...ticket, [key]: value } : ticket
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = new FormData();

      eventData.append("image", formData.image);
      eventData.append("name", formData.name);
      eventData.append("description", formData.description);
      eventData.append("eventType", formData.eventType);
      eventData.append("category", formData.category);
      eventData.append("location", formData.location);
      eventData.append(
        "startingTime",
        formData.startingTime.format("YYYY-MM-DDTHH:mm:ss")
      );
      eventData.append("organizer", formData.organizer);
      eventData.append("tickets", JSON.stringify(tickets));

      console.log(Object.fromEntries(eventData));
      const eventDataJSON = Object.fromEntries(eventData);

      await eventsApiRequests.addEvent(eventDataJSON);

      // Reset form after submission

      setFormData({
        name: "",
        description: "",
        eventType: "",
        category: "",
        location: "",
        startingTime: dayjs("2024-05-05T15:30"),
        organizer: "",
        image: null,
      });
      setFile(null);
      // Clear the file input
      const inputElement = document.getElementById("fileInput");
      if (inputElement) {
        inputElement.value = null;
      }
      setTickets([]);

      // Handle the response, show success message, update UI, etc.
      toast.success("Event Added Successfully");
    } catch (error) {
      console.error("Error adding new event:", error);
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
                  id="fileInput"
                  name="image"
                  onChange={handleFileChange}
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
                    <label>Event Type:</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select an event type
                      </option>
                      {eventTypes.map((eventType) => (
                        <option key={eventType.id} value={eventType.eventType}>
                          {eventType.eventType}
                        </option>
                      ))}
                    </select>
                  </div>
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
                        <option key={category.title} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Tickets:</label>
                    {tickets.map((ticket, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={ticket.name}
                          onChange={(e) =>
                            handleTicketChange(index, "name", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          value={ticket.price}
                          onChange={(e) =>
                            handleTicketChange(index, "price", e.target.value)
                          }
                        />
                        <button onClick={() => handleRemoveTicket(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddTicket}>
                      Add Ticket
                    </button>
                  </div>
                  <div className="formColumn">
                    <label>Organizer:</label>
                    <select
                      name="organizer"
                      value={formData.organizer}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select an organizer
                      </option>
                      {organizer.map((organizer) => (
                        <option
                          key={organizer.id}
                          value={organizer.businessName}
                        >
                          {organizer.businessName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="formRow">
                  <div className="formColumn">
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="formColumn">
                    <div className="dateTimePickerWrapper">
                      <DateTimePicker
                        label="Starting Time"
                        onChange={(date) =>
                          setFormData({
                            ...formData,
                            startingTime: date,
                          })
                        }
                        value={formData.startingTime}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit">
                  {loading ? "Uploading" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
