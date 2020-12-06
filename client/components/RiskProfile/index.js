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
  const p = await axios.get('/api/user/getPreferences')
  setPreferences(p.data)
}
getP()

  //  dispatch(getPreferences)

  //  setPreferences(userPreferences)
}, [])


console.log(preferences)
return (
  <RiskCard>
  <h2>Risk Profile</h2>
  <ul>
    {Object.entries(preferences).map(([key, value]) => {
      return (
        <li className={`pref-${value}`}>{key}</li>
      )
    })}
  </ul>
</RiskCard>
)
}

export default RiskProfile
