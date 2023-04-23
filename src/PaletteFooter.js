import React from 'react';

import PaletteFooterWithStyles from './styles/PaletteFooterWithStyles';

export default function PaletteFooter({ name, emoji }) {
  return (
    <PaletteFooterWithStyles>
      <span className='name'>{name}</span>
      <span className='emoji'>{emoji}</span>
    </PaletteFooterWithStyles>
  );
}
