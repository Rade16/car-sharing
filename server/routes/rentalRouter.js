const Router = require("express");
const router = new Router();
const RentalController = require("../controllers/rentalController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/rental", RentalController.createRental);
router.get("/users/:userId/rentals", RentalController.getRentalsByUser);
router.put("/:id/status", RentalController.updateRentalStatus);

module.exports = router;
