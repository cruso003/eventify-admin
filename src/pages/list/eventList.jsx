import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EventDatatable from "../../components/datatable/EventDatatable";

const EventLists = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <EventDatatable />
      </div>
    </div>
  );
};

export default EventLists;
