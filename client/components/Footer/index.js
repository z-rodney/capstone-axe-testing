import React from 'react';
import { Link } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import { animateScroll as scroll } from 'react-scroll';

import {
  FooterLinkItems,
  FooterLinksWrapper,
  FooterWrap,
  SocialMediaWrap,
} from './FooterElements';

const toggleHome = () => {
  scroll.scrollToTop();
};

const Footer = () => {
  return (
    <FooterWrap>
        <FooterLinksWrapper>
          <FooterLinkItems id="about-us">
            <h1>About Us</h1>
            <Link to="/">Who We Are</Link>
            <Link to="/">How Proximity Works</Link>
          </FooterLinkItems>
        </FooterLinksWrapper>
      <SocialMediaWrap>
        <Link className="social-logo" to="/" onClick={toggleHome}>
          <GrLocation />
          Proximity
        </Link>
        <small className="web-rights">
          Designed by <i>Capstone Heroes Team - </i> Copyright &copy;
          {new Date().getFullYear()} Proximity. All rights reserved.
        </small>
      </SocialMediaWrap>
    </FooterWrap>
  );
};

export default Footer;
