import React from 'react';

import ColourBox from './ColourBox';

export default function Palette({ palette }) {
  const colourBoxes = palette.colours.map((c, id) => (
    <ColourBox bgColour={c.colour} key={id} />
  ));
  return (
    <div className='Palette'>
      <div className='Palette-colours'>{colourBoxes}</div>
    </div>
  );
}
