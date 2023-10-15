import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Card,
  Typography,
  Grid,
  CardContent
} from '@mui/material';
import './style.css';

function UserCard({ user }) {
  const [postsCount, setPostsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getPostsData().then((data) => {
      const userPosts = data.filter((post) => post.userId === user.id);
      setPostsCount(userPosts.length);
      setIsLoading(false);
    });
  }, [user.id]);

  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
      <Card
        variant="outlined"
        className="user-card"
      >
        <CardContent>
          <Grid container spacing={2} >
            <Grid item xs={6} className="left-alignment">
              <Typography  className="userList" variant="h5">
                <span className="bold-label">Name:</span> {user.name}
              </Typography>
            </Grid>
            <Grid item xs={6} className="right-alignment">
              <Typography className="userList" variant="h5"> <span className="bold-label">Posts:</span> {isLoading ? 'Loading...' : postsCount}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

export default UserCard;