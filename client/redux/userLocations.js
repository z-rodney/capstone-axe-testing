import { GET_LOCATIONS, ADD_LOCATION } from './actionConstants';
import axios from 'axios';


export const _getLocations = (locations) => ({
  type: GET_LOCATIONS,
  locations
})

export const getLocations = (userId) => {
  return async (dispatch) => {
    try {
      const locations = await axios.get(`/api/user/${userId}/locations`);
      dispatch(_getLocations(locations.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export const _addLocation = (location) => ({
  type: ADD_LOCATION,
  location
})

export const addLocation = (location, userId) => {
  return async (dispatch) => {
    try {
      // create location
      const newLocation = await axios.post(`/api/user/${userId}/location`, { location });
      // create relationships between contacts
      await axios.post(`/api/user/${userId}/contact`, { location });
      dispatch(_addLocation(newLocation.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default function locationsReducer(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [...state, action.location];
      case GET_LOCATIONS:
        return [...action.locations];
    default:
      return state;
  }
}
