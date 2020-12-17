import styled from 'styled-components';
import {
  mainOrange,
  textColorLight,
  mainLightGreen,
  mainDarkGreen,
} from './globalStyles';

export const Card = styled.div`
  box-shadow: 4px 4px 3px #f6f6f3;
  border-radius: 16px;
  border: 1px solid #e4e4dc;
  padding: 10px;
`;

export const ResultsCard = styled(Card)`
  background: ${mainOrange};
  margin-top: 28px;
  color: white;
  box-shadow: 4px 4px 6px rbga(0, 0, 0, 0.25);
  border: none;
`;

export const Container = styled.div`
  display: flex;
  padding: 8px;
`;

export const ThreeQuartContainer = styled(Container)`
  width: 85%;
  align-self: center;
`;

export const RowContainer = styled(Container)`
  flex-flow: row wrap;
`;

export const ColumnContainer = styled(Container)`
  flex-flow: column nowrap;
  flex: 0 1 50%;
`;

export const CenteredContainer = styled(Container)`
  width: 50%;
  align-self: center;
  margin-left: 25%;
  margin-right: 25%;
`;

export const Sidebar = styled(ColumnContainer)`
  flex: 0 2 25%;
  padding-right: 30px;
`;

export const SidebarRight = styled(Sidebar)`
  padding-left: 50px;
`;

export const FriendRow = styled(RowContainer)`
  align-items: center;
`;

export const Button = styled.button`
  border-radius: 8px;
  background: ${mainOrange};
  color: ${textColorLight};
  font-size: 0.9rem;
  text-align: center;
  border: solid 1px #bc3810;
  transition: all 0.2s ease-in-out;
  height: 36px;
  font-family: 'Roboto Mono';

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${mainLightGreen};
    border: solid 1px ${mainDarkGreen};
  }
`;

export const FormButton = styled.button`
  margin: 5px 0;
  font-size: 1rem;
  font-family: 'Roboto Mono';
  border: 1px solid #d3d3c5;
  background: #dcdcd0;
  box-shadow: none;
  border-radius: 4px;
  color: #8a886a;
  transition: all ease 0.75s;
  &:hover {
    background: #8a886a;
    color: #dcdcd0;
  }
`;

export const SearchForm = styled.form`
  background: #010101;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  padding: 1px;
  border-radius: 3px;

  @media screen and (max-width: 860px) {
    max-width: 300px;
    min-height: 1vh;
  }
`;

export const SearchInput = styled.input`
  padding: 10px 20px;
  border: none;
  height: 50px;
  line-height: 30px;
  border-radius: 3px;
  font-size: 18px;
  box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 1rem;
  width: 100%;
`;

export const SearchButton = styled.button`
  background: ${mainOrange};
  padding: 15px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #01bf71;
    transition: all 0.2s ease-in-out;
    color: ${mainDarkGreen};
  }
`;
