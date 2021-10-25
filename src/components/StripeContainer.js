import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../Screens/PaymentForm';

const PUBLIC_KEY =
  'pk_test_51JlTROSDewrnjya5fALck9USofeJWO7hhf6AhIeVTRcPymbonIIaPZC6fTV3GXP4otnNL8e0rW3nxfFEAYQu4Gw100nEo8s7qJ';

const stripePromise = loadStripe(PUBLIC_KEY);
function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
