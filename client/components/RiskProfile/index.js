import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreferences } from '../../redux/userPrefs';
import { RiskCard } from './StyleElements';

const RiskProfile = () => {
  var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginStatus.userId);
  const userPrefs = useSelector(state => state.userPrefs);

  useEffect(() => {
    if (id === 'profile') {
      dispatch(getPreferences(userId));
    }
    else {
      dispatch(getPreferences(id))
    }
  }, [userId, id])

  return (
    <RiskCard>
      <h2>Risks and Preferences</h2>
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
