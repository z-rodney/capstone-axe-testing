import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../styledComponents';
import { FormCard, RadioContainer, CenterWrapper } from './StyleElements';
import { addPreferences } from '../../redux/userPrefs';

export default function RiskForm() {

  const { register, handleSubmit, errors } = useForm();
  const userId = useSelector(state => state.loginStatus.userId)
  const dispatch = useDispatch();
  const history = useHistory();

  const stringToBool = (str) => {
    return (str === 'true');
  }

  const onSubmit = (data) => {
    data.householdSize *= 1;
    data.indoorDining = stringToBool(data.indoorDining);
    data.outdoorDining = stringToBool(data.outdoorDining);
    data.immunocompromised = stringToBool(data.immunocompromised);
    data.essentialWorker = stringToBool(data.essentialWorker);
    data.mask = stringToBool(data.mask);
    data.pubTrans = stringToBool(data.pubTrans);
    dispatch(addPreferences(userId, data, history));
  }

  return (
    <CenterWrapper>
      <Link to="/profile">{`< Cancel`}</Link>
      <Card>
        <h3>Please fill in the following details on your preferences.</h3>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <FormCard>
            <label className="question">What is your household size, including yourself?</label>
            <br />
            <select name="householdSize" ref={ register({ required: true }) }>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            { errors.householdSize && <span>This field is required.</span>}
          </FormCard>

          <FormCard>
            <label className="question">Are you comfortable dining indoors at restaurants, bars, and/or cafes?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="indoorDining" type="radio" id="inlineRadio1" value={true} ref={ register } />
                <label htmlFor="inlineRadio1">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="indoorDining" type="radio" id="inlineRadio1" value={false} ref={ register } />
                <label htmlFor="inlineRadio1">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Are you comfortable dining outdoors at restaurants, bars, and/or cafes?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="outdoorDining" type="radio" id="inlineRadio2" value={true} ref={ register } />
                <label htmlFor="inlineRadio2">Yes</label>
              </RadioContainer>
              <RadioContainer>
              <input name="outdoorDining" type="radio" id="inlineRadio2" value={false} ref={ register } />
              <label htmlFor="inlineRadio2">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Are you an essential worker?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="essentialWorker" type="radio" id="inlineRadio3" value={true} ref={ register } />
                <label htmlFor="inlineRadio3">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="essentialWorker" type="radio" id="inlineRadio3" value={false} ref={ register } />
                <label htmlFor="inlineRadio3">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Are you in a high-risk group or immunocompromised?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="immunocompromised" type="radio" id="inlineRadio4" value={true} ref={ register } />
                <label htmlFor="inlineRadio4">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="immunocompromised" type="radio" id="inlineRadio4" value={false} ref={ register } />
                <label htmlFor="inlineRadio4">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Do you always wear a mask in public?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="mask" type="radio" id="inlineRadio5" value={true} ref={ register } />
                <label htmlFor="inlineRadio5">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="mask" type="radio" id="inlineRadio5" value={false} ref={ register } />
                <label htmlFor="inlineRadio5">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Do you take public transportation?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="pubTrans" type="radio" id="inlineRadio6" value={true} ref={ register } />
                <label htmlFor="inlineRadio6">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="pubTrans" type="radio" id="inlineRadio6" value={false} ref={ register } />
                <label htmlFor="inlineRadio6">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>
          <FormCard>
            <input type="submit" id="submit-btn" value="Submit" />
          </FormCard>
        </form>
      </Card>
    </CenterWrapper>
  )
}
