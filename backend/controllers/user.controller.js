const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require ("dotenv").config();

const saltRounds = 10; //work factor for hashing

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const userController = {
  //Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.log("Error in getAllUsers controllers:", err);
      res.status(500).json({ message: "error in fetching all users" });
    }
  },
  //Get  User by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.getUserById(id);
      res.status(200).json(user);
    } catch (err) {
      console.log("Error in getUserById controllers:", err);
      res.status(500).json({ message: "error in fetching user" });
    }
  },

  //Register User
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json("error incomplete data to create a user");
    }

    //hash pasword
    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
      //check if username is already taken or not
      const existingUsername = await User.findUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken." });
      }
      //check if email is already taken or not
      const existingEmail = await User.findUserByEmail(email);
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Email is already registered." });
      }

      const newUser = await User.registerUser({
        username,
        email,
        passwordHash,
      });
      res.status(201).json({ message: "New user successfully registered." });
    } catch (error) {
      console.log("Error in getAllUsers controllers:", error);
      res.status(500).json({ message: "error in creating user" });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please fill the required fields." });

    //try login
    try {
      //some logic for authentication
      const existingUser = await User.findUserByEmail(email);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found." });
      }

      // ✅ Use bcrypt.compare here
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password_hash
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Incorrect password, try again!" });
      }

      //create JWT token
      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
        },
        JWT_SECRET,
        {
          expiresIn:JWT_EXPIRES_IN
        }
      );

      return res.status(200).json({
        message:"Login successful",
        token,
        user:{
           id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
        },
      });
    } catch (error) {
      console.log("Error in loginUser controllers:", error);
      res.status(500).json({ message: "error in logging in user" });
    }
  },
};

module.exports = userController;
