import axios from 'axios';

//Action types

const GET_POSTS = 'GET_POSTS';
const ADD_POST = 'ADD_POST';

//Action creators

const _getPosts = (posts) => ({ type: GET_POSTS, posts });
const _addPost = (post) => ({ type: ADD_POST, post });

//Thunk creators

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/posts');
      dispatch(_getPosts(response.data));
    } catch (e) {
      console.log('Error trying to get all posts in thunk', e);
    }
  };
};

export const addPost = (id, data) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/posts/${id}`, data);
    dispatch(_addPost(response.data));
    // history.push('../');
  };
};

//Reducer
export default posts = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    case ADD_POST:
      return [...state, action.post];
    default:
      return state;
  }
};
