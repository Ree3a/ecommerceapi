const express = require("express");
const userController = require("../controllers/user_controllers");
const router = express.Router();

router.post("/register", userController.signUp);
router.post("/login", userController.login)
router.post("/adminlogin", userController.adminlogin)


module.exports = router;