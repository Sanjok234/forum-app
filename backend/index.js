require('dotenv').config();
//index.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./config/db.config");
const userRoutes = require("./routes/user.routes");
const forumRoutes = require("./routes/forum.routes");
const commentRoutes = require("./routes/comment.routes");
const commentUpvoteRoutes = require("./routes/comment_upvote.routes");
const forumUpvoteRoutes = require("./routes/forum_upvote.routes");
const errorHandler = require('./middlewares/error.middleware');
const app = express();
const port = process.env.PORT || 5000;

//Test database connection
async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("MySQL connected successfully");
  } catch (err) {
    console.log("MySQL connection error:", err);
  }
}

testConnection();

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Forum API" }); // to parse URL-encoded bodies (optional, for form data)
});

app.use("/api/users", userRoutes);
app.use("/api/forums/", forumRoutes);
app.use("/api/comments/", commentRoutes);
app.use("/api/comments/:id/upvotes", commentUpvoteRoutes);
app.use("/api/forums/upvote", forumUpvoteRoutes);

//Start server
app.listen(port, () => {
  console.log(`Server is runnning on port ${port}`);
});

app.use(errorHandler);
