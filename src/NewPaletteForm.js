import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
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
import ColourPickerForm from './ColourPickerForm';

const drawerWidth = 360;

const NewPaletteFormWithStyles = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  '.drawer-header': {
    display: 'flex',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  '.drawer': {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  },
  '.drawer-content-container': {
    width: '90%',
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.btns': {
    width: '100%',
  },
  '.btn': {
    width: '50%',
    fontSize: '0.8em',
  },
  '.main': {
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
  },
}));

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     height: 'calc(100vh - 56px)',
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-start',
// }));

const getRandomColour = (palettes) => {
  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
  return randomPalette.colours[
    Math.floor(Math.random() * randomPalette.colours.length)
  ];
};

export default function NewPaletteForm({ palettes, savePalette }) {
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

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleAddColour = (newColour, newColourName) => {
    if (!paletteFull) {
      setColours([
        ...colours,
        {
          name: newColourName,
          id: newColourName.toLowerCase().replace(/ /g, ''),
          colour: newColour,
        },
      ]);
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
    <NewPaletteFormWithStyles open={open}>
      <PaletteFormNavBar
        open={open}
        openDrawer={handleDrawerOpen}
        savePalette={handleSavePalette}
        palettes={palettes}
      />
      <Drawer className='drawer' variant='persistent' anchor='left' open={open}>
        <div className='drawer-header'>
          <IconButton onClick={handleDrawerClose} sx={{ ml: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className='drawer-content-container'>
          <Typography variant='h5' gutterBottom>
            Design Your Palette
          </Typography>
          <div className='btns'>
            <Button
              variant='contained'
              color='secondary'
              className='btn'
              onClick={handleClearPalette}
            >
              Clear Palette
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='btn'
              onClick={handleAddRandomColour}
              disabled={paletteFull}
            >
              Random Colour
            </Button>
          </div>
          <ColourPickerForm
            addColour={handleAddColour}
            colours={colours}
            paletteFull={paletteFull}
            randomColour={getRandomColour(palettes).colour}
          />
        </div>
      </Drawer>
      <div className='main'>
        <div className='drawer-header' />
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
      </div>
    </NewPaletteFormWithStyles>
  );
}
