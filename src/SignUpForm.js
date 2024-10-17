// src/SignUpForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { supabase } from './supabaseClient';  // Import Supabase client

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Used for navigation

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Supabase signup logic
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);  // Display error message if signup fails
      } else {
        console.log('Signed up:', user);
        // Navigate to storepage after successful signup
        navigate('/storepage');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error(error);
    }

    // Optionally, reset the fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null); // Clear error on typing
            }}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null); // Clear error on typing
            }}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null); // Clear error on typing
            }}
            required
          />
          {error && <Typography color="error" style={{ marginTop: '8px' }}>{error}</Typography>}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: 16 }}
          >
            Sign Up
          </Button>
        </form>
        {/* Add Login link */}
        <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/">
            Log In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpForm;
