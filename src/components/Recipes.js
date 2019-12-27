import React from 'react';
import { Link } from 'react-router-dom';
import tmb1 from '../tmb/tmb-sweet.jpg';
import tmb2 from '../tmb/tmb-savory.jpg';
import tmb3 from '../tmb/tmb-salad.jpg';
import tmb4 from '../tmb/tmb-cocktail.jpg';

function Recipes() {
  const h3 = {
    fontSize: '1.1rem',
    color: '#646464',
    fontWeight: '600',
    paddingBottom: '0.5rem'
  };

  return (
    <div className='posts' style={{ marginTop: '1rem' }}>
      <div className='post category'>
        <Link to={`${process.env.PUBLIC_URL}/sweet`}>
          <h3 style={h3}>SWEET</h3>
          <img src={tmb1} alt='sweet' />
        </Link>
      </div>
      <div className='post category'>
        <Link to={`${process.env.PUBLIC_URL}/savory`}>
          <h3 style={h3}>SAVORY</h3>
          <img src={tmb2} alt='savory' />
        </Link>
      </div>
      <div className='post category'>
        <Link to={`${process.env.PUBLIC_URL}/salad`}>
          <h3 style={h3}>SALADS</h3>
          <img src={tmb3} alt='salads' />
        </Link>
      </div>
      <div className='post category'>
        <Link to={`${process.env.PUBLIC_URL}/cocktail`}>
          <h3 style={h3}>COCKTAILS</h3>
          <img src={tmb4} alt='cocktails' />
        </Link>
      </div>
    </div>
  );
}

export default Recipes;
