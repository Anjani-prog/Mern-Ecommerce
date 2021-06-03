const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// // Cart Item Schema
// const CartItemSchema = new Schema({
//   name: {
//     type: String,
//     trim: true
//   },
//   imageUrl: {
//     type: String
//   },
//   description: {
//     type: String,
//     trim: true
//   },
//   quantity: {
//     type: Number
//   },
//   price: {
//     type: Number
//   },
// });
// module.exports = Mongoose.model('CartItem', CartItemSchema);

// Cart Schema
const CartSchema = new Schema({
  // products: [CartItemSchema],
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Cart', CartSchema);
