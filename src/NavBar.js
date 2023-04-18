import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { MenuItem, Select } from '@mui/material';

import './NavBar.css';

export default function NavBar({ level, changeLevel, changeFormat }) {
  const [state, setState] = useState({ format: 'hex' });

  function handleChangeLevel(level) {
    changeLevel(level);
  }

  function handleChangeFormat(e) {
    setState((prevState) => ({ ...prevState, format: e.target.value }));
    changeFormat(e.target.value);
  }

  return (
    <nav className='NavBar'>
      <div className='logo'>
        <a href='#'>Paletto</a>
      </div>
      <div className='slider-container'>
        <span>Level: {level}</span>
        <div className='slider'>
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onChange={handleChangeLevel}
          />
        </div>
      </div>
      <div className='select-container'>
        <Select value={state.format} onChange={handleChangeFormat}>
          <MenuItem value='hex'>HEX </MenuItem>
          <MenuItem value='rgb'>RGB </MenuItem>
          <MenuItem value='rgba'>RGBA</MenuItem>
        </Select>
      </div>
    </nav>
  );
}
