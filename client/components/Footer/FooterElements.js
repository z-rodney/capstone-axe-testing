import styled from 'styled-components';

export const FooterWrap = styled.footer`
  background: #254441;
  padding: 10px;
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
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 820px) {
    padding-top: 32px;
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

  & h1 {
    font-size: 18px;
    margin-bottom: 16px;
    text-align: center;
  }

  & a {
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;
  }

  & a:hover {
    color: #EC4E20;
    transition: 0.3s ease-out;
  }
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }

  & .social-logo {
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 16px;
    font-size: 1.5rem;
    cursor: pointer;
    font-style: oblique;
    font-weight: bold;
  }

  & small {
    color: #fff;
    margin-bottom: 16px;
    margin-left: 60px;

    @media screen and (max-width: 420px) {
      margin: 0;
      padding: 10px;
      width: 100%;
      font-size: 8px;
    }
  }
`;
