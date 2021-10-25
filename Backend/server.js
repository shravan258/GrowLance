const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/ProductRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cartRoutes = require('./routes/CartRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const stripe = require('stripe')(
 process.env.SECRET_TEST_KEY
);

require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongodb connected');
});

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoutes);
app.use('/seller', sellerRoutes);
app.use('/products', productRoutes);
app.use('/upload', uploadRoutes);
app.use('/addtoCart', cartRoutes);
app.use('/orders', OrderRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.post('/payment', cors(), async (req, res) => {
  let { amount, id } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'INR',
      description: 'spatula',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', paymentIntent);
    res.send({
      message: 'payment successful',
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
