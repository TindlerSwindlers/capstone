import React from 'react';
import { Box, Card, CardMedia, Typography, Paper } from '@mui/material';
import MessageResponse from './MessageResponse';
import timeAgo from 'node-time-ago';

const MessageDisplay = ({ auth, messages }) => {
  let users = [];
  let userMessages = {};

  if (messages) {
    messages
      .filter((message) => message.userSendingId !== auth.id)
      .map((message) =>
        !users.some((e) => e.username === message.userSending.username)
          ? users.push(message.userSending)
          : null
      );

    for (let y = 0; y < users.length; y++) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].userSending?.username === users[y].username) {
          userMessages[messages[i].createdAt] = messages[i].text;
          users['usersMessages'] = userMessages;
        }
      }
    }
  }
  return messages.length > 0 ? (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {users &&
        users.map((user) => {
          return (
            <Card
              key={user.id}
              sx={{
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 1,
                padding: 1,
                backgroundColor: '#FDEDEC',
              }}
            >
              <Typography variant="body1" sx={{ margin: 1 }}>
                {user.name} {user.lastName}
              </Typography>
              <CardMedia
                sx={{ width: '200px', height: '200px' }}
                image={user.imageUrl}
                title="image"
              />
              <Typography>
                Messages:
                {Object.keys(userMessages).map((key) => (
                  <Paper key={key} sx={{ padding: 1 }}>
                    {userMessages[key]} sent at {timeAgo(key)}
                  </Paper>
                ))}
              </Typography>
              <MessageResponse id={auth.id} />
            </Card>
          );
        })}
    </Box>
  ) : (
    <Box sx={{ padding: 3 }}>Sorry. You don't have anyone to message yet</Box>
  );
};

export default MessageDisplay;
