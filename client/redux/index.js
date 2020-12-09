import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import testResultsReducer from './testResults'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'
import loginStatusReducer from './loginStatus'
import userPrefsReducer from './userPrefs'
import friendsReducer from './friends'

const reducer = combineReducers({
  locations: locationsReducer,
  testResults: testResultsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer,
  loginStatus: loginStatusReducer,
  userPrefs: userPrefsReducer,
  userFriends: friendsReducer
})

export default reducer
