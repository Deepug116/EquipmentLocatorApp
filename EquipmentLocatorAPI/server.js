const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/equipment_locator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error(err));

// POST /signup route
app.post('/signup', async (req, res) => {
  console.log('Received signup request:', req.body);
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  return res.status(201).json({ message: 'User created successfully!' });

});

// Start server
app.listen(3000, () => {
  console.log('✅ API server running on http://localhost:3000');
});
