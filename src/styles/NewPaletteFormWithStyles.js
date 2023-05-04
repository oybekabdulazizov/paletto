import styled from 'styled-components';
import sizes from './sizes';

const drawerWidth = 360;

const NewPaletteFormWithStyles = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  display: 'flex',
  '.drawer': {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  },
  '.drawer-header': {
    display: 'flex',
    padding: '0 8px',
    minHeight: '64px',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  '.chevron-icon-btn': {
    marginLeft: '8px',
    width: '40px',
    height: '40px',
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
    display: 'flex',
    justifyContent: 'space-between',
  },
  '.btn': {
    width: '49%',
    fontSize: '0.8em',
  },
  '.main': {
    height: 'calc(100vh - 68px)',
    flexGrow: 1,
    padding: '0',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDuration: '225ms',
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
      transitionDuration: '195ms',
      marginLeft: 0,
    }),
    [sizes.down('xl')]: {
      height: 'calc(100vh - 68px)',
    },
    [sizes.down('lg')]: {
      height: 'calc(100vh - 46px)',
    },
    [sizes.down('sm')]: {
      height: 'calc(100vh - 26px)',
    },
  },
}));

export default NewPaletteFormWithStyles;
