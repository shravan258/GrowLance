import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../images/gl.png';
import Grow_logo from '../images/webstore.jpg';
import axios from 'axios';
import { DataContext } from '../customHooks/DataProvider';

function LoginBuss() {
  const history = useHistory();
  const userData = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const userdetails = {
      email: email,
      password: password,
    };

    await axios
      .post('http://localhost:4000/seller/login', userdetails)
      .then((result) => {
        console.log(result.data);
        userData.setuser(result.data);
      })
      .catch((err) => console.log(err));
    history.push('/');
    setEmail('');
    setPassword('');
  };

  return (
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

              <input
                type='password'
                id='inputPassword'
                className='form-control'
                placeholder='password'
                name='password'
                required
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

export default LoginBuss;
