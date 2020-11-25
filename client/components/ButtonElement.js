import styled from 'styled-components';
// import { Link } from 'react-scroll';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? '#43AA8B' : '#010606')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '10px 48px' : '12px 30px')};
  color: ${({ dark }) => (dark ? '#010606' : '#fff')};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  text-decoration: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? '#B2B09B' : '#43AA8B')};
  }
`;
