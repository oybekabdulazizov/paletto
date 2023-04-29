import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

export default function PaletteMetaForm({ savePalette, palettes, hideForm }) {
  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every((p) => p.paletteName.toLowerCase() !== value.toLowerCase())
    );
  }, [palettes]);

  const showEmojiPicker = () => {
    setDialogueOpen(false);
    setEmojiPickerOpen(true);
  };

  const handleNewPaletteNameChange = (e) => {
    e.preventDefault();
    setNewPaletteName(e.target.value);
  };

  const handleSavePalette = (emoji) => {
    savePalette(newPaletteName, emoji.native);
    setNewPaletteName('');
  };

  return (
    <>
      <Dialog open={emojiPickerOpen} onClose={hideForm}>
        <DialogTitle variant='h5'>Pick a palette emoji</DialogTitle>
        <Picker data={data} onEmojiSelect={handleSavePalette} theme='light' />
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
              margin='normal'
              value={newPaletteName}
              onChange={handleNewPaletteNameChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Palette Name is required',
                'Palette Name Already In Use',
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
