const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    min: 2,
    max: 100,
  },
  displayName: {
    type: String,
    required: [true, 'Display Name is required'],
    unique: true,
    min: 2,
    max: 100,
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
  collection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
});

module.exports = mongoose.model('User', userSchema);
