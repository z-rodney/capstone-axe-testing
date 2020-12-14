/* eslint-disable complexity */
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
      <Link to="/edit/my-risk">
        <IconContext.Provider value={{ color: 'white'}}>
          <RiPencilFill />
        </IconContext.Provider>
      </Link>
    </span>
  )
}

const RiskProfile = ({forFriend}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginStatus.userId);
  const userPrefs = useSelector(state => state.userPrefs);
  const friendPrefs = useSelector(state => state.singleFriend.prefs)
  const {
    householdSize,
    indoorDining,
    outdoorDining,
    immunocompromised,
    essentialWorker,
    mask,
    pubTrans
  } = forFriend ? friendPrefs : userPrefs;

  useEffect(() => {
    if (!forFriend) {
      dispatch(getPreferences(userId));
    }
  }, [userId, householdSize, indoorDining, outdoorDining, immunocompromised, essentialWorker, mask, pubTrans])

  return (
    <RiskCard>
      <h2>
        Risks and Preferences
        {!forFriend && <EditButton /> }
      </h2>
      { (userPrefs || friendPrefs ) ?
        <div className="no-bullet">
          <p>Household Size: { householdSize }</p>
          <p>Wears a Mask: { mask ? 'YES' : 'NO' }</p>
          <p>Essential Worker: { essentialWorker ? 'YES' : 'NO' }</p>
          <p>Immunocompromised: { immunocompromised ? 'YES' : 'NO' }</p>
          <p>Public Transit: { pubTrans ? 'YES' : 'NO' }</p>
          <p>Indoor Dining: { indoorDining ? 'YES' : 'NO' }</p>
          <p>Outdoor Dining: { outdoorDining ? 'YES' : 'NO' }</p>
        </div> : <div>No Preferences Found</div>
      }
    </RiskCard>
  )
}

export default RiskProfile
