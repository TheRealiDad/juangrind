// UnderConstruction.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const UnderConstruction = ({ pageName }) => {
  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h4">{pageName} is Under Construction</Typography>
      <Typography variant="body1">
        Please check back later!
      </Typography>
    </Box>
  );
};

export default UnderConstruction;
