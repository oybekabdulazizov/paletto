import React from 'react';

import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import usePaletteState from './hooks/usePaletteState';
import PaletteWithStyles from './styles/PaletteWithStyles';

export default function Palette({ palettes }) {
  const { changeFormat, changeLevel, format, level, palette } =
    usePaletteState(palettes);

  const colourBoxes = palette.colours[level].map((colour) => (
    <ColourBox
      background={colour[format]}
      name={colour.name}
      key={colour.id}
      colourId={colour.id}
      paletteId={palette.id}
      showFullPalette={true}
    />
  ));

  return (
    <PaletteWithStyles>
      <NavBar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showSlider={true}
      />
      <div className='Palette-colours'>{colourBoxes}</div>
      <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
    </PaletteWithStyles>
  );
}
