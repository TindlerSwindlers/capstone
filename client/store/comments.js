import axios from "axios";
import history from "../history";
import { fetchPosts } from "./posts";
//Action types

const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const SET_COMMENTS = "SET_COMMENTS";
const FETCH_PROFILE_COMMENTS = "FETCH_PROFILE_COMMENTS"
//Action creators

const _addComment = (comment) => ({ type: ADD_COMMENT, comment });
const _deleteComment = (id) => ({ type: DELETE_COMMENT, id });
const _setComments = (comments) => ({ type: SET_COMMENTS, comments });

//Thunk creators

export const fetchProfileComments = (id) => {
  return async(dispatch) => {
    const res = await axios.get(`/api/users/${id}`)
    dispatch({ 
      type: FETCH_PROFILE_COMMENTS,
      comments: res.data.comments
    });
  };
};


export const setComments = (post) => {
  return async (dispatch) => {
    // const response = await axios.get(`/api/comments/${id}`);
    dispatch(_setComments(post));
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
export default function (state = { comments: [] }, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    case ADD_COMMENT:
      return { comments: [...state.comments, action.comment] };
    default:
      return state;
  }
}
