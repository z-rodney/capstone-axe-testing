import axios from 'axios'
import { ADD_TEST_RESULTS } from './actionConstants'

const _addTestResults = (results) => ({
  type: ADD_TEST_RESULTS,
  results
})

export const addTestResults = (results) => {
  return async (dispatch) => {
    try {
      const testResults = await axios.post('SOME URL HERE', results)
      dispatch(_addTestResults(testResults.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function testResultsReducer(state = [], action) {
  switch (action.type) {
    case ADD_TEST_RESULTS:
      return [action.results, ...state]
    default:
      return state
  }
}
