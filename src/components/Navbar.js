import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import '../css/Navbar.css';
import '../Screens/homepage.css';
import logo from '../images/gl.png';
import { LinkContainer } from 'react-router-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { DataContext } from '../customHooks/DataProvider';

function NavbarHome() {
  const userData = useContext(DataContext);
  console.log(userData);
  const history = useHistory();
  const loginHandler = () => {
    history.push('/login');
  };
  const SignUpHandler = () => {
    history.push('/signup');
  };

  const logoutHandler = () => {
    userData.setuser(null);
    axios.get('http://localhost:4000/user/logout', {
      withCredentials: true,
    });
  };
  return (
    <div>
      <header className='p-3 text-white'>
        <div>
          <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
            <img className='mb-4' src={logo} alt='' width='' height='70' />
            <ul className='nav col-12 col-lg-auto me-lg-auto mb- text-center justify-content-center mb-md-0'>
              <li>
                <Link className='navigate' to='/'>
                  <HomeIcon /> Home
                </Link>
              </li>
              <li>
                <Link className='navigate' to='/cart'>
                  <ShoppingCartIcon /> Cart
                </Link>
              </li>
              <li>
                <Link className='navigate' to='/about'>
                  <InfoIcon /> About
                </Link>
              </li>
              <li>
                <Link className='navigate' to='/favourites'>
                  <FavoriteIcon /> Favourite
                </Link>
              </li>
            </ul>
            <div className='text-end'>
              {userData.user ? (
                <div>
                  <h3 className='username'> Welcome {userData.user.name}</h3>
                  <button
                    onClick={logoutHandler}
                    className='btn btn-outline-light'
                  >
                    logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type='button'
                    className='btn btn-outline-light me-2'
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-light me-2'
                    onClick={SignUpHandler}
                  >
                    Sign-up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavbarHome;
