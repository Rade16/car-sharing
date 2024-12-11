import React from "react";
import "./CarPreview.scss";
import landCruiser200 from "../../assets/CarPreview/landCruiser200.png";
import { Link } from "react-router-dom";
const CarPreview = (obj) => {
  return (
    <Link to={`/carlist/${obj.id}`}>
      <div className="carPreview">
        <div className="carPreview__container">
          <div className="carPreview__car-info">
            <div className="arPreview__car-info-container">
              <h3 className="carPreview__car-info-title">{obj.name}</h3>
              <p className="carPreview__car-info-name">{obj.brand}</p>
              <p className="carPreview__car-info-price">{obj.price}р / мин</p>
            </div>
            <button className="carPreview__car-info-button">Арендовать</button>
          </div>
          <img
            src={`http://localhost:5000${obj.image}`}
            className="carPreview__car-img"
          ></img>
        </div>
      </div>
    </Link>
  );
};

export default CarPreview;
