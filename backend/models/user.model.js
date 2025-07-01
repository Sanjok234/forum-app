const db = require("../config/db.config");

const getAllUsers = async () => {
  const [rows] = await db.query(
    "SELECT id, username,email,created_at FROM users"
  );
  return rows;
};
async function findUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}
async function findUserByUsername(username) {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
}
async function getUserById(id) {
  const [rows] = await db.query(
    "SELECT id, username, email, created_at FROM users WHERE id = ?",
    [id]
  );
  
  return rows[0];
}

async function registerUser({ username, email, passwordHash }) {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, passwordHash]
  );
  return result;
}

module.exports = {
  getAllUsers,
  findUserByEmail,
  findUserByUsername,
  getUserById,
  registerUser,
};
