import axios from 'axios';
import { ADD_PREFERENCES } from './actionConstants';

export const _addPreferences = preferences => ({
  type: ADD_PREFERENCES,
  preferences
})

export const addPreferences = (userId, data, history) => {
  return async (dispatch) => {
    // const preferences = await axios.post(`/api/user/${userId}/addPreferences`, data);
    const preferences = await axios.post('/api/user/addPreferences', data);
    dispatch(_addPreferences(preferences.data));
    history.push('/profile');
  }
}

export default function userPrefsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PREFERENCES:
      return { ...action.preferences };
    default:
      return state;
  }
}
