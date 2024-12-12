const { Rental, Car, User } = require("../models");

class RentalController {
  async createRental(req, res) {
    try {
      const { userId, carId, pricePerMinute } = req.body;
      if (!userId || !carId || !pricePerMinute) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const rental = await Rental.create({
        userId,
        carId,
        startDate: new Date(),
        pricePerMinute,
        status: "active",
      });
      res.status(201).json(rental);
    } catch (error) {
      res.status(400).json({ error: "Error creating rental" });
    }
  }

  async completeRental(req, res) {
    try {
      const { id } = req.params;
      const rental = await Rental.findByPk(id);
      if (!rental) return res.status(404).json({ error: "Rental not found" });

      const endDate = new Date();
      const durationMinutes = Math.ceil(
        (endDate - new Date(rental.startDate)) / (1000 * 60)
      );
      const totalPrice = durationMinutes * rental.pricePerMinute;

      await rental.update({
        endDate,
        totalPrice,
        status: "completed",
      });

      res.json({
        message: "Rental completed successfully",
        durationMinutes,
        totalPrice,
      });
    } catch (error) {
      res.status(400).json({ error: "Error completing rental" });
    }
  }

  async getRentalsByUser(req, res) {
    try {
      const { userId } = req.params;
      const rentals = await Rental.findAll({
        where: { userId },
        include: [Car],
      });
      res.json(rentals);
    } catch (error) {
      res.status(500).json({ error: "Error fetching rentals" });
    }
  }
}

module.exports = new RentalController();
