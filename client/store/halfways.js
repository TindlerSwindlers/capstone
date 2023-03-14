import axios from "axios";

const FETCH_HALFWAYS = "FETCH_HALFWAYS"
const ADD_HALFWAY = "ADD_HALFWAY"

export const fetchProfileHalfways = (id) => {
    return async(dispatch) => {
      const res = await axios.get(`/api/halfways/${userId}`)
      dispatch({ 
        type: FETCH_HALFWAYS,
        halfways: res.data.halfways
      });
    };
  };

  export const addHalfway = (id) => {
    return async(dispatch) => {
      const res = await axios.post(`/api/halfways/${userId}`, data)
      dispatch({ 
        type: ADD_HALFWAY,
        halfways: res.data
      });
    };
  };

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