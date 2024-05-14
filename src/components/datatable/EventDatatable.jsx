import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { eventColumns } from "../../eventDatablesource";
import { eventsApiRequests } from "../../api";
import { toast } from "react-toastify";

const EventDatatable = () => {
  const [data, setData] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await eventsApiRequests.getEvents();
      /// Transform the fetched data to match the productRows format
      const transformedData = response.data.map((event) => ({
        id: event._id,
        name: event.name,
        img: event.image ? event.image[0] : "", // Assuming images array is available
        description: event.description,
        organizer: event.organizer,
      }));
      setData(transformedData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make an API request to delete the category with the given id
      await eventsApiRequests.deleteEvent(id);
      toast.success("Event deleted Successfully");

      // Fetch the updated categories after deletion
      fetchEvents();
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
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
              to={`/events/${params.row.id}`}
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
        Add New Event
        <Link to="/events/add-event" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={eventColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default EventDatatable;
