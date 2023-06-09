import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { IconButton, MenuItem, Select, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import useNavBarState from './hooks/useNavBarState';
import NavBarWithStyles from './styles/NavBarWithStyles';

export default function NavBar(props) {
  const { level, showSlider } = props;
  const {
    format,
    handleChangeFormat,
    handleChangeLevel,
    handleCloseSnackbar,
    snackbarOpen,
  } = useNavBarState(props);

  return (
    <NavBarWithStyles>
      <div className='logo'>
        <Link to='/'>Paletto</Link>
      </div>
      {showSlider && (
        <div className='slider-container'>
          <span>Level: [{level}]</span>
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
        <Select value={format} onChange={handleChangeFormat}>
          <MenuItem value='hex'>HEX</MenuItem>
          <MenuItem value='rgb'>RGB</MenuItem>
          <MenuItem value='rgba'>RGBA</MenuItem>
        </Select>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`Format changed to ${format.toUpperCase()}`}
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
