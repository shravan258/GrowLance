import React, { useContext, useState } from 'react';
import '../css/payment.css';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { DataContext } from '../customHooks/DataProvider';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const options = {
  iconStyle: 'solid',
  hideIcon: false,
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

function PaymentForm() {
  const [success, setsuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const userData = useContext(DataContext);
  const payable_amount = userData.finalOrder.totalamount;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardNumberElement, {
      showIcon: true,
      placeholder: 'Card Number',
    });
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment', {
          amount: payable_amount * 100,
          id,
        });
        const { success, clientSecret } = response.data;
        console.log(response.data);
        if (success) {
          const { error } = await stripe
            .confirmCardPayment(clientSecret, {
              payment_method: {
                card,
              },
            })
            .then(async (result) => {
              if (result.error) {
                // Show error to your customer
                console.log('e1', result.error.message);
              } else {
                // The payment succeeded!
                console.log('payment-success', result.paymentIntent.id);
                enqueueSnackbar('Payment successful, order placed !!', {
                  variant: 'success',
                });
                const response2 = await axios.post(
                  'http://localhost:4000/orders/orderdetails',
                  userData.finalOrder
                );
                console.log(response2.data);
                history.push('/ordersuccess');
              }
            });
          console.log('Successful payment');

          setsuccess(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      console.log('e2', error.message);
    }
  };

  const cancelOrderHandler = () => {
    history.replace('/cart');
    userData.setfinalOrder({});
  };
  return (
    <div className='container '>
      <button onClick={() => history.push('/')} className='back-arrow'>
        <ArrowBackIcon />
      </button>

      <form onSubmit={handleSubmit} className='row container pay-container'>
        <div className='row'>
          <label for='cc-name'>Name on card</label>
          <input
            type='text'
            className='form-control'
            id='cc-name'
            placeholder=''
            required=''
          />

          <div class='invalid-feedback'>Name on card is required</div>
        </div>
        <div className='row'>
          <label>Card number</label>
          <CardNumberElement
            options={options}
            className='form-control card-number-input'
          />
        </div>
        <div className='row'>
          <div className='col-auto'>
            <label>Expiry date </label>

            <CardExpiryElement options={options} className='exp-card' />
          </div>
          <div className='col-auto'>
            <label>CVC</label>

            <CardCvcElement options={options} className='exp-card' />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'></div>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-auto'>
                <button
                  type='submit'
                  disabled={!stripe}
                  className='btn btn-primary'
                >
                  Pay
                </button>
              </div>
              <div className='col-auto'>
                <button onClick={cancelOrderHandler} className='btn btn-danger'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
