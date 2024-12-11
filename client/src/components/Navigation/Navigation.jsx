import React from "react";
import "./Navigation.scss";
import profile from "../../assets/Navigation/profile.svg";
import map from "../../assets/Navigation/map.svg";
import home from "../../assets/Navigation/home.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Admin from "../../assets/Navigation/admin.svg";
const Navigation = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>Загрузка...</div>;
  }
  const userRole = useAuth().user.role;
  return (
    <div className="navigation">
      <Link to="/home">
        <img src={home} alt="" className="navigation__img" />
      </Link>
      <Link to="/profile">
        <img src={profile} alt="" className="navigation__img" />
      </Link>
      <Link to="/map">
        <img src={map} alt="" className="navigation__img" />
      </Link>
      {userRole === "admin" && (
        <Link to="/admin">
          <img src={Admin} alt="" className="navigation__img" />
        </Link>
      )}
    </div>
  );
};

export default Navigation;
