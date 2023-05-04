import styled from 'styled-components';
import chroma from 'chroma-js';

import sizes from './sizes';

const DraggableColourBoxWithStyles = styled('div')(
  ({ backgroundColour, transform, transition }) => ({
    backgroundColor: backgroundColour,
    width: '25%',
    height: '20.3%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-9px',
    transform,
    transition,
    [sizes.up('xl')]: {
      width: '25%',
      height: '20.1%',
    },
    [sizes.up('xxl')]: {
      width: '25%',
      height: '20.04%',
    },
    [sizes.down('lg')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
    },
    '.box-content': {
      position: 'absolute',
      width: '100%',
      left: '0px',
      bottom: '0px',
      padding: '6px 10px',
      letterSpacing: '1px',
      fontSize: '1em',
      display: 'flex',
      justifyContent: 'space-between',
      transition: 'all 0.2s ease-in-out',
      color:
        chroma(backgroundColour).luminance() <= 0.4
          ? 'rgba(255,255,255,0.7)'
          : 'rgba(0,0,0,0.7)',
    },
    '.delete-icon': {
      color:
        chroma(backgroundColour).luminance() <= 0.4
          ? 'rgba(255,255,255,0.7)'
          : 'rgba(0,0,0,0.7)',
      transform: 'scale(0.9)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
  })
);

export default DraggableColourBoxWithStyles;
