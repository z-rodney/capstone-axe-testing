import React from 'react';
import {
  HeroBg,
  HeroContainer,
  // ImageBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
} from './HeroElements';
// import Image from '../../../server/public/images/contract-tracing';
import { Button } from '../styledComponents/ButtonElement';

const HeroSection = () => {
  return (
    <HeroContainer id="home">
      <HeroBg>
        {/* <ImageBg src={Image} type="image/png" /> */}
      </HeroBg>
      <HeroContent>
        <HeroH1>Welcome to Proximity App</HeroH1>
        <HeroP>
          Sign up to start protecting yourself, your family, and your friends, and play an active role in protecting your community from infectious diseases.
        </HeroP>
        <HeroBtnWrapper>
          <Button to="/signup" primary="true" dark="true" id="signup">
            Get Started
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
