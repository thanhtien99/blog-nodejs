const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  username: { type: String, require: true },
  email: { type: String, unique: true ,require: true },
  password: { type: String, require: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Users', Users);