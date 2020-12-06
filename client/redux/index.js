import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import testResultsReducer from './testResults'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'
import loginStatusReducer from './loginStatus'

const reducer = combineReducers({
  locations: locationsReducer,
  testResults: testResultsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer,
  loginStatus: loginStatusReducer
})

export default reducer
