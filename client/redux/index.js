import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'
import loginStatusReducer from './loginStatus'
import getUserPreferencesReducer from './userRiskProfile'

const reducer = combineReducers({
  locations: locationsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer,
  loginStatus: loginStatusReducer,
  userPreferences: getUserPreferencesReducer,
})

export default reducer
