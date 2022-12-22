const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = new Schema({
  blog_id: { type: String, require: true },
  path: { type: String },
  content: { type: String },
  users:  { type: Array },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comments', Comments);