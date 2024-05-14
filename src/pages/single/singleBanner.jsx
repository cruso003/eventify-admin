import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { categoryApiRequests } from "../../api";
import List from "../../components/table/Table";
import { Link } from "react-router-dom";

const SingleBanner = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryApiRequests.getCategories(categoryId);
        console.log(response.data);
        setCategory(response.data.find((item) => item._id === categoryId));
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  if (!category) {
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
              <Link to={`/products/edit/${categoryId}`} className="link">
                Edit
              </Link>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={category.imageUrl ? category.imageUrl : ""}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{category.title}</h1>

                <div className="detailItem">
                  <span className="itemKey">Banners: </span>
                  <span className="itemValue">
                    {category.subCategories &&
                    category.subCategories.length > 0 ? (
                      <div>
                        <strong>Subcategories: </strong>
                        {category.subCategories.map((subcategory, index) => (
                          <span key={index}>
                            {subcategory.title}
                            {index < category.subCategories.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "No subcategories available"
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

export default SingleBanner;
