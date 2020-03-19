const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    min: 2,
  },
  password: {
    type: String,
    min: 8,
  },
  salt: {
    type: String,
  },
  hash: {
    type: String,
  },
  userCollection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserCollection' }],
});

module.exports = mongoose.model('User', userSchema);
