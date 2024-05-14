import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { eventTypeApiRequests } from "../../api";
import List from "../../components/table/Table";
import { Link } from "react-router-dom";

const SingleEventType = () => {
  const { eventTypeId } = useParams();
  const [eventType, setEventType] = useState(null);

  useEffect(() => {
    const fetchEventType = async () => {
      try {
        const response = await eventTypeApiRequests.getEventTypes(eventTypeId);
        console.log(response.data);
        setEventType(response.data.find((item) => item._id === eventTypeId));
      } catch (error) {
        console.error("Error fetching eventType:", error);
      }
    };
    fetchEventType();
  }, [eventTypeId]);

  if (!eventType) {
    return <div>Loading...</div>;
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Link to={`/products/edit/${eventTypeId}`} className="link">
                Edit
              </Link>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{eventType.name}</h1>

                <div className="detailItem">
                  <span className="itemKey">Categories: </span>
                  <span className="itemValue">
                    {eventType.categories && eventType.categories.length > 0 ? (
                      <div>
                        <strong>Categories: </strong>
                        {eventType.categories.map((category, index) => (
                          <span key={index}>
                            {category.name}
                            {index < eventType.categories.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "No categories available"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Total Sales" />
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

export default SingleEventType;
