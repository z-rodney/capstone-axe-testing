import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FaBars, FaRegUserCircle } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { animateScroll as scroll } from 'react-scroll';
import { IconContext } from 'react-icons/lib';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavLinks,
  NavMenu,
  NavItem,
  NavIcon,
  NavBtn,
  NavLinkDown,
} from './NavbarElements';
import { loginFromSession } from '../../redux/loginStatus';
import { logout } from '../../redux/userLogin';
import { getCookieValue } from '../../../server/utils';

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  const userInfo = useSelector((state) => state.loginStatus);
  const { userId } = userInfo;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const sessionId = getCookieValue('sessionId');
    if (sessionId) {
      dispatch(loginFromSession(sessionId));
    }
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const toggleFooter = () => {
    scroll.scrollToBottom();
  };

  const logoutSubmit = () => {
    const sessionId = getCookieValue('sessionId');
    dispatch(logout(sessionId));
    history.push('/');
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              <GrLocation />
              Proximity
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to="/" id="home" onClick={toggleHome}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinkDown to="about-us" id="about-us" onClick={toggleFooter}>
                  About Us
                </NavLinkDown>
              </NavItem>
              {userId ? (
                <NavMenu>
                  <NavItem>
                    <NavLinks to="/profile" id="profile">
                      My Account
                    </NavLinks>
                    <NavIcon>
                      <FaRegUserCircle />
                    </NavIcon>
                  </NavItem>
                  <NavItem>
                    <NavLinks to="/friends" id="friends">
                      Friends
                    </NavLinks>
                  </NavItem>
                  <NavItem>
                    <NavBtn onClick={logoutSubmit}>
                      <Link to="/" id="signout">
                        Log Out
                      </Link>
                    </NavBtn>
                  </NavItem>
                </NavMenu>
              ) : (
                <NavItem>
                  <NavBtn>
                    <Link to="/signin" id="signin">
                      Log In
                    </Link>
                  </NavBtn>
                  <NavBtn>
                    <Link to="/signup" id="signup">
                      Sign Up
                    </Link>
                  </NavBtn>
                </NavItem>
              )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
