import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EventTypeDatatable from "../../components/datatable/EventTypeDatable";

const CategoryLists = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <EventTypeDatatable />
      </div>
    </div>
  );
};

export default CategoryLists;
