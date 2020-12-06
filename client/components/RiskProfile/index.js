import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getPreferences from '../../redux/userRiskProfile'
import { RiskCard } from './StyleElements'
import axios from 'axios'

//Having trouble connecting state to redux store with new hooks (useDispatch, userSelector)

const RiskProfile = () => {

const [preferences, setPreferences] = useState({})

// const dispatch = useDispatch()
// const userPreferences = useSelector((state) => state.userPreferences)

useEffect(() => {
  const getP = async() => {
  const p = await axios.get('/api/user/063b50cc-4dd1-411b-b4fd-de80a4f9328d/getPreferences')
  setPreferences(p.data)
}
getP()

  //  dispatch(getPreferences)

  //  setPreferences(userPreferences)
}, [])

return (
  <RiskCard>
  <h2>Risk Profile</h2>
  <ul>
    {Object.entries(preferences).map(([key, value]) => {
      return (
        <li key = {key} className={`pref-${value}`}>{typeof value === 'number' ? `${key} (${value})` : key}</li>
      )
    })}
  </ul>
</RiskCard>
)
}

export default RiskProfile
