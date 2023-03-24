import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleProfile } from "../../store/auth";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { addHalfway, fetchProfileHalfways } from "../../store/halfways";
import { useLocation } from "react-router-dom";
import { addMatch } from "../../store/matches";
import { Button } from "@mui/material";
import FlashOnIcon from "@material-ui/icons/FlashOn";

const SingleProfile = (props) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  let location = useLocation();
  const { from } = location.state;

  useEffect(() => {
    dispatch(singleProfile(props.match.params.id));
  }, []);

  const changeSpark = async () => {
    await dispatch(addMatch(auth.id, id));
    await dispatch(fetchProfileHalfways(auth.id));
  };
  const {
    id,
    name,
    lastName,
    hobbies,
    interest,
    gender,
    imageUrl,
    posts,
    comments,
  } = auth.singleProfile || {};
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>
        {name} {lastName}
      </h1>
      <img src={imageUrl}></img>
      {from === "halfways" ? (
        <Button
          onClick={changeSpark}
          variant='contained'
          sx={{ backgroundColor: "#ffff00", color: "black" }}
        >
          <FlashOnIcon />
          Send a spark back!!!
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(addHalfway(auth.id, id))}
          variant='contained'
          sx={{ backgroundColor: "#ffff00", color: "black" }}
        >
          <FlashOnIcon />
          Send them a spark!
        </Button>
      )}
      <Paper sx={{ padding: "1rem", margin: "1rem", background: "#FDEDEC" }}>
        <p>Hobbies: {hobbies ? hobbies.join(", ") : ""}</p>
        <p>Interest: {interest}</p>
        <p>Gender: {gender}</p>
      </Paper>
      <div>
        <Paper sx={{ padding: "1rem", margin: "1rem", background: "#FADBD8" }}>
          Comments:
          {comments
            ? comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))
            : ""}
        </Paper>
        <Paper sx={{ padding: "1rem", margin: "1rem", background: "#F2D7D5" }}>
          Posts:
          {posts
            ? posts.map((post) => <div key={post.id}>{post.text}</div>)
            : ""}
        </Paper>
      </div>
    </Box>
  );
};

export default SingleProfile;
