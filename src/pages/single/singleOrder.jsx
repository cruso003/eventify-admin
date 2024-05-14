import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { ordersApiRequests } from "../../api";
import List from "../../components/table/Table";
import { toast } from "react-toastify";

const SingleOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersApiRequests.getOrders(orderId);
        // Assuming getOrder API endpoint exists
        setOrder(response.data.find((item) => item._id === orderId));
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async () => {
    try {
      // Assuming updateOrderStatus API endpoint exists
      await ordersApiRequests.updateOrderStatus(orderId, newStatus);
      // Update the order locally after successful update
      setOrder({ ...order, status: newStatus });
      toast.success("Order updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Order Details</h1>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Order Number: </span>
                  <span className="itemValue">{order._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status: </span>
                  <span className="itemValue">{order.status}</span>
                </div>
                {/* Add more order details as needed */}
              </div>
            </div>
            <h1 className="title">Products in the Order</h1>
            {order.products.map((product) => (
              <div key={product._id} className="productItem">
                <img
                  src={product.product.images[0]}
                  alt={product.product.name}
                  className="productImage"
                />
                <div className="productDetails">
                  <h2>{product.product.name}</h2>
                  <p>Price: ${product.product.price}</p>
                  {/* Add more product details as needed */}
                </div>
              </div>
            ))}
          </div>

          <div className="right">
            <h1 className="title">Change Order Status</h1>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div>
              <button onClick={handleStatusChange} className="button">
                Update Status
              </button>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
