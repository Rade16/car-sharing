const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Payment = sequelize.define("payment", {
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "success", // Возможные значения: success, failed
  },
});

module.exports = { Payment };
