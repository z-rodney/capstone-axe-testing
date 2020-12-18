import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import {
  mainDarkGreen,
  mainOrange,
  textColorLight,
} from '../styledComponents/globalStyles';

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${mainDarkGreen};
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  /* if sidebar icon is there and I clicked on display it, else make it invisible. */
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '100%')};
`;

export const CloseIcon = styled(FaTimes)`
  color: ${textColorLight};
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: ${textColorLight};
`;

export const SidebarLink = styled(LinkRouter)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: all 0.2s ease-in-out;
  color: ${textColorLight};
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: ${mainOrange};
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 0.95fr;
  grid-template-rows: repeat(5, 80px);
  text-align: center;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    /* SidebarMenu will trigger in this screen size */
    grid-template-rows: repeat(5, 80px);
  }
`;

export const SidebarRoute = styled(LinkRouter)`
  border-radius: 40px;
  background: ${mainOrange};
  white-space: nowrap;
  padding: 10px 30px;
  margin: 10px;
  color: ${textColorLight};
  font-size: 18px;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #01bf71;
    transition: all 0.2s ease-in-out;
    color: ${textColorLight};
  }
`;
