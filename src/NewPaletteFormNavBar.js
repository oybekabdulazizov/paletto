import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import PaletteMetaForm from './PaletteMetaForm';

import NewPaletteFormNavBarWithStyles from './styles/NewPaletteFormNavBarWithStyles';

export default function NewPaletteFormNavBar({
  open,
  openDrawer,
  savePalette,
  palettes,
}) {
  const [paletteFormOpen, setPaletteFormOpen] = useState(false);

  const showForm = () => setPaletteFormOpen(true);

  const hideForm = () => setPaletteFormOpen(false);

  const handleDrawerOpen = () => openDrawer();

  return (
    <>
      <CssBaseline />
      <NewPaletteFormNavBarWithStyles open={open}>
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
          <Link to='/'>
            <Button sx={{ mr: 1 }} variant='contained' color='secondary'>
              Go Back
            </Button>
          </Link>
          <Button variant='contained' color='primary' onClick={showForm}>
            Save Palette
          </Button>
        </div>
        {paletteFormOpen && (
          <PaletteMetaForm
            savePalette={savePalette}
            palettes={palettes}
            hideForm={hideForm}
          />
        )}
      </NewPaletteFormNavBarWithStyles>
    </>
  );
}
