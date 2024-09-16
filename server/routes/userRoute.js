const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/users", userController.getAllUsers);
router.post("/signup", userController.signup);

module.exports = router