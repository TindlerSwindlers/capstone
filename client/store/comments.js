import axios from "axios";
import history from "../history";
//Action types

const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const SET_COMMENTS = "SET_COMMENTS";
//Action creators

const _addComment = (comment) => ({ type: ADD_COMMENT, comment });
const _deleteComment = (id) => ({ type: DELETE_COMMENT, id });
const _setComments = (comments) => ({ type: SET_COMMENTS, comments });

//Thunk creators

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
    console.log("ID FROM THUNK", id);
    await axios.delete(`/api/comments/${id}`);
    dispatch(_deleteComment(id));
  };
};

//Reducer
export default function (state = { comments: [] }, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    case ADD_COMMENT:
      return [...state, action.comment];
    case DELETE_COMMENT:
      return state.comments.filter((comment) => comment.id !== action.id);
    default:
      return state;
  }
}
