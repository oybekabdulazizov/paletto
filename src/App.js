import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import seedPalette from './data/seedPalette';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';

export default function App() {
  const [palettes, setPalettes] = useState(
    JSON.parse(window.localStorage.getItem('palettes')) || seedPalette
  );

  const savePalette = (newPalette) => setPalettes([...palettes, newPalette]);

  const deletePalette = (id) =>
    setPalettes(palettes.filter((palette) => palette.id !== id));

  const syncPalette = useCallback(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }, [palettes]);

  useEffect(() => {
    syncPalette();
  }, [syncPalette]);

  return (
    <Routes>
      <Route
        exact
        path='/palette/new'
        element={
          <NewPaletteForm savePalette={savePalette} palettes={palettes} />
        }
      />
      <Route
        exact
        path='/'
        element={
          <PaletteList palettes={palettes} deletePalette={deletePalette} />
        }
      />
      <Route
        exact
        path='/palette/:id'
        element={<Palette palettes={palettes} />}
      />
      <Route
        exact
        path='/palette/:paletteId/:colourId'
        element={<SingleColourPalette palettes={palettes} />}
      />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
