import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/posts";

/**
 * COMPONENT
 */
export const Homepage = (props) => {
  // const { username } = props;
  // const { posts } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // console.log("POSTS", posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//     posts: state.posts
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getPosts: () => dispatch(fetchPosts()),
//   };
// };

export default Homepage;
