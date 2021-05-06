import React from 'react';
import { MantineProvider, Container } from '@mantine/core';
import VideoList from './components/VideoList';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans, sans-serif',
        lineHeight: 1.2,
        primaryColor: 'indigo',
      }}
    >
      <Container>
        <VideoList></VideoList>
      </Container>
    </MantineProvider>
  );
}

export default App;
