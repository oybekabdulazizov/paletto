import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColourBox.css';

export default function ColourBox({ background, name }) {
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

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className='ColourBox' style={{ background }}>
        <div
          className={`copy-overlay ${state.copied && `show`}`}
          style={{ background }}
        />
        <div className={`copy-msg ${state.copied && `show`}`}>
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>
        <button className='copy-btn'>Copy</button>
        <div className='box-content'>
          <span>{name}</span>
          <button className='btn-more'>More</button>
        </div>
      </div>
    </CopyToClipboard>
  );
}
