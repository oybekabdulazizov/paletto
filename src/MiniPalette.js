import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

import MiniPaletteWithStyles from './styles/MiniPaletteWithStyles';

export default function MiniPalette({
  id,
  paletteName,
  emoji,
  colours,
  showDeleteConfirmation,
}) {
  const history = useNavigate();

  function handleGoToPalette(e) {
    e.preventDefault();
    history(`/palette/${id}`);
  }

  const handleShowDeleteConfirmation = (e) => {
    e.stopPropagation();
    showDeleteConfirmation(id);
  };

  const miniColourBoxes = colours.map((c) => (
    <div
      className='miniColour'
      style={{ backgroundColor: c.colour }}
      key={c.name}
    ></div>
  ));

  return (
    <MiniPaletteWithStyles onClick={handleGoToPalette}>
      <DeleteIcon
        className='delete-icon'
        onClick={handleShowDeleteConfirmation}
      />
      <div className='colours'>{miniColourBoxes}</div>
      <h5 className='title'>
        {paletteName} <span className='emoji'>{emoji}</span>
      </h5>
    </MiniPaletteWithStyles>
  );
}
