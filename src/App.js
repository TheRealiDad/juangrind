import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure these imports
import Banner from './Banner';  // Import the Banner component
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import StorePage from './StorePage';  // Import StorePage component
import { Container } from '@mui/material';
import { supabase } from './supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthListener = () => {
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/storepage'); // Redirect to storepage on login
      }
    });

    return () => {
      authListener.subscription.unsubscribe(); // Cleanup on unmount
    };
  }, [navigate]);

  return null; // This component does not render anything
};

const App = () => {
  return (
    <Router>
      <Banner />
      <AuthListener /> {/* Add the AuthListener component here */}
      <Container>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/storepage" element={<StorePage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
