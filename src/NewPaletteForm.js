import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@mui/material';
import chroma from 'chroma-js';

const drawerWidth = 360;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function NewPaletteForm() {
  const [state, setState] = React.useState({
    open: false,
    currentColour: 'white',
    colours: [],
  });

  const handleDrawerOpen = () => {
    setState((prevState) => ({
      ...prevState,
      open: true,
    }));
  };

  const handleDrawerClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleChangeComplete = (newColour) => {
    setState((prevState) => ({
      ...prevState,
      currentColour: newColour.hex,
    }));
  };

  const handleAddColour = () => {
    const existingColour = state.colours.find(
      (colour) => colour === state.currentColour
    );
    if (existingColour) {
      alert('This colour already exists!');
      return;
    }
    setState((prevState) => ({
      ...prevState,
      colours: [...state.colours, state.currentColour],
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={state.open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(state.open && { display: 'none' }) }}
          >
            <LibraryAddIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Create Palette
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={state.open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ ml: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h5'>Design Your Palette</Typography>
        <div>
          <Button variant='contained' color='secondary'>
            Clear Palette
          </Button>
          <Button variant='contained' color='primary'>
            Random Colour
          </Button>
        </div>
        <ChromePicker
          color={state.currentColour}
          onChangeComplete={handleChangeComplete}
        />
        <Button
          variant='contained'
          onClick={handleAddColour}
          style={{
            backgroundColor: state.currentColour,
            color:
              chroma(state.currentColour).luminance() <= 0.4
                ? 'white'
                : 'black',
          }}
        >
          Add Colour
        </Button>
      </Drawer>
      <Main open={state.open}>
        <DrawerHeader />
        <ul>
          {state.colours.map((colour, id) => (
            <li key={id} style={{ backgroundColor: colour }}>
              {colour}
            </li>
          ))}
        </ul>
      </Main>
    </Box>
  );
}
