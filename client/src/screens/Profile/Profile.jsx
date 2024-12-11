import React from "react";
import "./Profile.scss";
import card from "../../assets/Profile/card.svg";
import license from "../../assets/Profile/license.svg";
import img from "../../assets/Profile/img.svg";
import Navigation from "../../components/Navigation/Navigation";

import { useAuth } from "../../context/AuthContext";
import logout from "../../assets/Profile/logout.svg";
import settings from "../../assets/Profile/settings.svg";
import ErrorPage from "../ErrorPage/ErrorPage";
const Profile = () => {
  const { user, setUser } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    alert("Вы вышли из аккаунта");
    window.location.href = "/";
  };
  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__header-container">
          <div className="profile__header-user">
            <img src={img} alt="" className="profile__header-user-img" />
            <p className="profile__header-user-text">{user.username}</p>
          </div>
        </div>
      </div>
      <div className="profile__main">
        <div className="profile__main-container">
          {/* <div className="profile__main-link">
            <img src={license} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">
              Водительское удостоверение
            </p>
          </div>
          <div className="profile__main-link">
            <img src={card} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">Способ оплаты</p>
          </div> */}
          <div className="profile__main-logout">
            <img src={settings} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">Настройки</p>
          </div>
          <div className="profile__main-logout" onClick={handleLogout}>
            <img src={logout} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">Выйти из аккаунта</p>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
