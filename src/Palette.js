import React, { useState } from 'react';

import './Palette.css';

import ColourBox from './ColourBox';
import NavBar from './NavBar';

export default function Palette({ palette }) {
  const [state, setState] = useState({ level: 500, format: 'hex' });

  function changeLevel(level) {
    setState((prevState) => ({ ...prevState, level }));
  }

  function changeFormat(val) {
    setState((prevState) => ({ ...prevState, format: val }));
  }

  const colourBoxes = palette.colours[state.level].map((colour, id) => (
    <ColourBox background={colour[state.format]} name={colour.name} key={id} />
  ));

  return (
    <div className='Palette'>
      <NavBar
        level={state.level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
      />
      <div className='Palette-colours'>{colourBoxes}</div>
    </div>
  );
}
