import { combineReducers } from 'redux'
import locationsReducer from './userLocations'
import testResultsReducer from './testResults'

const reducer = combineReducers({
  locations: locationsReducer,
  testResults: testResultsReducer
})

export default reducer
