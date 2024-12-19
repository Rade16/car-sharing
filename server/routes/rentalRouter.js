const Router = require("express");
const router = new Router();
const RentalController = require("../controllers/rentalController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/rental", RentalController.createRental);
router.post("/rental/:id/complete", RentalController.completeRental);
router.get(
  "/my-rentals/:userId",

  RentalController.getRentalsByUser
);
router.get("/current-rental/:id", RentalController.getActiveRental);

module.exports = router;
