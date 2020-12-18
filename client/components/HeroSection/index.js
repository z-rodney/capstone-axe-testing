import React from 'react';
import {
  HeroContainer,
  HeroH1,
  HeroP,
  HeroContent,
  HeroBtnWrapper,
} from './HeroElements';
import { Button } from '../styledComponents/ButtonElement';

const HeroSection = () => {
  return (
    <HeroContainer id="home">
      <HeroContent>
        <HeroH1>Welcome to Proximity App</HeroH1>
        <HeroP>
          Sign up to start protecting yourself, your family, and your friends,
          and play an active role in protecting your community from infectious
          diseases.
        </HeroP>
        <HeroBtnWrapper>
          <Button to="/signup" primary="true" light="true" id="signup">
            Get Started
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
