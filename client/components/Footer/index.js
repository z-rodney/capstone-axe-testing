import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { animateScroll as scroll } from 'react-scroll';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';

import {
  FooterContainer,
  FooterLink,
  FooterLinkItems,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterWrap,
  SocialIconLink,
  SocialIcons,
  SocialMediaWrap,
  SocialMedia,
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
              <FooterLink to="/">Project Info</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems id="contact-us">
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLinkP to="/">250 Capstone Ave, New York, NY 10004</FooterLinkP>
              <FooterLinkP to="/">(707) 707-0770</FooterLinkP>
              <FooterLinkP to="/">capstone-heros@fullstackacademy.com</FooterLinkP>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Follow Us</FooterLinkTitle>
              <SocialMedia>
                <SocialIcons>
                  <SocialIconLink
                    href="//www.facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <FaFacebookSquare />
                  </SocialIconLink>
                  <SocialIconLink
                    href="//www.twitter.com"
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <FaTwitterSquare />
                  </SocialIconLink>
                  <SocialIconLink
                    href="//www.instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <FaInstagramSquare />
                  </SocialIconLink>
                  <SocialIconLink
                    href="//www.youtube.com"
                    target="_blank"
                    aria-label="Youtube"
                  >
                    <FaYoutubeSquare />
                  </SocialIconLink>
                </SocialIcons>
              </SocialMedia>
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
