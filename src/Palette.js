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

  const [state, setState] = useState({ level: 500, format: 'hex' });

  function changeLevel(level) {
    setState((prevState) => ({ ...prevState, level }));
  }

  function changeFormat(val) {
    setState((prevState) => ({ ...prevState, format: val }));
  }

  const colourBoxes = palette.colours[state.level].map((colour) => (
    <ColourBox
      background={colour[state.format]}
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
        level={state.level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showSlider={true}
      />
      <div className='Palette-colours'>{colourBoxes}</div>
      <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
    </PaletteWithStyles>
  );
}
