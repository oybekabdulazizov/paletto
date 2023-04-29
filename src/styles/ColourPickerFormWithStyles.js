import styled from 'styled-components';

const ColourPickerFormWithStyles = styled('div')(() => ({
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
    width: '100%',
    padding: '1em',
    margin: '6px auto',
    fontSize: '1.6em',
  },
}));

export default ColourPickerFormWithStyles;
