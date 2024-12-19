import React, { useState, useEffect } from "react";
import "./CarPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useParams } from "react-router-dom";
import axios from "axios";
import carIcon from "../../assets/carIcon.svg";
import { useAuth } from "../../context/AuthContext";
import ErrorPage from "../ErrorPage/ErrorPage";
import { use } from "react";

const CarPage = () => {
  const { user } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }

  const [rentalStarted, setRentalStarted] = useState(false);
  const [rentalId, setRentalId] = useState(null);
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [coordinatesEntered, setCoordinatesEntered] = useState(false);

  useEffect(() => {
    const fetchIsRental = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rentals/current-rental/${user.id}`
        );

        if (response.data && response.data.car.id == carId) {
          setRentalStarted(true);
          setRentalId(response.data.id); // Устанавливаем rentalId только если аренда активна
        } else {
          setRentalStarted(false); // Если аренда не активна, сбрасываем состояние
          setRentalId(null); // Обнуляем rentalId, если аренда не активна
        }
      } catch (error) {
        console.error("Error checking isRental:", error);
        setRentalStarted(false); // Обнуляем, если произошла ошибка
        setRentalId(null); // Обнуляем rentalId при ошибке
      }
    };

    fetchIsRental();
  }, [user.id, carId]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cars/car/${carId}`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке автомобиля:", error);
      }
    };

    fetchCar();
  }, [carId, rentalStarted]);

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
    } catch (error) {
      console.error("Error starting rental:", error);
    }
  };

  const completeRental = async () => {
    if (!coordinatesEntered) {
      alert("Пожалуйста, введите координаты перед завершением аренды.");
      return;
    }

    try {
      // Сначала обновим геопозицию
      await axios.put(`http://localhost:5000/api/cars/car/${carId}/geo`, {
        positionX,
        positionY,
      });

      // Завершаем аренду
      const response = await axios.post(
        `http://localhost:5000/api/rentals/rental/${rentalId}/complete`,
        {
          userId: user.id,
        }
      );

      setRentalStarted(false);
      alert(
        `Аренда успешно завершена. Цена составила: ${response.data.totalPrice}р.`
      );
    } catch (error) {
      console.error("Ошибка при завершении аренды:", error.response?.data);
      alert("Ошибка при завершении аренды.");
    }
  };

  const handleCoordinatesChange = () => {
    if (positionX && positionY != null) {
      setCoordinatesEntered(true);
    } else {
      setCoordinatesEntered(false);
    }
  };

  return (
    <div className="CarPage">
      <div className="CarPage__header">
        <img
          src={`http://localhost:5000${car.image}`}
          alt="Car"
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
          {rentalStarted && (
            <div className="CarPage__main-newPosition">
              <p className="CarPage__main-newPosition-title">
                Введите текущие координаты для завершения:
              </p>
              <input
                className="CarPage__main-newPosition-input"
                placeholder="x"
                value={positionX}
                onChange={(e) => {
                  setPositionX(e.target.value);
                  console.log(positionX);
                  handleCoordinatesChange();
                }}
                required
              />
              <input
                className="CarPage__main-newPosition-input"
                placeholder="y"
                value={positionY}
                onChange={(e) => {
                  console.log(positionY);
                  setPositionY(e.target.value);
                  handleCoordinatesChange();
                }}
                required
              />
            </div>
          )}
          {rentalStarted ? (
            <button
              className="CarPage__main-button-complete"
              type="button"
              onClick={completeRental}
              disabled={!coordinatesEntered}
            >
              Завершить аренду
            </button>
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
