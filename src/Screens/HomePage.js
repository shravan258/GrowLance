import React, { useContext, useEffect, useState } from 'react';
import Cards from '../components/Cards';
import NavbarHome from '../components/Navbar';
import { useHistory } from 'react-router';
import '../Screens/homepage.css';
import head_logo from '../images/logo.png';
import PostDisplay from '../components/PostDisplay';
import { DataContext } from '../customHooks/DataProvider';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

function HomePage() {
  const [searchTerm, setsearchTerm] = useState('');
  const [searchResults, setsearchResults] = useState([]);
  const [cartitems, setcartitems] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const userData = useContext(DataContext);

  const getSearchedProducts = async (e) => {
    e.preventDefault();
    await axios
      .get('http://localhost:4000/products/search', {
        params: {
          searchValue: searchTerm,
        },
      })
      .then((result) => {
        setsearchResults(result.data);
      })
      .catch((err) => console.log(err));

    setsearchTerm('');
  };
  console.log(searchResults);

  const history = useHistory();
  const addToCartHandler = async (productdetails) => {
    if (userData.user) {
      const cartProduct = {
        ...productdetails,
        userdetails: userData.user._id,
        productId: productdetails._id,
      };
      await axios
        .post('http://localhost:4000/addtoCart/newCartItem', cartProduct)
        .then((result) => {
          const message = result.data;
          enqueueSnackbar(message, {
            variant: 'info',
          });
        });
    } else {
      history.push('/login');
    }
  };
  return (
    <div className='main'>
      <NavbarHome />
      <div className='web-heading'>
        <div className='text'>
          <div className='text__primary'>welcome to GrowLance</div>
          <div className='text__subtext'>
            search for various services and products nearby!
          </div>
          <div className='search-container'>
            <form>
              <input
                type='search'
                className='form-control form-control-dark w-50'
                placeholder='Search...'
                aria-label='Search'
                name='search'
                value={searchTerm}
                onChange={(event) => setsearchTerm(event.target.value)}
              />
              <button
                type='button'
                for='search'
                className='btn btn-outline-light me-2'
                onClick={getSearchedProducts}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {searchResults.length === 0 ? (
        <div>
          <Cards />
          <PostDisplay />
        </div>
      ) : (
        <>
          <div>
            <button
              className='close-button'
              onClick={() => setsearchResults([])}
            >
              <CloseIcon />
            </button>
          </div>
          <div className='search-result-container'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
              {searchResults.map((product) => (
                <div className='col' key={product._id}>
                  <div className='card '>
                    <img src={product.image} alt='' height='225' />
                    <title>{product.productName}</title>
                    <div className='card-body'>
                      <p className='card-text'>{product.p_desc}</p>
                      <p className='card-text'>{product.p_price}</p>
                      <p className='card-text'>
                        <h5>{product.p_seller}</h5>
                      </p>
                      <p className='card-text'>{product.seller_addr}</p>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='btn-group'>
                          <button
                            type='button'
                            className='btn btn-lg btn-outline-secondary'
                          >
                            View
                          </button>
                        </div>
                        <div className='btn-group'>
                          <button
                            type='button'
                            className='btn btn-lg btn-outline-secondary'
                            onClick={() => addToCartHandler(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
