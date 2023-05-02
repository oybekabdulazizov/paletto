import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import seedPalette from './data/seedPalette';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';

import './styles/App.css';

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
    <div className='App'>
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
                <section className='page' style={{ position: 'fixed' }}>
                  <NewPaletteForm
                    savePalette={savePalette}
                    palettes={palettes}
                  />
                </section>
              }
            />
            <Route
              exact
              path='/'
              element={
                <section className='page'>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </section>
              }
            />
            <Route
              exact
              path='/palette/:id'
              element={
                <section className='page' style={{ position: 'fixed' }}>
                  <Palette palettes={palettes} />
                </section>
              }
            />
            <Route
              exact
              path='/palette/:paletteId/:colourId'
              element={
                <section className='page' style={{ position: 'fixed' }}>
                  <SingleColourPalette palettes={palettes} />
                </section>
              }
            />
            <Route
              path='/*'
              element={
                <section className='page'>
                  <Navigate to='/' replace />
                </section>
              }
            />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
