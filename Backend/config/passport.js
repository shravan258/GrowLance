const User = require('../models/user');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');

customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallBack = (username, password, done) => {
  // console.log(username, password);
  User.findOne({ email: username }, (err, user) => {
    console.log('user', user);
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      console.log(result);
      if (err) return done(err, false);
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
};

const Strategy = new localStrategy(customFields, verifyCallBack);

passport.use(Strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    const userInformation = {
      _id: user.id,
      user: user.name,
      name: user.name,
      email: user.email,
      location: user.location,
      password: user.password,
    };
    done(err, userInformation);
  });
});
