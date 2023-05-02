import React from 'react';
import styled from 'styled-components';

const PageWithStyles = styled('section')(() => ({
  height: '100vh',
  position: 'fixed',
  width: '100vw',
  fontFamily: 'Segoe UI',
}));

export default function Page({ children }) {
  return <PageWithStyles>{children}</PageWithStyles>;
}
