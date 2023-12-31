const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'reference',
  },
  reference: {
    type: String,
    required: true,
    enum: ['question', 'comment'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('like', schema);
