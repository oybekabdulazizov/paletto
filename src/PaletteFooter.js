import React from 'react';
import styled from 'styled-components';

const PaletteFooterContainer = styled('div')(() => ({
  height: '4vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '1em',
  fontWeight: '500',
  fontSize: '1.1em',
  '.name': {
    marginRight: '0.5em',
  },
}));

export default function PaletteFooter({ name, emoji }) {
  return (
    <PaletteFooterContainer>
      <span className='name'>{name}</span>
      <span className='emoji'>{emoji}</span>
    </PaletteFooterContainer>
  );
}
