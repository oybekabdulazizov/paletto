import React from 'react';

import MiniPalette from './MiniPalette';
import PaletteListWithStyles from './styles/PaletteListWithStyles';

export default function PaletteList({ seedPalette }) {
  return (
    <PaletteListWithStyles>
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
    </PaletteListWithStyles>
  );
}
