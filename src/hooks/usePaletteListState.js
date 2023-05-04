import { useState } from 'react';

export default function usePaletteListState(deletePalette) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingPaletteId, setDeletingPaletteId] = useState('');

  const showDeleteConfirmation = (paletteId) => {
    setDeleteConfirmationOpen(true);
    setDeletingPaletteId(paletteId);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setDeletingPaletteId('');
  };

  const handleDeletePalette = () => {
    deletePalette(deletingPaletteId);
    hideDeleteConfirmation();
  };

  return {
    deleteConfirmationOpen,
    deletingPaletteId,
    handleDeletePalette,
    hideDeleteConfirmation,
    showDeleteConfirmation,
  };
}
