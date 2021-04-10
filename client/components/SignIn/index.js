import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userLogin';
import { useHistory, Redirect } from 'react-router-dom';
import MessageBox from '../MessageBox';
import {
  SignInContainer,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormText,
  FormLinkP,
  FormButton,
} from './SignInElements';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatus = useSelector(state => state.login);
  const userId = useSelector(state => state.loginStatus.userId);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password, history));
  };

  return (
    <>
      {/* Redirects to profile if user is logged in.
       Also prevents sign in form from appearing again after
       logging in from a re-directed private route. */}
      {userId && <Redirect to="/profile" />
      }
      <SignInContainer>
        <FormWrap>
          <FormContent>
            <Form className="form" onSubmit={submitHandler}>
              <FormH1>Log In To Your Account</FormH1>
              <FormLabel htmlFor="email">Username (Email)</FormLabel>
              <FormInput
                type="email"
                id="email"
                placeholder="Enter Email"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                id="password"
                placeholder="Enter Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              { loginStatus.error ? <MessageBox variant="danger">{loginStatus.error}</MessageBox> : <div /> }
              <FormButton className="primary" type="submit">
                Log In
              </FormButton>
              <FormText>Forgot Password?</FormText>
              <FormLinkP to="/#">Get a new password here</FormLinkP>
              <FormText>No Account Yet?</FormText>
              <FormLinkP to="/signup">Sign-Up here</FormLinkP>
            </Form>
          </FormContent>
        </FormWrap>
      </SignInContainer>
    </>
  );
};

export default SignIn;
