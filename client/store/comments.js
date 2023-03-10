import axios from "axios";
import history from "../history";
import { fetchPosts } from "./posts";
//Action types

const ADD_COMMENT = "ADD_COMMENT";
const SET_COMMENTS = "SET_COMMENTS";
//Action creators

const _addComment = (comment) => ({ type: ADD_COMMENT, comment });
const _setComments = (comments) => ({ type: SET_COMMENTS, comments });

//Thunk creators

export const setComments = (post) => {
  return async (dispatch) => {
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
