import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryColumns } from "../../categoryDatatable";
import { categoryApiRequests } from "../../api";
import { toast } from "react-toastify";

const CategoryDatatable = () => {
  const [data, setData] = useState([]);

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
          img: category.imageUrl ? category.imageUrl : "",
          subcategories: subcategoryData,
          products: "Your products data here", // Add your logic for products data
        };
      });

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make an API request to delete the category with the given id
      await categoryApiRequests.deleteCategory(id);
      toast.success("Category deleted Successfully");

      // Fetch the updated categories after deletion
      fetchCategories();
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error);
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
              to={`/categories/${params.row.id}`}
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
        Add New Category
        <Link to="/categories/add-category" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        rowHeight={200}
      />
    </div>
  );
};

export default CategoryDatatable;
