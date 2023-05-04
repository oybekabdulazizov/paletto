import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useColourBoxState from './hooks/useColourBoxState';
import ColourBoxWithStyles from './styles/ColourBoxWithStyles';

export default function ColourBox({
  background,
  name,
  colourId,
  paletteId,
  showFullPalette,
}) {
  const { copied, changeCopyState } = useColourBoxState();

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <ColourBoxWithStyles
        backgroundColour={background}
        showFullPalette={showFullPalette}
      >
        <div className={`copy-overlay ${copied && `show`}`} />
        <div className={`copy-msg ${copied && `show`}`}>
          <h1 className='copy-msg-h1'>Copied!</h1>
          <p className='copy-msg-bg'>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-btn'>Copy</button>
        </div>
        {showFullPalette && (
          <Link
            to={`/palette/${paletteId}/${colourId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className='see-more'>More</span>
          </Link>
        )}
      </ColourBoxWithStyles>
    </CopyToClipboard>
  );
}
