import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import MiniPalette from './MiniPalette';
import PaletteListWithStyles from './styles/PaletteListWithStyles';

export default function PaletteList({ palettes, deletePalette }) {
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

  return (
    <PaletteListWithStyles>
      <div className='container'>
        <nav className='nav'>
          <h1 className='nav-title'>Paletto Colours</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
        <TransitionGroup className='palettes'>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames='fade' timeout={400}>
              <MiniPalette
                {...palette}
                showDeleteConfirmation={showDeleteConfirmation}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
        <Dialog
          open={deleteConfirmationOpen}
          onClose={hideDeleteConfirmation}
          aria-labelledby='delete-dialog-title'
        >
          <DialogTitle>Delete this palette?</DialogTitle>
          <List sx={{ pt: 0 }}>
            <ListItem>
              <ListItemButton onClick={handleDeletePalette}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                    <DoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'Delete'} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={hideDeleteConfirmation}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'Cancel'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Dialog>
      </div>
    </PaletteListWithStyles>
  );
}
