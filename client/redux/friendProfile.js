import axios from 'axios';
import { GET_SINGLE_FRIEND } from './actionConstants';



export const _getFriendProfile = (friends) => ({
  type: GET_SINGLE_FRIEND,
  friends
})


export const getFriendProfile = (userId) => {
  return async (dispatch) => {
    try {
      const friends = await axios.get(`/api/user/${userId}`);
      dispatch(_getFriendProfile(friends.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function singleFriend(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_FRIEND:
      return {...action.friends};
    default:
      return state;
  }
}