import React, { useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import { fetchMessages, sendMessage } from "../../store/messages";
import { useDispatch, useSelector } from "react-redux";

const MessageResponse = () => {
    const auth  = useSelector(state => state)
    const dispatch = useDispatch();
    const [message, setMessage] = useState({
        text: "",
        userSendingId: "",
        userReceivingId: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setMessage({
            text: e.target.value,
            userSendingId: auth.auth.id,
            userReceivingId: auth.messages[0].userSending.id
        })
    }

    const handleSend = (e) => {
        e.preventDefault();
      dispatch(sendMessage(message))
    } 


    return (
        <div>
        <TextField 
        id="text"
        name="message"
        onChange={handleChange}
        />
        <button onClick={handleSend}>Send Message</button>
        </div>
    )
}

export default MessageResponse