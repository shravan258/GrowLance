import React from 'react';
import success from '../images/Capture.PNG';
import '../css/ordersuccess.css';
import { useHistory } from 'react-router-dom';

function OrderSuccess() {
  const history = useHistory();
  return (
    <>
      <h1 className='order-title'>Order placed</h1>
      <div>
        <img src={success} alt='' srcset='' className='success-order' />
      </div>
      <button
        className='btn btn-primary back-to-shop'
        onClick={() => history.push('/')}
      >
        Back to shopping
      </button>
    </>
  );
}

export default OrderSuccess;
