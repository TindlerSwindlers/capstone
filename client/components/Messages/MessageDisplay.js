import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const MessageDisplay = ({ messages }) => {
console.log(messages)
const [userProfile, setUserProfile] = useState({
    username: "",
    imageUrl: "",
    messages: []
});

    messages.map((message) => {
        console.log(message)    
    })


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