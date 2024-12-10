const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Car = sequelize.define("car", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  positionX: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  positionY: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Car };
