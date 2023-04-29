import styled from 'styled-components';

import sizes from './sizes';

const DraggableColourBoxWithStyles = styled('div')(() => ({
  width: '25%',
  height: '20%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-7px',
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
    color: 'rgba(0,0,0,0.5)',
  },
  '.delete-icon': {
    transform: 'scale(0.9)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.3)',
    },
  },
}));

export default DraggableColourBoxWithStyles;
