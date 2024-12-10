const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Rental = sequelize.define("rental", {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active", // active, completed, cancelled
  },
});

module.exports = { Rental };
