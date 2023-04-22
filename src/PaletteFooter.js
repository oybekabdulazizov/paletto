import React from 'react';

export default function PaletteFooter({ name, emoji }) {
  return (
    <footer className='Palette-footer'>
      <span>
        {name} <span>{emoji}</span>
      </span>
    </footer>
  );
}
