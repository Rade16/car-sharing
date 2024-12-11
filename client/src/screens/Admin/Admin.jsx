import React from "react";
import "./Admin.scss";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import landCruiser200 from "../../assets/CarPreview/landCruiser200.png";
import add from "../../assets/admin/add.svg";
const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__container">
        <div className="admin__header">
          <h1 className="admin__header-title">Панель администратора</h1>
        </div>
        <div className="admin__cars">
          <h1 className="admin__cars-title">Добавить машину</h1>
          <Link to="/addcar">
            <div className="admin__cars-add">
              <div className="admin__cars-add-container">
                <div className="admin__cars-add-info">
                  <img src={add} alt="" className="admin__cars-add-info-img" />
                </div>
                <img src={landCruiser200} className="admin__cars-add-img"></img>
              </div>
            </div>
          </Link>
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default Admin;
