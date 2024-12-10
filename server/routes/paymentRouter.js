const Router = require("express");
const router = new Router();
const PaymentController = require("../controllers/paymentController");

router.post("/payments", PaymentController.createPayment);
router.get(
  "/rentals/:rentalId/payments",
  PaymentController.getPaymentsByRental
);

module.exports = router;
