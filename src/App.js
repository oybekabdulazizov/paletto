import React from 'react';
import Palette from './Palette';
import seedColours from './data/seedColours';
import { generatePalette } from './colourHelpers';

export default function App() {
  console.log(generatePalette(seedColours[4]));
  return (
    <div>
      <Palette palette={seedColours[4]} />
    </div>
  );
}
