import React, { useState, useEffect } from 'react';
import { FaBars, FaRegUserCircle } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { animateScroll as scroll } from 'react-scroll';
import { IconContext } from 'react-icons/lib';
import {
  Nav,
  NavbarContainer,
  NavWrap,
  NavLogo,
  MobileIcon,
  NavLinks,
  NavMenu,
  NavItem,
  NavIcon,
  NavBtn,
  NavBtnLink,
  NavLinkDown,
} from './NavbarElements';

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const toggleFooter = () => {
    scroll.scrollToBottom();
  };

  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav scrollNav={scrollNav}>
        <NavWrap>
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
                <NavLinkDown
                  to="about-us"
                  id="about-us"
                  onClick={toggleFooter}
                >
                  About Us
                </NavLinkDown>
              </NavItem>
              <NavItem>
                <NavLinks to="/profile" id="profile">
                  My Account
                </NavLinks>
                <NavIcon>
                  <FaRegUserCircle />
                </NavIcon>
              </NavItem>
            </NavMenu>
            <NavItem>
              <NavBtn>
                <NavBtnLink to="/signin" id="signin">
                  Log In
                </NavBtnLink>
              </NavBtn>
              <NavBtn>
                <NavBtnLink to="/signup" id="signup">
                  Sign Up
                </NavBtnLink>
              </NavBtn>
            </NavItem>
          </NavbarContainer>
        </NavWrap>
      </Nav>
    </IconContext.Provider>
    </>
  );
};

export default Navbar;
