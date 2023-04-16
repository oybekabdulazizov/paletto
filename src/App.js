import React from 'react';
import Palette from './Palette';
import seedColours from './data/seedColours';
import { generatePalette } from './colourHelpers';

export default function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColours[4])} />
    </div>
  );
}
