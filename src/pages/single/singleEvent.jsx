import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { eventsApiRequests } from "../../api";
import List from "../../components/table/Table";
import Modal from "../../components/modal/modal";
import { Link } from "react-router-dom";

const SingleEvents = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsApiRequests.getEvents(eventId);
        // Assuming getProduct API endpoint exists
        setEvent(response.data.find((item) => item._id === eventId));
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleReadMoreClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!event) {
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
              <Link to={`/events/edit/${eventId}`} className="link">
                Edit
              </Link>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={event.image ? event.image[0] : ""}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{event.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description: </span>
                  <span className="itemValue">
                    {event.description.length > 200 ? (
                      <>
                        {event.description.substring(0, 200)}...
                        <span
                          className="readMore"
                          onClick={handleReadMoreClick}
                        >
                          Read more
                        </span>
                        {showModal && (
                          <Modal
                            onClose={handleCloseModal}
                            content={event.description}
                          />
                        )}
                      </>
                    ) : (
                      event.description
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Organizer: </span>
                  <span className="itemValue">{event.organizer}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Event Type: </span>
                  <span className="itemValue">{event.eventType}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Featured: </span>
                  <span className="itemValue">
                    {event.featured ? "Yes" : "No"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tickets: </span>
                  <span className="itemValue">
                    {event.tickets && event.tickets.length > 0 ? (
                      <ul>
                        {event.tickets.map((tickets, index) => (
                          <li key={index}>
                            <strong>{tickets.name}:</strong>{" "}
                            {tickets.options.join(", ")}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No Ticket available"
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

export default SingleEvents;
