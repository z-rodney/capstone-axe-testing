import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userLogin';
import { GrLocation } from 'react-icons/gr';
import MessageBox from '../Home/MessageBox';
import {
  SignInContainer,
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
} from './SignInElements';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const userSignIn = useSelector((state) => state.userSignIn);
  // const { userInfo, error } = userSignIn;

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push(redirect);
  //   }
  // }, [props.history, redirect, userInfo]);

  return (
    <>
      <SignInContainer>
        <FormWrap>
          <Icon to="/">
            <GrLocation />
            Proximity
          </Icon>
          <FormContent>
            <Form className="form" onSubmit={submitHandler}>
              <FormH1>Log In To Your Account</FormH1>
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
