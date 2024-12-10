const Router = require("express");
const router = new Router();
const controller = require("../controllers/CarController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, controller.createCar);

router.get("/all-cars", controller.getAllCars);

router.get("/car/:id", controller.getCarById);

module.exports = router;
