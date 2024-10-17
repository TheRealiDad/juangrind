import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';  // Import Supabase client

const Banner = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in authentication state (login or logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setLoggedIn(true);  // User is logged in
      } else {
        setLoggedIn(false);  // User is logged out
      }
    });

    // Check current session when component mounts
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setLoggedIn(true);  // User is logged in
      }
    };

    checkUser();

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();  // Log out from Supabase
    setLoggedIn(false);  // Update state to reflect logged-out status
    navigate('/');  // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JuanGrind
        </Typography>
        {loggedIn && (
          <Box>
            {/* Only show Logout button if logged in */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
