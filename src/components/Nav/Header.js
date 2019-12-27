import React from 'react';
import { Link } from 'react-router-dom';
import ToggleBtn from './ToggleBtn';
import './Header.css';

function Header(props) {
  return (
    <header className='header'>
      <nav className='nav'>
        <div className='nav-toggle-btn'>
          <ToggleBtn click={props.drawerClickHandler} />
        </div>
        <div className='logo'>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <h3>YummY</h3>
          </Link>
        </div>
        <div className='spacer' />
        <ul className='nav-links'>
          <Link to={`${process.env.PUBLIC_URL}/login`}>
            <li>Admin</li>
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/contact`}>
            <li>Contact</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
