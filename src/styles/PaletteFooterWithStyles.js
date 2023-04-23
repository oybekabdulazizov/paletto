import styled from 'styled-components';

export default styled('div')(() => ({
  height: '4vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '1em',
  fontWeight: '500',
  fontSize: '1.1em',
  '.name': {
    marginRight: '0.5em',
  },
}));
