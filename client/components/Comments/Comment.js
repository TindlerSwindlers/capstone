import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';
import AddComment from './AddComment';
import { Paper, Box, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Comment = ({ comments, postId, userId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(deleteComment(id, postId));
  };
  return (
    <Box>
      {comments &&
        comments.map((comment) => (
          <Paper
            key={comment.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 1,
              padding: 1,
              backgroundColor: '#F4F6F6',
            }}
          >
            {comment.text}
            {comment.userId === auth.id ? (
              <IconButton
                onClick={(e) => {
                  e.preventDefault(), handleClick(comment.id);
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            ) : (
              <span />
            )}
          </Paper>
        ))}
      <AddComment postId={postId} userId={auth.id} />
    </Box>
  );
};

export default Comment;
