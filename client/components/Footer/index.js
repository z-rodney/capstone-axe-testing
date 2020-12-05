import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { animateScroll as scroll } from 'react-scroll';

import {
  FooterContainer,
  FooterLink,
  FooterLinkItems,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterWrap,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  FooterLinkP,
} from './FooterElements';

const toggleHome = () => {
  scroll.scrollToTop();
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems id="about-us">
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="/">Who We Are</FooterLink>
              <FooterLink to="/">How Proximity Works</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems id="contact-us">
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLinkP to="/">250 Capstone Ave, New York, NY 10004</FooterLinkP>
              <FooterLinkP to="/">(707) 707-0770</FooterLinkP>
              <FooterLinkP to="/">capstone-heroes@fullstackacademy.com</FooterLinkP>
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
    </FooterContainer>
  );
};

export default Footer;
