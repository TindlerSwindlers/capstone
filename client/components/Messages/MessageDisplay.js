import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";

const MessageDisplay = ({ messages, auth }) => {
  let users = [];
  let userMessages = {};

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
        users["usersMessages"] = userMessages;
        console.log("USERMESSAGES", userMessages);
      }
    }
  }

  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              sx={{
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
                margin: 1,
                padding: 1,
                backgroundColor: "#FDEDEC",
              }}
            >
              <Typography variant='body1' sx={{ margin: 1 }}>
                {user.name} {user.lastName}
              </Typography>
              <CardMedia
                sx={{ width: "200px", height: "200px" }}
                image={user.imageUrl}
                title='image'
              />
              <Typography>
                Messages: {JSON.stringify(userMessages, null, 2)}
              </Typography>
            </Card>
          );
        })}

        <div></div>
      </Box>
    </div>
  );
};

export default MessageDisplay;
