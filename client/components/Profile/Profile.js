import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from './EditProfile';
import { fetchProfileComments } from '../../store/comments';
import { deleteProfile } from '../../store/auth';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileSparks from './ProfileSparks';

const Profile = () => {
  const { auth, comments, posts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileComments(auth.id));
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name, lastName, hobbies, interest, gender, imageUrl } = auth || {};

  const profilePosts = posts.filter((post) => post.user.id === auth.id);
  if (auth.id) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Are you sure to delete account?'}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}> No</Button>
              <Button
                onClick={() => dispatch(deleteProfile(auth.id))}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <h1>
            {name} {lastName}
          </h1>
        </Box>
        <img src={imageUrl}></img>
        <ProfileSparks id={auth.id} />
        <Paper
          sx={{
            width: '50%',
            padding: '1rem',
            margin: '1rem',
            background: '#FDEDEC',
          }}
        >
          <p>Hobbies: {hobbies ? hobbies.join(', ') : ''}</p>
          <p>Interest: {interest}</p>
          <p>Gender: {gender}</p>
        </Paper>
        <Paper
          sx={{
            width: '50%',
            padding: '1rem',
            margin: '1rem',
            background: '#FADBD8',
          }}
        >
          Comments:
          {comments.comments
            ? comments.comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))
            : ''}
        </Paper>
        <Paper
          sx={{
            width: '50%',
            padding: '1rem',
            margin: '1rem',
            background: '#F2D7D5',
          }}
        >
          Posts:
          {profilePosts
            ? profilePosts.map((post) => <div key={post.id}>{post.text}</div>)
            : ''}
        </Paper>
        <ProfileForm />
      </Box>
    );
  }
};

export default Profile;
