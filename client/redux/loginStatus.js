import axios from 'axios';
import { CHECK_LOGIN, USER_LOGOUT } from './actionConstants';


export const _checkLogin = (user) => ({
  type: CHECK_LOGIN,
  user
})

export const loginFromSession = (sessionId) => {
  return async (dispatch) => {
    const user = await axios.get(`/api/auth/session/${sessionId}`)
    dispatch(_checkLogin(user.data))
  }
}

export const checkLogin = () => {
  return async (dispatch) => {
    const user = await axios.get('/api/auth/whoami');
    dispatch(_checkLogin(user.data));
  }
}

export default function loginStatusReducer(state = {}, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      return { ...action.user };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}
