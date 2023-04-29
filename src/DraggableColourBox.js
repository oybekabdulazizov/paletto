import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from 'chroma-js';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import DraggableColourBoxWithStyles from './styles/DraggableColourBoxWithStyles';

export default function DraggableColourBox({
  id,
  name,
  background,
  deleteColour,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const handleDeleteColour = () => deleteColour(id);

  const textColour =
    chroma(background).luminance() <= 0.4
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(0,0,0,0.7)';

  return (
    <DraggableColourBoxWithStyles
      style={{
        background,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className='box-content'>
        <span style={{ color: textColour }}>{name}</span>
        <DeleteIcon
          className='delete-icon'
          style={{ color: textColour }}
          onClick={handleDeleteColour}
        />
      </div>
    </DraggableColourBoxWithStyles>
  );
}
