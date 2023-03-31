import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addComment } from '../../store/comments';
import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddComment = ({ postId, userId }) => {
  const dispatch = useDispatch();
  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(addComment(postId, userId, data));
    event.target.reset();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', alignItems: 'center', margin: 1 }}
    >
      <TextField
        label="Comment"
        name="text"
        {...register('text')}
        sx={{ width: '50rem' }}
      />
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default AddComment;
