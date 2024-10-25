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
import UnderConstruction from './UnderConstruction'; // Import the new component

const WidgetPage = () => {
  const [activePage, setActivePage] = useState('');
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / 3; // Adjust this value as needed
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleIconClick = (label) => {
    setActivePage(label); // Set the active page based on the clicked icon
  };

  return (
    <div>
      {/* Search Bar */}
      <Box mb={2}>
        <Box mb={2} mt={2}>
          <TextField variant="outlined" placeholder="Search..." fullWidth />
        </Box>
      </Box>

      {/* Icon Container */}
      <Box position="relative" width="100%" border={1} borderColor="grey.400" borderRadius={2} overflow="hidden">
        {/* Left Arrow */}
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: { xs: 'absolute', md: 'hidden' },
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor: 'white',
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Icon Container */}
        <Box
          display="flex"
          justifyContent="center"
          ref={scrollRef}
          overflow="auto"
          whiteSpace="nowrap"
          p={2}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {/* Each Icon and Text */}
          {[
            { icon: <HomeIcon fontSize="large" />, label: 'Home' },
            { icon: <PersonIcon fontSize="large" />, label: 'Profile' },
            { icon: <StoreIcon fontSize="large" />, label: 'Store' },
            { icon: <ShoppingCartIcon fontSize="large" />, label: 'Cart' },
            { icon: <HistoryIcon fontSize="large" />, label: 'History' },
            { icon: <ReportIcon fontSize="large" />, label: 'Reports' },
          ].map((item, index) => (
            <Box key={index} textAlign="center" mx={2}>
              <Button 
                onClick={() => handleIconClick(item.label)} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  backgroundColor: activePage === item.label ? 'grey.300' : 'transparent', // Highlight if active
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: activePage === item.label ? 'grey.400' : 'grey.100', // Change hover color
                  }
                }}
              >
                {item.icon}
                <Typography variant="caption" mt={0.5}>{item.label}</Typography>
              </Button>
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: { xs: 'absolute', md: 'hidden' },
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor: 'white',
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Display Under Construction message */}
      {activePage && (
        <Box mt={2}>
          <UnderConstruction pageName={`${activePage} is`} />
        </Box>
      )}
    </div>
  );
};

export default WidgetPage;
