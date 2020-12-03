import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import userLoginReducer from './userLogin'
import userSignUpReducer from './userSignUp'

const reducer = combineReducers({
  locations: locationsReducer,
  login: userLoginReducer,
  signUp: userSignUpReducer
})

export default reducer
