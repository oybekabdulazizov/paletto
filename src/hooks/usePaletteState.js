import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { generatePalette } from '../colourHelpers';

export default function usePaletteState(palettes) {
  const { id } = useParams();
  const palette = generatePalette(
    palettes.find((palette) => palette.id === id)
  );

  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const changeLevel = (lvl) => setLevel(lvl);

  const changeFormat = (fmt) => setFormat(fmt);

  return { changeFormat, changeLevel, format, level, palette };
}
