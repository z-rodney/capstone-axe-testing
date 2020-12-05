import axios from 'axios';
import { USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from './actionConstants';
import { checkLogin } from './loginStatus';

export const _signUpRequest = () => ({
  type: USER_SIGNUP_REQUEST
})

export const _signUpSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

export const _signUpFailure = error => ({
  type: USER_SIGNUP_FAIL,
  payload:
  error.response && error.response.data.message
    ? error.response.data.message
    : error.message
})

export const signUp = (username, password, name, history) => {
  return async (dispatch) => {
    dispatch(_signUpRequest());
    try {
      await axios.post('/api/user/', {
        username,
        password,
        name
      });
      dispatch(checkLogin());
      dispatch(_signUpSuccess());
      history.push('/my-risk');
    } catch (error) {
      dispatch(_signUpFailure(error));
    }
  }
};

export default function userSignUpReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
