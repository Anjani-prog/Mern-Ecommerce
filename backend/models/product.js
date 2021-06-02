const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Product', ProductSchema);
