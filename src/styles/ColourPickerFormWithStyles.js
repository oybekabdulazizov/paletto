import styled from 'styled-components';
import chroma from 'chroma-js';

const ColourPickerFormWithStyles = styled('div')(
  ({ backgroundColour, paletteFull }) => ({
    width: '100%',
    '.colour-picker': {
      width: '100% !important',
      margin: '1rem 0',
    },
    '.colour-input': {
      width: '100%',
      margin: '6px auto',
    },
    '.add-colour-btn': {
      backgroundColor: paletteFull ? 'gray' : backgroundColour,
      color: chroma(backgroundColour).luminance() <= 0.3 ? 'white' : 'black',
      width: '100%',
      padding: '1em',
      margin: '6px auto',
      fontSize: '1.6em',
    },
  })
);

export default ColourPickerFormWithStyles;
