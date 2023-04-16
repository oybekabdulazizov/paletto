import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Palette.css';

import ColourBox from './ColourBox';

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
      <div className='slider-wrapper'>
        <Slider
          defaultValue={state.level}
          min={100}
          max={900}
          step={100}
          onChange={changeLevel}
        />
      </div>
      <div className='Palette-colours'>{colourBoxes}</div>
    </div>
  );
}
