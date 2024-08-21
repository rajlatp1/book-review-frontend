import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton, Switch, Tabs, Tab } from '@mui/material';
import { fetchUsers, toggleAdminStatus, searchUser, promoteUserToAdmin } from '../api';
import SearchIcon from '@mui/icons-material/Search';


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);


  useEffect(() => {
    fetchUsers().then((response) => setUsers(response.data));
  }, []);


  const handleToggleAdmin = (userId) => {
    toggleAdminStatus(userId).then((response) => {
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, role: response.data.role } : user
      );
      setUsers(updatedUsers);
    });
  };


  const handleSearch = () => {
    searchUser(searchTerm).then((response) => setSearchResults(response.data));
  };


  const handlePromoteToAdmin = (userId) => {
    promoteUserToAdmin(userId).then((response) => {
      const updatedUsers = searchResults.map((user) =>
        user.id === userId ? { ...user, role: 'admin' } : user
      );
      setSearchResults(updatedUsers);
    });
  };


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };


  return (
    <Box>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        variant="scrollable"
        sx={{ justifyContent: 'start' }}
      >
        <Tab label="All Admins" />
        <Tab label="Promote User" />
      </Tabs>


      {currentTab === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            All Admins
          </Typography>
          <List>
            {users
              .filter((user) => user.role === 'admin')
              .map((user) => (
                <ListItem key={user.id}>
                  <ListItemText primary={user.username} secondary={user.role} />
                  <Switch
                    checked={user.role === 'admin'}
                    onChange={() => handleToggleAdmin(user.id)}
                    color="primary"
                  />
                </ListItem>
              ))}
          </List>
        </Box>
      )}


      {currentTab === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search and Promote Users
          </Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              label="Search User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <IconButton onClick={handleSearch} color="primary">
              <SearchIcon />
            </IconButton>
          </Box>
          <List>
            {searchResults.map((user) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.username} secondary={user.role} />
                {user.role !== 'admin' && (
                  <Button variant="contained" color="primary" onClick={() => handlePromoteToAdmin(user.id)}>
                    Promote to Admin
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};


export default ManageUsers;
