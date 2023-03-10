import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const DELTE_PROFILE = 'DELETE_PROFILE'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const updateProfile = (profile) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem(TOKEN)
    const res = await axios.put('/auth/me', profile, {
      headers: {
        authorization: token
      }
    })
    dispatch({ 
      type: UPDATE_PROFILE,
      auth: { ...res.data }
    });
  };
};


export const deleteProfile = (id) => {
  return async(dispatch) => {
    const res = await axios.delete(`/api/users/${id}`)
    dispatch({ 
      type: DELTE_PROFILE,
      auth: { ...res.data }
    });
  };
};


export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}



/**
 * REDUCER
 */
export default function(state = {}, action) {
  if (action.type === SET_AUTH || action.type === UPDATE_PROFILE) {
      return action.auth
  }

  if (action.type === DELTE_PROFILE) {
    return action.auth
  }
  return state;
}
