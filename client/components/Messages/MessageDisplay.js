import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const MessageDisplay = ({ messages, auth }) => {

    let users = [];
    let userMessages = [];
    
    messages.filter(message => message.userSendingId !== auth.id).map(message => !users.includes(message.userSending.username) ? users.push(message.userSending.username) : null)

    users.map((user) => {
        const newUser = {};
        newUser["username"] = user
        userMessages.push(newUser)    
    })

    for (let y = 0; y < userMessages.length; y++) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].userSending.username === userMessages[y].username) {
           userMessages[messages[i].createdAt] = messages[i].text
    }
   }
}

   console.log(userMessages)





   
 

    return (
        <div>
            {/* {
               messageUsers.map((user) => {
                    return (
                        <div>
                           <Link to={`/profile/${user}`}></Link>
                           <br></br><br></br>
                           <img src={user.imageUrl}></img>
                        </div>
                    )
                }) 
            }
          
                <div>
            </div> */}
        </div>
    )
    
}


export default MessageDisplay;

{/* <div>
{messages[0] ? (
 messages.map((message) => 
     <div key={message.id}>
      <Link to={{
          pathname: `/profile/${message.userSending.id}`
      }}>{message.userSending.name} {message.userSending.lastName}</Link>
      <br></br><br></br>
      <img src={message.userSending.imageUrl}></img>
      <p>{message.text}</p>
      <button>Reply</button>
     </div> */}