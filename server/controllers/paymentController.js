const { Payment, Rental } = require("../models");

class PaymentController {
  async createPayment(req, res) {
    try {
      const paymentData = req.body;
      const payment = await Payment.create(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: "Error creating payment" });
    }
  }

  async getPaymentsByRental(req, res) {
    try {
      const { rentalId } = req.params;
      const payments = await Payment.findAll({ where: { rentalId } });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Error fetching payments" });
    }
  }
}

module.exports = new PaymentController();
