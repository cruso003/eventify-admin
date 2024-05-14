import Home from "./pages/home/Home";
import "./App.css";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { eventInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SignupPage from "./pages/signup/signupPage";
import ActivationPage from "./pages/activation/ActivationPage";
import LoginPage from "./pages/login/LoginPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/context/AuthenticationContext";
import EventLists from "./pages/list/eventList";
import SingleEvents from "./pages/single/singleEvent";
import EditEvent from "./pages/new/EditEvent";
import AddEvent from "./pages/new/addEvent";
import AddEventType from "./pages/new/addEventType";
import EventTypesLists from "./pages/list/eventTypeList";
import AddCategory from "./pages/new/addEventType";
import BannerLists from "./pages/list/bannerList";
import SingleEventType from "./pages/single/singleEventType";
import SingleOrder from "./pages/single/singleOrder";
import OrderLists from "./pages/list/orderList";
import SingleBanner from "./pages/single/singleBanner";
import AddBanner from "./pages/new/addBanner";
import AddPickupStation from "./pages/new/addPickupStation";
import SinglePickupStation from "./pages/single/singlePickupStation";
import PickupStationLists from "./pages/list/pickStationList";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <div className={darkMode ? "app dark" : "app"}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="sign-up">
                  <Route index element={<SignupPage />} />
                </Route>
                <Route path="login">
                  <Route index element={<LoginPage />} />
                </Route>
                <Route path="activation/:activation_token">
                  <Route index element={<ActivationPage />} />
                </Route>
                <Route path="users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                  <Route
                    path="add-user"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
                </Route>
                <Route path="events">
                  <Route index element={<EventLists />} />
                  <Route path=":eventId" element={<SingleEvents />} />
                  <Route
                    path="edit/:eventId"
                    element={
                      <EditEvent
                        inputs={eventInputs}
                        title="Update Event Information"
                      />
                    }
                  />

                  <Route
                    path="add-event"
                    element={
                      <AddEvent inputs={eventInputs} title="Add New Event" />
                    }
                  />
                </Route>
                <Route path="orders">
                  <Route index element={<OrderLists />} />
                  <Route path=":orderId" element={<SingleOrder />} />
                  <Route
                    path="edit/:orderId"
                    element={
                      <EditEvent
                        inputs={eventInputs}
                        title="Update Orders Information"
                      />
                    }
                  />

                  <Route
                    path="add-order"
                    element={
                      <AddEvent inputs={eventInputs} title="Add New Order" />
                    }
                  />
                </Route>
                <Route path="eventTypes">
                  <Route index element={<EventTypesLists />} />
                  <Route path=":eventTypeId" element={<SingleEventType />} />
                  <Route
                    path="edit/:eventTypeId"
                    element={
                      <EditEvent
                        inputs={eventInputs}
                        title="Update EventType Information"
                      />
                    }
                  />

                  <Route
                    path="add-eventType"
                    element={<AddEventType title="Add New Event Type" />}
                  />
                </Route>
                <Route path="categories">
                  <Route index element={<BannerLists />} />
                  <Route path=":categoryId" element={<SingleEvents />} />
                  <Route
                    path="edit/:categoryId"
                    element={
                      <EditEvent
                        inputs={eventInputs}
                        title="Update Category Information"
                      />
                    }
                  />

                  <Route
                    path="add-category"
                    element={
                      <AddCategory
                        inputs={eventInputs}
                        title="Add New Category"
                      />
                    }
                  />
                </Route>
                <Route path="banners">
                  <Route index element={<BannerLists />} />
                  <Route path=":bannerId" element={<SingleBanner />} />
                  <Route
                    path="edit/:bannerId"
                    element={
                      <EditEvent
                        inputs={eventInputs}
                        title="Update Banner Information"
                      />
                    }
                  />

                  <Route
                    path="add-banner"
                    element={
                      <AddBanner inputs={eventInputs} title="Add New Banner" />
                    }
                  />
                </Route>

                <Route path="pickup-stations">
                  <Route index element={<PickupStationLists />} />
                  <Route
                    path=":pickupStationId"
                    element={<SinglePickupStation />}
                  />
                  <Route
                    path="edit/:pickupStationId"
                    element={
                      <EditEvent
                        inputs={eventInputs}
                        title="Update Pickup Station"
                      />
                    }
                  />

                  <Route
                    path="add-pickup-station"
                    element={
                      <AddPickupStation
                        inputs={eventInputs}
                        title="Add New Pickup Station"
                      />
                    }
                  />
                </Route>
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
