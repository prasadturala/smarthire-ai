const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../dataStore');

const createToken = (user) => jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET || 'smarthire-dev-secret',
  { expiresIn: '8h' }
);

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt
});

const registerUser = async (req, res) => {
  const { name, email, password, role = 'candidate' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  const candidate = users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());
  if (candidate) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  const token = createToken(newUser);

  return res.status(201).json({
    message: 'User registered successfully',
    token,
    user: sanitizeUser(newUser)
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(
    (candidate) => candidate.email.toLowerCase() === String(email).trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = createToken(user);

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: sanitizeUser(user)
  });
};

module.exports = { registerUser, loginUser };
