import axios from "axios";
import history from "../history";
//Action types

const GET_POSTS = "GET_POSTS";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const EDIT_POST = "EDIT_POST";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

//Action creators

const _getPosts = (posts) => ({ type: GET_POSTS, posts });
const _addPost = (post) => ({ type: ADD_POST, post });
const _deletePost = (id) => ({ type: DELETE_POST, id });
const _editPost = (post) => ({ type: EDIT_POST, post });
const _addComment = (comment) => ({ type: ADD_COMMENT, comment });
// const _deleteComment = (id, postId) => ({ type: DELETE_COMMENT, id, postId });
//Thunk creators

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/posts");
      dispatch(_getPosts(response.data));
    } catch (e) {
      console.log("Error trying to get all posts in thunk", e);
    }
  };
};

export const addPost = (id, data) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/posts/${id}`, data);
    dispatch(_addPost(response.data));
    history.push("../home");
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(`/api/posts/${id}`);
    dispatch(_deletePost(id));
  };
};

export const editPost = (id, data) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/posts/${id}`, data);
    dispatch(_editPost(response.data));
    history.push("../home");
  };
};

export const addComment = (postId, userId, data) => {
  return async (dispatch) => {
    const response = await axios.post(
      `/api/comments/${postId}/${userId}`,
      data
    );
    dispatch(_addComment(response.data));
    history.push("../home");
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/comments/${id}`);
    dispatch(fetchPosts());
  };
};

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    case ADD_POST:
      return [...state, action.post];
    case DELETE_POST:
      return state.filter((post) => post.id !== action.id);
    case EDIT_POST:
      return state.map((post) =>
        post.id === action.post.id ? action.post : post
      );
    case ADD_COMMENT:
      return [...state, action.comment];
    // case DELETE_COMMENT:
    //   console.log("STATE", state);
    //   return [
    //     state.map((post) => {
    //       if (post.id === action.postId) {
    //         console.log("POST FROM REDUCER", post);
    //         // post.comments.filter((comment) => comment.id !== action.id);
    //       }
    //       return post;
    //     }),
    //   ];
    default:
      return state;
  }
}
