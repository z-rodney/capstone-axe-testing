import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from './actionConstants';
import { checkLogin } from './loginStatus';
import { clearPreferences } from './userPrefs';

export const _loginRequest = () => ({
  type: USER_LOGIN_REQUEST
})

export const _loginSuccess = () => ({
  type: USER_LOGIN_SUCCESS
})

export const _loginFailure = (error) => ({
  type: USER_LOGIN_FAIL,
  payload:
  error.response && error.response.data.message
    ? error.response.data.message
    : error.message
})

export const _logout = () => ({
  type: USER_LOGOUT
})

export const login = (username, password, history) => {
  return async (dispatch) => {
    dispatch(_loginRequest());
    try {
      await axios.post('/api/auth/login', {
        username,
        password,
      });
      dispatch(_loginSuccess());
      dispatch(checkLogin());
      history.push('/profile');
    } catch (error) {
      dispatch(_loginFailure(error));
    }
  }
};

export const logout = (sessionId) => {
  return async (dispatch) => {
    await axios.delete(`/api/auth/logout/${sessionId}`);
    dispatch(_logout());
    dispatch(checkLogin());
    dispatch(clearPreferences());
  }
};

export default function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}
