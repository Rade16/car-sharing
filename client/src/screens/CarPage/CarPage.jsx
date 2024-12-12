import React, { useState, useEffect } from "react";
import "./CarPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { YMaps, Map, RouteButton, Placemark } from "@pbe/react-yandex-maps";
import landCruiser200 from "../../assets/CarPreview/landCruiser200.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import carIcon from "../../assets/carIcon.svg";
import { useAuth } from "../../context/AuthContext";
import ErrorPage from "../ErrorPage/ErrorPage";

const CarPage = () => {
  const { user } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }

  const [rentalStarted, setRentalStarted] = useState(false);
  const [rentalId, setRentalId] = useState(null);
  const { carId } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cars/car/${carId}`
        );
        console.log(response.data);
        setCar(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке автомобиля:", error);
      }
    };

    fetchCar();
  }, []);

  console.log(car.id);
  console.log(car.price);
  console.log(user.id);

  const startRental = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentals/rental",
        {
          userId: user.id,
          carId: car.id,
          pricePerMinute: car.price,
        }
      );

      setRentalId(response.data.id);
      setRentalStarted(true);
      alert("Аренда успешно началась!");
      console.log("Rental started:", response.data);
    } catch (error) {
      console.error("Error starting rental:", error);
    }
  };

  const completeRental = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/rentals/rental/${rentalId}/complete`,
        {
          userId: user.id,
        }
      );

      console.log("Rental completed:", response.data);
      setRentalStarted(false);
      alert(
        `Аренда успешно завершена. Цена составила: ${response.data.totalPrice}р.`
      );
    } catch (error) {
      console.error("Ошибка при завершении аренды:", error.response?.data);
      alert("Ошибка при завершении аренды.");
    }
  };

  return (
    <div className="CarPage">
      <div className="CarPage__header">
        <img
          src={`http://localhost:5000${car.image}`}
          alt=""
          className="CarPage__header-img"
        />
      </div>
      <div className="CarPage__main">
        <div className="CarPage__main-container">
          <div className="CarPage__main-car">
            <p className="CarPage__main-car-title">{car.name}</p>
            <p className="CarPage__main-car-name">{car.brand}</p>
          </div>
          <div className="CarPage__main-info">
            <p className="CarPage__main-info-title">Цена</p>
            <p className="CarPage__main-info-price">{car.price}р / мин</p>
          </div>
          <div className="CarPage__main-map">
            <YMaps>
              <Map
                defaultState={{
                  center: [car.positionX, car.positionY],
                  zoom: 15,
                }}
                width={"100%"}
                height={"300px"}
              >
                <Placemark
                  geometry={[car.positionX, car.positionY]}
                  properties={{
                    hintContent: `Машина: ${car.name}`,
                    balloonContent: `
                      <strong>${car.name}</strong><br />
                      Цена: ${car.price}р / мин<br />
                      Бренд: ${car.brand}
                    `,
                  }}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref: `${carIcon}`,
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -15],
                  }}
                />
              </Map>
            </YMaps>
          </div>

          {rentalStarted ? (
            <>
              <button
                className="CarPage__main-button-complete"
                onClick={completeRental}
              >
                Завершить аренду
              </button>
            </>
          ) : (
            <div className="CarPage__main-button" onClick={startRental}>
              Арендовать
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default CarPage;
