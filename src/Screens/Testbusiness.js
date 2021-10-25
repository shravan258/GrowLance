import React, { useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../images/gl.png';
import bgrow from '../images/bgrow.jpg';

const Testbusiness = () => {
  const [category, setcategory] = useState('Bussiness-category');
  const handleChange = (event) => {
    setcategory(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
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
                  required=''
                  autoFocus=''
                />

                <input
                  type='password'
                  id='inputPassword'
                  className='form-control'
                  placeholder='Password'
                  required
                />
                <input
                  type='password'
                  id='confirmPassword'
                  className='form-control'
                  placeholder='Confirm Password'
                  required
                />
                <select
                  class='form-control form-select'
                  aria-label='Default select example'
                  value={category}
                  onChange={handleChange}
                >
                  <option value='Bussiness-Category'>Bussiness Category</option>
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
                />
                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='Bussiness Type'
                  required
                  autoFocus=''
                />
                <input
                  type='name'
                  id='inputName'
                  className='form-control'
                  placeholder='City Name'
                  required
                  autoFocus=''
                />

                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  placeholder='Bussiness address'
                ></textarea>
                <div className='checkbox mb-3'></div>

                <button
                  className='btn btn-lg btn-primary btn-block'
                  type='submit'
                  onClick={handleSubmit}
                  // onClick={() => history.push('/')}
                >
                  Sign in
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testbusiness;
