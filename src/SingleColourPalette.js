import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { generatePalette } from './colourHelpers';
import ColourBox from './ColourBox';

export default function SingleColourPalette({ seedPalette }) {
  const { paletteId, colourId } = useParams();
  const palette = generatePalette(
    seedPalette.find((palette) => palette.id === paletteId)
  );
  if (!palette) {
    <Navigate to='/' replace={true} />;
  }

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

  console.log(collectShades(palette, colourId));

  const colourBoxes = collectedShades.map((shade) => (
    <ColourBox
      className=''
      background={shade.hex}
      name={shade.name}
      key={shade.name.toLowerCase().replace(/ /g, '-')}
      showLink={false}
    />
  ));

  return (
    <div className='Palette'>
      <h1>Single Colour Palette</h1>
      <div className='Palette-colours'>{colourBoxes}</div>
    </div>
  );
}
