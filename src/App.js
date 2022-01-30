import HomePage from './Screens/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import BussinessReg from './Screens/BussinessReg';
import SellerProfile from './Screens/SellerProfile';
import ServiceProviderProfile from './Screens/ServiceProviderProfile';
import Favourites from './Screens/Favourites';
import AboutUs from './Screens/Aboutus';
import LoginBuss from './components/LoginBuss';
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { DataContext } from './customHooks/DataProvider';
import Cart from './Screens/Cart';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import DelieveryInfo from './Screens/DelieveryInfo';
import PaymentForm from './Screens/PaymentForm';
import StripeContainer from './components/StripeContainer';
import OrderSuccess from './Screens/OrderSuccess';
function App() {
  const userData = useContext(DataContext);
  const getUser = async () => {
    const res = await axios.get('http://localhost:4000/user', {
      withCredentials: true,
    });
    console.log(res);
    const user = res.data;
    if (user) userData.setuser(user.user);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUser();
    }
    return () => (mounted = false);
  }, []);
  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        onClose={() => userData.snackBarClose}
      >
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/bussinessReg' component={BussinessReg} />
            <Route exact path='/seller' component={SellerProfile} />
            <Route
              exact
              path='/serviceProvider'
              component={ServiceProviderProfile}
            />
            <Route exact path='/loginBuss' component={LoginBuss} />
            <Route exact path='/favourites' component={Favourites} />
            <Route exact path='/about' component={AboutUs} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/delivery' component={DelieveryInfo} />
            <Route exact path='/payments' component={StripeContainer} />
            <Route exact path='/ordersuccess' component={OrderSuccess} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
