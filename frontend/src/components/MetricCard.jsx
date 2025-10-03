import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const MetricCard = ({ title, value, icon, color = '#3b82f6' }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
      <Box sx={{
        backgroundColor: color,
        color: 'white',
        borderRadius: '50%',
        width: 56,
        height: 56,
        marginRight: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
};

export default MetricCard;