import { useState, useEffect } from "react";
import "./Profile.scss";
import card from "../../assets/Profile/card.svg";
import license from "../../assets/Profile/license.svg";
import img from "../../assets/Profile/img.svg";
import Navigation from "../../components/Navigation/Navigation";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logout from "../../assets/Profile/logout.svg";
import settings from "../../assets/Profile/settings.svg";
import ErrorPage from "../ErrorPage/ErrorPage";
import axios from "axios";
import RentalCar from "../../components/RentalCar/RentalCar";
const Profile = () => {
  const { user, setUser } = useAuth();
  if (!user) {
    return <ErrorPage />;
  }
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  const [rentals, setRentals] = useState([]);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    alert("Вы вышли из аккаунта");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rentals/my-rentals/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log(response.data);
        setRentals(response.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    if (user) {
      fetchRentals();
    }
  }, []);

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__header-container">
          <div className="profile__header-user">
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt=""
              className="profile__header-user-img"
            />
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
          <Link to={"/profileChange"} className="profile__main-link-wrapper">
            <div className="profile__main-link">
              <img src={settings} alt="" className="profile__main-link-img" />
              <p className="profile__main-link-text">Настройки</p>
            </div>
          </Link>
          <div className="profile__main-logout" onClick={handleLogout}>
            <img src={logout} alt="" className="profile__main-link-img" />
            <p className="profile__main-link-text">Выйти из аккаунта</p>
          </div>
          <h1 className="profile__main-rentals-title">Истроия аренды</h1>
          <div className="profile__main-rentals">
            {rentals.map((rental) => (
              <RentalCar
                key={rental.id}
                id={rental.car.id}
                name={rental.car.name}
                brand={rental.car.brand}
                image={rental.car.image}
                price={rental.pricePerMinute}
                totalPrice={rental.totalPrice}
                startDate={formatDate(rental.startDate)}
                endDate={formatDate(rental.endDate)}
              />
            ))}
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
