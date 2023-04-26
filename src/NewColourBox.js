import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from 'chroma-js';

const NewColourBoxWithStyles = styled('div')(() => ({
  width: '20%',
  height: '25%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-7px',
  transition: 'all 0.2s ease-in-out',
  '&:hover .box-content': {
    color: 'white',
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

export default function NewColourBox({ id, name, background, deleteColour }) {
  const handleDeleteColour = () => {
    deleteColour(id);
  };
  const textColour =
    chroma(background).luminance() <= 0.4
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(0,0,0,0.7)';

  return (
    <NewColourBoxWithStyles style={{ background }}>
      <div className='box-content'>
        <span style={{ color: textColour }}>{name}</span>
        <DeleteIcon
          className='delete-icon'
          style={{ color: textColour }}
          onClick={handleDeleteColour}
        />
      </div>
    </NewColourBoxWithStyles>
  );
}
