import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Shows from './Pages/Shows';
import Show from './Pages/Show';
import Footer from './Pages/Partials/Footer';
import Header from './Pages/Partials/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box my={4}>
          <Header />
          <Route exact path="/" component={Shows} />
          <Route path="/show/:id" component={Show} />
          <Footer />
        </Box>
      </Container>
    </Router>
  );
}
