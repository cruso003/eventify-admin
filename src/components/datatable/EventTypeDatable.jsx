import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { eventTypeColumns } from "../../eventTypeDatatable";
import { eventTypeApiRequests } from "../../api";
import { toast } from "react-toastify";

const EventTypeDatatable = () => {
  const [data, setData] = useState([]);

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
          events: "Your events data here", // Add your logic for products data
        };
      });

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching eventtypes:", error);
    }
  };

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make an API request to delete the category with the given id
      await eventTypeApiRequests.deleteEventType(id);
      toast.success("Event type deleted Successfully");

      // Fetch the updated categories after deletion
      fetchEventTypes();
    } catch (error) {
      console.error(`Error deleting event type with id ${id}:`, error);
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
              to={`/eventTypes/${params.row.id}`}
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
        Add New EventType
        <Link to="/eventTypes/add-eventType" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={eventTypeColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        rowHeight={200}
      />
    </div>
  );
};

export default EventTypeDatatable;
