import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const DELTE_PROFILE = "DELETE_PROFILE";
const GET_RECOMMENDED = "GET_RECOMMENDED";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _getRecommended = (profiles) => ({ type: GET_RECOMMENDED, profiles });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const updateProfile = (profile) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.put("/auth/me", profile, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: UPDATE_PROFILE,
      auth: { ...res.data },
    });
  };
};

export const deleteProfile = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/users/${id}`);
    dispatch({
      type: DELTE_PROFILE,
      auth: { ...res.data },
    });
  };
};

export const fetchRecommended = (userId) => {
  return async (dispatch) => {
    const users = await axios.get(`/api/users/recommended/${userId}`);
    dispatch(_getRecommended(users.data));
  };
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  if (action.type === SET_AUTH || action.type === UPDATE_PROFILE) {
    return action.auth;
  }
  if (action.type === GET_RECOMMENDED) {
    return { ...state, profiles: action.profiles };
  }
  if (action.type === DELTE_PROFILE) {
    return action.auth;
  }
  return state;
}
