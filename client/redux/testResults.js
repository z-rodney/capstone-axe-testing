import axios from 'axios'
import { ADD_TEST_RESULTS, GET_TEST_RESULTS } from './actionConstants'

const _getTestResults = (results) => ({
  type: GET_TEST_RESULTS,
  results
})

const _addTestResults = (result) => ({
  type: ADD_TEST_RESULTS,
  result
})

export const getTestResults = (userId) => {
  return async (dispatch) => {
    try {
      const allResults = await axios.get(`/api/user/${userId}/results`)
      dispatch(_getTestResults(allResults.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addTestResults = (results, id) => {
  return async (dispatch) => {
    try {
      const testResults = await axios.post(`/api/user/${id}/results`, results)
      dispatch(_addTestResults(testResults.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function testResultsReducer(state = [], action) {
  switch (action.type) {
    case GET_TEST_RESULTS:
      return [...action.results]
    case ADD_TEST_RESULTS:
      return [action.result, ...state]
    default:
      return state
  }
}
