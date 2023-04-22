import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import './ColourBox.css';
import chroma from 'chroma-js';

export default function ColourBox({
  background,
  name,
  colourId,
  paletteId,
  showLink,
}) {
  const [state, setState] = useState({
    copied: false,
  });

  const changeCopyState = () => {
    setState((prevState) => ({
      ...prevState,
      copied: true,
    }));

    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        copied: false,
      }));
    }, 1500);
  };

  const isDarkColour = chroma(background).luminance() <= 0.4;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className='ColourBox' style={{ background }}>
        <div
          className={`copy-overlay ${state.copied && `show`}`}
          style={{ background }}
        />
        <div className={`copy-msg ${state.copied && `show`}`}>
          <h1 className={isDarkColour ? 'light-text' : 'dark-text'}>Copied!</h1>
          <p className={isDarkColour ? 'light-text' : 'dark-text'}>
            {background}
          </p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={isDarkColour ? 'light-text' : 'dark-text'}>
              {name}
            </span>
          </div>
          <button className='copy-btn'>Copy</button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${colourId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={
                isDarkColour ? 'see-more light-text' : 'see-more dark-text'
              }
            >
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
