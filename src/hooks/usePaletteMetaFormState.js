import { useEffect, useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

export default function usePaletteMetaFormState(palettes, savePalette) {
  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every((p) => p.paletteName.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule(
      'isPaletteNameValid',
      (value) => value.toLowerCase() !== 'create-new-palette'
    );
  }, [palettes]);

  const showEmojiPicker = () => {
    setDialogueOpen(false);
    setEmojiPickerOpen(true);
  };

  const handleNewPaletteNameChange = (e) => {
    e.preventDefault();
    setNewPaletteName(e.target.value);
  };

  const handleSavePalette = (emoji) => {
    savePalette(newPaletteName, emoji.native);
    setNewPaletteName('');
    setEmojiPickerOpen(false);
  };

  return {
    dialogueOpen,
    emojiPickerOpen,
    showEmojiPicker,
    handleNewPaletteNameChange,
    handleSavePalette,
    newPaletteName,
  };
}
