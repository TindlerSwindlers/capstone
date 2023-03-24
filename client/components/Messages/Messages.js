import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../store/messages";
import { Link } from "react-router-dom";
import MessageResponse from "./MessageResponse";
import MessageDisplay from "./MessageDisplay";

const Messages = () => {
    const { auth, messages } = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect (() => {
       dispatch(fetchMessages(auth.id))
    }, [])

    return (
        <div>
            <MessageResponse />
            <MessageDisplay messages={messages} auth={auth} />
        </div>
    )
    
}

export default Messages;