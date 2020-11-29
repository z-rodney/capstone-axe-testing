import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

export const Nav = styled.nav`
  ${'' /* background: ${({ scrollNav }) => (scrollNav ? '#43AA8B' : 'transparent')}; */}
  background: #254441;
  height: 80px;
  ${'' /* margin-top: -80px; */}
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    /* Nav will trigger in this screen size */
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  max-width: 1600px;
  z-index: 1;
`;

export const NavLogo = styled(LinkRouter)`
  color: #fff;
  display: flex;
  justify-self: flex-start;
  align-items: center;
  font-size: 1.5rem;
  font-style: oblique;
  font-weight: bold;
  text-decoration: none;
  margin: 5;
  cursor: pointer;

  @media screen and (max-width: 868px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    position: absolute;
    top: 20px;
    left: 10px;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  color: #fff;

  @media screen and (max-width: 860px) {
    /* MobileIcon will trigger in this screen size */
    display: block;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -10px;

  @media screen and (max-width: 860px) {
    /* NavMenu will trigger in this screen size */
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  padding: 0 1rem;
`;

export const NavIcon = styled.div`
  color: #fff;
  height: 100px;
  width: 80px;
  display: flex;
  align-items: center;
  align-self: left;
  margin: 0;
  padding: 0;
  `;

export const NavLinks = styled(LinkRouter)`
  color: #fff;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  text-decoration: none;
  cursor: pointer;
  ${'' /* width: 100%; */}

  &:active {
    color: #01bf71;
    border-bottom: 3px solid #01bf71;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #EC4E20;
  }
`;

export const NavLinkDown = styled(LinkScroll)`
  color: #fff;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  text-decoration: none;
  cursor: pointer;
  ${'' /* width: 100%; */}

  &.active {
    border-bottom: 3px solid #01bf71;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #EC4E20;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;

  @media screen and (max-width: 860px) {
    /* NavBtn will trigger in this screen size */
    display: none;
  }
`;

export const NavBtnLink = styled(LinkRouter)`
  border-radius: 50px;
  background: #EC4E20;
  white-space: nowrap;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 18px;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #01bf71;
    transition: all 0.2s ease-in-out;
    color: #fff;
  }
`;

