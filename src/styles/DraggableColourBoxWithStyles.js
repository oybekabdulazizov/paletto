import styled from 'styled-components';

const DraggableColourBoxWithStyles = styled('div')(() => ({
  width: '20%',
  height: '25%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-7px',
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
