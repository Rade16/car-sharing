import React from "react";
import "./CarList.scss";
import filter from "../../assets/filter.svg";
import CarPreview from "../../components/CarPreview/CarPreview";
import Navigation from "../../components/Navigation/Navigation";
const CarList = () => {
  return (
    <div className="carList">
      <div className="carList__container">
        <div className="carList__search">
          <input
            type="text"
            className="carList__search-input"
            placeholder="Поиск автомобилей"
          />
          <div className="carList__search-filters">
            <img src={filter} alt="" />
          </div>
        </div>
        <div className="carList__list ">
          <CarPreview />
          <CarPreview />
          <CarPreview />
          <CarPreview />
          <CarPreview />
          <CarPreview />
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default CarList;
