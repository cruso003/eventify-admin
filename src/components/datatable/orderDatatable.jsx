import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ordersApiRequests } from "../../api";
import { toast } from "react-toastify";
import { orderColumns } from "../../orderDatatable";

const OrderDatatable = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await ordersApiRequests.getOrders();
      const transformedData = response.data.map((order) => ({
        id: order._id,
        product: order.products.map((product) => ({
          name: product.product.brand,
          img: product.product.images[0],
          quantity: product.quantity,
          price: product.product.price,
          // Add more product details as needed
        })),
        customer: order.user.name,
        date: new Date(order.orderDate).toLocaleDateString(),
        amount: order.products.reduce(
          (total, product) => product.totalAmount,
          0
        ),
        payment: order.products.map((product) => ({
          paymentMethod: product.paymentMethod,
        })),
        status: order.status,
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make an API request to delete the category with the given id
      await ordersApiRequests.cancelOrder(id);
      toast.success("Order cancel Successfully");

      // Fetch the updated categories after deletion
      fetchOrders();
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
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
              to={`/orders/${params.row.id}`}
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
        Add New Order
        <Link to="/orders/add-order" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default OrderDatatable;
