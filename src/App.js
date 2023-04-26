import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import seedPalette from './data/seedPalette';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';

export default function App() {
  const [state, setState] = useState({ palettes: seedPalette });

  return (
    <Routes>
      <Route exact path='/palette/new' element={<NewPaletteForm />} />
      <Route
        exact
        path='/'
        element={<PaletteList palettes={state.palettes} />}
      />
      <Route
        exact
        path='/palette/:id'
        element={<Palette palettes={state.palettes} />}
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
