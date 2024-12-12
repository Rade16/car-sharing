const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post(
  "/registration",
  check("username").isLength({ min: 4, max: 25 }),
  check("password").isLength({ min: 4, max: 25 }),
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);
router.get("/auth", authMiddleware, controller.auth);
router.put("/user/:id", upload.single("avatar"), controller.updateUser);
module.exports = router;
