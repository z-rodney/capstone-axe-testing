import axios from 'axios';
import { ADD_FRIEND } from './actionConstants';

export const _addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend
})

export const addFriend = (friendId, userId) => {
  return async (dispatch) => {
    try {
      const friend = await axios.post(`/api/user/${userId}/addFriend`, { friendId });
      dispatch(_addFriend(friend.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function friendsReducer(state = [], action) {
  switch (action.type) {
    case ADD_FRIEND:
      return [ ...state, action.friend ];
    default:
      return state;
  }
}
