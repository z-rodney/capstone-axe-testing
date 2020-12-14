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

const RiskProfile = () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginStatus.userId);
  const userPrefs = useSelector(state => state.userPrefs);
  const friendId = useSelector(state => state.singleFriend.userId)
  const {
    householdSize,
    indoorDining,
    outdoorDining,
    immunocompromised,
    essentialWorker,
    mask,
    pubTrans
  } = userPrefs;

  useEffect(() => {
    if (id === 'profile') {
      dispatch(getPreferences(userId));
    }
    else {
      dispatch(getPreferences(friendId))
    }
  }, [userId, id, householdSize, indoorDining, outdoorDining, immunocompromised, essentialWorker, mask, pubTrans])

  return (
    <RiskCard>
      <h2>
        Risks and Preferences
        {id === 'profile' ? <EditButton /> : null}
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
