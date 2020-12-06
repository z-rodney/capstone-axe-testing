import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import testResultsReducer from './testResults'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'
import loginStatusReducer from './loginStatus'
import searchFriendsReducer from './searchFriends'
import friendsReducer from './friends'

const reducer = combineReducers({
  locations: locationsReducer,
  testResults: testResultsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer,
  loginStatus: loginStatusReducer,
  searchResults: searchFriendsReducer,
  friends: friendsReducer
})

export default reducer
