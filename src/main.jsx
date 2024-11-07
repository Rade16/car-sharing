import React from "react";
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
const router = createBrowserRouter([
  {
    index: true,
    loader: () => redirect("/carlist"),
  },
  {
    path: "/carlist",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
