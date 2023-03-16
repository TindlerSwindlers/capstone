import axios from "axios";

const FETCH_MATCHES = "FETCH_MATCHES";
const ADD_MATCH = "ADD_MATCH";

export const fetchProfileMatches = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/matches/${id}`);
    dispatch({
      type: FETCH_MATCHES,
      matches: res.data,
    });
  };
};

export const addMatch = (user1, user2) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/matches/`, {
      user1: user1,
      user2: user2,
    });
    dispatch({
      type: ADD_MATCH,
      matchesAdded: res.data,
    });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_MATCHES:
      return action.matches;
    case ADD_MATCH:
      return [...state, action.matchesAdded];
    default:
      return state;
  }
}
