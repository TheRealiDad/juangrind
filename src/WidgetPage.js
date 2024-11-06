import React, { useRef, useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import ReportIcon from '@mui/icons-material/Assessment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomePage from './HomePage'; // Import your HomePage component
import ProfilePage from './ProfilePage'; // Import your ProfilePage component
import StorePage from './StorePage'; // Import your StorePage component
import CartPage from './CartPage'; // Import your CartPage component
import HistoryPage from './HistoryPage'; // Import your HistoryPage component
import ReportsPage from './ReportsPage'; // Import your ReportsPage component

const WidgetPage = () => {
  const [activePage, setActivePage] = useState('Home'); // Set default page to Home
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleIconClick = (label) => {
    setActivePage(label);
  };

  // Function to render the active page content
  const renderActivePage = () => {
    switch (activePage) {
      case 'Home':
        return <HomePage />;
      case 'Profile':
        return <ProfilePage />;
      case 'Store':
        return <StorePage />;
      case 'Cart':
        return <CartPage />;
      case 'History':
        return <HistoryPage />;
      case 'Reports':
        return <ReportsPage />;
      default:
        return null; // Fallback in case of an unknown page
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <Box mb={2}>
        <TextField variant="outlined" placeholder="Search..." fullWidth />
      </Box>

      {/* Icon Container */}
      <Box position="relative" width="100%" border={1} borderColor="grey.400" borderRadius={2} overflow="hidden">
        <IconButton onClick={() => scroll('left')} sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
          <ArrowBackIcon />
        </IconButton>

        <Box display="flex" justifyContent="center" ref={scrollRef} overflow="auto" whiteSpace="nowrap" p={2}>
          {[{ icon: <HomeIcon />, label: 'Home' },
            { icon: <PersonIcon />, label: 'Profile' },
            { icon: <StoreIcon />, label: 'Store' },
            { icon: <ShoppingCartIcon />, label: 'Cart' },
            { icon: <HistoryIcon />, label: 'History' },
            { icon: <ReportIcon />, label: 'Reports' },
          ].map((item, index) => (
            <Box key={index} textAlign="center" mx={2}>
              <Button onClick={() => handleIconClick(item.label)}>
                {item.icon}
                {item.label}
              </Button>
            </Box>
          ))}
        </Box>

        <IconButton onClick={() => scroll('right')} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Display active page content */}
      <Box mt={2}>
        {renderActivePage()}
      </Box>
    </div>
  );
};

export default WidgetPage;
