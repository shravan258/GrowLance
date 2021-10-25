const router = require('express').Router();

const CartItem = require('../models/CartProduct.model');

router.route('/getCartItems').get((req, res) => {
  const loggeduser = req.query.searchUser;
  CartItem.find({ userdetails: loggeduser }, async (error, result) => {
    if (result) {
      res.send(result);
    }
    if (error) {
      console.log(error);
    }
  });
});

router.route('/updateqty').post(async (req, res) => {
  // const productInfo = req.body.product;
  const { productId, value } = req.body;
  // const value = req.body.value;

  const user = req.user;

  let cartItem = await CartItem.findById(productId);
  console.log(user, cartItem, value);
  console.log(req.body);
  let qty = cartItem.selectedQty;
  if (value === 'increase') {
    cartItem.selectedQty = qty + 1;
  } else {
    if (cartItem.selectedQty > 0) {
      cartItem.selectedQty = qty - 1;
    } else {
      CartItem.selectedQty = 0;
    }
  }
  cartItem = await cartItem.save();
  const cartItems = await CartItem.find({ userdetails: user._id });
  return res.status(200).json({
    success: true,
    cartItems,
  });
});

router.route('/deleteCartItem').get((req, res) => {
  const product_id = req.query.p_id;
  const User_product = req.query.searchUser;
  CartItem.remove(
    {
      $and: [{ userdetails: User_product }, { _id: product_id }],
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      console.log(result);
      res.json(result);
    }
  );
});

router.route('/newCartItem').post(async (req, res) => {
  const { productName } = req.body;
  user = req.user;

  const cartresult = await CartItem.findOne({
    $and: [{ userdetails: req.body.userdetails }, { productName: productName }],
  });
  if (cartresult !== null) {
    res.send('product already exists');
  } else {
    const newItem = await new CartItem({
      seller_id: req.body.seller_id,
      productName: req.body.productName,
      p_desc: req.body.p_desc,
      p_category: req.body.p_category,
      p_quantity: req.body.p_quantity,
      p_price: req.body.p_price,
      p_seller: req.body.p_seller,
      image: req.body.image,
      userdetails: req.body.userdetails,
      selectedQty: 1,
    });
    newItem
      .save()
      .then(() => res.send('product added to cart'))
      .catch((err) => res.send(err));
  }
});
module.exports = router;
