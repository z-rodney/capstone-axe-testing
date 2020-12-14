import axios from 'axios';
import { GET_SINGLE_FRIEND } from './actionConstants';


const initialState = {
  name: '',
  username: '',
  userId: '',
  friends: [],
  prefs: {},
  contacts: [],
  results: []
}
export const _getFriendProfile = (friend) => ({
  type: GET_SINGLE_FRIEND,
  friend
})


export const getFriendProfile = (friendId) => {
  return async (dispatch) => {
    try {
      const friends = await axios.get(`/api/friend/${friendId}`);
      dispatch(_getFriendProfile(friends.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function singleFriend(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_FRIEND:
      return {...action.friend};
    default:
      return state;
  }
}
