import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "./EditProfile";
import { fetchProfileComments } from "../../store/comments";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ProfileSparks from "./ProfileSparks";
import { Button } from "@mui/material";

const Profile = () => {
  const { auth, comments, posts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileComments(auth.id));
  }, []);

  const { name, lastName, hobbies, interest, gender, imageUrl } = auth || {};

  const profilePosts = posts.filter((post) => post.user.id === auth.id);
  if (auth.id) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => dispatch(deleteProfile(auth.id))}>X</button>
          <h1>
            {name} {lastName}
          </h1>
        </Box>
        <img src={imageUrl}></img>
        <ProfileSparks id={auth.id} />
        <Paper
          sx={{
            width: "50%",
            padding: "1rem",
            margin: "1rem",
            background: "#FDEDEC",
          }}
        >
          <p>Hobbies: {hobbies ? hobbies.join(", ") : ""}</p>
          <p>Interest: {interest}</p>
          <p>Gender: {gender}</p>
        </Paper>
        <Paper
          sx={{
            width: "50%",
            padding: "1rem",
            margin: "1rem",
            background: "#FADBD8",
          }}
        >
          Comments:
          {comments.comments
            ? comments.comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))
            : ""}
        </Paper>
        <Paper
          sx={{
            width: "50%",
            padding: "1rem",
            margin: "1rem",
            background: "#F2D7D5",
          }}
        >
          Posts:
          {profilePosts
            ? profilePosts.map((post) => <div key={post.id}>{post.text}</div>)
            : ""}
        </Paper>
        {state ? (
          <ProfileForm />
        ) : (
          <Button
            variant='contained'
            sx={{
              backgroundColor: "#ffff00",
              color: "black",
              marginBottom: "10px",
            }}
            onClick={() => setState(true)}
          >
            Edit Your Profile
          </Button>
        )}
      </Box>
    );
  }
};

export default Profile;
