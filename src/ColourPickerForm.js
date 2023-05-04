import React from 'react';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';

import useColourPickerFormstate from './hooks/useColourPickerFormState';
import ColourPickerFormWithStyles from './styles/ColourPickerFormWithStyles';

export default function ColourPickerForm(props) {
  const { paletteFull } = props;
  const {
    handleAddColour,
    handleChangeComplete,
    handleNewColourNameChange,
    newColour,
    newColourName,
  } = useColourPickerFormstate(props);

  return (
    <ColourPickerFormWithStyles>
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
    </ColourPickerFormWithStyles>
  );
}
