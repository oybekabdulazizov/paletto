import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './NavBar.css';

export default function NavBar({ level, changeLevel }) {
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
            onChange={changeLevel}
          />
        </div>
      </div>
    </nav>
  );
}
