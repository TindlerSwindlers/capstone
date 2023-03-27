import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../store/messages";

import MessageResponse from "./MessageResponse";
import MessageDisplay from "./MessageDisplay";
import { Card } from "@mui/material";

const Messages = () => {
  const { auth, messages } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(auth.id));
  }, []);

  return (
    <Card
      sx={{
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "240px",
        margin: 1,
        padding: 1,
        backgroundColor: "primary.main",
      }}
    >
      <MessageDisplay messages={messages} auth={auth} />
      <MessageResponse />
    </Card>
  );
};

export default Messages;
