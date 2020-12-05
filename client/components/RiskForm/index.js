// redirect to this route upon account creation, path "/my-risk"
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CenteredContainer, Card } from '../styledComponents';
import { FormCard, RadioContainer } from './StyleElements';

export default function RiskForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    data.householdSize *= 1;
    await axios.put('/api/user', data);
    props.history.push('/profile');
  }

  return (
    <CenteredContainer>
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
                <input name="indoorDining" type="radio" id="inlineRadio1" value="yes" ref={ register } />
                <label htmlFor="inlineRadio1">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="indoorDining" type="radio" id="inlineRadio1" value="no" ref={ register } />
                <label htmlFor="inlineRadio1">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Are you comfortable dining outdoors at restaurants, bars, and/or cafes?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="outdoorDining" type="radio" id="inlineRadio2" value="yes" ref={ register } />
                <label htmlFor="inlineRadio2">Yes</label>
              </RadioContainer>
              <RadioContainer>
              <input name="outdoorDining" type="radio" id="inlineRadio2" value="no" ref={ register } />
              <label htmlFor="inlineRadio2">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Are you an essential worker?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="essentialWorker" type="radio" id="inlineRadio3" value="yes" ref={ register } />
                <label htmlFor="inlineRadio3">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="essentialWorker" type="radio" id="inlineRadio3" value="no" ref={ register } />
                <label htmlFor="inlineRadio3">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Are you in a high-risk group or immunocompromised?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="immunocompromised" type="radio" id="inlineRadio4" value="yes" ref={ register } />
                <label htmlFor="inlineRadio4">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="immunocompromised" type="radio" id="inlineRadio4" value="no" ref={ register } />
                <label htmlFor="inlineRadio4">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">How often do you wear a mask in public?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="mask" type="radio" id="inlineRadio5" value="always" ref={ register } />
                <label htmlFor="inlineRadio5">Always</label>
              </RadioContainer>
              <RadioContainer>
                <input name="mask" type="radio" id="inlineRadio5" value="sometimes" ref={ register } />
                <label htmlFor="inlineRadio5">Sometimes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="mask" type="radio" id="inlineRadio5" value="never" ref={ register } />
                <label htmlFor="inlineRadio5">Never</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>

          <FormCard>
            <label className="question">Do you take public transportation?</label>
            <RadioContainer>
              <RadioContainer>
                <input name="pubTrans" type="radio" id="inlineRadio6" value="yes" ref={ register } />
                <label htmlFor="inlineRadio6">Yes</label>
              </RadioContainer>
              <RadioContainer>
                <input name="pubTrans" type="radio" id="inlineRadio6" value="no" ref={ register } />
                <label htmlFor="inlineRadio6">No</label>
              </RadioContainer>
            </RadioContainer>
          </FormCard>
          <FormCard>
            <input type="submit" id="submit-btn" value="Submit" />
          </FormCard>
        </form>
      </Card>
    </CenteredContainer>
  )
}
