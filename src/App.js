import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Banner from './Banner';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import WidgetPage from './WidgetPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import StorePage from './StorePage';
import CartPage from './CartPage';
import HistoryPage from './HistoryPage';
import ReportsPage from './ReportsPage';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Navy Blue
    },
    secondary: {
      main: '#B0C4DE', // Light Steel Blue
    },
    warning: {
      main: '#FFD700', // Gold
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    // You can customize typography here if needed
    fontFamily: 'Arial, sans-serif',
  },
});

const AuthListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/widgetpage');
      }
    });

    // Ensure the subscription is correctly unsubscribed
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Banner />
        <AuthListener />
        <Container>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/widgetpage" element={<WidgetPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
