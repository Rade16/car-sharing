import React from "react";
import "./CarPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import landCruiser200 from "../../assets/CarPreview/landCruiser200.png";

const CarPage = () => {
  return (
    <div className="CarPage">
      <div className="CarPage__header">
        <img src={landCruiser200} alt="" className="CarPage__header-img" />
      </div>
      <div className="CarPage__main">
        <div className="CarPage__main-container">
          <div className="CarPage__main-car">
            <p className="CarPage__main-car-title">Land Cruiser 200</p>
            <p className="CarPage__main-car-name">Toyota</p>
          </div>
          <div className="CarPage__main-info">
            <p className="CarPage__main-info-title">Цена</p>
            <p className="CarPage__main-info-price">40р / км</p>
          </div>

          <div className="CarPage__main-button">Арендовать</div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default CarPage;
