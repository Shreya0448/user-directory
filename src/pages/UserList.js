import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import api from '../services/api';
import CardContent from '@mui/material/CardContent';
import {
  Card,
  Typography,
  Grid
} from '@mui/material';
import './style.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className="user-list-container">
      <Card variant="outlined" className="directory-card">
        <CardContent>
          <Typography variant="h5" component="h2" className="directory-heading">
            Directory
          </Typography>
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserList;
