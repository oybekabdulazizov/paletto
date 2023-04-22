import React from 'react';
import styled from 'styled-components';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '5px',
  border: '1px solid black',
  padding: '0.5em',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    cursor: 'pointer',
  },
  '& .colours': {
    backgroundColor: 'white',
    height: '140px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  '& .miniColour': {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto -4px auto',
    position: 'relative',
  },
  '& .title': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5em',
    fontSize: '1em',
    position: 'relative',
  },
  '& .emoji': {
    marginLeft: '0.5em',
    fontSize: '1.4em',
  },
}));

export default function MiniPalette({ paletteName, emoji, colours }) {
  const miniColourBoxes = colours.map((c) => (
    <div
      className='miniColour'
      style={{ backgroundColor: c.colour }}
      key={c.name}
    ></div>
  ));
  return (
    <Container>
      <div className='colours'>{miniColourBoxes}</div>
      <h5 className='title'>
        {paletteName} <span className='emoji'>{emoji}</span>
      </h5>
    </Container>
  );
}
