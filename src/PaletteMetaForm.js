import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteMetaForm({ savePalette, palettes }) {
  const [dialogueOpen, setDialogueOpen] = useState(false);
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
    <div>
      <Button variant='outlined' onClick={handleDialogueOpen}>
        Open form dialog
      </Button>
      <Dialog open={dialogueOpen} onClose={handleDialogueClose}>
        <DialogTitle>Name your palette</DialogTitle>
        <DialogContent>
          <ValidatorForm
            instantValidate={false}
            onSubmit={handleSavePalette}
            className='validation-form'
          >
            <TextValidator
              label='Palette Name'
              name='newPaletteName'
              value={newPaletteName}
              onChange={handleNewPaletteNameChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Palette Name is required',
                'Palette Name Already In Use',
              ]}
            />
            <Button variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleDialogueClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
