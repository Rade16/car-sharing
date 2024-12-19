import React from "react";
import "./RentalCar.scss";

import { Link } from "react-router-dom";
const RentalCar = (obj) => {
  return (
    <Link to={`/carlist/${obj.id}`}>
      <div className="rentalCar">
        <div className="rentalCar__container">
          <div className="rentalCar__car-info">
            <div className="arPreview__car-info-container">
              <h3 className="rentalCar__car-info-title">{obj.name}</h3>
              <p className="rentalCar__car-info-name">{obj.brand}</p>
              <p className="rentalCar__car-info-price">{obj.price}р / мин</p>
              <p className="rentalCar__car-info-finalPrice-title">Итог</p>
              <p className="rentalCar__car-info-finalPrice">
                {obj.totalPrice}р
              </p>
              <p className="rentalCar__car-info-date-title">Начало аренды</p>
              <p className="rentalCar__car-info-date">{obj.startDate}</p>
              <p className="rentalCar__car-info-date-title">Конец аренды</p>
              <p className="rentalCar__car-info-date">{obj.endDate}</p>
            </div>
          </div>
          <img
            src={`http://localhost:5000${obj.image}`}
            className="rentalCar__car-img"
          ></img>
        </div>
      </div>
    </Link>
  );
};

export default RentalCar;
