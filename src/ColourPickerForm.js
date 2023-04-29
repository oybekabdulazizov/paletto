import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';

const ColourPickerWithStyles = styled('div')(() => ({
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

export default function ColourPickerForm({
  addColour,
  colours,
  paletteFull,
  randomColour,
}) {
  const [newColourName, setNewColourName] = useState('');
  const [newColour, setNewColour] = useState(randomColour);

  useEffect(() => {
    ValidatorForm.addValidationRule('isColourNameUnique', (value) =>
      colours.every((c) => c.name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule('isColourUnique', (value) =>
      colours.every((c) => c.colour !== newColour)
    );
  }, [colours, newColour]);

  const handleNewColourNameChange = (e) => {
    e.preventDefault();
    setNewColourName(e.target.value);
  };

  const handleAddColour = () => {
    addColour(newColour, newColourName);
    setNewColourName('');
  };

  const handleChangeComplete = (newCol) => setNewColour(newCol.hex);

  return (
    <ColourPickerWithStyles>
      <ChromePicker
        className='colour-picker'
        color={newColour}
        onChangeComplete={handleChangeComplete}
      />
      <ValidatorForm instantValidate={false} onSubmit={handleAddColour}>
        <TextValidator
          label='Colour Name'
          name='newColourName'
          value={newColourName}
          className='colour-input'
          onChange={handleNewColourNameChange}
          validators={['required', 'isColourNameUnique', 'isColourUnique']}
          errorMessages={[
            'Colour Name is required',
            'Colour Name Must Be Unique',
            'Colour Must Be Unique',
          ]}
        />
        <Button
          variant='contained'
          type='submit'
          disabled={paletteFull}
          className='add-colour-btn'
          style={{
            backgroundColor: paletteFull ? 'gray' : newColour,
            color: chroma(newColour).luminance() <= 0.3 ? 'white' : 'black',
          }}
        >
          {paletteFull ? 'Palette Full' : 'Add Colour'}
        </Button>
      </ValidatorForm>
    </ColourPickerWithStyles>
  );
}
