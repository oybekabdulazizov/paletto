import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { generatePalette } from './colourHelpers';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import PaletteWithStyles from './styles/PaletteWithStyles';

export default function SingleColourPalette({ palettes }) {
  const { paletteId, colourId } = useParams();
  const palette = generatePalette(
    palettes.find((palette) => palette.id === paletteId)
  );
  if (!palette) {
    <Navigate to='/' replace={true} />;
  }

  const [format, setFormat] = useState('hex');

  function collectShades(palette, colourId) {
    let shades = [];
    let allColours = palette.colours;

    for (let key in allColours) {
      shades.push(
        allColours[key].filter((colour) => colour.id === colourId)[0]
      );
    }
    return shades.slice(1);
  }
  const collectedShades = collectShades(palette, colourId);

  const changeFormat = (val) => setFormat(val);

  const colourBoxes = collectedShades.map((shade) => (
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
          <Link to={`/palette/${paletteId}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
    </PaletteWithStyles>
  );
}
