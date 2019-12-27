import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClass = 'side-drawer';
  if (props.show) {
    drawerClass = 'side-drawer open';
  }

  return (
    <nav className={drawerClass}>
      <div className='close-btn' onClick={props.click}>
        <div className='close-btn-line one' />
        <div className='close-btn-line two' />
      </div>
      <ul>
        <Link to={`${process.env.PUBLIC_URL}/login`}>
          <li>Admin</li>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/contact`}>
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  );
};

export default sideDrawer;
