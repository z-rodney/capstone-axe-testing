import axios from 'axios';
import { ADD_PREFERENCES, GET_PREFERENCES, UPDATE_PREFERENCES } from './actionConstants';

export const _addPreferences = preferences => ({
  type: ADD_PREFERENCES,
  preferences
})

export const _getPreferences = preferences => ({
  type: GET_PREFERENCES,
  preferences
})

const _updatePreferences = preferences => ({
  type: UPDATE_PREFERENCES,
  preferences
})

export const addPreferences = (userId, data, history) => {
  return async (dispatch) => {
    const preferences = await axios.post(`/api/user/${userId}/preferences`, data);
    dispatch(_addPreferences(preferences.data));
    history.push('/profile');
  }
}

export const getPreferences = (userId) => {
  return async (dispatch) => {
    const preferences = await axios.get(`/api/user/${userId}/preferences`);
    dispatch(_getPreferences(preferences.data));
  }
}

export const updatePreferences = (userId, data, history) => {
  return async (dispatch) => {
    const preferences = await axios.put(`/api/user/${userId}/preferences`, data);
    dispatch(_updatePreferences(preferences.data));
    history.push('/profile');
  }
}

export default function userPrefsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PREFERENCES:
      return { ...action.preferences };
    case GET_PREFERENCES:
      return { ...action.preferences };
    case UPDATE_PREFERENCES:
      return { ...action.preferences };
    default:
      return state;
  }
}
