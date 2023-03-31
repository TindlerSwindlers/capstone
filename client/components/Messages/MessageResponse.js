import React, { useState } from 'react';
import { fetchMessages, sendMessage } from '../../store/messages';
import { useDispatch, useSelector } from 'react-redux';
import { Card, TextField, Box, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageResponse = ({ id }) => {
  const auth = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    userSendingId: '',
    userReceivingId: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setMessage({
      text: e.target.value,
      userSendingId: auth.auth.id,
      userReceivingId: auth.messages[0].userSending.id,
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    setState(true);
    dispatch(sendMessage(message));
    dispatch(fetchMessages(id));
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        display: 'flex',
        margin: 1,
        padding: 1,
        backgroundColor: '#D5F5E3',
      }}
    >
      {state ? (
        <p>Message sent!</p>
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'space-around', height: 40 }}
        >
          <TextField
            label="Message"
            size="small"
            name="message"
            onChange={handleChange}
            sx={{ backgroundColor: 'white', width: '70%' }}
          />
          <IconButton
            onClick={handleSend}
            sx={{ backgroundColor: '#45B39D', fontSize: 'small' }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default MessageResponse;
