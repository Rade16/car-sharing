import React, { useState } from "react";
import "./Registration.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/registration`,
        {
          username,
          password,
          email,
        }
      );
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registration">
      <div className="registration__container">
        <form action="" className="registration__form" onSubmit={handleSubmit}>
          <h1 className="registration__form-title">Регистрация</h1>
          <input
            type="text"
            placeholder="Имя"
            className="registration__form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="registration__form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="registration__form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registration__form-button" type="submit">
            Зарегистрироваться
          </button>
          <p className="registration__form-text">Уже зарегистрированы? </p>
          <p className="registration__form-link">
            <Link to="/login" className="registration__form-link">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
