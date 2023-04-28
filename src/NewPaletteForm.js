import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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

import DraggableColourBox from './DraggableColourBox';
import PaletteFormNavBar from './PaletteFormNavBar';

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const getRandomColour = (palettes) => {
  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
  return randomPalette.colours[
    Math.floor(Math.random() * randomPalette.colours.length)
  ];
};

export default function NewPaletteForm({ palettes, savePalette }) {
  const [newColourName, setNewColourName] = useState('');
  const [newColour, setNewColour] = useState(getRandomColour(palettes).colour);
  const [open, setOpen] = useState(true);
  const [colours, setColours] = useState([]);
  let paletteFull = colours.length >= 20;

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
      colours.every((c) => c.colour !== newColour)
    );

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every((p) => p.paletteName.toLowerCase() !== value.toLowerCase())
    );
  }, [colours, newColour, palettes]);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleChangeComplete = (newCol) => setNewColour(newCol.hex);

  const handleNewColourNameChange = (e) => {
    e.preventDefault();
    setNewColourName(e.target.value);
  };

  const handleAddColour = () => {
    if (!paletteFull) {
      setColours([
        ...colours,
        {
          name: newColourName,
          id: newColourName.toLowerCase().replace(/ /g, ''),
          colour: newColour,
        },
      ]);
      setNewColourName('');
    }
  };

  const handleAddRandomColour = () => {
    let randomColour = {};
    do {
      randomColour = getRandomColour(palettes);
    } while (colours.find((c) => c.name === randomColour.name));

    if (!paletteFull) {
      setColours([
        ...colours,
        {
          name: randomColour.name,
          id: randomColour.name.toLowerCase().replace(/ /g, '-'),
          colour: randomColour.colour,
        },
      ]);
    }
  };

  const handleSavePalette = (newPaletteName) => {
    savePalette({
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colours,
    });
    history('/');
  };

  const handleDeleteColour = (id) => {
    const filteredColours = colours.filter((c) => c.id !== id);
    setColours([...filteredColours]);
  };

  const handleClearPalette = () => setColours([]);

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
      <PaletteFormNavBar
        open={open}
        openDrawer={handleDrawerOpen}
        savePalette={handleSavePalette}
        palettes={palettes}
      />
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
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ ml: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h5'>Design Your Palette</Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleClearPalette}
          >
            Clear Palette
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleAddRandomColour}
            disabled={paletteFull}
          >
            Random Colour
          </Button>
        </div>
        <ChromePicker
          color={newColour}
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
            value={newColourName}
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
            style={{
              backgroundColor: paletteFull ? 'gray' : newColour,
              color: chroma(newColour).luminance() <= 0.3 ? 'white' : 'black',
            }}
          >
            {paletteFull ? 'Palette Full' : 'Add Colour'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={colours} strategy={rectSortingStrategy}>
            {colours.map((c) => (
              <DraggableColourBox
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
