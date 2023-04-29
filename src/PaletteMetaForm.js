import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteMetaForm({ savePalette, palettes }) {
  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [newPaletteName, setNewPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every((p) => p.paletteName.toLowerCase() !== value.toLowerCase())
    );
  }, [palettes]);

  const handleDialogueOpen = () => setDialogueOpen(true);

  const handleDialogueClose = () => {
    setDialogueOpen(false);
    setNewPaletteName('');
  };

  const handleNewPaletteNameChange = (e) => {
    e.preventDefault();
    setNewPaletteName(e.target.value);
  };

  const handleSavePalette = () => {
    savePalette(newPaletteName);
    setNewPaletteName('');
  };

  return (
    <Dialog open={dialogueOpen} onClose={handleDialogueClose}>
      <DialogTitle>Name your palette</DialogTitle>
      <ValidatorForm
        instantValidate={false}
        onSubmit={handleSavePalette}
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
          <Button onClick={handleDialogueClose} sx={{ paddingRight: '12px' }}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Save
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
