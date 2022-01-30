import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import logo from '../images/gl.png';
import bgrow from '../images/bgrow.jpg';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function BussinessReg() {
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confpass, setconfpass] = useState();
  const [bussName, setbussName] = useState('');
  const [bussType, setbussType] = useState('');
  const [bussAddr, setbussAddr] = useState('');
  const [city, setcity] = useState('');
  const [category, setcategory] = useState('none');
  const handleChange = (event) => {
    setcategory(event.target.value);
  };
  const handleSubmit = (e) => {
    if (name === '') {
      enqueueSnackbar('name should not be empty', {
        variant: 'warning',
      });
    }
    if (email === '') {
      enqueueSnackbar('email should not be empty', {
        variant: 'warning',
      });
    } else {
      e.preventDefault();
      const sellerDetails = {
        name,
        email,
        password,
        category,
        bussAddr,
        bussName,
        bussType,
        city,
      };

      axios.post('http://localhost:4000/seller/register', sellerDetails);
      history.push('/login');
    }
  };
  return (
    <div>
      <button onClick={() => history.push('/')}>go back</button>
      <div className='form-container'>
        <div
          className='text-center'
          data-new-gr-c-s-check-loaded='14.1029.0'
          data-gr-ext-installed=''
        >
          <div className='row'>
            <div className='col-md-6'>
              <img
                className='Signup_image'
                src={bgrow}
                width='100%'
                height='100%'
                alt=''
              />
            </div>
            <div className='col-md-6'>
              <form className='form-signin'>
                <img
                  className='mb-4 rounded-pill'
                  src={logo}
                  alt=''
                  width='80%'
                  height='55'
                />
                <h1 className='h3 mb-3 display-7'>Please Register </h1>

                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='Name'
                  required
                  autoFocus=''
                  value={name}
                  onChange={(event) => setname(event.target.value)}
                />
                <input
                  type='email'
                  id='inputName'
                  className='form-control'
                  placeholder='Email'
                  required=''
                  autoFocus=''
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                />

                <input
                  type='password'
                  id='inputPassword'
                  className='form-control'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(event) => setpassword(event.target.value)}
                />
                <input
                  type='password'
                  id='confirmPassword'
                  className='form-control'
                  placeholder='Confirm Password'
                  required
                  value={confpass}
                  onChange={(event) => setconfpass(event.target.value)}
                />
                <select
                  class='form-control form-select'
                  aria-label='Default select example'
                  value={category}
                  onChange={handleChange}
                >
                  <option value='none'>Bussiness Category</option>
                  <option value='seller'>Seller</option>
                  <option value='service-provider'>Service Provider</option>
                </select>
                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='Bussiness Name'
                  required=''
                  autoFocus=''
                  value={bussName}
                  onChange={(event) => setbussName(event.target.value)}
                />
                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='Bussiness Type'
                  required
                  autoFocus=''
                  value={bussType}
                  onChange={(event) => setbussType(event.target.value)}
                />
                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='City Name'
                  required
                  autoFocus=''
                  value={city}
                  onChange={(event) => setcity(event.target.value)}
                />

                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  placeholder='Bussiness address'
                  value={bussAddr}
                  onChange={(event) => setbussAddr(event.target.value)}
                ></textarea>
                <div className='checkbox mb-3'></div>

                <button
                  className='btn btn-lg btn-primary btn-block'
                  type='submit'
                  onClick={handleSubmit}
                  // onClick={() => history.push('/')}
                >
                  Sign up
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BussinessReg;
