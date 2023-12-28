const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

schema.method({
  info() {
    return {
      category: this,
    };
  },

});

module.exports = mongoose.model('category', schema);
