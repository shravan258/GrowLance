import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../Screens/PaymentForm';

const PUBLIC_KEY =
  process.env.STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(PUBLIC_KEY);
function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
