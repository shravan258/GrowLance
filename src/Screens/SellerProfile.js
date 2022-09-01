import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { DataContext } from '../customHooks/DataProvider';
import '../css/sellerprofile.css';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../images/gl.png';
require('dotenv').config();

const SellerProfile = () => {
  const [productList, setproductList] = useState(null);
  const [productName, setproductName] = useState('');
  const [p_desc, setp_desc] = useState('');
  const [p_category, setp_category] = useState('');
  const [p_quantity, setp_quantity] = useState('');
  const [p_price, setp_price] = useState('');
  const [p_seller, setp_seller] = useState('');
  const [image, setimage] = useState(null);

  console.log(process.env.REACT_APP_UPLOAD_KEY2);

  const userData = useContext(DataContext);
  const history = useHistory();

  const logoutHandler = () => {
    userData.setuser(null);
    history.push('/login');
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    formData.append(
      'upload_preset',
      process.env.REACT_APP_UPLOAD_IMAGE_SECRET_KEY
    );

    axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_UPLOAD_KEY2}/image/upload`,
      formData
    );

    formData.append('upload_preset', process.env.CLOUDINARY_CODE);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_USER_CODE}/image/upload`,
        formData
      )

      .then((result) => {
        setimage(result.data.url);
      });
  };

  const getProducts = async () => {
    await axios
      .get('http://localhost:4000/products', {
        params: {
          seller_id: userData.user._id,
        },
      })
      .then((result) => setproductList(result.data))
      .catch((err) => console.log(err));
  };

  // console.log(`../../Backend/${productList[0].image}`);

  useEffect(() => {
    let mounted = true;
    if (mounted && userData.user) {
      getProducts();
    }
    return () => (mounted = false);
  }, []);

  const addProductHandler = async (e) => {
    e.preventDefault();
    const productDetails = {
      seller_id: userData.user._id,
      productName,
      p_desc,
      p_category,
      p_quantity,
      p_price,
      p_seller: userData.user.bussName,
      image,
      seller_addr: userData.user.bussAddr,
    };
    console.log(productDetails);
    setproductList((prev) => [...prev, productDetails]);
    await axios
      .post('http://localhost:4000/products/newproduct', productDetails)
      .then((data) => console.log('data recieved back', data));
    setproductName('');
    setp_desc('');
    setp_category('');
    setp_price('');
    setp_seller('');
    setp_quantity('');
    setimage('');
  };

  return (
    <div>
      <div className='seller-navbar'>
        <img className='mb-4' src={logo} alt='' width='' height='70' />
        <h3 className='seller-name'>
          Welcome {userData ? userData.user.name : 'hello'}
        </h3>
        <button
          className='btn btn-outline-light seller-logout-btn'
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <h2 className='product-heading'>Add product</h2>
      <div classNameName='add-product-container'>
        <div className='container register-form modified'>
          <div className='form'>
            <div className='form-content'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Product Name *'
                      value={productName}
                      onChange={(e) => setproductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      id='product_description'
                      name='product_description'
                      placeholder='Product Description'
                      value={p_desc}
                      onChange={(e) => setp_desc(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Category *'
                      value={p_category}
                      onChange={(e) => setp_category(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Quantity *'
                      value={p_quantity}
                      onChange={(e) => setp_quantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Price *'
                      value={p_price}
                      onChange={(e) => setp_price(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Seller *'
                      value={p_seller}
                      onChange={(e) => setp_seller(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      id='filebutton'
                      name='filebutton'
                      className='input-file'
                      type='file'
                      onChange={uploadImage}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='btnSubmit'
                onClick={addProductHandler}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
      {userData.user === null ? (
        <h1>No products added</h1>
      ) : (
        <div className='search-result-container'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            {productList
              ? productList.map((product) => (
                  <div className='col' key={product._id}>
                    <div className='card '>
                      <img src={product.image} alt='' height='225' />
                      <title>{product.productName}</title>
                      <div className='card-body'>
                        <p className='card-text'>{product.p_desc}</p>
                        <p className='card-text'>
                          <h3>{product.p_price}</h3>
                        </p>
                        <p className='card-text'>{product.p_seller}</p>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div className='btn-group'>
                            <DeleteIcon fontSize='large' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
