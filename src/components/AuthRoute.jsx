import { Route, Navigate, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthRoute({ component: Component, ...rest }) {
  const { loggedOut } = useAuth();

  return (
    <Routes>
      {/* Wrap Route components inside Routes */}
      <Route
        {...rest}
        element={!loggedOut ? <Component /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
