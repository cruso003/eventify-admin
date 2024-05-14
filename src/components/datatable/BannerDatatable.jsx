import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { bannerApiRequests } from "../../api";
import { toast } from "react-toastify";
import { bannerColumns } from "../../bannerDatatable";

const BannerDatatable = () => {
  const [data, setData] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await bannerApiRequests.getBanners();
      // Transform the fetched data to match the productRows format
      const transformedData = response.data.map((banner) => ({
        id: banner._id,
        banner: banner.name,
        img: banner.imageUrl ? banner.imageUrl : "", // Assuming images array is available
        linkProducts: banner.linkedProducts.map((product) => ({
          title: product.name,
          imageUrl:
            product.images && product.images.length > 0
              ? product.images[0]
              : "",
        })),
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make an API request to delete the category with the given id
      await bannerApiRequests.deleteBanner(id);
      toast.success("Banner deleted Successfully");

      // Fetch the updated categories after deletion
      fetchBanners();
    } catch (error) {
      console.error(`Error deleting banner with id ${id}:`, error);
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
              to={`/banners/${params.row.id}`}
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
        Add New Banner
        <Link to="/banners/add-banner" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={bannerColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        rowHeight={200}
      />
    </div>
  );
};

export default BannerDatatable;
