import axios from 'axios'
import { ADD_LOCATION } from './actionConstants'

export const _addLocation = (location) => ({
  type: ADD_LOCATION,
  location
})

export const addLocation = (location) => {
  return async (dispatch) => {
    try {
      //await axios.post('api/users/API URL HERE', {location})
      dispatch(_addLocation(location))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//temp state until hooked up to the backend
const tempInitialState = [
  [-73.96666700000003, 40.785167],
  [-73.96900904305689, 40.6627416764545],
  [-73.92555771551504, 40.87191365945296]
]

export default function locationsReducer(state = tempInitialState, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [action.location, ...state]
    default:
      return state
  }
}
