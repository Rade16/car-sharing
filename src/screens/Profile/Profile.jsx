import React from "react";
import "./Profile.scss";
import card from "../../assets/Profile/card.svg";
import license from "../../assets/Profile/license.svg";
import user from "../../assets/Profile/user.jpg";
import Navigation from "../../components/Navigation/Navigation";
const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__header-container">
          <div className="profile__header-user">
            <img src={user} alt="" className="profile__header-user-img" />
            <p className="profile__header-user-text">Бекмурзов Алан</p>
          </div>
        </div>
      </div>
      <div className="profile__main">
        <div className="profile__main-container">
          <div className="profile__main-link">
            <img src={license} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">
              Водительское удостоверение
            </p>
          </div>
          <div className="profile__main-link">
            <img src={card} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">Способ оплаты</p>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
