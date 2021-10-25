const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const productSchema = new Schema({
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
  seller_addr: {
    type: String,
    required: true,
  },
});
Product = mongoose.model('Products', productSchema);
module.exports = Product;
