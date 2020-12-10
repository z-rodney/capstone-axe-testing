import axios from 'axios';
import { GET_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS, CLEAR_SEARCH } from './actionConstants';

export const _searchFriends = (results) => ({
  type: GET_SEARCH_RESULTS,
  results
})

export const _updateFriends = (friendId) => ({
  type: UPDATE_SEARCH_RESULTS,
  friendId
})

export const _clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const searchFriends = (searchTerm) => {
  return async (dispatch) => {
    try {
      const results = await axios.post('/api/user/search', { searchTerm });
      dispatch(_searchFriends(results.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export const updateFriends = (friendId) => {
  return (dispatch) => {
    dispatch(_updateFriends(friendId));
  }
}

export const clearSearch = () => {
  return (dispatch) => {
    dispatch(_clearSearch());
  }
}

export default function searchFriendsReducer(state = [], action) {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return [...action.results];
    case UPDATE_SEARCH_RESULTS:
      return [...state.filter(result => result.userId !== action.friendId)];
    case CLEAR_SEARCH:
      return [];
    default:
      return state
  }
}
