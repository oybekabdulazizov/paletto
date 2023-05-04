import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import usePaletteMetaFormState from './hooks/usePaletteMetaFormState';

export default function PaletteMetaForm({ savePalette, palettes, hideForm }) {
  const {
    dialogueOpen,
    emojiPickerOpen,
    showEmojiPicker,
    handleNewPaletteNameChange,
    handleSavePalette,
    newPaletteName,
  } = usePaletteMetaFormState(palettes, savePalette);

  return (
    <>
      <Dialog open={emojiPickerOpen} onClose={hideForm}>
        <DialogTitle variant='h5'>Pick a palette emoji</DialogTitle>
        <Picker
          data={data}
          onEmojiSelect={handleSavePalette}
          theme='light'
          autoFocus
        />
      </Dialog>
      <Dialog open={dialogueOpen} onClose={hideForm}>
        <DialogTitle>Name your palette</DialogTitle>
        <ValidatorForm
          instantValidate={false}
          onSubmit={showEmojiPicker}
          className='validation-form'
        >
          <DialogContent>
            <DialogContentText>
              Choose a name for your beautiful palette. Make sure it is unique!
            </DialogContentText>
            <TextValidator
              label='Palette Name'
              name='newPaletteName'
              fullWidth
              autoFocus
              margin='normal'
              value={newPaletteName}
              onChange={handleNewPaletteNameChange}
              validators={[
                'required',
                'isPaletteNameUnique',
                'isPaletteNameValid',
              ]}
              errorMessages={[
                'Palette Name is required',
                'Palette Name Already In Use',
                'Palette Name is invalid',
              ]}
            />
          </DialogContent>
          <DialogActions sx={{ paddingRight: '20px' }}>
            <Button onClick={hideForm} sx={{ paddingRight: '12px' }}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
