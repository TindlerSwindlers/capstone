import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/posts";
import Post from "./Posts/Post";
import RecommendedProfiles from "./Profile/RecommendedProfiles";
import Box from "@mui/material/Box";

export const Homepage = () => {
  const { posts } = useSelector((state) => state);
  const { comments } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [comments]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>Welcome, {auth.name}</h3>
      <RecommendedProfiles userId={auth.id} />
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
    </Box>
  );
};

export default Homepage;
