const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  rules: {
    type: String,
    required: [true, 'Rules are required'],
  },
  image: {
    type: String,
    required: [true, 'An Image is required'],
  },
});

module.exports = mongoose.model('Card', cardSchema);
