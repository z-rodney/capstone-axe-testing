import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrLocation } from 'react-icons/gr';
import { signUp } from '../../redux/userSignUp';
import MessageBox from '../Home/MessageBox';
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
// import Axios from 'axios';

const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const userSignUp = useSelector((state) => state.userSignUp);
  // const { userInfo, error } = userSignUp;
  // const userInfo = await Axios.get('/api/auth/whoami')

  // const redirect = props.location.search
  //   ? props.location.search.split('=')[1]
  //   : '/';

  // console.log(props.location.search);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
    } else {
      dispatch(signUp(username, password));
    }
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push(redirect);
  //   }
  // }, [props.history, redirect, userInfo]);

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
              <FormH1>Sign Up to a New Account</FormH1>
              {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
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
              <FormButton className="primary" type="submit">
                Sign Up
              </FormButton>
              <FormText>Already have an account? </FormText>
              <FormLinkP to="/signin">Log-In here</FormLinkP>
            </Form>
          </FormContent>
        </FormWrap>
      </SignUpContainer>
    </>
  );
};

export default SignUp;
