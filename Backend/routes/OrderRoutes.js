const router = require('express').Router();
const OrderItem = require('../models/OrderDetails');

router.route('/orderdetails').post(async (req, res) => {
  const {
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
  } = req.body;

  const newOrderItem = await new OrderItem({
    firstname: firstname,
    lastname: lastname,
    address: address,
    email: email,
    phone: phone,
    additionalinfo: additionalinfo,
    clonnedArr: clonnedArr,
    productsCharges: productsCharges,
    shippingCharges: shippingCharges,
    totalamount: totalamount,
  });
  newOrderItem
    .save()
    .then(() => res.send('order details saved'))
    .catch((err) => res.send(err));
});

module.exports = router;
