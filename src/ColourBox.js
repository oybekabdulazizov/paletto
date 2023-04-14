import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColourBox.css';

export default function ColourBox({ background, name }) {
  return (
    <CopyToClipboard text={background}>
      <div className='ColourBox' style={{ background }}>
        <button className='copy-btn'>Copy</button>
        <div className='box-content'>
          <span>{name}</span>
          <button className='btn-more'>More</button>
        </div>
      </div>
    </CopyToClipboard>
  );
}
