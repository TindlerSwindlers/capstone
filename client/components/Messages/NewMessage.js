import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMessages, sendMessage } from "../../store/messages";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

const NewMessage = ({ usersendingid, userreceivingid }) => {
  let history = useHistory();
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
      userSendingId: usersendingid,
      userReceivingId: userreceivingid,
    });
  };
  function handleHistory() {
    history.push("/home");
  }

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(sendMessage(message));
    dispatch(fetchMessages(usersendingid));
    handleHistory();
  };

  return (
    <div>
      <TextField id='text' name='message' onChange={handleChange} />
      <button onClick={onSubmit}>Send Message</button>
    </div>
  );
};

export default NewMessage;
