import axios from "axios";

//Action types

const GET_POSTS = "GET_POSTS";

//Action creators

const _getPosts = (posts) => ({ type: GET_POSTS, posts });

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

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.posts };
    default:
      return state;
  }
}
