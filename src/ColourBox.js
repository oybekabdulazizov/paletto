import React from 'react';

import './ColourBox.css';

export default function ColourBox({ bgColour }) {
  return (
    <div className='ColourBox' style={{ backgroundColor: bgColour }}>
      <span>MORE</span>
    </div>
  );
}
