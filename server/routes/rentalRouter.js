const Router = require("express");
const router = new Router();
const RentalController = require("../controllers/rentalController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/rental", RentalController.createRental);
router.post("/rental/:id/complete", RentalController.completeRental); // Завершить аренду

module.exports = router;
