const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const cartSchema = new Schema({
  seller_id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  p_desc: {
    type: String,
    required: true,
  },
  p_category: {
    type: String,
    required: true,
  },
  p_quantity: {
    type: String,
    required: true,
  },
  p_price: {
    type: String,
    required: true,
  },
  p_seller: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userdetails: {
    type: String,
    required: true,
  },
  selectedQty: {
    type: Number,
  },
});
CartItem = mongoose.model('CartItems', cartSchema);
module.exports = CartItem;
