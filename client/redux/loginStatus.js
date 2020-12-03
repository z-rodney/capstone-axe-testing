import axios from 'axios';
import { CHECK_LOGIN } from './actionConstants';

export const _checkLogin = (username) => ({
  type: CHECK_LOGIN,
  username
})

export const checkLogin = () => {
  return async (dispatch) => {
    const username = await axios.get('/api/auth/whoami');
    dispatch(_checkLogin(username.data));
  }
}

export default function loginStatusReducer(state = {}, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      return { username: action.username };
    default:
      return state;
  }
}
