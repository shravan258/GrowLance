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
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <img src={image} alt='' className='card-image' />
      </div>
      <div className='cardii'>
        <img src={image} alt='' className='card-image' />
      </div>
    </div>
  );
}

export default Cards;
