import React from 'react';
import { Link } from 'react-router-dom';

import MiniPalette from './MiniPalette';
import PaletteListWithStyles from './styles/PaletteListWithStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function PaletteList({ palettes, deletePalette }) {
  return (
    <PaletteListWithStyles>
      <div className='container'>
        <nav className='nav'>
          <h1 className='nav-title'>Paletto Colours</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
        <TransitionGroup className='palettes'>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames='fade' timeout={400}>
              <MiniPalette {...palette} deletePalette={deletePalette} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </PaletteListWithStyles>
  );
}
