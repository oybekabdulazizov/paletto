import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from 'chroma-js';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

const DraggableColourBoxWithStyles = styled('div')(() => ({
  width: '20%',
  height: '25%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-7px',
  // transition: 'all 0.2s ease-in-out',
  // '&:hover .box-content': {
  //   color: 'white',
  // },
  '.box-content': {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '6px 10px',
    letterSpacing: '1px',
    fontSize: '1em',
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease-in-out',
    color: 'rgba(0,0,0,0.5)',
  },
  '.delete-icon': {
    transform: 'scale(0.9)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.3)',
    },
  },
}));

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