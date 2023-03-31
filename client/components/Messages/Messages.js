import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../store/messages';
import MessageDisplay from './MessageDisplay';
import { Card, Box } from '@mui/material';

const Messages = () => {
  const { auth, messages } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(auth.id));
  }, []);

  return (
    <Box
      sx={{
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MessageDisplay messages={messages} auth={auth} />
    </Box>
  );
};

export default Messages;
