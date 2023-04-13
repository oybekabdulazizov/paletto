import React from 'react';

export default function ColourBox({ bgColour }) {
  return (
    <div className='ColourBox' style={{ backgroundColor: bgColour }}>
      <span>MORE</span>
    </div>
  );
}
