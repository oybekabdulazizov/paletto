import styled from 'styled-components';

import bg from '../images/bg.svg';
import sizes from './sizes';

export default styled('div')(() => ({
  backgroundColor: '#1504B1',
  backgroundImage: `url(${bg})`,
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '.container': {
    width: '50%',
    marginBottom: '2em',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '60%',
    },
    [sizes.down('lg')]: {
      width: '70%',
    },
    [sizes.down('sm')]: {
      width: '80%',
    },
    '@media (max-width: 400px)': {
      width: '20em',
      margin: '0 1em',
    },
  },
  '.nav': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    color: 'white',
    [sizes.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  '.nav-title': {
    fontSize: '2em',
    [sizes.down('xs')]: {
      fontSize: '1.4em',
      margin: '1em 0 0 0',
    },
  },
  a: {
    color: 'white',
    padding: '4px 0',
    textDecoration: 'none',
    borderBottom: '1px solid white',
    [sizes.down('xs')]: {
      margin: '1em 0',
    },
  },
  '.palettes': {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2em 5%',
    [sizes.down('md')]: {
      gridGap: '2em 10%',
      gridTemplateColumns: 'repeat(2, 45%)',
    },
    [sizes.down('xs')]: {
      width: '20em',
      margin: '0 auto',
      gridGap: '1em 0',
      gridTemplateColumns: 'repeat(1, 100%)',
    },
    '@media (max-width: 400px)': {
      width: '16em',
      margin: '0 auto',
      gridTemplateColumns: 'repeat(1, 100%)',
    },
    '@media (max-width: 300px)': {
      width: '14em',
      margin: '0 auto',
      gridTemplateColumns: 'repeat(1, 100%)',
    },
  },
}));
