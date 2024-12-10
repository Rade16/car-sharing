import React from "react";
import { YMaps, Map, RouteButton, Placemark } from "@pbe/react-yandex-maps";
import Navigation from "../../components/Navigation/Navigation";
import "./CarMap.scss";
const CarMap = () => {
  return (
    <div className="CarMap">
      <YMaps>
        <Map
          defaultState={{ center: [55.617246, 37.727472], zoom: 15 }} // Использование состояния zoom
          width={"100%"}
          height={"100vh"}
        >
          <Placemark
            geometry={[55.617246, 37.727472]} // Координаты автомобиля
            properties={{
              balloonContent: `Автомобиль №${1}`,
            }}
            options={{
              iconColor: "black",
            }}
          />
        </Map>
      </YMaps>
      <Navigation />
    </div>
  );
};

export default CarMap;
