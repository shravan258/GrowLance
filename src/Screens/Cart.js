import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../customHooks/DataProvider';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/cart.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Cart() {
  const history = useHistory();
  const userData = useContext(DataContext);
  const [cartItems, setcartItems] = useState([]);
  const [qty, setqty] = useState(1);
  const [newProductList, setnewProductList] = useState([]);
  const [disabled, setdisabled] = useState(false);
  let selectedQty = 0;
  let updatedProduct = {};

  const getCartItems = async () => {
    if (userData.user) {
      await axios
        .get('http://localhost:4000/addtoCart/getCartItems', {
          params: {
            searchUser: userData.user._id,
          },
        })
        .then((result) => {
          setcartItems(result.data);
        });
    } else {
      history.push('/login');
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const qtyUpdateHandler = async (product, value) => {
    console.log(product);
    const details = {
      product: product,
      value: value,
    };
    const res = await axios.post(
      'http://localhost:4000/addtoCart/updateqty',
      {
        productId: product._id,
        value,
      },
      {
        withCredentials: true,
      }
    );
    setcartItems(res.data?.cartItems ?? []);
  };

  const deletefromCart = async (id) => {
    setcartItems(cartItems.filter((product) => product._id !== id));
    await axios.get('http://localhost:4000/addtoCart/deleteCartItem', {
      params: {
        searchUser: userData.user._id,
        p_id: id,
      },
    });
  };

  const checkoutHandler = () => {
    if (cartItems.length > 0) {
      userData.setorderItems(cartItems);
      history.replace('/delivery');
    }
  };
  return (
    <div>
      <main className='page'>
        <section className='shopping-cart dark container'>
          <div>
            <button onClick={() => history.push('/')} className=' back-arrow'>
              <ArrowBackIcon />
            </button>
          </div>

          <div>
            <div className='block-heading'>
              <h2>Shopping Cart</h2>
            </div>

            {cartItems.length === 0 ? (
              <h1>cart is empty</h1>
            ) : (
              <div className='row'>
                <div className='col-md-12 col-lg-8 c1'>
                  <div className='items'>
                    {cartItems.map((product) => (
                      <div className='product' key={product._id}>
                        <div className='row'>
                          <div className='col-md-3'>
                            <img
                              className='img-fluid mx-auto d-block image'
                              src={product.image}
                            />
                          </div>
                          <div className='col-md-8'>
                            <div className='info'>
                              <div className='row'>
                                <div className='col-md-5 product-name'>
                                  <div className='product-name'>
                                    <h3>{product.productName}</h3>
                                    <div className='product-info'>
                                      <div>
                                        Description:{' '}
                                        <span className='value'>
                                          {product.p_desc}
                                        </span>
                                      </div>
                                      <div>
                                        Category:{' '}
                                        <span className='value'>
                                          {product.p_category}
                                        </span>
                                      </div>
                                      <div>
                                        Seller:{' '}
                                        <span className='value'>
                                          {product.p_seller}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-4 quantity'>
                                  <div className='row'>
                                    <div className='col-md-auto'>
                                      <button
                                        className='minus'
                                        onClick={() => {
                                          const value = 'decrease';
                                          qtyUpdateHandler(product, value);
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                    <div className='col-md-auto'>
                                      <h5>{product.selectedQty}</h5>
                                    </div>
                                    <div className='col-md-auto'>
                                      <button
                                        className='plus'
                                        disabled={
                                          product.selectedQty >=
                                          product.p_quantity
                                            ? true
                                            : false
                                        }
                                        onClick={() => {
                                          const value = 'increase';
                                          qtyUpdateHandler(product, value);
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-3 price'>
                                  <span>₹{product.p_price.split('/')[0]}</span>
                                  <button
                                    className='delete-icon'
                                    onClick={() => deletefromCart(product._id)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div class='col-md-4 order-md-2 mb-4'>
                  <h4 class='d-flex justify-content-between align-items-center mb-3'>
                    <span class='text-muted'>Your cart</span>
                    <span class='badge badge-secondary badge-pill'>3</span>
                  </h4>
                  <ul class='list-group mb-3'>
                    {cartItems.map((product) => (
                      <li class='list-group-item d-flex justify-content-between lh-condensed'>
                        <div>
                          <h6 class='my-0'>{product.productName}</h6>
                          <small class='text-muted'>
                            Quantity: {product.selectedQty}
                          </small>
                        </div>
                        <span class='text-muted'>
                          ₹
                          {product.selectedQty *
                            Number(product.p_price.split('/')[0])}
                        </span>
                      </li>
                    ))}

                    <li class='list-group-item d-flex justify-content-between'>
                      <span>Total (INR)</span>
                      <strong>
                        ₹
                        {cartItems
                          .map((li) =>
                            Number(li.selectedQty * li.p_price.split('/')[0])
                          )
                          .reduce((sum, val) => sum + val, 0)}
                      </strong>
                    </li>
                  </ul>

                  <button
                    type='button'
                    className='btn btn-primary btn-lg btn-block'
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cart;
