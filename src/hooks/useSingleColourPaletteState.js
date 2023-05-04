import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { generatePalette } from '../colourHelpers';

export default function useSingleColourPalette(palettes) {
  const { paletteId, colourId } = useParams();
  const palette = generatePalette(
    palettes.find((palette) => palette.id === paletteId)
  );

  const [format, setFormat] = useState('hex');

  function getShades() {
    let shades = [];
    let allColours = palette.colours;

    for (let key in allColours) {
      shades.push(
        allColours[key].filter((colour) => colour.id === colourId)[0]
      );
    }
    return shades.slice(1);
  }

  const changeFormat = (val) => setFormat(val);

  return { changeFormat, colourId, getShades, format, palette };
}
