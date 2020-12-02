import React from 'react'
import { ResultsCard } from '../FriendProfile/StyleElements'
import { RowContainer } from '../styledComponents'

function TestResults() {
  return (
    <ResultsCard>
      <RowContainer>
        <h2>Test Results</h2>
        <button type="button">+</button>
      </RowContainer>
      {}
    </ResultsCard>
  )
}

export default TestResults
