// src/StorePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';  // Supabase client

const StorePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // Redirect to the login page after logout
      navigate('/');
    } else {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to StorePage!</h1>
      {/* Add logout button */}
      
    </div>
  );
};

export default StorePage;
