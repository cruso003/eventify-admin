import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { pickupStationApiRequests } from "../../api";
import { toast } from "react-toastify";
import { pickupStationColumns } from "../../pickupDatatable";

const PickupStationDatatable = () => {
  const [data, setData] = useState([]);

  const fetchPickupStations = async () => {
    try {
      const response = await pickupStationApiRequests.getPickupStations();
      // Transform the fetched data to match the DataGrid format
      const transformedData = response.data.map((pickupStation) => ({
        id: pickupStation._id,
        name: pickupStation.name,
        address: `${pickupStation.address.street}, ${pickupStation.address.city}, ${pickupStation.address.state}, ${pickupStation.address.landmark}`,
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching pickup stations:", error);
    }
  };

  useEffect(() => {
    fetchPickupStations();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make an API request to delete the pickup station with the given id
      await pickupStationApiRequests.deletePickupStation(id);
      toast.success("Pickup station deleted successfully");

      // Refresh the data after deletion
      fetchPickupStations();
    } catch (error) {
      console.error(`Error deleting pickup station with id ${id}:`, error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/pickup-stations/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Pickup Station
        <Link to="/pickup-stations/add-pickup-station" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={pickupStationColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        rowHeight={200}
      />
    </div>
  );
};

export default PickupStationDatatable;
