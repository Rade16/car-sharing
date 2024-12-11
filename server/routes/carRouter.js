const Router = require("express");
const router = new Router();
const controller = require("../controllers/CarController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/create", upload.single("image"), controller.createCar);

router.get("/all-cars", controller.getAllCars);

router.get("/car/:id", controller.getCarById);

module.exports = router;
