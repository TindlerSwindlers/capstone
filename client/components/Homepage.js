import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/posts";
import Post from "./Post";
import RecommendedProfiles from "./RecommendedProfiles";

export const Homepage = () => {
  const { posts } = useSelector((state) => state);
  const { comments } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [comments]);

  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
      <RecommendedProfiles userId={auth.id} />
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
    </div>
  );
};

export default Homepage;
