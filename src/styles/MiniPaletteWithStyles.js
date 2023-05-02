import styled from 'styled-components';

export default styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '5px',
  border: '1px solid black',
  padding: '0.5em',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover .delete-icon': {
    opacity: '1',
  },
  '.colours': {
    backgroundColor: 'white',
    height: '140px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  '.miniColour': {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto -4.5px auto',
    position: 'relative',
  },
  '.title': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5em',
    fontSize: '1em',
    position: 'relative',
  },
  '.emoji': {
    marginLeft: '0.5em',
    fontSize: '1.4em',
  },
  '.delete-icon': {
    position: 'absolute',
    zIndex: '2',
    color: 'white',
    backgroundColor: '#eb3d30',
    width: '25px',
    height: '25px',
    right: '0',
    top: '0',
    padding: '5px',
    opacity: '0',
    transition: 'all 0.2s ease-in-out',
  },
}));
