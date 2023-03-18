import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../store/messages";
import { Link, useLocation } from "react-router-dom";

const Messages = () => {
    const { auth, messages } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect (() => {
       dispatch(fetchMessages(auth.id))
    }, [])

    return (
        console.log(messages),
        <div>
          {messages[0] ? (
           messages.map((message) => 
               <div>
                <Link to={{
                    pathname: `/profile/${message.userSending.id}`
                }}>{message.userSending.name} {message.userSending.lastName}</Link>
                <br></br><br></br>
                <img src={message.userSending.imageUrl}></img>
                <p key={message.id}>{message.text}</p>
               </div>
              )
          ) : (
            <p>No messages at this moment. You're a loser!</p>
          )}
        </div>
      );
    };

export default Messages;