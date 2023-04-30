import React from 'react';
import { Link } from 'react-router-dom';

import MiniPalette from './MiniPalette';
import PaletteListWithStyles from './styles/PaletteListWithStyles';

export default function PaletteList({ palettes, deletePalette }) {
  return (
    <PaletteListWithStyles>
      <div className='container'>
        <nav className='nav'>
          <h1 className='nav-title'>Paletto Colours</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
        <div className='palettes'>
          {palettes.map((palette) => (
            <div key={palette.id}>
              <MiniPalette {...palette} deletePalette={deletePalette} />
            </div>
          ))}
        </div>
      </div>
    </PaletteListWithStyles>
  );
}
