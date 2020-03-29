const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'Tag is requried'],
  },
  expired: {
    type: Boolean,
  },
  expiry: {
    type: Number,
  },
  origin: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('Token', tokenSchema);
