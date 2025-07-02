// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'YOUR_SECRET_KEY'; // Use env variable in production
const ldap = require('ldapjs');
const LDAP_URL = process.env.LDAP_URL || 'ldap://your-ad-server.com';
const BASE_DN = process.env.LDAP_BASE_DN || 'dc=yourdomain,dc=com';

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/equipment_locator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error(err));

// ✅ POST /signup with strict domain check
app.post('/signup', async (req, res) => {
  console.log('Received signup request:', req.body);

  const { name, email, password } = req.body;
  const cleanEmail = email?.toLowerCase().trim();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format!' });
  }

  if (!cleanEmail.endsWith('@packagingcorp.com')) {
    return res.status(400).json({ message: 'Email must end with @packagingcorp.com!' });
  }

  const domainPart = cleanEmail.split('@').pop();
  if (domainPart !== 'packagingcorp.com') {
    return res.status(400).json({ message: 'Invalid email domain!' });
  }

  const existingUser = await User.findOne({ email: cleanEmail });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email: cleanEmail,
    password: hashedPassword,
  });

  await user.save();
  console.log('✅ User saved:', cleanEmail);

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({ message: 'User created successfully!', token });
});

// ✅ POST /login with domain check
app.post('/login', async (req, res) => {
  console.log('Received login request:', req.body);

  const { email, password } = req.body;
  const cleanEmail = email?.toLowerCase().trim();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format!' });
  }

  if (!cleanEmail.endsWith('@packagingcorp.com')) {
    return res.status(400).json({ message: 'Email must end with @packagingcorp.com!' });
  }

  const domainPart = cleanEmail.split('@').pop();
  if (domainPart !== 'packagingcorp.com') {
    return res.status(400).json({ message: 'Invalid email domain!' });
  }

  const user = await User.findOne({ email: cleanEmail });
  if (!user) {
    return res.status(400).json({ message: 'User not found!' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password!' });
  }

  console.log('✅ User logged in:', cleanEmail);
  // Generate JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  return res.status(200).json({ message: 'Login successful!', token });
});

// AD/LDAP login endpoint
app.post('/ad-login', async (req, res) => {
  const { username, password } = req.body;
  const client = ldap.createClient({ url: LDAP_URL });

  client.bind(`${username}@yourdomain.com`, password, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Optionally, search for user info here
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', token });
    client.unbind();
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log('✅ API server running on http://localhost:3000');
});
