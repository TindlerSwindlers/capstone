import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      }
    }
  }

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>
              {user.name} {user.lastName}
            </p>
            <img src={user.imageUrl}></img>
            <br></br>
            <br></br>
            Messages: <pre> {JSON.stringify(userMessages, null, 2)} </pre>
          </div>
        );
      })}

      <div></div>
    </div>
  );
};

export default MessageDisplay;
