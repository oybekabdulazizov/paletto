import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { getRandomColour } from '../utilities';

export default function useNewPaletteFormState(savePalette) {
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
    function duplicateExists(colourId) {
      return colours.some((c) => c.id === colourId);
    }
    let randomColour;
    let isDuplicateColour = true;
    while (isDuplicateColour) {
      randomColour = getRandomColour();
      isDuplicateColour = duplicateExists(randomColour.id);
    }

    if (!paletteFull) {
      setColours([
        ...colours,
        {
          name: randomColour.name,
          id: randomColour.id,
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
      setColours(() => {
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

  return {
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
  };
}
