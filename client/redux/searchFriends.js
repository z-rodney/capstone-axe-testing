import axios from 'axios';
import { GET_SEARCH_RESULTS } from './actionConstants';

export const _searchFriends = (results) => ({
  type: GET_SEARCH_RESULTS,
  results
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

export default function searchFriendsReducer(state = [], action) {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return [...action.results]
    default:
      return state
  }
}
