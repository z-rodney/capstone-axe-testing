import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import testResultsReducer from './testResults'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'
import loginStatusReducer from './loginStatus'
import getUserPreferencesReducer from './userRiskProfile'

const reducer = combineReducers({
  locations: locationsReducer,
  testResults: testResultsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer,
  loginStatus: loginStatusReducer,
  userPreferences: getUserPreferencesReducer,
})

export default reducer
