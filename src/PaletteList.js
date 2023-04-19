import React from 'react';
import { Link } from 'react-router-dom';

export default function PaletteList({ seedPalette }) {
  return (
    <div>
      {seedPalette.map((palette) => (
        <p key={palette.id}>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </div>
  );
}
