import React from 'react';
import { Link } from 'react-router-dom';

import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import useSingleColourPalette from './hooks/useSingleColourPaletteState';
import PaletteWithStyles from './styles/PaletteWithStyles';

export default function SingleColourPalette({ palettes }) {
  const { changeFormat, getShades, format, palette } =
    useSingleColourPalette(palettes);

  const colourBoxes = getShades().map((shade) => (
    <ColourBox
      background={shade[format]}
      name={shade.name}
      key={shade.name.toLowerCase().replace(/ /g, '-')}
      showFullPalette={false}
    />
  ));

  return (
    <PaletteWithStyles>
      <NavBar showSlider={false} changeFormat={changeFormat} />
      <div className='Palette-colours'>
        {colourBoxes}
        <div className='go-back'>
          <Link to={`/palette/${palette.id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
    </PaletteWithStyles>
  );
}
