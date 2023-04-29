import styled from 'styled-components';

const drawerWidth = 360;

const NewPaletteFormWithStyles = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  display: 'flex',
  '.drawer-header': {
    display: 'flex',
    padding: '0 8px',
    minHeight: '64px',
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
    padding: '24px',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDuration: '225ms',
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
      transitionDuration: '195ms',
      marginLeft: 0,
    }),
  },
}));

export default NewPaletteFormWithStyles;
