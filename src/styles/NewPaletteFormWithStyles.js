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
    display: 'flex',
    justifyContent: 'space-between',
  },
  '.btn': {
    width: '49%',
    fontSize: '0.8em',
  },
  '.main': {
    height: 'calc(100vh - 64px)',
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
  },
}));

export default NewPaletteFormWithStyles;
