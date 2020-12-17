import styled from 'styled-components';
import {
  secondaryBeige,
  mainDarkGreen,
} from '../styledComponents/globalStyles';

export const HeroContainer = styled.nav`
  background: ${secondaryBeige};
  height: 600px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const HeroBg = styled.nav`
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`;

export const HeroContent = styled.nav`
  max-width: 1200px;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 3;
`;

export const HeroH1 = styled.h1`
  color: ${mainDarkGreen};
  text-align: center;
  font-size: 48px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const HeroP = styled.p`
  color: ${mainDarkGreen};
  text-align: center;
  font-size: 24px;
  margin-top: 24px;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const HeroBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;
