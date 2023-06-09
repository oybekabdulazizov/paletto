import styled from 'styled-components';
import chroma from 'chroma-js';

import sizes from './sizes';

export default styled('div')(({ backgroundColour, showFullPalette }) => ({
  backgroundColor: backgroundColour,
  width: '20%',
  height: showFullPalette ? '25%' : '50%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-5px',
  '&:hover .copy-btn': {
    opacity: '1',
    transition: '0.4s ease',
  },
  [sizes.down('lg')]: {
    width: '25%',
    height: showFullPalette ? '20%' : '33.33333%',
  },
  [sizes.down('md')]: {
    width: '50%',
    height: showFullPalette ? '10%' : '20%',
  },
  [sizes.down('xs')]: {
    width: '100%',
    height: showFullPalette ? '5%' : '10%',
  },
  '.copy-btn': {
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
    top: '0px',
    padding: '5px 5px 0 5px',
    letterSpacing: '1px',
    fontSize: '1em',
    color:
      chroma(backgroundColour).luminance() <= 0.4
        ? 'rgba(255,255,255,0.7)'
        : 'rgba(0,0,0,0.7)',
  },
  '.see-more': {
    color:
      chroma(backgroundColour).luminance() <= 0.4
        ? 'rgba(255,255,255,0.7)'
        : 'rgba(0,0,0,0.7)',
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
    backgroundColor: backgroundColour,
    opacity: '0',
    zIndex: '0',
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'transform 1s ease-in-out',
    transform: 'scale(0.1)',
    '&.show': {
      transition: 'transform 1s ease-in-out',
      opacity: '1',
      transform: 'scale(50)',
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
    color:
      chroma(backgroundColour).luminance() <= 0.4
        ? 'rgba(255,255,255,0.7)'
        : 'rgba(0,0,0,0.7)',
    fontSize: '4em',
    fontWeight: '400',
    width: '100%',
    margin: '0',
    padding: '0.2em',
    textShadow: '1px 2px black',
    background: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    textTransform: 'uppercase',
    [sizes.down('xs')]: {
      fontSize: '3em',
    },
  },
  '.copy-msg-bg': {
    color:
      chroma(backgroundColour).luminance() <= 0.4
        ? 'rgba(255,255,255,0.7)'
        : 'rgba(0,0,0,0.7)',
    margin: '10px 0 0 0',
    fontSize: '1.6em',
    fontWeight: '100',
  },
}));
