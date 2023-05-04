import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
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

  return (
    <DraggableColourBoxWithStyles
      backgroundColour={background}
      transform={CSS.Transform.toString(transform)}
      transition={transition}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className='box-content'>
        <span>{name}</span>
        <DeleteIcon className='delete-icon' onClick={handleDeleteColour} />
      </div>
    </DraggableColourBoxWithStyles>
  );
}
