import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

import ColourBoxWithStyles from './styles/ColourBoxWithStyles';

// import './ColourBox.css';

export default function ColourBox({
  background,
  name,
  colourId,
  paletteId,
  showFullPalette,
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

  const textColour = chroma(background).luminance() <= 0.4 ? 'white' : 'black';

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <ColourBoxWithStyles
        style={{ background, height: showFullPalette ? '25%' : '50%' }}
      >
        <div
          className={`copy-overlay ${state.copied && `show`}`}
          style={{ background }}
        />
        <div className={`copy-msg ${state.copied && `show`}`}>
          <h1 className='copy-msg-h1' style={{ color: textColour }}>
            Copied!
          </h1>
          <p className='copy-msg-bg' style={{ color: textColour }}>
            {background}
          </p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span style={{ color: textColour }}>{name}</span>
          </div>
          <button className='copy-btn' style={{ color: textColour }}>
            Copy
          </button>
        </div>
        {showFullPalette && (
          <Link
            to={`/palette/${paletteId}/${colourId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className='see-more' style={{ color: textColour }}>
              More
            </span>
          </Link>
        )}
      </ColourBoxWithStyles>
    </CopyToClipboard>
  );
}
