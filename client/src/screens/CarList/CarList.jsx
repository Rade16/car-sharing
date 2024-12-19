import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CarList.scss";
import filter from "../../assets/filter.svg";
import CarPreview from "../../components/CarPreview/CarPreview";
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";

const CarList = () => {
  const { user } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }

  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentRental, setCurrentRental] = useState(null);

  useEffect(() => {
    const fetchCurrentRental = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rentals/current-rental/${user.id}`
        );
        setCurrentRental(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentRental();
  }, [user.id]);

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

  useEffect(() => {
    const filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCars(filtered);
  }, [searchQuery, cars]);

  return (
    <div className="carList">
      <div className="carList__container">
        <label htmlFor="search" className="carList__search">
          <input
            id="search"
            type="text"
            className="carList__search-input"
            placeholder="Поиск автомобилей"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="carList__search-filters">
            <img src={filter} alt="" />
          </div>
        </label>
        {currentRental && (
          <div className="carList__currentRental">
            <h1 className="carList__currentRental-title">
              У вас уже есть аренда!
            </h1>
            <CarPreview
              key={currentRental.car.id}
              id={currentRental.car.id}
              name={currentRental.car.name}
              brand={currentRental.car.brand}
              price={currentRental.car.price}
              image={currentRental.car.image}
              positionX={currentRental.car.positionX}
              positionY={currentRental.car.positionY}
            />
          </div>
        )}
        <div className="carList__list ">
          {filteredCars.map((car) => (
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
