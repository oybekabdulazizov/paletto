import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { generatePalette } from './colourHelpers';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import PaletteWithStyles from './styles/PaletteWithStyles';

export default function Palette({ palettes }) {
  const { id } = useParams();
  const palette = generatePalette(
    palettes.find((palette) => palette.id === id)
  );
  if (!palette) {
    <Navigate to='/' replace={true} />;
  }

  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const changeLevel = (lvl) => setLevel(lvl);

  const changeFormat = (fmt) => setFormat(fmt);

  const colourBoxes = palette.colours[level].map((colour) => (
    <ColourBox
      background={colour[format]}
      name={colour.name}
      key={colour.id}
      colourId={colour.id}
      paletteId={id}
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
