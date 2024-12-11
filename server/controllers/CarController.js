const { User, Car, Favorite } = require("../models/index");

class CarController {
  async createCar(req, res) {
    try {
      const { name, brand, price, positionX, positionY, category } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      const car = await Car.create({
        category,
        name,
        brand,
        price,
        image,
        positionX,
        positionY,
      });
      return res.json(car);
    } catch (e) {
      console.log(e);
    }
  }

  async updateCar(req, res) {
    try {
      const { id } = req.params;
      const { name, brand, price, image, positionX, positionY } = req.body;
      const car = await Car.findByPk(id);
      if (!car) return res.status(404).json({ error: "Car not found" });

      await car.update(name, brand, price, image, positionX, positionY);
      res.json(car);
    } catch (error) {
      res.status(400).json({ error: "Error updating car" });
    }
  }

  async deleteCar(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findByPk(id);
      if (!car) return res.status(404).json({ error: "Car not found" });

      await car.destroy();
      res.json({ message: "Car deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting car" });
    }
  }

  async getCarById(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findByPk(id);
      if (!car) return res.status(404).json({ error: "Car not found" });
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: "Error fetching car" });
    }
  }

  async getAllCars(req, res) {
    try {
      const cars = await Car.findAll();
      return res.json(cars);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new CarController();
