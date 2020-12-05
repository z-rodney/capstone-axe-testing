import axios from 'axios';
import { ADD_PREFERENCES } from './actionConstants';

export const _addPreferences = preferences => ({
  type: ADD_PREFERENCES,
  preferences
})

export const addPreferences = (data) => {
  return async (dispatch) => {
    dispatch(_addPreferences(preferences));
  }
}

export default function userPrefsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PREFERENCES:
      return { ...state, preferences: action.preferences };
    default:
      return state;
  }
}
