import React from 'react';
import { MantineProvider, Container, theming } from '@mantine/core';
import VideoList from './components/VideoList';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles(
    () => ({
        '@global': {
            body: {
                backgroundColor: '#f1f3f5'
            }
        }
    }),
    { theming }
);
function App() {
    useStyles();
    return (
        <MantineProvider
            theme={{
                fontFamily: 'Open Sans, sans-serif',
                lineHeight: 1.2
            }}>
            <Container>
                <VideoList />
            </Container>
        </MantineProvider>
    );
}

export default App;
