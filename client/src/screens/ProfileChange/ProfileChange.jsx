import React, { useState, useEffect } from "react";
import "./ProfileChange.scss";
import img from "../../assets/Profile/img.svg";
import { useAuth } from "../../context/AuthContext";
import ErrorPage from "../ErrorPage/ErrorPage";
import Navigation from "../../components/Navigation/Navigation";
import add from "../../assets/admin/add.svg";
import axios from "axios";
const ProfileChange = () => {
  const { user, setUser } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }

  const [avatar, setAvatar] = useState("");
  const formData = new FormData();
  if (avatar) {
    formData.append("avatar", avatar);
  }

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/user/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profileChange">
      <div className="profileChange__header">
        <div className="profileChange__header-container">
          <div className="profileChange__header-user">
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt=""
              className="profileChange__header-user-img"
            />
            <p className="profileChange__header-user-text">{user.username}</p>
          </div>
        </div>
      </div>
      <div className="profileChange__main">
        <div className="profileChange__main-container">
          <form
            action=""
            className="profileChange__main-form"
            onSubmit={handleSubmit}
          >
            <h1 className="profileChange__main-title">Добавить изображение</h1>
            <label htmlFor="image" className="profileChange__main-label">
              <img src={add} alt="" className="profileChange__main-label-img" />
              <input
                id="image"
                type="file"
                accept="image/*"
                className="profileChange__main-input"
                onChange={handleFileChange}
              />
            </label>
            <button className="profileChange__main-button" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default ProfileChange;
