import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/card.css';
import image from '../images/PowerfulReasons_hero.jpg';

function Cards() {
  return (
    <div className='card-container'>
      <h1 className='container display-6'>
        Catergories which you might be looking for..
      </h1>
<<<<<<< HEAD
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>Plumber </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>Dairy stores </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>Hotels </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>School tutions </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>Vegetable mart </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>Ac repair </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>clothing </h3>
        </div>
      </div>
      <div className=' row cardii'>
        <div className='col-md-6'>
          <img src={image} alt='' className='card-image' />
        </div>
        <div className='col-md-6'>
          <h3 className='card_text'>stationary </h3>
        </div>
=======
      <div className='cardii'>
        <h3>Veggies</h3>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <h3>Dairy Products</h3>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <h3>Hotels</h3>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <h3>Chemists</h3>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <h3>Daily fresh</h3>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <h3>rice mill</h3>
        <img src={image} alt='' className='card-image' />
>>>>>>> 2d3158f4f829eff397054d651ce11fd344a51061
      </div>
    </div>
  );
}

export default Cards;
