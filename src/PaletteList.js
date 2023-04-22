import React from 'react';
import styled from 'styled-components';

import MiniPalette from './MiniPalette';

const PaletteListContaier = styled('div')(() => ({
  backgroundColor: 'blue',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '& .container': {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  '& .nav': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
  '& .palettes': {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
}));

export default function PaletteList({ seedPalette }) {
  return (
    <PaletteListContaier>
      <div className='container'>
        <nav className='nav'>
          <h1 className='title'>Paletto Colours</h1>
        </nav>
        <div className='palettes'>
          {seedPalette.map((palette) => (
            <div key={palette.id}>
              <MiniPalette {...palette} />
            </div>
          ))}
        </div>
      </div>
    </PaletteListContaier>
  );
}
