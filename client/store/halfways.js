import axios from "axios";

//Action types
const FETCH_HALFWAYS = "FETCH_HALFWAYS";
const ADD_HALFWAY = "ADD_HALFWAY";

//Thunk creators
export const fetchProfileHalfways = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/halfways/${id}`);
    dispatch({
      type: FETCH_HALFWAYS,
      halfways: res.data,
    });
  };
};

export const addHalfway = (userId, otherUserId) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/halfways/${userId}/${otherUserId}`);
    dispatch({
      type: ADD_HALFWAY,
      halfways: res.data,
    });
  };
};

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HALFWAYS:
      return action.halfways;
    case ADD_HALFWAY:
      return [...state, action.halfway];
    default:
      return state;
  }
}
