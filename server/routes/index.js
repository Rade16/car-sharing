const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter");
const carRouter = require("./carRouter");
const paymentRouter = require("./paymentRouter");
const rentalRouter = require("./rentalRouter");

router.use("/auth", authRouter);
router.use("/cars", carRouter);
router.use("/rentals", rentalRouter);
router.use("/payments", paymentRouter);

module.exports = router;
