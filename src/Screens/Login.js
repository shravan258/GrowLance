import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../images/gl.png';
import Grow_logo from '../images/webstore.jpg';
import axios from 'axios';
import { DataContext } from '../customHooks/DataProvider';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../css/login.css';

function Login() {
  const history = useHistory();
  const userData = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('none');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (userData.user) {
  //     history.replace('/');
  //   }
  // }, [userData.user]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password === '') {
      enqueueSnackbar('passowrd cannot be empty', {
        variant: 'error',
      });
      history.push('/login');
    } else if (email === '') {
      enqueueSnackbar('email cannot be empty', {
        variant: 'error',
      });
      history.push('/login');
    } else if (role === 'none') {
      enqueueSnackbar('please select role', {
        variant: 'error',
      });
      history.push('/login');
    } else {
      const userdetails = {
        email: email,
        password: password,
        role: role,
      };

      if (userdetails.role === 'user') {
        await axios
          .post('http://localhost:4000/user/login', userdetails, {
            withCredentials: true,
          })
          .then((result) => {
            console.log(result.data);
            if (result.data === 'No User Exists') {
              enqueueSnackbar('No User Exists', {
                variant: 'error',
              });
              history.push('/login');
            } else {
              userData.setuser(result.data);
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      } else if (userdetails.role === 'seller') {
        await axios
          .post('http://localhost:4000/seller/login', userdetails)
          .then((result) => {
            console.log(result);
            if (result.data === 'No seller exists') {
              enqueueSnackbar('No Seller Exists', {
                variant: 'error',
              });
              history.push('/login');
            } else {
              if (result.data === 'password does not match') {
                enqueueSnackbar('Wrong password', {
                  variant: 'error',
                });
                history.push('/login');
              } else {
                userData.setuser(result.data);
                history.push('/seller');
              }
            }
          })
          .catch((err) => console.log(err));
      }

      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='form-container'>
      <button onClick={() => history.push('/')} className='back-arrow'>
        <ArrowBackIcon />
      </button>
      <div
        className='text-center'
        data-new-gr-c-s-check-loaded='14.1029.0'
        data-gr-ext-installed=''
      >
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='Signup_image'
              src={Grow_logo}
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
              <h1 className='h3 mb-3 display-7'>Sign in</h1>

              <input
                type='email'
                id='inputName'
                className='form-control'
                placeholder='email'
                required
                autoFocus=''
                name='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <select
                name='role'
                class='form-control form-select'
                aria-label='Default select example'
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value='none'>Role</option>
                <option value='seller'>Seller</option>
                <option value='user'>user</option>
              </select>

              <input
                type='password'
                id='inputPassword'
                className='form-control'
                placeholder='password'
                name='password'
                required='true'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
