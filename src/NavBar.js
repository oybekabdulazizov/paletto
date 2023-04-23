import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { IconButton, MenuItem, Select, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

// import './NavBar.css';

const NavBarWithStyles = styled('div')(() => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-start',
  height: '6vh',
  '.logo': {
    marginRight: '1em',
    width: '5em',
    fontSize: '1.2em',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d6d6d6',
    a: {
      textDecoration: 'none',
    },
  },
  '.slider': {
    width: '20em',
    margin: '0 15px',
    display: 'inline-block',
    '& .rc-slider-track': {
      backgroundColor: 'transparent',
      outline: 'none',
    },
    '& .rc-slider-rail': {
      height: '8px',
      backgroundColor: 'lightgray',
    },
    '& .rc-slider-handle': {
      height: '1em',
      width: '1em',
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus':
      {
        backgroundColor: 'darkgreen',
        outline: 'none',
        border: '2px solid darkgreen',
        boxShadow: 'none',
      },
  },
  '.select-container': {
    marginLeft: 'auto',
    marginRight: '1em',
    '& .MuiSelect-select': {
      padding: '10px 32px 10px 14px',
    },
  },
}));

export default function NavBar({
  level,
  changeLevel,
  changeFormat,
  showSlider,
}) {
  const [state, setState] = useState({ format: 'hex' });

  function handleChangeLevel(level) {
    changeLevel(level);
  }

  function handleChangeFormat(e) {
    setState((prevState) => ({
      ...prevState,
      format: e.target.value,
      snackbarOpen: true,
    }));
    changeFormat(e.target.value);
  }

  function handleCloseSnackbar() {
    setState((prevState) => ({
      ...prevState,
      snackbarOpen: false,
    }));
  }

  return (
    <NavBarWithStyles>
      <div className='logo'>
        <Link to='/'>Paletto</Link>
      </div>
      {showSlider && (
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
      )}
      <div className='select-container'>
        <Select value={state.format} onChange={handleChangeFormat}>
          <MenuItem value='hex'>HEX</MenuItem>
          <MenuItem value='rgb'>RGB</MenuItem>
          <MenuItem value='rgba'>RGBA</MenuItem>
        </Select>
      </div>
      <Snackbar
        open={state.snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`Format changed to ${state.format.toUpperCase()}`}
        action={[
          <IconButton
            onClick={handleCloseSnackbar}
            color='inherit'
            aria-label='close-button'
          >
            <CloseIcon />
          </IconButton>,
        ]}
      ></Snackbar>
    </NavBarWithStyles>
  );
}
