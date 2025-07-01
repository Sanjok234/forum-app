const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const forumController = require('../controllers/forum.controller');
const { authenticateToken } = require("../middlewares/auth.middleware");

//Get all users
router.get("/", userController.getAllUsers);

//Get User by ID
router.get("/:id", userController.getUserById);

//Get forums ofa User by User ID
router.get("/:id/forums",
     forumController.getUserForums);

//Create users
router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

module.exports = router;
