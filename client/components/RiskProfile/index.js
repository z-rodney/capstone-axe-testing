import React from 'react'
import { RiskCard } from './StyleElements'

//temp settings until db set up
const riskSettings = [
  {
    setting: 'Mask',
    preference: true,
  },
  {
    setting: 'Indoor Dining',
    preference: false,
  },
  {
    setting: 'Outdoor Dining',
    preference: true,
  }
]

const RiskProfile = ({risks = riskSettings}) => {
  return (
    <RiskCard>
    <h2>Risk Profile</h2>
    <ul>
      {risks.map(risk => {
        const {setting, preference} = risk
        return (
          <li className={`pref-${preference}`}>{setting}</li>
        )
      })}
    </ul>
  </RiskCard>
  )
}

export default RiskProfile
