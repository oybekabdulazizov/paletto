import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import seedPalette from './data/seedPalette';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';

export default function App() {
  const [state, setState] = useState({ palettes: seedPalette });

  const savePalette = (newPalette) => {
    setState((prevState) => ({
      ...prevState,
      palettes: [...state.palettes, newPalette],
    }));
  };

  return (
    <Routes>
      <Route
        exact
        path='/palette/new'
        element={
          <NewPaletteForm savePalette={savePalette} palettes={state.palettes} />
        }
      />
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
        element={<SingleColourPalette palettes={state.palettes} />}
      />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
