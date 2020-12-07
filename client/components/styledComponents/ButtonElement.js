import styled from 'styled-components';
// import { Link } from 'react-scroll';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? '#EC4E20' : '#01bf71')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '10px 48px' : '12px 30px')};
  color: ${({ dark }) => (dark ? '#fff' : '#010606')};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '18px')};
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
    background: ${({ primary }) => (primary ? '#01bf71' : '#43AA8B')};
  }
`;
