import axios from 'axios';
import { GET_FRIENDS } from './actionConstants';


export const _getFriends = (friends) => ({
    type: GET_FRIENDS,
    friends
  })

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
      case GET_FRIENDS:
        return [ ...action.friends];
      default:
        return state;
    }
  }
