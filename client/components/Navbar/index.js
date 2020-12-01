import React, { useState, useEffect } from 'react';
import { FaBars, FaRegUserCircle } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
// import { BsSearch } from 'react-icons/bs';
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
  NavBtnLink,
  // Form,
  // FormInput,
  // FormButton,
  NavLinkDown,
} from './NavbarElements';
// import Image from '../../../server/public/images/LogoIcon.ico';

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
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome} >
              <GrLocation />
              Proximity
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="/"
                  id="home"
                  // smooth={true}
                  // duration={500}
                  // spy={true}
                  // exact="true"
                  // offset={-80}
                  onClick={toggleHome}
                >
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinkDown
                  to="about-us"
                  id="about-us"
                  // smooth={true}
                  // duration={500}
                  // spy={true}
                  // exact="true"
                  // offset={-80}
                  // onClick={toggleFooter}
                >
                  About Us
                </NavLinkDown>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="/profile"
                  id="profile"
                  // spy={true} exact="true"
                >
                  My Account

                </NavLinks>
              </NavItem>
                <NavIcon>
                    <FaRegUserCircle />
                </NavIcon>
            </NavMenu>
            {/* <NavItem>
              <Form className="search-form" action="#">
                <FormInput
                  className="search-bar"
                  type="text"
                  placeholder="Search"
                />
                <FormButton className="search-button" type="submit">
                  <BsSearch />
                </FormButton>
              </Form>
            </NavItem> */}
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
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
