const router = require('express').Router();
const Seller = require('../models/Seller.model');
const bcrypt = require('bcrypt');

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Seller.findOne({ email: email }, (err, user) => {
    console.log(user);
    if (err) res.send(err);
    if (user === null) {
      res.send('No seller exists');
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) res.send(err);
        if (result === true) {
          res.send(user);
        } else {
          res.send('password does not match');
        }
      });
    }
  });
});

router.route('/register').post((req, res) => {
  Seller.findOne({ name: req.body.name }, async (result, err) => {
    if (err) console.log(err);
    if (result !== null) {
      res.send('seller exists');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newSeller = new Seller({
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        city: req.body.city,
        bussName: req.body.bussName,
        bussType: req.body.bussType,
        bussAddr: req.body.bussAddr,
        password: hashedPassword,
      });
      await newSeller
        .save()
        .then(() => res.send('seller added'))
        .catch((err) => res.send(err));
    }
  });
});

module.exports = router;
