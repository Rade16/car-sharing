const sequelize = require("../db");
const { User } = require("./User");
const { Car } = require("./Car");
const { Rental } = require("./Rental");
const { Payment } = require("./Payment");

// User ↔ Rental
User.hasMany(Rental, { foreignKey: "userId" });
Rental.belongsTo(User, { foreignKey: "userId" });

// Car ↔ Rental
Car.hasMany(Rental, { foreignKey: "carId" });
Rental.belongsTo(Car, { foreignKey: "carId" });

// Rental ↔ Payment
Rental.hasMany(Payment, { foreignKey: "rentalId" });
Payment.belongsTo(Rental, { foreignKey: "rentalId" });

module.exports = {
  sequelize,
  User,
  Car,
  Rental,
  Payment,
};
