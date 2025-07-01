const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ Connection error:', err));

  const testSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model('User', testSchema);

  const newUser = new User({
    name: 'John Doe',
    email: 'deepug116@gmail.com',
    password: 'password123',
  });

  newUser.save()
  .then(doc => {
    console.log('✅ User inserted:', doc);

    // 4) Now query for that user
    return User.findOne({ email: 'john.doe@example.com' });
  })
  .then(found => {
    console.log('🔍 Found user:', found);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    mongoose.connection.close();
  });