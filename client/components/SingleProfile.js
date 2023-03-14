import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singleProfile } from '../store/auth';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const SingleProfile = (props) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleProfile(props.match.params.id));
  }, []);
  const {
    username,
    name,
    lastName,
    hobbies,
    interest,
    gender,
    imageUrl,
    posts,
    comments,
  } = auth.singleProfile || {};
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>
        {name} {lastName}
      </h1>
      <img src={imageUrl}></img>
      <Paper sx={{ padding: '1rem', margin: '1rem', background: '#FDEDEC' }}>
        <p>Hobbies: {hobbies ? hobbies.join(', ') : ''}</p>
        <p>Interest: {interest}</p>
        <p>Gender: {gender}</p>
      </Paper>
      <div>
        <Paper sx={{ padding: '1rem', margin: '1rem', background: '#FADBD8' }}>
          Comments:
          {comments
            ? comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))
            : ''}
        </Paper>
        <Paper sx={{ padding: '1rem', margin: '1rem', background: '#F2D7D5' }}>
          Posts:
          {posts
            ? posts.map((post) => <div key={post.id}>{post.text}</div>)
            : ''}
        </Paper>
      </div>
    </Box>
  );
};

export default SingleProfile;
