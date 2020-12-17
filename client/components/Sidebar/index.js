import React from 'react';
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SideBtnWrap,
  SidebarRoute,
  SidebarWrapper,
  SidebarLink,
  SidebarMenu,
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle, toggleFooter }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            Home
          </SidebarLink>
          <SidebarLink to="/about-us" onClick={toggleFooter}>
            About Us
          </SidebarLink>
          <SidebarLink to="/profile" onClick={toggle}>
            My Account
          </SidebarLink>
          <SidebarLink to="/friends" onClick={toggle}>
            Friends
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signin">Log In</SidebarRoute>
        </SideBtnWrap>
        <SideBtnWrap>
          <SidebarRoute to="/signup">Sign Up</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
