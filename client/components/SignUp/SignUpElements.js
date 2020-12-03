import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignUpContainer = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(
    108deg,
    rgba(67, 170, 139, 1) 0%,
    rgba(37, 68, 65, 1) 100%
  );
`;

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  display: flex;
  text-decoration: none;
  font-style: oblique;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Roboto Mono', monospace;
  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  background: #b2b09b;
  margin: 0 auto;
  padding: 80px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
`;

export const FormInput = styled.input`
  margin-bottom: 32px;
  padding: 16px 16px;
  border: none;
  font-size: 15px;
  border-radius: 4px;
  background-color: #e5eafa;
`;

export const FormButton = styled.button`
  background: #ec4e20;
  margin-top: 32px;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: #01bf71;
  }
`;

export const FormText = styled.text`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
`;

export const FormLinkP = styled(Link)`
  color: #fff;
  text-align: center;
  font-size: 14px;
  margin: 5px;
  max-width: 600px;
  &:hover {
    color: #ec4e20;
  }
`;
