import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import PrivateRoutes from "./privateRoutes";
import Home from "../pages/home";
import NotFound from "../pages/404";
import Register from "../pages/register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      ></Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
