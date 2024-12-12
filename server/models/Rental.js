const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Rental = sequelize.define("rental", {
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pricePerMinute: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

module.exports = { Rental };
