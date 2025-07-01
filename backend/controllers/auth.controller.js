const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  const { username, email, password } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) return res.status(409).json({ message: 'Email already used' });

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUser({ username, email, passwordHash });

  res.status(201).json({ id: userId, message: 'User created' });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
}

module.exports = { register, login };
