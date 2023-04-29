import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import NewPaletteFormNavBar from './NewPaletteFormNavBar';
import ColourPickerForm from './ColourPickerForm';
import NewPaletteFormWithStyles from './styles/NewPaletteFormWithStyles';

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
  let paletteEmpty = colours.length < 1;

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

  const handleSavePalette = (newPaletteName, emoji) => {
    savePalette({
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      emoji: emoji,
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
      <NewPaletteFormNavBar
        open={open}
        openDrawer={handleDrawerOpen}
        savePalette={handleSavePalette}
        palettes={palettes}
        paletteEmpty={paletteEmpty}
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
