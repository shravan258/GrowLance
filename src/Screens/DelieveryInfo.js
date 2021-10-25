import React, { useContext, useState } from 'react';
import '../css/delivery.css';
import { useHistory } from 'react-router';
import { DataContext } from '../customHooks/DataProvider';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DelieveryInfo() {
  const history = useHistory();
  const userData = useContext(DataContext);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [address, setaddress] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [additionalinfo, setadditionalinfo] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const shippingCharges = userData.orderItems.length * 30;
  const productsCharges = userData.orderItems
    .map((li) => Number(li.selectedQty * li.p_price.split('/')[0]))
    .reduce((sum, val) => sum + val, 0);

  const totalamount =
    userData.orderItems
      .map((li) => Number(li.selectedQty * li.p_price.split('/')[0]))
      .reduce((sum, val) => sum + val, 0) +
    userData.orderItems.length * 30;

  const clonnedArr = [...userData.orderItems];

  const gotoPaymentHandler = (event) => {
    event.preventDefault();

    if (
      firstname === '' ||
      lastname === '' ||
      address === '' ||
      email === '' ||
      phone === ''
    ) {
      const message = 'Please fill all the fields';
      enqueueSnackbar(message, {
        variant: 'error',
      });
    } else {
      const finaldetails = {
        firstname,
        lastname,
        address,
        email,
        phone,
        additionalinfo,
        clonnedArr,
        productsCharges,
        shippingCharges,
        totalamount,
      };

      userData.setfinalOrder(finaldetails);
      setfirstname('');
      setlastname('');
      setaddress('');
      setemail('');
      setphone('');
      setadditionalinfo('');
      history.replace('/payments');
    }
  };

  return (
    <div className='container'>
      <button
        className='back-arrow'
        onClick={() => {
          userData.setorderItems([]);
          history.replace('/cart');
        }}
      >
        <ArrowBackIcon />
      </button>
      <div className='row'>
        <div className='col-md-8 mb-4 content'>
          <div className='card mb-4'>
            <div className='card-header py-3'>
              <h5 className='mb-0'>Biling details</h5>
            </div>
            <div className='card-body'>
              <form>
                <div className='row mb-4'>
                  <div className='col'>
                    <div className='form-outline'>
                      <label className='form-label' for='form7Example1'>
                        First name
                      </label>
                      <input
                        type='text'
                        id='form7Example1'
                        className='form-control'
                        value={firstname}
                        onChange={(event) => setfirstname(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-outline'>
                      <label className='form-label' for='form7Example2'>
                        Last name
                      </label>
                      <input
                        type='text'
                        id='form7Example2'
                        className='form-control'
                        value={lastname}
                        onChange={(event) => setlastname(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label' for='form7Example4'>
                    Address
                  </label>
                  <input
                    type='text'
                    id='form7Example4'
                    className='form-control'
                    value={address}
                    onChange={(event) => setaddress(event.target.value)}
                  />
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label' for='form7Example5'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='form7Example5'
                    className='form-control'
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                  />
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label' for='form7Example6'>
                    Phone
                  </label>
                  <input
                    type='number'
                    id='form7Example6'
                    className='form-control'
                    value={phone}
                    onChange={(event) => setphone(event.target.value)}
                  />
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label' for='form7Example7'>
                    Additional information
                  </label>
                  <textarea
                    className='form-control'
                    id='form7Example7'
                    rows='4'
                    value={additionalinfo}
                    onChange={(event) => setadditionalinfo(event.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='col-md-4 mb-4 details'>
          <div className='card mb-4'>
            <div className='card-header py-3'>
              <h5 className='mb-0'>Summary</h5>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                  Products
                  <span> ₹{productsCharges}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center px-0'>
                  Shipping
                  <span>{shippingCharges}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className='mb-0'>(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong> ₹{totalamount}</strong>
                  </span>
                </li>
              </ul>

              <button
                type='button'
                className='btn btn-primary btn-lg btn-block'
                onClick={gotoPaymentHandler}
              >
                Make purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelieveryInfo;
