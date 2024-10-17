import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';  // Ensure correct import

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Used for navigation

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);  // Clear previous error messages

    try {
      // Updated Supabase login logic for v2
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);  // Display error message
      } else {
        console.log('Logged in:', data);
        // Navigate to storepage after successful login
        navigate('/storepage');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error(error);
    }

    // Optionally, reset the fields after submission
    setEmail('');
    setPassword('');
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
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
          {error && <Typography color="error" style={{ marginTop: '8px' }}>{error}</Typography>}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: 16 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
