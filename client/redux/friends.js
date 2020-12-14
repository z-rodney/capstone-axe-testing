/* eslint-disable no-console */
import axios from 'axios';
import { ADD_FRIEND, GET_FRIENDS } from './actionConstants';

export const _addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend
})

export const _getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends
})

export const addFriend = (friendId, userId) => {
  return async (dispatch) => {
    try {
      const friend = await axios.post(`/api/user/${userId}/friend`, { friendId });
      dispatch(_addFriend(friend.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export const getFriends = (userId) => {
  return async (dispatch) => {
    try {
      const friends = await axios.get(`/api/user/${userId}/friends`);
      dispatch(_getFriends(friends.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function friendsReducer(state = [], action) {
  switch (action.type) {
    case ADD_FRIEND:
      return [ ...state, action.friend ];
    case GET_FRIENDS:
      return [ ...action.friends ];
    default:
      return state;
  }
}

