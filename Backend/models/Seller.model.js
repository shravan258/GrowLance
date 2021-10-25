const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  bussName: {
    type: String,
    required: true,
  },
  bussType: {
    type: String,
    required: true,
  },
  bussAddr: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'seller', //Manage respectively
  },
});
Seller = mongoose.model('Sellers', sellerSchema);
module.exports = Seller;
