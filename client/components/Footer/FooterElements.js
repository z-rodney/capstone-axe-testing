import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: #254441;
`;

export const FooterWrap = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 920px) {
    padding-top: 32px;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLinkItems = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  width: 250px;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;

export const FooterLinkTitle = styled.h1`
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

export const FooterLinkP = styled.p`
  color: #fff;
  text-align: center;
  font-size: 14px;
  margin: 5px;
  max-width: 600px;
`;

export const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;

  &:hover {
    color: #EC4E20;
    transition: 0.3s ease-out;
  }
`;

export const SocialMedia = styled.section`
  ${'' /* width: 100%; */}
  max-width: 1000px;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${'' /* max-width: 1100px; */}
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  display: flex;
  justify-self: flex-start;
  align-items: center;
  text-decoration: none;
  margin-bottom: 16px;
  font-size: 1.5rem;
  cursor: pointer;
  font-style: oblique;
  font-weight: bold;
`;

export const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
  margin-left: 60px;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
    font-size: 8px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: right;
  width: 120px;
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;

  &:hover {
    color: #EC4E20;
    transition: 0.3s ease-out;
  }
`;
