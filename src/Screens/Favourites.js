import React, { useContext } from 'react';
import { DataContext } from '../customHooks/DataProvider';
import '../css/favourites.css';
import NavbarHome from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';

const Favourites = () => {
  const user = useContext(DataContext);
  const finalFav = user.fav;
  const deleteFavHandler = (id) => {
    user.setfav(finalFav.filter((product) => product.postid !== id));
  };

  return (
    <div>
      <NavbarHome />
      <div className='container'>
        <h1 className='display-4'>Your favourite posts...</h1>
      </div>
      <div className='fav-container row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {finalFav.length === 0 ? (
          <h1 className='container display-2 text-center text-muted'>
            <br />
            <h1 className='display-3 text-center text-muted'>😟</h1>
            nothing added in favorites
          </h1>
        ) : (
          finalFav.map((product) => (
            <div className='fav-card col ' key={product.postid}>
              <div className='card '>
                <img src={product.postImage} alt='' height='225' />
                <title>Placeholder</title>
                <div className='card-body'>
                  <p className='card-text'>{product.postDesc}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='btn-group'>
                      <button
                        type='button'
                        className='btn btn-lg btn-outline-secondary'
                      >
                        View
                      </button>
                    </div>

                    <DeleteIcon
                      fontSize='large'
                      onClick={() => deleteFavHandler(product.postid)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
