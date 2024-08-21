import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import ManageBooks from '../components/ManageBooks';
import ManageUsers from '../components/ManageUsers';
import ManageReviews from '../components/ManageReviews';


const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState(0);


  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };


  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin Panel
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleChange} variant="scrollable">
          <Tab label="Manage Books" />
          <Tab label="Manage Users" />
          <Tab label="Manage Reviews" />
        </Tabs>
      </Box>
     
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '80%',
          margin: 'auto',
          bgcolor: 'background.paper'
        }}
      >
        {currentTab === 0 && <ManageBooks />}
        {currentTab === 1 && <ManageUsers />}
        {currentTab === 2 && <ManageReviews />}
      </Box>
    </Box>
  );
};

export default AdminPage;