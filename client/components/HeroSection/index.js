import React from 'react';
import {
  HeroBg,
  HeroContainer,
  // VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
} from './HeroElements';
// import Video from '../../videos/video.mp4';
import { Button } from '../ButtonElement';

const HeroSection = () => {
  return (
    <HeroContainer id="home">
      <HeroBg>
        {/* <VideoBg autoPlay loop muted src={videoUrl} type="video/mp4" /> */}
      </HeroBg>
      <HeroContent>
        <HeroH1>Welcome to Capstone App</HeroH1>
        <HeroP>
          Sign up for a new account today and start protecting yourself, your family, friends, and play active role in protecting your community and fighting infectious diseases
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
