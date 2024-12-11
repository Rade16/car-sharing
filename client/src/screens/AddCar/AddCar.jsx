import React, { useState } from "react";
import add from "../../assets/admin/add.svg";
import "./AddCar.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const AddCar = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");

  const { user, token } = useAuth();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("brand", brand);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("positionX", positionX);
  formData.append("positionY", positionY);
  if (image) {
    formData.append("image", image);
  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cars/create`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при создании рецепта:", error);
    }
  };

  const categories = {
    brand: [
      "Toyota",
      "BMW",
      "Wolkswagen",
      "Audi",
      "Lexus",
      "Honda",
      "Infiniti",
      "Nissan",
      "Mazda",
      "Chery",
      "Kia",
      "Hyundai",
      "Mitsubishi",
      "Subaru",
      "Suzuki",
      "Volkswagen",
      "Mercedes-Benz",
      "Lamborghini",
      "Aston Martin",
      "Porsche",
      "Ferrari",
      "McLaren",
      "Tesla",
      "Jaguar",
      "Land Rover",
      "Tesla",
      "Haval",
    ],
    category: ["Эконом", "Комфорт", "Премиум"],
  };

  return (
    <div className="addCar">
      <div className="addCar__header">
        <label htmlFor="image" className="addCar__header-label">
          <img src={add} alt="" className="addCar__header-img" />
          <input
            id="image"
            type="file"
            className="addCar__header-input"
            required
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="addCar__main">
        <div className="addCar__main-container">
          <form action="" className="addCar__main-form" onSubmit={handleSubmit}>
            <h1 className="addCar__main-form-title">О машине</h1>
            <label htmlFor="" className="addCar__main-form-label">
              Название:
            </label>
            <input
              type="text"
              className="addCar__main-form-input"
              placeholder="Land Cruiser 200"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" className="addCar__main-form-label">
              Марка:
            </label>
            <select
              className="addCar__main-form-input"
              placeholder="Toyota"
              value={brand}
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Выберите категорию</option>
              {categories.brand.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <label htmlFor="" className="addCar__main-form-label">
              Категория:
            </label>
            <select
              className="addCar__main-form-input"
              placeholder="Toyota"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Выберите категорию</option>
              {categories.category.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <label htmlFor="" className="addCar__main-form-label">
              Цена за минуту:
            </label>
            <input
              type="text"
              className="addCar__main-form-input"
              placeholder="10р"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <h1 className="addCar__main-form-title">Координаты:</h1>
            <label htmlFor="" className="addCar__main-form-label">
              X:
            </label>
            <input
              type="text"
              className="addCar__main-form-input"
              placeholder="55.621897"
              required
              value={positionX}
              onChange={(e) => setPositionX(e.target.value)}
            />
            <label htmlFor="" className="addCar__main-form-label">
              Y:
            </label>
            <input
              type="text"
              className="addCar__main-form-input"
              placeholder="37.714539"
              required
              value={positionY}
              onChange={(e) => setPositionY(e.target.value)}
            />
            <button className="addCar__main-form-button" type="submit">
              Добавить
            </button>
          </form>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default AddCar;
