import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'
import loginStatusReducer from './loginStatus'
import userPrefsReducer from './userPrefs'

const reducer = combineReducers({
  locations: locationsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer,
  loginStatus: loginStatusReducer,
  userPrefs: userPrefsReducer
})

export default reducer
