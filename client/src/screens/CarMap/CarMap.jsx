import React, { useState, useEffect } from "react";
import { YMaps, Map, RouteButton, Placemark } from "@pbe/react-yandex-maps";
import Navigation from "../../components/Navigation/Navigation";
import "./CarMap.scss";
import axios from "axios";
import carIcon from "../../assets/carIcon.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import ErrorPage from "../ErrorPage/ErrorPage";

const CarMap = () => {
  const [cars, setCars] = useState([]);
  const { user } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cars/all-cars"
        );
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="CarMap">
      <YMaps>
        <Map
          defaultState={{
            center: [55.617246, 37.727472],
            zoom: 15,
          }}
          width={"100%"}
          height={"100vh"}
        >
          {cars.map(
            (car) => (
              console.log(car.positionX, car.positionY),
              (
                <Placemark
                  key={car.id}
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
                  onClick={() => navigate(`/carlist/${car.id}`)}
                />
              )
            )
          )}
        </Map>
      </YMaps>
      <Navigation />
    </div>
  );
};

export default CarMap;
