import React, { useState } from 'react';

import './Palette.css';

import ColourBox from './ColourBox';
import NavBar from './NavBar';

export default function Palette({ palette }) {
  const [state, setState] = useState({ level: 500 });
  function changeLevel(level) {
    setState((prevState) => ({
      ...prevState,
      level,
    }));
  }

  const colourBoxes = palette.colours[state.level].map((colour, id) => (
    <ColourBox background={colour.hex} name={colour.name} key={id} />
  ));

  return (
    <div className='Palette'>
      <NavBar level={state.level} changeLevel={changeLevel} />
      <div className='Palette-colours'>{colourBoxes}</div>
    </div>
  );
}
