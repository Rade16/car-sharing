import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";
const ErrorPage = () => {
  return (
    <div className="errorPage">
      <h1 className="errorPage__title">Идёт загрузка данных...</h1>
      <p className="errorPage__subtitle"> Пожалуйста, подождите</p>
      <p className="errorPage__text">
        Если данные не загрузятся в течении нескольких секунд, пожалуйста,
        авторизуйтесь заново
      </p>
      <Link to="/login">
        <button className="errorPage__button">Авторизация</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
