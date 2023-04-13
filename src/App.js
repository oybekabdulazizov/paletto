import React from 'react';
import Palette from './Palette';
import seedColours from './data/seedColours';

export default function App() {
  return (
    <div>
      <Palette palette={seedColours[4]} />
    </div>
  );
}
