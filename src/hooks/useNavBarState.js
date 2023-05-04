import { useState } from 'react';

export default function useNavBarState({ changeFormat, changeLevel }) {
  const [format, setFormat] = useState('hex');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function handleChangeFormat(e) {
    setFormat(e.target.value);
    setSnackbarOpen(true);
    changeFormat(e.target.value);
  }

  function handleChangeLevel(level) {
    changeLevel(level);
  }

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return {
    format,
    handleChangeFormat,
    handleChangeLevel,
    handleCloseSnackbar,
    snackbarOpen,
  };
}
