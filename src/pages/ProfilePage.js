import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Card,
  Typography,
  Grid,
  CardContent,
  Box
} from '@mui/material';
import './style.css';
import Dialog from './Dialog'

function ProfilePage({ user }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPostDialog = (post) => {
    setSelectedPost(post);
    setIsPopupOpen(true);
  };

  const closePostDialog = () => {
    setSelectedPost(null);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    api.getPostsData().then((data) => {
      const userPosts = data.filter((post) => post.userId === user.id);
      setPosts(userPosts);
    });
  }, [user.id]);

  const address = `${user?.address?.suite}, ${user?.address?.street}, ${user?.address?.city}`;

  return (
    <>
      <Card variant="outlined" className="profile-card">
        <CardContent>
          <Grid container spacing={2} className="profile-card-content">
            <Grid item xs={12} sm={6} md={6} lg={6} className="profile-details">
              <Typography className="bold-label" variant="h6">Name</Typography>
              <Typography variant="p">{user.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} >
              <Typography className="bold-label" variant="h6">Address</Typography>
              <Typography variant="p">{address}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="profile-card-content">
            <Grid item xs={12} sm={6} md={6} lg={6} className="profile-details">
              <Typography className="bold-label" variant="h6">Username|CatchPhrase</Typography>
              <Typography variant="p">{user.username}|{user.company.catchPhrase}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} >
              <Typography className="bold-label" variant="h6">Email|Phone</Typography>
              <Typography variant="p">{user.email}|{user.phone}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box>
        <Grid container spacing={2}>
          {posts?.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card variant="outlined" className="post-card" onClick={() => openPostDialog(post)}>
                <CardContent>
                  <Typography variant="h5" className="post-title">
                    {post.title}
                  </Typography>
                  <Typography variant="p" className="post-body">
                    {post.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {isPopupOpen && (
          <Dialog
            title={selectedPost.title}
            body={selectedPost.body}
            onClose={closePostDialog}
          />
        )}
      </Box>
    </>
  );
}

export default ProfilePage;
