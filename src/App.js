import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import seedPalette from './data/seedPalette';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColourPalette from './SingleColourPalette';

export default function App() {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<PaletteList seedPalette={seedPalette} />}
      />
      <Route
        exact
        path='/palette/:id'
        element={<Palette seedPalette={seedPalette} />}
      />
      <Route
        exact
        path='/palette/:paletteId/:colourId'
        element={<SingleColourPalette seedPalette={seedPalette} />}
      />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
