import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { pickupStationApiRequests } from "../../api";
import { toast } from "react-toastify";

const SinglePickupStation = () => {
  const { pickupStationId } = useParams();
  const [pickupStation, setPickupStation] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      landmark: "",
    },
  });

  useEffect(() => {
    const fetchPickupStation = async () => {
      try {
        const response = await pickupStationApiRequests.getPickupStations(
          pickupStationId
        );
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          // Find the pickup station that matches the provided ID
          const pickupStationData = response.data.find(
            (station) => station._id === pickupStationId
          );

          if (pickupStationData) {
            setPickupStation(pickupStationData);

            // Initialize updatedData with the current pickup station details
            setUpdatedData({
              name: pickupStationData.name || "",
              address: {
                street: pickupStationData.address?.street || "",
                city: pickupStationData.address?.city || "",
                state: pickupStationData.address?.state || "",
                landmark: pickupStationData.address?.landmark || "",
              },
            });
          } else {
            console.error(
              `Pickup station with ID ${pickupStationId} not found`
            );
            // Handle scenario where pickup station is not found (e.g., show an error message)
          }
        } else {
          console.error("Unexpected data format in API response");
        }
      } catch (error) {
        console.error("Error fetching pickup station:", error);
      }
    };

    fetchPickupStation();
  }, [pickupStationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      // Update the address in the updatedData state
      const addressField = name.split(".")[1];
      setUpdatedData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      // Update other fields in the updatedData state
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("pickupStationId:", pickupStationId);
      console.log("updatedData:", updatedData);

      const res = await pickupStationApiRequests.updatePickupStation(
        pickupStationId,
        updatedData
      );
      console.log("res", res);
      // Refresh the pickup station data after successful update
      setPickupStation((prevPickupStation) => ({
        ...prevPickupStation,
        ...updatedData,
      }));
      toast.success("Pickup station updated successfully");
    } catch (error) {
      console.error("Error updating pickup station:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (!pickupStation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Pickup Station Details</h1>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name: </span>
                  <span className="itemValue">
                    {pickupStation && pickupStation.name}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Street: </span>
                  <span className="itemValue">
                    {pickupStation && pickupStation.address?.street}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City: </span>
                  <span className="itemValue">
                    {pickupStation && pickupStation.address?.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">State: </span>
                  <span className="itemValue">
                    {pickupStation && pickupStation.address?.state}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Landmark: </span>
                  <span className="itemValue">
                    {pickupStation && pickupStation.address?.landmark}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <h1 className="title">Update Pickup Station Details</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="formInput">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Street:</label>
                <input
                  type="text"
                  name="address.street"
                  value={updatedData.address.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>City:</label>
                <input
                  type="text"
                  name="address.city"
                  value={updatedData.address.city}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>State:</label>
                <input
                  type="text"
                  name="address.state"
                  value={updatedData.address.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Landmark:</label>
                <input
                  type="text"
                  name="address.landmark"
                  value={updatedData.address.landmark}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="button">
                Update Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePickupStation;
