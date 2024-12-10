const { Rental, Car, User } = require("../models");

class RentalController {
  async createRental(req, res) {
    try {
      const rentalData = req.body;
      const rental = await Rental.create(rentalData);
      res.status(201).json(rental);
    } catch (error) {
      res.status(400).json({ error: "Error creating rental" });
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

  async updateRentalStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const rental = await Rental.findByPk(id);
      if (!rental) return res.status(404).json({ error: "Rental not found" });

      await rental.update({ status });
      res.json(rental);
    } catch (error) {
      res.status(400).json({ error: "Error updating rental" });
    }
  }
}

module.exports = new RentalController();
