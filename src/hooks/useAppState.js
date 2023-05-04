import { useEffect, useState, useCallback } from 'react';

import seedPalette from '../data/seedPalette';

export default function useAppState() {
  const [palettes, setPalettes] = useState(
    JSON.parse(window.localStorage.getItem('palettes')) || seedPalette
  );

  const savePalette = (newPalette) => setPalettes([...palettes, newPalette]);

  const deletePalette = (id) =>
    setPalettes(palettes.filter((palette) => palette.id !== id));

  const syncPalette = useCallback(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }, [palettes]);

  useEffect(() => {
    syncPalette();
  }, [syncPalette]);

  return { palettes, deletePalette, savePalette, syncPalette };
}
