import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../Screens/PaymentForm';

const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`;
console.log('key', PUBLIC_KEY);

const stripePromise = loadStripe(PUBLIC_KEY);
function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
