const router = require('express').Router();
const Seller = require('../models/Seller.model');
const Product = require('../models/Product.model');

router.route('/').get((req, res) => {
  const seller_id = req.query.seller_id;
  Product.find({ seller_id: seller_id }, async (error, result) => {
    if (result) {
      res.send(result);
    }
    if (error) {
      console.log(error);
    }
  });
});

router.route('/search').get((req, res) => {
  const searchValue = req.query.searchValue;
  Product.find(
    { $or: [{ productName: searchValue }, { p_seller: searchValue }] },
    function (err, result) {
      if (err) {
        res.send(err);
      }
      console.log(result);
      res.json(result);
    }
  );
});

router.route('/newproduct').post((req, res) => {
  const newProduct = new Product({
    seller_id: req.body.seller_id,
    productName: req.body.productName,
    p_desc: req.body.p_desc,
    p_category: req.body.p_category,
    p_quantity: req.body.p_quantity,
    p_price: req.body.p_price,
    p_seller: req.body.p_seller,
    image: req.body.image,
    seller_addr: req.body.seller_addr,
  });
  newProduct
    .save()
    .then(() => res.send('product added'))
    .catch((err) => res.send(err));
});

module.exports = router;
