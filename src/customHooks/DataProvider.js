import React, { createContext, useState } from 'react';

export const DataContext = createContext();
const useFav = () => {
  const [fav, setfav] = useState([]);
  const [user, setuser] = useState(null);
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackMessage, setsnackMessage] = useState('');
  const [orderItems, setorderItems] = useState([]);
  const [finalOrder, setfinalOrder] = useState({});

  const snackBarClose = () => {
    setsnackbarOpen(false);
  };

  return {
    fav,
    setfav,
    user,
    setuser,
    snackbarOpen,
    snackMessage,
    snackBarClose,
    orderItems,
    setorderItems,
    finalOrder,
    setfinalOrder,
  };
};
export const DataProvider = ({ children }) => {
  const favs = useFav();
  return <DataContext.Provider value={favs}>{children}</DataContext.Provider>;
};
