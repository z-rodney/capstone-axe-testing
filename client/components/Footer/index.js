import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { animateScroll as scroll } from 'react-scroll';

import {
  FooterLink,
  FooterLinkItems,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterWrap,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
} from './FooterElements';

const toggleHome = () => {
  scroll.scrollToTop();
};

const Footer = () => {
  return (
    <FooterWrap>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinkItems id="about-us">
            <FooterLinkTitle>About Us</FooterLinkTitle>
            <FooterLink to="/">Who We Are</FooterLink>
            <FooterLink to="/">How Proximity Works</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
      </FooterLinksContainer>
      <SocialMediaWrap>
        <SocialLogo to="/" onClick={toggleHome}>
          <GrLocation />
          Proximity
        </SocialLogo>
        <WebsiteRights>
          Designed by <i>Capstone Heroes Team - </i> Copyright &copy;
          {new Date().getFullYear()} Proximity. All rights reserved.
        </WebsiteRights>
      </SocialMediaWrap>
    </FooterWrap>
  );
};

export default Footer;
