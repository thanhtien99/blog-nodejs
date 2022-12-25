const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: "Blog"},
  path: { type: String },
  content: { type: String },
  users:  { type: Array },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comments', Comments);