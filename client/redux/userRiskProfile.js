import {GET_USER_PREFERENCES} from './actionConstants'
import axios from 'axios'


export const _getPreferences = (user) => ({
    type: GET_USER_PREFERENCES,
    user
})

export const getPreferences = () => {
    return async (dispatch) => {
      const user = await axios.get('/api/user/getPreferences');
      dispatch(_getPreferences(user.data));
    }
  }

  export default function getUserPreferencesReducer(state = {}, action) {
    switch (action.type) {
      case GET_USER_PREFERENCES:
        return { ...state, preferences: action.user };
      default:
        return state;
    }
  }
