import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getPreferences } from '../../redux/userPrefs';
import { RiskCard } from './StyleElements';
import { IconContext } from 'react-icons'
import { RiPencilFill } from 'react-icons/ri'

const EditButton = () => {
  return (
    <span className="plus-button">
      <Link to="/my-risk">
        <IconContext.Provider value={{ color: 'white'}}>
          <RiPencilFill />
        </IconContext.Provider>
      </Link>
    </span>
  )
}

const RiskProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginStatus.userId);
  const userPrefs = useSelector(state => state.userPrefs);

  useEffect(() => {
    if (userId) {
      dispatch(getPreferences(userId));
    }
  }, [userId])

  return (
    <RiskCard>
      <h2>
        Risks and Preferences
        <EditButton />
      </h2>
      { userPrefs ?
        <div className="no-bullet">
          <p>Household Size: { userPrefs.householdSize }</p>
          <p>Wears a Mask: { userPrefs.mask ? 'YES' : 'NO' }</p>
          <p>Essential Worker: { userPrefs.essentialWorker ? 'YES' : 'NO' }</p>
          <p>Immunocompromised: { userPrefs.immunocompromised ? 'YES' : 'NO' }</p>
          <p>Public Transit: { userPrefs.pubTrans ? 'YES' : 'NO' }</p>
          <p>Indoor Dining: { userPrefs.indoorDining ? 'YES' : 'NO' }</p>
          <p>Outdoor Dining: { userPrefs.outdoorDining ? 'YES' : 'NO' }</p>
        </div> : <div>No Preferences Found</div>
      }
    </RiskCard>
  )
}

export default RiskProfile
