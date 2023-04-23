import styled from 'styled-components';

export default styled('div')(() => ({
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
