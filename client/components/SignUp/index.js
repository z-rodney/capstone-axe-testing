import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrLocation } from 'react-icons/gr';
import { signUp } from '../../redux/userSignUp';
import { useHistory } from 'react-router-dom';
import MessageBox from '../MessageBox';
import {
  SignUpContainer,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormText,
  FormLinkP,
  FormButton,
} from './SignUpElements';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatus = useSelector(state => state.signUp);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
    } else {
      dispatch(signUp(username, password, name, history));
    }
  };

  return (
    <>
      <SignUpContainer>
        <FormWrap>
          <Icon to="/">
            <GrLocation />
            Proximity
          </Icon>
          <FormContent>
            <Form className="form" onSubmit={submitHandler}>
              <FormH1>Sign Up For a New Account</FormH1>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormInput
                type="name"
                id="name"
                placeholder="Enter Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
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
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormInput
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              { loginStatus.error ? <MessageBox variant="danger">{loginStatus.error}</MessageBox> : <div /> }
              <FormButton className="primary" type="submit">
                Sign Up
              </FormButton>
              <FormText>Already have an account? </FormText>
              <FormLinkP to="/signin">Login here</FormLinkP>
            </Form>
          </FormContent>
        </FormWrap>
      </SignUpContainer>
    </>
  );
};

export default SignUp;
