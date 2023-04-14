import React from 'react';

import './ColourBox.css';

export default function ColourBox({ background, name }) {
  return (
    <div className='ColourBox' style={{ background }}>
      <button className='copy-btn'>Copy</button>
      <div className='box-content'>
        <span>{name}</span>
        <button className='btn-more'>More</button>
      </div>
    </div>
  );
}
