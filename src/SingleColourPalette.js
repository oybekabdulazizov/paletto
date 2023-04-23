import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { generatePalette } from './colourHelpers';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import styled from 'styled-components';

const SingleColourPaletteContainer = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '.Palette-colours': {
    height: '90%',
  },
  '.go-back': {
    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    position: 'relative',
    backgroundColor: 'black',
    '& a': {
      border: 'none',
      outline: 'none',
      fontSize: '1em',
      display: 'inline-block',
      width: '100px',
      height: '30px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-15px',
      marginLeft: '-50px',
      textAlign: 'center',
      lineHeight: '30px',
      cursor: 'pointer',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: '0.4s ease',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: 'white',
    },
  },
}));

export default function SingleColourPalette({ seedPalette }) {
  const [state, setState] = useState({ format: 'hex' });

  const { paletteId, colourId } = useParams();
  const palette = generatePalette(
    seedPalette.find((palette) => palette.id === paletteId)
  );
  if (!palette) {
    <Navigate to='/' replace={true} />;
  }

  function collectShades(palette, colourId) {
    let shades = [];
    let allColours = palette.colours;

    for (let key in allColours) {
      shades.push(
        allColours[key].filter((colour) => colour.id === colourId)[0]
      );
    }
    return shades.slice(1);
  }
  const collectedShades = collectShades(palette, colourId);

  function changeFormat(val) {
    setState((prevState) => ({ ...prevState, format: val }));
  }

  const colourBoxes = collectedShades.map((shade) => (
    <ColourBox
      background={shade[state.format]}
      name={shade.name}
      key={shade.name.toLowerCase().replace(/ /g, '-')}
      showLink={false}
    />
  ));

  return (
    <SingleColourPaletteContainer>
      <NavBar showSlider={false} changeFormat={changeFormat} />
      <div className='Palette-colours'>
        {colourBoxes}
        <div className='go-back'>
          <Link to={`/palette/${paletteId}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
    </SingleColourPaletteContainer>
  );
}
