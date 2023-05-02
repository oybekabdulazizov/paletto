import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import seedPalette from './data/seedPalette';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

export default function App() {
  const [palettes, setPalettes] = useState(
    JSON.parse(window.localStorage.getItem('palettes')) || seedPalette
  );

  const location = useLocation();

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
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        classNames='page'
        timeout={300}
        unmountOnExit
      >
        <Routes location={location}>
          <Route
            exact
            path='/palette/new'
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            exact
            path='/'
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            exact
            path='/palette/:id'
            element={
              <Page>
                <Palette palettes={palettes} />
              </Page>
            }
          />
          <Route
            exact
            path='/palette/:paletteId/:colourId'
            element={
              <Page>
                <SingleColourPalette palettes={palettes} />
              </Page>
            }
          />
          <Route
            path='/*'
            element={
              <Page>
                <Navigate to='/' replace />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}
