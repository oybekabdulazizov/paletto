import React from 'react';

import './Palette.css';

import ColourBox from './ColourBox';

export default function Palette({ palette }) {
  const colourBoxes = palette.colours.map((c, id) => (
    <ColourBox background={c.colour} name={c.name} key={id} />
  ));
  return (
    <div className='Palette'>
      <div className='Palette-colours'>{colourBoxes}</div>
    </div>
  );
}
