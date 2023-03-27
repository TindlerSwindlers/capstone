import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { sendMessage } from "../../store/messages";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@mui/material";

const MessageResponse = () => {
  const auth = useSelector((state) => state);
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    text: "",
    userSendingId: "",
    userReceivingId: "",
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
    dispatch(sendMessage(message));
  };

  return (
    <Card
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
      <TextField id='text' name='message' onChange={handleChange} />
      <button onClick={handleSend}>Send Message</button>
    </Card>
  );
};

export default MessageResponse;
