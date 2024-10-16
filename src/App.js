// src/App.js
import React, { useState } from 'react';
import Banner from './Banner';  // Import the Banner component
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Container, Grid, Typography, Link } from '@mui/material';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Banner /> {/* Add the Banner component here */}
      <Container>
        <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6}>
            {isLogin ? (
              <>
                <LoginForm />
                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                  Don’t have an account?{' '}
                  <Link href="#" onClick={toggleForm}>
                    Sign Up
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                <SignUpForm />
                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                  Already have an account?{' '}
                  <Link href="#" onClick={toggleForm}>
                    Log In
                  </Link>
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
