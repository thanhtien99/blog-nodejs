const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
  title: { type: String, require: true },
  image: { type: String },
  content: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', Blog);