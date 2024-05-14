import "./newF.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { pickupStationApiRequests } from "../../api";
import { toast } from "react-toastify";

const AddPickupStation = ({ title }) => {
  const [pickupStationData, setPickupStationData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      landmark: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      // If the input is part of the address, update the address state
      const addressField = name.split(".")[1];
      setPickupStationData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      // Otherwise, update the main pickupStationData state
      setPickupStationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to add a new pickup station
      await pickupStationApiRequests.addPickupStation(pickupStationData);
      toast.success("Pickup Station Added Successfully");

      // Reset the form data
      setPickupStationData({
        name: "",
        address: {
          street: "",
          city: "",
          state: "",
          landmark: "",
        },
      });
    } catch (error) {
      console.error("Error adding pickup station:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="newf">
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
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={pickupStationData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Street:</label>
                <input
                  type="text"
                  name="address.street"
                  value={pickupStationData.address.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>City:</label>
                <input
                  type="text"
                  name="address.city"
                  value={pickupStationData.address.city}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>State:</label>
                <input
                  type="text"
                  name="address.state"
                  value={pickupStationData.address.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Landmark:</label>
                <input
                  type="text"
                  name="address.landmark"
                  value={pickupStationData.address.landmark}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Add Pickup Station</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPickupStation;
