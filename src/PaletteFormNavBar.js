import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 360;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
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
    margin: '0 1em',
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function PaletteFormNavBar({
  open,
  openDrawer,
  savePalette,
  palettes,
}) {
  const [paletteFormOpen, setPaletteFormOpen] = useState(false);

  const showForm = () => setPaletteFormOpen(true);

  const handleDrawerOpen = () => openDrawer();

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
          <PaletteMetaForm savePalette={savePalette} palettes={palettes} />
        )}
      </AppBar>
    </>
  );
}
