import React from "react";
import "./CarPreview.scss";
import landCruiser200 from "../../assets/CarPreview/landCruiser200.png";
import { Link } from "react-router-dom";
const CarPreview = () => {
  return (
    <Link to="/carlist/1">
      <div className="carPreview">
        <div className="carPreview__container">
          <div className="carPreview__car-info">
            <div className="arPreview__car-info-container">
              <h3 className="carPreview__car-info-title">Land Cruiser 200</h3>
              <p className="carPreview__car-info-name">Toyota</p>
              <p className="carPreview__car-info-price">30р / км</p>
            </div>
            <button className="carPreview__car-info-button">Арендовать</button>
          </div>
          <img src={landCruiser200} className="carPreview__car-img"></img>
        </div>
      </div>
    </Link>
  );
};

export default CarPreview;
