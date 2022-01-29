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
      </div>
    </div>
  );
}

export default Cards;
