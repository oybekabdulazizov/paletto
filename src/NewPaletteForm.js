import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import chroma from 'chroma-js';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import NewColourBox from './NewColourBox';

const drawerWidth = 360;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    height: 'calc(100vh - 56px)',
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

export default function NewPaletteForm({ palettes, savePalette }) {
  const [state, setState] = useState({
    open: false,
    newColour: '#fff',
    newColourName: '',
    newPaletteName: '',
  });

  const [colours, setColours] = useState([]);

  const history = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  useEffect(() => {
    ValidatorForm.addValidationRule('isColourNameUnique', (value) =>
      colours.every((c) => c.name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule('isColourUnique', (value) =>
      colours.every((c) => c.colour !== state.newColour)
    );

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every((p) => p.paletteName.toLowerCase() !== value.toLowerCase())
    );
  }, [colours, state.newColour, palettes]);

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
      newColour: newColour.hex,
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddColour = () => {
    setColours([
      ...colours,
      {
        name: state.newColourName,
        id: state.newColourName.toLowerCase().replace(/ /g, ''),
        colour: state.newColour,
      },
    ]);
    setState((prevState) => ({
      ...prevState,
      newColourName: '',
    }));
  };

  const handleSavePalette = () => {
    savePalette({
      paletteName: state.newPaletteName,
      id: state.newPaletteName.toLowerCase().replace(/ /g, '-'),
      colours,
    });
    setState((prevState) => ({
      ...prevState,
      newPaletteName: '',
    }));
    history('/');
  };

  const handleDeleteColour = (id) => {
    const filteredColours = colours.filter((c) => c.id !== id);
    setColours([...filteredColours]);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      setColours((colours) => {
        const activeColourIndex = colours.indexOf(
          colours.find((c) => c.id === active.id)
        );
        const overColourIndex = colours.indexOf(
          colours.find((c) => c.id === over.id)
        );
        return arrayMove(colours, activeColourIndex, overColourIndex);
      });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={state.open}>
        <Toolbar style={{ backgroundColor: 'white', color: 'black' }}>
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
          <ValidatorForm
            instantValidate={false}
            onSubmit={handleSavePalette}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              label='Palette Name'
              name='newPaletteName'
              value={state.newPaletteName}
              onChange={handleChange}
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
          color={state.newColour}
          onChangeComplete={handleChangeComplete}
        />
        <ValidatorForm
          instantValidate={false}
          onSubmit={handleAddColour}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            label='Colour Name'
            name='newColourName'
            value={state.newColourName}
            onChange={handleChange}
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
            style={{
              backgroundColor: state.newColour,
              color:
                chroma(state.newColour).luminance() <= 0.3 ? 'white' : 'black',
            }}
          >
            Add Colour
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={state.open}>
        <DrawerHeader />
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={colours} strategy={rectSortingStrategy}>
            {colours.map((c) => (
              <NewColourBox
                key={c.id}
                id={c.id}
                name={c.name}
                background={c.colour}
                deleteColour={handleDeleteColour}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Main>
    </Box>
  );
}
