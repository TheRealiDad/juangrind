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
      // Supabase email/password login logic
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);  // Display error message
      } else {
        console.log('Logged in:', data);
        navigate('/storepage'); // Navigate to storepage after successful login
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error(error);
    }

    // Reset the fields after submission
    setEmail('');
    setPassword('');
  };

  const handleGoogleLogin = async () => {
    setError(null); // Clear previous error messages
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (googleError) {
        setError(googleError.message);  // Display error message if login fails
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error(error);
    }
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
        {/* Google Login Button */}
        <Button 
          onClick={handleGoogleLogin}
          variant="outlined"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
        >
          Login with Google
        </Button>
        {/* Sign Up Link */}
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          Don't have an account?{' '}
          <Button color="primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
