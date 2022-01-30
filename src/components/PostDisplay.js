import React, { useContext, useEffect, useState } from 'react';
import '../css/postdisplay.css';
import image from '../images/PowerfulReasons_hero.jpg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useHistory } from 'react-router';
import displayProductList from '../data/DipslayProductsList';
import { DataContext } from '../customHooks/DataProvider';

const PostDisplay = () => {
  const Data = useContext(DataContext);
  const [favList, setfavList] = useState([]);

  const addToFavHandler = (productid) => {
    const item = displayProductList.filter(
      (product) => product.postid === productid
    );
    const [favProduct] = item;
    setfavList((prevList) => [...prevList, favProduct]);
  };

  useEffect(() => {
    Data.setfav(favList);
    console.log(favList);
  }, [favList]);

  return (
    <div className='container'>
      <div className='container'>
        <h1 className='display-6'>Exciting offer nearby you..</h1>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {displayProductList.map((product) => (
          <div className='col' key={product.postid}>
            <div className='card '>
              <img src={product.postImage} alt='' height='225' />
              <title>Placeholder</title>
              <div className='card-body'>
                <p className='card-text'>{product.postDesc}</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<FavoriteBorder fontSize='large' />}
                        checkedIcon={<Favorite fontSize='large' />}
                        name='checkedH'
                        onClick={() => {
                          addToFavHandler(product.postid);
                        }}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDisplay;
