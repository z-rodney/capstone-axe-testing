import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  mainLightGreen,
  mainOrange,
  textColorLight,
  textColorDark,
} from '../styledComponents/globalStyles';

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? mainOrange : '#01bf71')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '10px 48px' : '12px 30px')};
  color: ${({ light }) => (light ? textColorLight : textColorDark)};
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
    background: ${({ primary }) => (primary ? '#01bf71' : mainLightGreen)};
    color: ${textColorLight};
  }
`;
