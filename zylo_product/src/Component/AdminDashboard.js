import React from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary" fullWidth>
            Manage Users
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="secondary" fullWidth>
            Manage Courses
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="error" fullWidth>
            View Analytics
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
