import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import styled from 'styled-components';

// import './ColourBox.css';

const ColourBoxContainer = styled('div')(() => ({
  width: '20%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-4px',
  '&:hover .copy-btn': {
    opacity: '1',
    transition: '0.4s ease',
  },
  '& .copy-btn': {
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
    opacity: '0',
  },
  '.box-content': {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '0 5px 6px 6px',
    color: 'black',
    letterSpacing: '1px',
    fontSize: '1em',
  },
  '.see-more': {
    background: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    outline: 'none',
    position: 'absolute',
    right: '0',
    bottom: '0',
    fontSize: '1em',
    textAlign: 'center',
    lineHeight: '30px',
    height: '30px',
    width: '60px',
    textTransform: 'uppercase',
  },
  '.copy-overlay': {
    opacity: '0',
    zIndex: '0',
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
    transform: 'scale(0.1)',
    '&.show': {
      transition: 'transform 0.5s ease-in-out',
      opacity: '1',
      transform: 'scale(20)',
      zIndex: '10',
      position: 'absolute',
    },
  },
  '.copy-msg': {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'scale(0.00001)',
    opacity: '0',
    zIndex: '-1',
    '&.show': {
      opacity: '1',
      zIndex: '10',
      transform: 'scale(1)',
      transition: 'transform 0.3s ease-in-out',
      transitionDelay: '0.3s',
    },
  },
  '.copy-msg-h1': {
    fontSize: '4em',
    fontWeight: '400',
    width: '100%',
    margin: '0',
    padding: '0.2em',
    textShadow: '1px 2px black',
    background: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  '.copy-msg-bg': {
    margin: '10px 0 0 0',
    fontSize: '1.6em',
    fontWeight: '100',
  },
}));

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

  const textColour = chroma(background).luminance() <= 0.4 ? 'white' : 'black';

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <ColourBoxContainer
        style={{ background, height: showLink ? '25%' : '50%' }}
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
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${colourId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className='see-more' style={{ color: textColour }}>
              More
            </span>
          </Link>
        )}
      </ColourBoxContainer>
    </CopyToClipboard>
  );
}
