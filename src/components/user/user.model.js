const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vars = require('../../config/vars');

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'superuser', 'admin'],
  },
}, {
  timestamps: true,
});

schema.pre('save', async function encryptPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 7);
  return next();
});

schema.method({
  info() {
    return {
      username: this.username,
      email: this.email,
      role: this.role,
    };
  },
  token() {
    return jwt.sign({ id: this._id, role: this.role }, vars.jwtSecret, {
      expiresIn: '10h',
    });
  },
  comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  },
});

schema.statics = {
  async findOneAndGenerateToken({ username, password }) {
    const user = await this.findOne({ $or: [{ username }, { email: username }] });
    if (!user) throw new Error('RESOURCE_NOT_FOUND');
    if (!await user.comparePassword(password)) throw new Error('INVALID_DATA');
    return { user: user.info(), token: user.token() };
  },
};

module.exports = mongoose.model('user', schema);
