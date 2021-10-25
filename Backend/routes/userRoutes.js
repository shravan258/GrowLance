const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.route('/').get((req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
});

router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) res.send('No User Exists');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
      });
    }
  })(req, res, next);
});

router.route('/register').post((req, res) => {
  User.findOne({ name: req.body.name }, async (err, result) => {
    if (err) console.log('error', err);
    if (result) {
      res.send('User already exist.');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser
        .save()
        .then(() => res.send('user added'))
        .catch((err) => res.send(err));
    }
  });
});

router.route('/logout').get((req, res, next) => {
  req.logOut();
  res.status(200).json('successfully logged out');
});

module.exports = router;
