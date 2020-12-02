import { combineReducers } from 'redux'
import locationsReducer from './userLocations'

const reducer = combineReducers({
  locations: locationsReducer,
})

export default reducer
