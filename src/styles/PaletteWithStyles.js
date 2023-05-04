import styled from 'styled-components';

import sizes from './sizes';

export default styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '.Palette-colours': {
    height: '90%',
  },
  '.go-back': {
    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    backgroundColor: 'black',
    a: {
      border: 'none',
      outline: 'none',
      fontSize: '1em',
      display: 'inline-block',
      width: '100px',
      height: '30px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-15px',
      marginLeft: '-50px',
      textAlign: 'center',
      lineHeight: '30px',
      cursor: 'pointer',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: '0.4s ease',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: 'rgba(255,255,255,0.7)',
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '33.33333%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '20%',
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '10%',
    },
  },
}));
