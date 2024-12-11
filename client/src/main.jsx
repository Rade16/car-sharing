import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./sass/main.scss";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import CarList from "./screens/CarList/CarList";
import Profile from "./screens/Profile/Profile";
import CarMap from "./screens/CarMap/CarMap";
import CarPage from "./screens/CarPage/CarPage";
import Registration from "./screens/Registration/Registration";
import Login from "./screens/Login/Login";

import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./screens/Admin/Admin";
import AddCar from "./screens/AddCar/AddCar";
const user = localStorage.getItem("token");

const App = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:5000/api/auth/auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Ошибка аутентификации:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <CarList />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/map",
    element: <CarMap />,
  },
  {
    path: "/carlist/:carId",
    element: <CarPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/addcar",
    element: <AddCar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
