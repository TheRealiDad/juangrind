// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './Banner';  // Import the Banner component
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import StorePage from './StorePage';  // Import StorePage component
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Banner /> {/* Banner component */}
      <Container>
        <Routes>
          {/* LoginForm and SignUpForm Routes */}
          <Route path="/" element={<LoginForm />} /> {/* Now just pointing to LoginForm */}
          <Route path="/signup" element={<SignUpForm />} />

          {/* Route for StorePage */}
          <Route path="/storepage" element={<StorePage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
