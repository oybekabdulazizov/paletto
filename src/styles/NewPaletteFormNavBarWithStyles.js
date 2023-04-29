import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 360;

const NewPaletteFormNavBarWithStyles = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  height: '64px',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: 'white',
  color: 'black',
  '.nav-btns': {
    margin: '0 1em',
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default NewPaletteFormNavBarWithStyles;
