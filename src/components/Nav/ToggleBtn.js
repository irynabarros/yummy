import React from 'react';
import './ToggleBtn.css';

const ToggleBtn = props => (
  <button className='toggle-btn' onClick={props.click}>
    <div className='btn-line' />
    <div className='btn-line' />
    <div className='btn-line' />
  </button>
);

export default ToggleBtn;
