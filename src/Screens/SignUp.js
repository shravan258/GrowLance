import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/signup.css';
import logo from '../images/gl.png';
import Grow_image from '../images/webshop.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import { IconButton } from '@mui/material';
import { DataContext } from '../customHooks/DataProvider';
import { useSnackbar } from 'notistack';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const history = useHistory();

  const Data = useContext(DataContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confPass) {
      enqueueSnackbar('Password does not match', {
        variant: 'error',
      });
      history.push('/signup');
    } else if (location === '') {
      enqueueSnackbar('location should not be empty', {
        variant: 'warning',
      });
      history.push('/signup');
    } else if (name === '') {
      enqueueSnackbar('name should not be empty', {
        variant: 'warning',
      });
      history.push('/signup');
    } else if (email === '') {
      enqueueSnackbar('email should not be empty', {
        variant: 'warning',
      });
      history.push('/signup');
    } else {
      const userDetails = {
        name: name,
        email: email,
        location: location,
        password: password,
      };

      await axios
        .post('http://localhost:4000/user/register', userDetails)
        .then((result) => {
          if (result.data === 'User already exist.') {
            enqueueSnackbar('User already exist', {
              variant: 'error',
            });
            history.push('/signup');
          } else {
            history.push('/login');
          }
        });
      setName('');
      setEmail('');
      setLocation('');
      setPassword('');
    }
  };
  return (
    <div>
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
                src={Grow_image}
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
                  height='80'
                />
                <h1 className='h3 mb-3 display-7'>Please Sign Up</h1>

                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='Name'
                  required
                  autoFocus=''
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  type='email'
                  id='inputEmail'
                  className='form-control'
                  placeholder='Email address'
                  required
                  autoFocus=''
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type='name'
                  id='locName'
                  className='form-control'
                  placeholder='location'
                  required
                  autoFocus=''
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />

                <input
                  type='password'
                  id='inputPassword'
                  className='form-control'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <input
                  type='password'
                  id='confirmPassword'
                  className='form-control'
                  placeholder='Confirm Password'
                  required
                  value={confPass}
                  onChange={(event) => setConfPass(event.target.value)}
                />
                <div className='checkbox mb-3'>
                  <label>
                    <input type='checkbox' value='remember-me' /> Remember me
                  </label>
                </div>
                <button
                  className='btn btn-lg btn-primary btn-block'
                  type='submit'
                  onClick={submitHandler}
                >
                  Sign in
                </button>
                <br />
                <button
                  className='bussiness-growlance-btn btn btn-lg btn-primary btn-block '
                  type='submit'
                  onClick={() => history.push('/bussinessReg')}
                >
                  Business with GrowLance
                </button>
                <br />
                <Link to='/login'>Already registered? login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
