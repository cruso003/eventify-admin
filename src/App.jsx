// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Users from "./pages/Users";
import Payments from "./pages/Payments";

import FetchAdmin from "./components/FetchAdmin";
import Layout from "./components/Layout";

function App() {
  return (
    <FetchAdmin>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<AuthRoute component={Users} />} />
          <Route path="/events" element={<AuthRoute component={Events} />} />
          <Route
            path="/payments"
            element={<AuthRoute component={Payments} />}
          />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </Layout>
    </FetchAdmin>
  );
}

export default App;
