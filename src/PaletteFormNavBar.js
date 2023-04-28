import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 360;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: 'white',
  color: 'black',
  '.nav-btns': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    '& .validation-form': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  },
}));

export default function PaletteFormNavBar({
  open,
  openDrawer,
  savePalette,
  palettes,
}) {
  const [newPaletteName, setNewPaletteName] = useState('');

  const handleDrawerOpen = () => openDrawer();

  const handleNewPaletteNameChange = (e) => {
    e.preventDefault();
    setNewPaletteName(e.target.value);
  };

  const handleSavePalette = () => {
    savePalette(newPaletteName);
    setNewPaletteName('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every((p) => p.paletteName.toLowerCase() !== value.toLowerCase())
    );
  }, [palettes]);

  return (
    <>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar className='toolbar'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <LibraryAddIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className='nav-btns'>
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
              Save Palette
            </Button>
          </ValidatorForm>
          <Link to='/'>
            <Button variant='contained' color='secondary'>
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </>
  );
}
