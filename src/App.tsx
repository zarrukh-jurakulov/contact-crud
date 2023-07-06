import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("@token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
