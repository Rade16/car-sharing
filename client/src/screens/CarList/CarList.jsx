import React, { useState, useEffect } from "react";
import "./CarList.scss";
import filter from "../../assets/filter.svg";
import CarPreview from "../../components/CarPreview/CarPreview";
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";
const CarList = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cars/all-cars"
        );
        setCars(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="carList">
      <div className="carList__container">
        <label htmlFor="search" className="carList__search">
          <input
            id="search"
            type="text"
            className="carList__search-input"
            placeholder="Поиск автомобилей"
          />
          <div className="carList__search-filters">
            <img src={filter} alt="" />
          </div>
        </label>
        <div className="carList__list ">
          {cars.map((car) => (
            <CarPreview
              key={car.id}
              id={car.id}
              name={car.name}
              brand={car.brand}
              price={car.price}
              image={car.image}
              positionX={car.positionX}
              positionY={car.positionY}
            />
          ))}
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default CarList;
