import React from 'react';
import styled from 'styled-components';

const NewColourBoxWithStyles = styled('div')(() => ({
  width: '20%',
  height: '25%',
  margin: '0 auto',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: '-4px',
}));

export default function NewColourBox({ name, background }) {
  return (
    <NewColourBoxWithStyles style={{ background }}>
      <span>{name}</span>
    </NewColourBoxWithStyles>
  );
}
