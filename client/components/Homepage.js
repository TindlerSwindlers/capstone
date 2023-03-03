import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../store/posts";

/**
 * COMPONENT
 */
export const Homepage = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPosts: () => dispatch(fetchPosts()),
  };
};

export default connect(mapState, mapDispatch)(Homepage);
