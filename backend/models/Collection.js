const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
});

module.exports = mongoose.model('Collection', collectionSchema);
