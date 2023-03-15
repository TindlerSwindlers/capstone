import axios from "axios";

const FETCH_MATCHES = "FETCH_MATCHES";
const ADD_MATCH = "ADD_MATCH";

// export const fetchProfileHalfways = (id) => {
//   return async (dispatch) => {
//     const res = await axios.get(`/api/halfways/${id}`);
//     dispatch({
//       type: FETCH_HALFWAYS,
//       halfways: res.data,
//     });
//   };
// };

export const addMatch = (user1, user2) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/matches/${user1}/${user2}`, {
      user1: user1,
      user2: user2,
    });
    dispatch({
      type: ADD_MATCH,
      matches: res.data,
    });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_MATCHES:
      return action.halfways;
    case ADD_MATCH:
      return [...state, action.matches];
    default:
      return state;
  }
}
