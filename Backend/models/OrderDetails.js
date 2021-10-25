const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

/*const finaldetails = {
    firstname,
    lastname,
    address,
    email,
    phone,
    additionalinfo,
    clonnedArr,
    productsCharges,
    shippingCharges,
    totalamount,
  }; */

const orderSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  additionalinfo: {
    type: String,
    required: true,
  },
  clonnedArr: {
    type: Array,
    required: true,
  },
  productsCharges: {
    type: String,
    required: true,
  },
  shippingCharges: {
    type: String,
    required: true,
  },
  totalamount: {
    type: String,
    required: true,
  },
});
OrderItem = mongoose.model('Orders', orderSchema);
module.exports = OrderItem;
