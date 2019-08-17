import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Shows from './Pages/Shows';
import Footer from './Pages/Footer';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Shows />
        <Footer />
      </Box>
    </Container>
  );
}