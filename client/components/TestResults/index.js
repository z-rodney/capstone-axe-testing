import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getTestResults, addTestResults } from '../../redux/testResults'
import { TestCard, FormQuestion, Submit, OuterWrapper  } from './StyleElements'
import { RowContainer, ColumnContainer, ResultsCard } from '../styledComponents'


/**
 * Form component for adding test results. Appears if user clicks on the + button.
 *
 * @param {*} { setShowForm }
 * @return {*}
 */
function TestResultForm({ setShowForm }) {
  const userId = useSelector(state => state.loginStatus.userId)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data, ev) => {
    dispatch(addTestResults(data, userId))
    ev.target.reset()
    setShowForm(false)
  }

  return (
    <TestCard>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <ColumnContainer>
          <div>
            <FormQuestion className="question">Test Result:</FormQuestion>
            <OuterWrapper>
              <RowContainer>
                <input name="covidTest" type="radio" id="result-pos" value="Positive" required ref={ register } />
                <label htmlFor="result-pos">Positive</label>
              </RowContainer>
              <RowContainer>
                <input name="covidTest" type="radio" id="result-neg" value="Negative" ref={ register } />
                <label htmlFor="result-neg">Negative</label>
              </RowContainer>
              {errors.result && 'Please indicate a test result'}
            </OuterWrapper>
          </div>
          <div>
            <FormQuestion className="question">Test Date:</FormQuestion>
            <input name="testDate" type="date" id="testDate" ref={register} required pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" />
            {errors.result && 'Please enter a date'}
          </div>
          <Submit type="submit" id="submit-result" value="Submit" />
        </ColumnContainer>
      </form>
    </TestCard>
  )
}


/**
 * Component to display a user or their friend's test results in a list.
 * User can click on the + to bring up a form to add test results if !forFriend.
 *
 * @param {*} { forFriend }
 * @return {*}
 */
function TestResults({ forFriend }) {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector(state => state.loginStatus.userId)
  const userResults = useSelector(state => state.testResults)
  const friendId = useSelector(state => state.singleFriend.userId)
  const friendResults = useSelector(state => state.singleFriend.results)

  useEffect(() => {
    if (!forFriend) {
      dispatch(getTestResults(userId));
    }
  }, [userId, userResults.length, friendId])

  const results = (forFriend ? friendResults : userResults )
  return (
    <ResultsCard>
      <h2>
        Test Results
        {!forFriend && <span className="plus-button" onClick={() => { setShowForm(!showForm) }}>+</span> }
      </h2>
      {showForm && <TestResultForm setShowForm={setShowForm} />}
      <ul className="no-bullet">
        {(results && results.length) ?
          results.map((test, id) => {
            return (
              <li key={id}>{test.covidTest}: {new Date(test.testDate).toDateString()}</li>
            )
          }) :
          <li>
            <p>
              No tests results available.
            </p>
          </li>}
      </ul>
    </ResultsCard>
  )
}

export default TestResults
