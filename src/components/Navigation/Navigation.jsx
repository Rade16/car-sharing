import React from "react";
import "./Navigation.scss";
import profile from "../../assets/Navigation/profile.svg";
import map from "../../assets/Navigation/map.svg";
import home from "../../assets/Navigation/home.svg";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/">
        <img src={home} alt="" className="navigation__img" />
      </Link>
      <Link to="/profile">
        <img src={profile} alt="" className="navigation__img" />
      </Link>
      <Link to="/map">
        <img src={map} alt="" className="navigation__img" />
      </Link>
    </div>
  );
};

export default Navigation;
