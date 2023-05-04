import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import DraggableColourBox from './DraggableColourBox';
import NewPaletteFormNavBar from './NewPaletteFormNavBar';
import ColourPickerForm from './ColourPickerForm';
import { getRandomColour } from './utilities';
import useNewPaletteFormState from './hooks/useNewPaletteFormState';
import NewPaletteFormWithStyles from './styles/NewPaletteFormWithStyles';

export default function NewPaletteForm({ palettes, savePalette }) {
  const {
    colours,
    handleAddColour,
    handleAddRandomColour,
    handleClearPalette,
    handleDeleteColour,
    handleDragEnd,
    handleDrawerClose,
    handleDrawerOpen,
    handleSavePalette,
    open,
    paletteFull,
    sensors,
  } = useNewPaletteFormState(savePalette);
  let paletteEmpty = colours.length < 1;

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
          <IconButton onClick={handleDrawerClose} className='chevron-icon-btn'>
            <ChevronLeftIcon sx={{ fontSize: '1.1em' }} />
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
            randomColour={getRandomColour().colour}
          />
        </div>
      </Drawer>
      <div className='main'>
        <div className='drawer-header' />
        {paletteEmpty ? (
          <div className='placeholder'>
            <div>Yo!</div>
            <div>Smash the RANDOM COLOUR button to get some inspiration 🤠</div>
          </div>
        ) : (
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
        )}
      </div>
    </NewPaletteFormWithStyles>
  );
}
