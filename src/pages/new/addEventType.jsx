import "./new.scss";
import "../../components/datatable/datatable.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { eventTypeApiRequests } from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddEventType = ({ title }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description);

    try {
      await eventTypeApiRequests.addEventType(Object.fromEntries(formData));
      toast.success("EventType Added Successfully");

      // Reset the form by updating the state with initial values
      setCategoryData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding eventtype:", error);
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
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <div className="formRow">
                  <div className="formColumn">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={categoryData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formColumn">
                    <label>Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={categoryData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit">Add Event Type</button>
              </div>
            </form>
            <div className="datatable">
              <div className="datatableTitle">
                <Link to="/categories/add-category" className="link">
                  Add Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventType;
